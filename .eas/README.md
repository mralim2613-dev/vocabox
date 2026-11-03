# Vocabox EAS builds

This is a Capacitor application. Custom EAS jobs build the existing native projects; no React Native migration is required.

The jobs run tests, rebuild the web application, generate assets, and synchronize native projects on EAS. `.env` files are excluded from uploads. Configure `VITE_SUPABASE_URL` and the public `VITE_SUPABASE_ANON_KEY` in the matching EAS environment (preview or production). Never upload a service-role key. Production jobs verify the live secure RPC before building.

In PowerShell, set `$env:EAS_NO_VCS='1'` while this folder has no Git repository. Use the pinned local CLI: `.\node_modules\.bin\eas.cmd build --platform android --profile production` or the corresponding `--platform ios` command. Test profiles are Android `preview` (debug APK) and iOS `simulator` (unsigned simulator application, not an IPA).

The production Android profile produces a signed AAB. The iOS profile needs Apple Developer distribution credentials in EAS before it can produce a signed IPA.

EAS CLI currently discovers shared schemes only at `ios/*.xcodeproj/xcshareddata/xcschemes/`, while Capacitor places its project at `ios/App/App.xcodeproj`. `ios/example.xcodeproj` contains only a shared scheme discovery mirror. Expo excludes example project directories when resolving the real Xcode project, so the native target remains `ios/App/App.xcodeproj`. Keep both copies of `App.xcscheme` identical.

Project: https://expo.dev/accounts/zehniboop/projects/vocabox

Platform identifiers differ intentionally: Android remains `com.vocabox.app`; iOS uses `com.zehniapp.vocabox` in `app.json` and both Xcode build configurations because Apple would not register the original generic ID for the owner's team. Capacitor's shared default appId remains the Android ID. `verify:native` checks iOS against the actual Xcode project.

The production Gymfile template explicitly receives `eas.job.secrets.buildCredentials`; without that input Expo generates a simulator template. It also specifies the real `App/App.xcworkspace` relative to the `ios` working directory, so Fastlane does not auto-select the scheme discovery mirror.
