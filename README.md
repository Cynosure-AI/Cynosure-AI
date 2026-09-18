# Cynosure landing page

Nuxt landing page for Cynosure, built with Vue, Tailwind CSS, and Lucide icons.

```bash
pnpm dev:landing
pnpm build:landing
```

The static production output is written to `apps/landing/.output/public`. Deploy that directory to any static host (Cloudflare Pages, Netlify, Vercel, GitHub Pages, or a plain web server). No runtime server or environment variables are required. Use `pnpm --filter cynosure-landing build:ssr` if a server-rendered Nuxt deployment is preferred.

Theme colors and font tokens live in `assets/css/theme.css`. Page content lives in `pages/index.vue`, while the detailed visual treatments remain in `assets/css/main.css`.

The download and documentation calls to action point to the Cynosure GitHub release and README pages. If those move, update the URLs in `pages/index.vue`.
