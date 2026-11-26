# Vocabox web release

`web-release/` contains the static assets and Vercel registration endpoint used by the live web release at https://vocaboxmd.vercel.app. Deploy that directory as the Vercel project root. Set `SUPABASE_SECRET_KEY` as a server-side Production secret and apply `supabase/vocabox-account-storage.sql` in the Supabase project used by the app.

`web-release-source/` preserves the web account module and the patch scripts used to prepare the release. The patch scripts operated on the matching Vite build in the original workspace. The checked-in web release is the deployable artifact. Root Vite and Capacitor commands continue to use the repository's existing application source.
