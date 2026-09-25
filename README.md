# Cynosure landing page

Nuxt landing page for Cynosure, built with Vue, Tailwind CSS, and Lucide icons.

```bash
pnpm dev
pnpm build
```

The static production output is written to `.output/public/`. No runtime server or environment variables are required. Use `pnpm build:ssr` for a server-rendered Nuxt deployment.

## Organization GitHub Pages site

GitHub serves an organization's root Pages URL from a repository named exactly `<organization>.github.io`. For this site, the repository must be `Cynosure-AI/Cynosure-AI.github.io`; a repository named `Cynosure-AI/Cynosure-AI` will instead get a project URL under `/Cynosure-AI/`. Rename or move this repository to `Cynosure-AI/Cynosure-AI.github.io` before publishing. The deployment workflow checks the repository name so it cannot publish the root-path build to a project URL by accident.

In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. Publish a GitHub release in this repository to build and deploy its tagged version, or run **Publish organization site** manually from the Actions tab for an initial deployment. The site will be available at `https://cynosure-ai.github.io/` after the deployment succeeds.

## Styling

All page CSS, including design tokens, lives in `assets/css/main.css`. Page content and class names live in `pages/index.vue`. Keep new styles beside the relevant section's existing rules, and update existing selectors instead of adding another override at the end. Shared colors and fonts belong in the token block at the top.

Run `pnpm css:audit` after changing markup or styles. It reports class selectors that no longer have a matching Vue class. `node scripts/css-audit.mjs --fix` removes those selectors and repeated declarations; review its diff before committing. Then run `pnpm build` and check desktop and mobile layouts.

The download and documentation calls to action point to the Cynosure GitHub release and README pages. If those move, update the URLs in `pages/index.vue`.
