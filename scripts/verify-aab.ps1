param([Parameter(Mandatory=$true)][string]$Path)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.Security.Cryptography.Pkcs
$archive = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Path))
try {
  function Read-EntryBytes($entry) {
    $stream = $entry.Open()
    $memory = [System.IO.MemoryStream]::new()
    try { $stream.CopyTo($memory); return ,$memory.ToArray() }
    finally { $stream.Dispose(); $memory.Dispose() }
  }
  function Digest-Base64([byte[]]$bytes) {
    return [Convert]::ToBase64String([System.Security.Cryptography.SHA256]::HashData($bytes))
  }
  $signatureFile = @($archive.Entries | Where-Object { $_.FullName -match '^META-INF/[^/]+\.SF$' })
  if ($signatureFile.Count -ne 1) { throw 'Expected one JAR signature file.' }
  $signatureEntry = $archive.GetEntry(($signatureFile[0].FullName -replace '\.SF$','.RSA'))
  if (!$signatureEntry) { throw 'RSA signing block missing.' }
  $sf = Read-EntryBytes $signatureFile[0]
  $cms = [System.Security.Cryptography.Pkcs.SignedCms]::new([System.Security.Cryptography.Pkcs.ContentInfo]::new($sf),$true)
  $cms.Decode((Read-EntryBytes $signatureEntry))
  $cms.CheckSignature($true)
  $manifest = Read-EntryBytes $archive.GetEntry('META-INF/MANIFEST.MF')
  $sfText = [Text.Encoding]::UTF8.GetString($sf) -replace '\r?\n ',''
  $expectedManifest = [regex]::Match($sfText,'(?m)^SHA-256-Digest-Manifest: ([^\r\n]+)').Groups[1].Value
  if (!$expectedManifest -or (Digest-Base64 $manifest) -cne $expectedManifest) { throw 'Signed manifest digest does not match.' }
  $manifestText = [Text.Encoding]::UTF8.GetString($manifest) -replace '\r?\n ',''
  $verified = 0
  foreach ($section in ($manifestText -split '\r?\n\r?\n')) {
    $name = [regex]::Match($section,'(?m)^Name: ([^\r\n]+)').Groups[1].Value
    if (!$name) { continue }
    $expected = [regex]::Match($section,'(?m)^SHA-256-Digest: ([^\r\n]+)').Groups[1].Value
    $entry = $archive.GetEntry($name)
    if (!$entry -or !$expected -or (Digest-Base64 (Read-EntryBytes $entry)) -cne $expected) { throw "Bundle entry integrity failure: $name" }
    $verified++
  }
  if (!$archive.GetEntry('BundleConfig.pb') -or !$archive.GetEntry('base/manifest/AndroidManifest.xml') -or $verified -lt 1) { throw 'Not a valid Android App Bundle layout.' }
  [PSCustomObject]@{File=(Resolve-Path -LiteralPath $Path).Path;VerifiedSignedEntries=$verified;CertificateSHA256=([Convert]::ToHexString([System.Security.Cryptography.SHA256]::HashData($cms.Certificates[0].RawData)));NativeSharedLibraries=@($archive.Entries | Where-Object {$_.FullName -like '*.so'}).Count}
} finally { $archive.Dispose() }
