# Deploy HUNCHO-MD on Koyeb

## Before deploying
- This repository is a WhatsApp bot worker. It does not need a public HTTP port to handle WhatsApp messages.
- The app starts with `node keith.js`.
- Use a supported Node.js runtime (Dockerfile.koyeb uses Node 20).
- The bot's `set.js` loads `set.env` when the file exists, so for production leave `set.env` out of Git and set values in Koyeb's environment/secrets panel.
- Set at least `SESSION_ID`, `PREFIX`, `OWNER_NAME`, and `OWNER_NUMBER` (the code currently reads `OWNER_NUMBER`, while the config also has legacy `NUMERO_OWNER`; confirm which your commands expect).
- Persist any database/session state appropriately. A bot session can be disconnected if its credential store is lost or reused by a second running instance.

## Koyeb steps (mobile-friendly)
1. Open https://app.koyeb.com/ and sign in.
2. Choose **Create App** and select **GitHub** as the deployment source.
3. Select your fork of `Rdx690/HUNCHO-MDm` and the branch you want to deploy.
4. Select **Docker** / Dockerfile deployment and enter `Dockerfile.koyeb` as the Dockerfile path (if the UI offers this field). Alternatively, copy its contents into `Dockerfile` on a deployment branch.
5. Choose a Worker service if available; this bot is a long-running background process and doesn't expose an HTTP web page.
6. Add secrets/environment variables in Koyeb's dashboard. Do not paste them into README, Dockerfile, or GitHub commits.
7. Deploy and open the service logs. Successful startup should show the bot initializing and connecting. If it exits, inspect the first dependency or session error in logs.

## Environment variables
`SESSION_ID` (required), `PREFIX` (default `.`), `OWNER_NAME`, `OWNER_NUMBER`, `BOT_NAME`, `BOT_MENU_LINKS`, `PUBLIC_MODE`, `AUTO_READ_STATUS`, `AUTO_DOWNLOAD_STATUS`, `PM_PERMIT`, `WARN_COUNT`, `STARTING_BOT_MESSAGE`, `PRESENCE`, `ANTI_DELETE_MESSAGE`, and optional `DATABASE_URL`.

## Security warning
A session and database URL were present in the committed `set.env` when this repo was reviewed. Treat them as compromised:
1. Revoke/logout the linked WhatsApp session and pair a fresh session.
2. Rotate the database password/URL with the database provider.
3. Keep `set.env` ignored and remove it from Git history if possible.
4. Make sure GitHub history, forks, and build logs no longer expose the old values.

## Notes
Koyeb's exact dashboard options, supported regions, pricing, and blueprint schema can change. Verify the final options in the Koyeb UI before deploying. This repository still includes legacy Heroku references and a legacy Heroku API dependency; neither is required for the Docker command above unless a bot command explicitly uses it.
