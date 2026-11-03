# Vocabox support pages

This folder contains only public support documents. Contact address was confirmed by the owner: musabayramov@zehniapp.com.

Deploy to a separate Vercel project named `vocabox-support` only after the intended account is connected and confirmed. Do not replace or redeploy existing projects. The user's browser is signed in as `zehnipro-boop`, team `musa-0578` (`team_1EAZ9hX56hf9HZYx3b3IZwf7`); the current plugin shows a different `musa-6b4f` scope.

Owner instruction, 30 October 2026: **Do not modify zehniapp.com or its existing project.** The owner authorized continuing with EnglishCamp in the `musa-0578` account. Use only that team for further Vocabox connection work. No changes have been made to zehniapp.com; earlier calls only read its metadata and an attempt to create a separate project failed with 403.

The owner subsequently deferred the Vercel connection. The pending CLI device login was canceled. Do not treat the CLI as authenticated or the correct plugin connection as established; no deployment took place.

Required public routes after deployment:

- `/` — support
- `/privacy.html` — privacy policy
- `/delete-account.html` — deletion request instructions
- `/terms.html` — terms

The Vercel connector returns HTTP 403 for `musa-6b4f` and cannot find the actual browser team's ID. Refreshing consent links did not resolve the account mismatch. No new project or deployment has been created. The owner has deferred the remaining store preparation.

After access is restored, deploy only the five website files (`index.html`, `privacy.html`, `delete-account.html`, `terms.html`, `vercel.json`). Do not deploy this instruction file or any private app files. Verify the pages without signing in and copy the final production URLs into the store forms. No custom domain purchase is required.
