import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const read=file=>fs.readFile(file,'utf8');
const pkg=JSON.parse(await read('package.json'));
const config=JSON.parse(await read('capacitor.config.json'));
const expo=JSON.parse(await read('app.json'));
assert.equal(config.appId,expo.expo.android.package,'Android package mismatch');
const variables=await read('android/variables.gradle');
assert.match(variables,/targetSdkVersion\s*=\s*36\b/);
assert.match(variables,/compileSdkVersion\s*=\s*36\b/);
assert.match(await read('android/build.gradle'),/gradle:8\.13\./);
assert.match(await read('android/gradle/wrapper/gradle-wrapper.properties'),/gradle-8\.14\.3-/);
assert.match(await read('android/app/build.gradle'),/versionName\s*=\s*"1\.0\.0"/);
const project=await read('ios/App/App.xcodeproj/project.pbxproj');
// Android and iOS identifiers may differ: the original generic iOS ID was
// unavailable to the owner's Apple team. Check every native configuration.
const iosIds=[...project.matchAll(/PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);/g)].map(match=>match[1]);
assert.ok(iosIds.length>0,'iOS bundle identifier missing');
for(const id of iosIds)assert.equal(id,expo.expo.ios.bundleIdentifier,'iOS bundle identifier mismatch');
assert.match(project,/IPHONEOS_DEPLOYMENT_TARGET = 15\.4;/);
assert.match(project,/SceneDelegate.swift in Sources/);
assert.match(project,/PrivacyInfo.xcprivacy in Resources/);
assert.match(await read('ios/App/App/Info.plist'),/UIApplicationSceneManifest/);
assert.match(await read('ios/App/App/PrivacyInfo.xcprivacy'),/C617\.1/);
assert.match(await read('ios/App/App/SceneDelegate.swift'),/SceneDelegateProxy.shared.scene/);
for(const name of ['core','android','ios','cli']) {
 const installed=JSON.parse(await read(`node_modules/@capacitor/${name}/package.json`));
 assert.equal(installed.version,'8.6.0',`${name} version`);
}
assert.equal(await read('ios/example.xcodeproj/xcshareddata/xcschemes/App.xcscheme'),await read('ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme'),'Shared scheme mirror differs');
if(process.argv.includes('--assets')) {
 const expected=await read('dist/index.html');
 for(const target of ['android/app/src/main/assets/public','ios/App/App/public']) {
  assert.equal(await read(`${target}/index.html`),expected,`${target}: stale web build`);
  for(const file of ['catalog/en.json','catalog/ru.json','catalog/de.json','catalog/es.json'])assert.equal(createHash('sha256').update(await fs.readFile(`${target}/${file}`)).digest('hex'),createHash('sha256').update(await fs.readFile(`dist/${file}`)).digest('hex'),`${target}/${file}: stale catalog`);
 }
}
console.log(`Native configuration OK: Android ${config.appId}, iOS ${expo.expo.ios.bundleIdentifier}, version ${pkg.version}, Android API 36, iOS 15.4+, Capacitor 8.6.0.`);
