# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Official digital home of the **Mwata Kazembe Kingdom** — a static institutional site (vanilla HTML, CSS, ES modules). No package manager, build step, backend, or database.

### Running the dev server

Serve the repo root over HTTP (ES module imports require it):

```
python3 -m http.server 8080 --directory /workspace
```

Open `http://localhost:8080/` in a browser.

### Lint / Test / Build

- **Lint**: No project linter configured.
- **Tests**: None.
- **Build**: None — serve source files directly.

### Key files

| File | Purpose |
|---|---|
| `index.html` | Shell: header, page containers, footer mount points |
| `src/app.js` | Navigation, page routing, UI rendering |
| `src/kingdom-data.js` | IA, copy, governance/home content; imports verified history from `data.js` |
| `src/data.js` | Verified rulers, ceremony steps, routes, sources, calendar |
| `src/styles.css` | Institutional design system |
| `src/mobile-editorial.js` | Mobile swipe track hints |
| `src/motion.js` | GSAP motion layer: page transitions, hero entrances, parallax, scroll reveals |
| `src/vendor/gsap.min.js` | GSAP 3.12.5 core |
| `src/vendor/ScrollTrigger.min.js` | GSAP ScrollTrigger plugin (scroll-driven motion) |

### Gotchas

- Must be served over HTTP (`file://` breaks ES modules).
- Placeholder copy is marked **content required** where official kingdom text is not yet supplied.
- Real images: `assets/images/` only for heroes; avoid `assets/generated/` on the public face except where clearly labeled.
- Google Fonts from CDN; degrades to system fonts offline.
