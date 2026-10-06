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

The workspace is at `/academy/`. Lab blueprints live at `/academy/ad-sets/`; the working interview question bank is at `/academy/interview-notes/`. Three lab sets and future PRO packs are clearly labeled as planned. No lab access or paid material is currently offered.

The free field notes are separate from these planned products. This static site has no account system, checkout, prices, or payment processing.

## Design and access

The homepage dynamically loads a Three.js topology. It pauses outside the viewport or when the document is hidden, caps pixel density, and disposes geometry, materials, observers, and the renderer on page exit. Reduced-motion and WebGL-unavailable visitors see an SVG fallback. A visible control lets visitors disable the 3D scene.

`src/data/academy.ts` defines lab blueprints, categories, questions, and the illustrative attack path. Reusable cards and graph components live in `src/components/`. `platform.css` contains the product UI; `global.css` retains reading layouts. The older `academy.css` and `HeroScene.astro` are no longer imported.

Questions use native disclosure elements and remain readable without JavaScript. Learned, revisit, favorite, review, and study-day records are stored under `hexfield.learning.v1` in localStorage. Records are validated against current question IDs; no data is sent to a server. Storage failures degrade to in-memory state with a visible notice. Mock interviews are self-practice without grading. Streaks use local calendar dates; categories complete when every current question is marked learned.

The existing notes, filters, article routes, and roadmap are preserved. There is no account system, cross-device sync, spaced repetition scheduler, or running lab infrastructure.
