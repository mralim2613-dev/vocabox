"""Inspect the signed device archive; full codesign verification needs macOS."""
import hashlib
import json
import plistlib
import struct
import sys
import zipfile
from pathlib import Path

path = Path(sys.argv[1])
with zipfile.ZipFile(path) as archive:
    infos = [name for name in archive.namelist() if name.startswith('Payload/') and name.count('/') == 2 and name.endswith('.app/Info.plist')]
    assert len(infos) == 1, 'Expected one application payload'
    root = infos[0].removesuffix('Info.plist')
    info = plistlib.loads(archive.read(infos[0]))
    expected = json.loads(Path('app.json').read_text(encoding='utf-8'))['expo']['ios']['bundleIdentifier']
    assert info['CFBundleIdentifier'] == expected, 'Bundle identifier mismatch'
    assert info['CFBundleShortVersionString'] == '1.0.0' and info['CFBundleVersion'] == '2', 'Version mismatch'
    assert 'iPhoneOS' in info['CFBundleSupportedPlatforms'], 'Not a device build'
    assert archive.read(root + '_CodeSignature/CodeResources'), 'Code signature resources missing'
    profile_bytes = archive.read(root + 'embedded.mobileprovision')
    start, end = profile_bytes.index(b'<?xml'), profile_bytes.index(b'</plist>') + len(b'</plist>')
    profile = plistlib.loads(profile_bytes[start:end])
    entitlement = profile['Entitlements']
    assert entitlement['application-identifier'] == 'X98JNRH37N.' + expected, 'Provisioning identity mismatch'
    assert not entitlement.get('get-task-allow'), 'Debug signing is enabled'
    assert 'ProvisionedDevices' not in profile and not profile.get('ProvisionsAllDevices'), 'Expected App Store distribution profile'
    binary = archive.read(root + info['CFBundleExecutable'])
    header = struct.unpack_from('<IiiIIIII', binary)
    assert header[0] == 0xfeedfacf and header[1] == 0x0100000c, 'Expected ARM64 device executable'
    offset, platform = 32, None
    for _ in range(header[4]):
        command, size = struct.unpack_from('<II', binary, offset)
        if command == 0x32:
            platform = struct.unpack_from('<I', binary, offset + 8)[0]
        offset += size
    assert platform == 2, 'Executable is not built for iOS devices'
    html = archive.read(root + 'public/index.html').decode('utf-8')
    assert 'musabayramov@zehniapp.com' in html and 'support@vocabox.app' not in html, 'Contact mismatch'
    privacy = plistlib.loads(archive.read(root + 'PrivacyInfo.xcprivacy'))
    assert privacy.get('NSPrivacyTracking') is False, 'Unexpected tracking declaration'
    print(json.dumps({'file': str(path), 'bundleIdentifier': expected, 'version': info['CFBundleShortVersionString'], 'build': info['CFBundleVersion'], 'architecture': 'arm64', 'platform': 'iOS device', 'profileExpires': profile['ExpirationDate'].isoformat(), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'note': 'Archive metadata/profile inspected; macOS codesign validation and physical-device testing remain separate.'}, indent=2))
