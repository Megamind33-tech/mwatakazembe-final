# Kazembe Site Audit — Completion Pass

**Prepared:** 2026-06-03
**Scope:** Full site audit and completion pass over the existing Mwata Kazembe Kingdom website.
**Goal:** Perfect the existing site — fill gaps, deploy unused approved assets, strengthen news/archive structure, and document sourcing — without rebuilding or redesigning.

---

## Architecture note

The completion brief referenced a React/TypeScript structure (`src/data/kazembeImageSources.ts`, etc.).
**The actual project is a vanilla HTML / CSS / ES-module static site** — no build step, no package
manager, no TypeScript. To respect rule 5 (do not weaken existing good sections) and the AGENTS.md
guidance, this pass **improved the existing data layer in place** rather than introducing a parallel
TypeScript system:

| Brief's proposed file | Existing equivalent used instead |
|---|---|
| `src/data/kazembeImageSources.ts` | `src/image-credits.js` (richer: alt, caption, credit, license, section, category) |
| `src/data/kazembeNews.ts` | `newsItems` in `src/kingdom-data.js` |
| `src/data/kazembeCeremonies.ts` | `ceremonySteps` / `mutombokoFeature` in `src/data.js` + `kingdom-data.js` |
| `src/data/kazembeArchives.ts` | `archiveRecords` in `src/kingdom-data.js` (added this pass) |
| `public/images/kazembe/` | `assets/images/kazembe/` |

A prior pass (2026-05-31) already completed deep copy and asset auditing — see
`kingdom-copy-audit.md`, `content-verification-needed.md`, and `mwata-kazembe-asset-manifest.md`.
This document records what the **2026-06-03 completion pass** found and changed.

---

## Findings and fixes

| Page / Section | Issue found | Fix applied | Source / asset | Status |
|---|---|---|---|---|
| **Splash screen** | `src/splash.js` loaded the animated flag from `assets/images/kazembe/flag.png`, which does not exist (the flag is at `identity/flag.png`). The `onerror` handler silently hid the canvas, so the kingdom flag — the splash centrepiece — **never appeared**. | Corrected `FLAG_SRC` to `assets/images/kazembe/identity/flag.png`. | Existing approved asset | ✅ Fixed |
| **Official flag (site-wide)** | The official Kingdom flag was stored but **placed nowhere** on the public site (self-flagged in `mwata-kazembe-asset-manifest.md` §8). | Registered the flag in `image-credits.js` (`identity-flag`) with full alt/caption/credit; displayed it in **Kingdom at a Glance** (homepage) and as the lead figure of **Symbols of Authority** (Office of the Mwata page); added it to the **Gallery** under a new "Identity" filter. | Existing approved asset | ✅ Fixed |
| **Coat of arms** | Used as brand/favicon but not represented in the credit registry or gallery. | Registered as `identity-coat-of-arms` and added to the Gallery under "Identity". | Existing approved asset | ✅ Fixed |
| **Gallery image type labels** | Render referenced `item.imageType` but no entry defined it — every tile showed "documentary", including the supplied portrait and emblems. | Added `imageType` to emblem and portrait entries ("official emblem" / "official portrait"); documentary fallback retained for the rest. | n/a | ✅ Fixed |
| **Newsroom** | Only ~4 cards, mostly placeholder; no proper category structure; thin for an "official digital home". | Rebuilt `newsItems` as a grounded, structured set (Events, Latest News, Public Notices, Publications, Official Statements) with an internal `verification` field (`verified` / `sourced` / `official` / `needs-confirmation`). No fictional announcements. | ZTA, MoT 2025 notice, project archive | ✅ Strengthened |
| **Archives** | No dedicated archive structure; archival material was scattered across Publications and Gallery. | Added `archiveRecords` data and a **Kingdom Archive** section in the Newsroom. Unavailable records show "Archive entry pending official material" instead of a broken link. Added "Archive" to newsroom nav + routing. | Cazembe 1873 (CC0), Wikimedia, project gallery | ✅ Added |
| **Contact page** | Already strong after prior pass (institutional language, no fake details). | No change needed. | — | ✅ Verified strong |
| **Mutomboko page** | Strong: meaning, program, gallery, video record, visitor + protocol guidance. | No change needed. | ZTA, UNZA | ✅ Verified strong |
| **Kingdom / history** | 8 chapters + 19-ruler lineage with confidence labels; uncertain entries marked. | No change needed. | data.js sources | ✅ Verified strong |
| **Leadership cards (home)** | Council/chiefs cards show no portrait. | Correct behaviour — no verified portraits exist; institutional placeholder copy is dignified. | — | ⏳ Needs official photos |
| **Clan register** | Empty table, hidden when empty; authoritative note. | Correct behaviour — names are not invented. | — | ⏳ Needs official register |

---

## Mobile / layout checks

- New `.glance-media` (flag + map) uses `repeat(auto-fit, minmax(min(280px,100%),1fr))` — stacks
  on mobile, no horizontal overflow.
- `.identity-figure` is `max-width: 460px` with `width:100%` image — scales down cleanly.
- `.archive-grid` follows the established `minmax(min(260px,100%),1fr)` pattern used across the site.
- All new images use `width:100%; height:auto` — no stretching or fixed-pixel overflow.
- No changes to header, sticky nav, mobile drawer, or existing grids.

---

## Acceptance criteria status

- ✅ No major section has an empty image placeholder that a real sourced asset could fill (the flag gap is now closed).
- ✅ No random/AI-looking imagery added; generated reconstructions remain clearly labelled and off the public face except where marked.
- ✅ Every image has alt text and source metadata in `image-credits.js`.
- ✅ Outsider-report wording was already removed (prior pass) and verified again.
- ✅ News/current affairs now has a proper category + verification structure.
- ✅ Archive/gallery sections are more credible (archive register + identity emblems).
- ✅ Uncertain historical claims remain marked via confidence labels and `content-verification-needed.md`.
- ✅ No mobile horizontal overflow introduced.
- ✅ Existing design direction preserved; no rebuild.
- ✅ No fabricated history, chiefs, dates, or official claims.

---

## Supporting Media Sourcing

**Added 2026-06-03 (second pass).** This pass treated media as *supporting enrichment*, not a new
product direction. The site remains an official institutional Kingdom website — not an archive,
museum, or video-gallery site.

**Media added (live):**
- A lightweight supporting-media data layer: `src/kazembe-supporting-media.js`.
- A compact **"Public Records & Media"** block inside the existing Mutomboko ceremony section,
  rendered from that data layer. It contains **one** public video (lazy, click-to-load, responsive)
  plus three **Selected public references** (links only). It sits *below* the existing photo gallery
  and does not dominate the page or the homepage.
- The previously hard-coded, eager-loading YouTube `<iframe>` was replaced with a **click-to-load
  facade**: no third-party embed loads until the user clicks play, so hidden pages never pull
  external scripts. The embed is responsive (16:9) and carries a "Watch on YouTube" source link.

**Sources used (already catalogued in the project, re-verified as links):**
- Zambia Tourism Agency — Umutomboko overview
- Lusaka Times / ZANIS — 2017 picture report
- Ministry of Tourism, Zambia — 2025 notice
- The embedded YouTube video (ID `nvYT2Y-D1yU`) carried over from the existing site.

**Items NOT added due to rights/availability uncertainty:**
- No new image files were added. The container network is restricted (`host_not_allowed`), so no new
  media could be fetched or verified live. Candidate media is listed in
  `docs/image-candidates-needing-approval.md` rather than placed on the live site.
- No additional YouTube/Facebook videos were embedded — fabricating unverified video IDs is not
  acceptable, and embed permission/availability could not be checked offline.

**Items needing official confirmation:**
- The carried-over YouTube video's **channel attribution and suitability** (`verificationStatus:
  "needs-confirmation"` in the data layer). Confirm with the Royal Protocol Office before launch.

**Why the site direction was preserved:**
- The media block is a single compact subsection within an existing page, not a new top-level page.
- The Archive register (added in the first pass) was left **modest and unchanged** — not expanded.
- No homepage restructuring, no year-by-year blocks, no archive-first navigation, and no new gallery
  filters were added (the gallery was already clean; overloading it was explicitly avoided).
- Chronology stays lightweight: references are a short curated list, not a chronological database.

## Supplied Media Batch (2026-06-03)

A batch of 20 images was supplied for the website. They were reviewed individually and connected to
people/events using only (a) what is visible in each image and (b) cross-reference with the
project's already-verified lineage records. **Nothing was invented**; uncertain identifications are
recorded as `needs-confirmation` in `image-credits.js` and below, and are not stated as fact in
public captions.

**Placed live (8), each registered in `image-credits.js` with provenance + `verificationStatus`:**

| Image | Placed in | Identification basis | Status |
|---|---|---|---|
| Mwata Kazembe XI, Muonga Kapakata (1904–1919) | Office of the Mwata → Historical continuity; Gallery | **Verified** — the photograph's printed caption matches the Kingdom lineage record (`kings` id 11). | identity sourced; rights needs-confirmation |
| A Mwata Kazembe with the staff of office (B&W) | Office of the Mwata → Historical continuity; Gallery | Visibly a Mwata Kazembe with staff; which officeholder unconfirmed. | needs-confirmation |
| Royal ceremony at Kazembe, colonial era | Office of the Mwata → Historical continuity; Gallery | Union Jack bunting + colonial officer → colonial era (consistent with c. 1961); exact event/year unconfirmed. | needs-confirmation |
| The Mwata Kazembe in the beaded ceremonial crown | Office of the Mwata; Gallery | Central beaded-crown royal figure at a Kazembe gathering. | needs-confirmation |
| The Mwata Kazembe in white ceremonial dress | Office of the Mwata; Gallery | Royal beadwork + fly-whisk at a ceremony. | needs-confirmation |
| Royal procession on the Muselo litter, Mwansabombwe | Mutomboko gallery; Gallery | Mwansabombwe district signboard + Mutomboko monument visible. | needs-confirmation (year) |
| Ceremony crowd at Mwansabombwe | Mutomboko gallery; Gallery | Mwansabombwe monument visible. | needs-confirmation (year) |
| Royal women in Lunda-Kazembe ceremonial dress | People of the Kingdom; Gallery | Women in the Kingdom's red-white-blue ceremonial colours. | needs-confirmation |

**Held back (not placed live)** — listed in `image-candidates-needing-approval.md`: a watermarked
"© Andy Luku Jr. Photography" image, an "Explore Zambia with Prosper" branded infographic, an
unidentifiable two-man photo, two unconfirmed building shots, and five near-duplicate crowd/litter
frames.

**Why the direction was preserved:** the additions went into *existing* sections (Office of the
Mwata, the Mutomboko gallery, the People spotlight, the unified Gallery). No new top-level page was
created, the homepage layout was not restructured, and the modest "Historical continuity" group is a
small captioned figure set — not a chronological database. Public captions state only what is
verifiable; uncertainty lives in the data layer and these docs.

---

*Update this file as items are verified and resolved. See `content-verification-needed.md` for the
running list of items awaiting official confirmation from the Kingdom.*
