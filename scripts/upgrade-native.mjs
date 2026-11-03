import fs from 'node:fs/promises';
const replace=async(file,from,to)=>fs.writeFile(file,(await fs.readFile(file,'utf8')).replaceAll(from,to));
const versions={minSdkVersion:24,compileSdkVersion:36,targetSdkVersion:36,androidxActivityVersion:'1.11.0',androidxAppCompatVersion:'1.7.1',androidxCoordinatorLayoutVersion:'1.3.0',androidxCoreVersion:'1.17.0',androidxFragmentVersion:'1.8.9',coreSplashScreenVersion:'1.2.0',androidxWebkitVersion:'1.14.0',junitVersion:'4.13.2',androidxJunitVersion:'1.3.0',androidxEspressoCoreVersion:'3.7.0',cordovaAndroidVersion:'14.0.1'};
await fs.writeFile('android/variables.gradle','ext {\n'+Object.entries(versions).map(([key,value])=>`    ${key} = ${typeof value==='number'?value:JSON.stringify(value)}`).join('\n')+'\n}\n');
await replace('android/build.gradle','com.android.tools.build:gradle:8.7.2','com.android.tools.build:gradle:8.13.0');
await replace('android/build.gradle','com.google.gms:google-services:4.4.2','com.google.gms:google-services:4.4.4');
await replace('android/gradle/wrapper/gradle-wrapper.properties','gradle-8.11.1-all.zip','gradle-8.14.3-all.zip');
await replace('android/app/src/main/AndroidManifest.xml','screenLayout|uiMode|navigation"','screenLayout|uiMode|navigation|density"');
let gradle=await fs.readFile('android/app/build.gradle','utf8');
gradle=gradle.replace('versionCode 1','versionCode 2').replace('versionName "1.0"','versionName "1.0.0"');
for(const name of ['namespace','compileSdk','applicationId','minSdkVersion','targetSdkVersion','versionCode','versionName','testInstrumentationRunner','ignoreAssetsPattern','minifyEnabled'])gradle=gradle.replace(new RegExp(`^(\\s*${name}) (?![=])`,'gm'),'$1 = ');
await fs.writeFile('android/app/build.gradle',gradle);
await replace('ios/App/Podfile',"platform :ios, '14.0'","platform :ios, '15.4'");
let project=await fs.readFile('ios/App/App.xcodeproj/project.pbxproj','utf8');
project=project.replaceAll('IPHONEOS_DEPLOYMENT_TARGET = 14.0;','IPHONEOS_DEPLOYMENT_TARGET = 15.4;').replaceAll('MARKETING_VERSION = 1.0;','MARKETING_VERSION = 1.0.0;').replaceAll('CURRENT_PROJECT_VERSION = 1;','CURRENT_PROJECT_VERSION = 2;');
if(!project.includes('SceneDelegate.swift in Sources')) {
 project=project.replace('/* Begin PBXBuildFile section */','/* Begin PBXBuildFile section */\n\t\tA10000000000000000000001 /* SceneDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = A10000000000000000000002 /* SceneDelegate.swift */; };\n\t\tA10000000000000000000003 /* PrivacyInfo.xcprivacy in Resources */ = {isa = PBXBuildFile; fileRef = A10000000000000000000004 /* PrivacyInfo.xcprivacy */; };');
 project=project.replace('/* Begin PBXFileReference section */','/* Begin PBXFileReference section */\n\t\tA10000000000000000000002 /* SceneDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SceneDelegate.swift; sourceTree = "<group>"; };\n\t\tA10000000000000000000004 /* PrivacyInfo.xcprivacy */ = {isa = PBXFileReference; lastKnownFileType = text.xml; path = PrivacyInfo.xcprivacy; sourceTree = "<group>"; };');
 project=project.replace('504EC3071FED79650016851F /* AppDelegate.swift */,','504EC3071FED79650016851F /* AppDelegate.swift */,\n\t\t\t\tA10000000000000000000002 /* SceneDelegate.swift */,\n\t\t\t\tA10000000000000000000004 /* PrivacyInfo.xcprivacy */,');
 project=project.replace('504EC3081FED79650016851F /* AppDelegate.swift in Sources */,','504EC3081FED79650016851F /* AppDelegate.swift in Sources */,\n\t\t\t\tA10000000000000000000001 /* SceneDelegate.swift in Sources */,');
 project=project.replace('504EC30F1FED79650016851F /* Assets.xcassets in Resources */,','504EC30F1FED79650016851F /* Assets.xcassets in Resources */,\n\t\t\t\tA10000000000000000000003 /* PrivacyInfo.xcprivacy in Resources */,');
}
await fs.writeFile('ios/App/App.xcodeproj/project.pbxproj',project);
let plist=await fs.readFile('ios/App/App/Info.plist','utf8');
plist=plist.replace(/\s*<key>UIMainStoryboardFile<\/key>\s*<string>Main<\/string>/,'');
if(!plist.includes('UIApplicationSceneManifest'))plist=plist.replace('</dict>\n</plist>',`<key>UIApplicationSceneManifest</key>
<dict><key>UIApplicationSupportsMultipleScenes</key><false/><key>UISceneConfigurations</key><dict><key>UIWindowSceneSessionRoleApplication</key><array><dict><key>UISceneConfigurationName</key><string>Default Configuration</string><key>UISceneDelegateClassName</key><string>$(PRODUCT_MODULE_NAME).SceneDelegate</string></dict></array></dict></dict>
</dict>\n</plist>`);
await fs.writeFile('ios/App/App/Info.plist',plist);
const app=JSON.parse(await fs.readFile('app.json','utf8'));app.expo.ios.buildNumber='2';app.expo.android.versionCode=2;await fs.writeFile('app.json',JSON.stringify(app,null,2)+'\n');
