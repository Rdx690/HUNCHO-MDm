# HUNCHO-MD | WhatsApp Bot

A WhatsApp automation bot built with Node.js and Baileys.

> **Security first:** never commit your WhatsApp session, database credentials, API keys, or a real `set.env` file. If those values were committed previously, revoke/rotate them before deploying.

## Quick links

- [Deploy on Koyeb](KOYEB_DEPLOY.md)
- [Koyeb config](koyeb.yaml)
- [Dockerfile for Koyeb](Dockerfile.koyeb)
- [Modern menu preview](MENU_STYLE.md)

## Deploy on Koyeb

1. Fork this repository into your own GitHub account.
2. Open [Koyeb](https://app.koyeb.com/), create an App, and choose this GitHub repository as the source.
3. Choose Docker deployment and use `Dockerfile.koyeb` as the Dockerfile path if available. If not, use its contents as the main `Dockerfile` in your deployment branch.
4. Select a worker/background service if the dashboard offers it. This bot runs as a long-lived process and does not need an HTTP port to process WhatsApp messages.
5. Set environment variables/secrets in Koyeb. At minimum, configure a fresh `SESSION_ID`, `PREFIX`, `OWNER_NAME`, and `OWNER_NUMBER`. Also set optional `BOT_NAME`, `BOT_MENU_LINKS`, `PUBLIC_MODE`, and database settings as needed.
6. Deploy, then check service logs for connection/session errors.

Read [the full Koyeb guide](KOYEB_DEPLOY.md) before launching. Dashboard fields, regions, service types, and pricing may change.

## Environment notes

The source reads values from `set.env` when that file exists, otherwise Node reads them from `process.env`. Configure secrets in the platform rather than committing files. Some code paths use legacy names such as `NUMERO_OWNER` and `OWNER_NUMBER`; check the relevant command before renaming variables.

## Menu style

A refreshed dark/neon WhatsApp menu concept is available in [MENU_STYLE.md](MENU_STYLE.md). It is a design target/sample, not an assertion that every listed command is currently implemented. Keep only commands that exist in the bot.

## Local development

```bash
npm install --legacy-peer-deps
node keith.js
```

Use a supported Node.js version. The current Koyeb Dockerfile uses Node 20 and installs system tools needed by common media commands.

## Original project and credits

This project derives from HUNCHO-MD / Keith Tech and associated upstream credits. Preserve the applicable license and upstream attribution when modifying or redistributing it.
