# Cynosure landing page

Nuxt landing page for Cynosure, built with Vue, Tailwind CSS, and Lucide icons.

```bash
pnpm dev
pnpm build
```

The static production output is written to `dist/`. Deploy that directory to any static host. No runtime server or environment variables are required. Use `pnpm build:ssr` for a server-rendered Nuxt deployment.

## Styling

All page CSS, including design tokens, lives in `assets/css/main.css`. Page content and class names live in `pages/index.vue`. Keep new styles beside the relevant section's existing rules, and update existing selectors instead of adding another override at the end. Shared colors and fonts belong in the token block at the top.

Run `pnpm css:audit` after changing markup or styles. It reports class selectors that no longer have a matching Vue class. `node scripts/css-audit.mjs --fix` removes those selectors and repeated declarations; review its diff before committing. Then run `pnpm build` and check desktop and mobile layouts.

The download and documentation calls to action point to the Cynosure GitHub release and README pages. If those move, update the URLs in `pages/index.vue`.
