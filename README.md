# Cynosure Landing Page

This repository contains the marketing landing page for **Cynosure**.

## What is Cynosure?

Cynosure is a private AI workspace that brings your models, tools, memory, agents, and automations together in one place. It lets you research ideas, recall project details, draft follow-ups, and organize files — with a long-term memory that grows alongside your work.

Key capabilities highlighted on the page:

- **Memory & knowledge graph** — useful facts from conversations become connected knowledge about your projects, preferences, and people.
- **Agents & tools** — add tools, create agents, and automate repetitive work.
- **MCP directory** — discover and add MCP servers in a few clicks, powered by Smithery and the official MCP Registry.
- **Remote chat & schedules** — keep conversations going from Telegram, Discord, or Slack, and schedule recurring work.
- **Private by design** — local workspace, tool permissions, and no tracking.

Cynosure is free to use and available for Windows, macOS, and Linux.

- Documentation: https://github.com/andreasjhagen/Cynosure#readme
- Releases: https://github.com/andreasjhagen/Cynosure/releases

## About this repository

This is the **Nuxt landing page** for Cynosure — a static marketing site presenting the product, its features, use cases, and download links. It is not the Cynosure application itself.

Built with [Nuxt](https://nuxt.com/) and Tailwind CSS, and deployed as a static site.

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### GitHub Pages

The Pages workflow builds with Node 24 and publishes `.output/public`. In the repository's Pages settings, select **GitHub Actions** as the build and deployment source. GitHub Pages serves this repository at `https://cynosure-ai.github.io/Cynosure-AI/`. To serve the organization root at `https://cynosure-ai.github.io/`, rename the repository to `cynosure-ai.github.io`; the workflow will then use `/` as Nuxt's base path automatically. For a custom domain at its root, set the repository Actions variable `NUXT_APP_BASE_URL` to `/`.
