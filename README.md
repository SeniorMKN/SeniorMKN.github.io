# Hexfield

A structured field guide to security fundamentals, built with Astro and Three.js for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Astro. `npm run build` creates the static site in `dist/`.

## Publish

The public GitHub repository is `SeniorMKN/SeniorMKN.github.io`. Push this project to its `main` branch and set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and deploys each push to `main`.

## Add a note

Create a Markdown file in `src/content/notes/`. Use the frontmatter fields in an existing note: title, description, track, order, level, readingTime, and published. The homepage, library, roadmap, and article routes update during the next build.

The current `track` schema permits `Active Directory` and `Linux`. Add further tracks in `src/content.config.ts` and update the roadmap when the curriculum grows.

## Academy previews

The Academy landing page is at `/academy/`. Its two planned paths live at `/academy/ad-sets/` and `/academy/interview-notes/`. Their copy describes a future lab and study-pack format; no lab access or paid material is currently offered. Keep `IN DEVELOPMENT` labels and availability language accurate as each product is built.

The free field notes are separate from these planned products. This static site has no account system, checkout, prices, or payment processing.

## Design and access

The homepage uses a small WebGL scene built with Three.js. It does not start for visitors who request reduced motion. The rest of the site works without JavaScript, except the library filter. All content is pre-rendered HTML.
