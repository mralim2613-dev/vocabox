# App review notes — draft, do not submit yet

App: Vocabox
Android application ID: com.vocabox.app
iOS bundle ID: com.zehniapp.vocabox (the original generic ID was unavailable to the owner's Apple team)

Support email confirmed by the owner: musabayramov@zehniapp.com.
Version: 1.0.0, build 2

Vocabox is a vocabulary study application with flashcards, typed recall, multiple-choice exercises, and Leitner-style memory boxes. Basic offline study and local backup/import are available without signing in.

The optional account synchronizes custom decks, cards, and progress. Accounts are provisioned by the operator. The owner's intended business model is external card-to-card payment followed by issuance of a user number and password/access key. There is no in-app purchase implementation in this version. Eligibility of this business model must be established for each store and territory before submission; these notes do not claim an exception or approval.

## Full-access review account

Not yet provisioned. After the secure database migration, create a separate review account, verify login/sync/deletion on a real build, and enter its credentials directly into the store's review-information fields. Do not commit credentials to this repository.

## Test flow

1. Select English and start a 10-card practice session.
2. Reveal and grade answers, then view the result.
3. Open Settings, sign in with the review account, and synchronize.
4. Create a custom deck and card, then verify recovery on a second device.
5. Export a backup through the native share sheet, then restore the file.
6. In Settings, account deletion removes the cloud account and its data. Use a disposable review/test account when testing deletion.

The backend migration is not yet applied to the configured hosted project. Do not submit the build with account features until the backend is live and a valid review account is available.
