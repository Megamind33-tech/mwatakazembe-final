# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a pure static website (the "Mwata Kazembe XIX Royal Library") — vanilla HTML, CSS, and ES modules with a vendored GSAP animation library. There is no package manager, no build step, no backend, and no database.

### Running the dev server

Serve the repo root over HTTP (ES module imports require it — `file://` will fail with CORS errors):

```
python3 -m http.server 8080 --directory /workspace
```

Then open `http://localhost:8080/` in Chrome. Any static file server works (e.g., `npx serve`, `live-server`).

### Lint / Test / Build

- **Lint**: No linter is configured. You can optionally run a JS linter ad-hoc (e.g., `npx eslint src/`), but there is no project-level config.
- **Tests**: No automated test suite exists.
- **Build**: No build step — the site is served directly from source files.

### Key files

| File | Purpose |
|---|---|
| `index.html` | Single-page entry point; all sections are inline |
| `src/app.js` | Main application logic (navigation, orbit/index modes, drawers) |
| `src/data.js` | All content data (rulers, regalia, routes, sources, ceremony steps) |
| `src/interaction-dna.js` | Micro-interaction effects (parallax, hover, ribbons) |
| `src/mobile-editorial.js` | Mobile/responsive layout adaptations |
| `src/editorial-language-normalize.js` | Text normalization utilities |
| `src/vendor/gsap.min.js` | Vendored GSAP 3.12.5 animation library |

### Gotchas

- The site uses ES module `import` syntax, so it **must** be served over HTTP — opening `index.html` directly via `file://` will fail.
- Google Fonts are loaded from CDN; the site degrades gracefully to system fonts if offline.
- All data is hardcoded in `src/data.js`; there is no API or database.
