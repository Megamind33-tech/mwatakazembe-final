# Final Review Notes — Mwata Kazembe Kingdom Website

**Prepared:** 2026-06-03
**Branch:** `claude/kazembe-site-completion-6dp4E`
**Scope:** Completion pass on the existing vanilla-JS institutional site (no rebuild, no redesign).

---

## 1. Summary of completed fixes

| Area | Fix |
|---|---|
| **Splash flag (bug)** | `splash.js` loaded the flag from a non-existent path (`assets/images/kazembe/flag.png`); the `onerror` handler silently hid it, so the animated Kingdom flag — the splash centrepiece — never appeared. Corrected to `assets/images/kazembe/identity/flag.png`. |
| **Routing (bug)** | `pageFromHash` ran broad prefix checks before the home-anchor allowlist, so home-section deep links (`#kingdom-glance`, `#kingdom-story`, `#kingdom-agencies`, `#mutomboko-journey`, `#clans-people`, `#development-public`) wrongly navigated to sub-pages. The explicit `HOME_ANCHORS` allowlist now resolves first. |
| **Official flag (placement)** | Registered in `image-credits.js` (`identity-flag`) with full alt/caption/credit/license; placed in Kingdom at a Glance, Symbols of Authority, and the Gallery. |
| **Coat of arms** | Registered (`identity-coat-of-arms`) and added to the Gallery under a new "Identity" filter. |
| **Gallery labels** | Added `imageType` for emblems/portrait (was always "documentary"). |
| **Newsroom** | Rebuilt as a grounded, categorised set with an internal `verification` field. No fabricated announcements. |
| **Archive** | New `archiveRecords` + Kingdom Archive section; unavailable records show "Archive entry pending official material"; added to nav + routing. |
| **Docs** | Added `kazembe-site-audit.md`, `image-candidates-needing-approval.md`, this file; updated `ATTRIBUTION.md` and asset manifest. |

---

## 2. Remaining image-approval items

Tracked in `docs/image-candidates-needing-approval.md`. None were copied into the project (rule 9):

- Smithsonian/Ulf Krone Umutomboko photo — all rights reserved; needs photographer permission.
- Further Wikimedia `Category:Kazembe` files — per-file licence check required.
- Full Lusaka Times / ZANIS 2017 set — publisher reuse clearance required.
- Ministry of Tourism / ZTA ceremony imagery — government reuse terms to confirm.
- A location-accurate Lunda-heritage / Luapula-landscape image — none freely licensed found; best supplied officially.

---

## 3. Remaining official-confirmation items

Tracked in `docs/content-verification-needed.md` (unchanged this pass). Key items:

- Contact telephone/email for Royal Office, Media, and Ceremony Committee (location is verified; no numbers invented).
- 2026 Umutomboko date — projected from the annual pattern; marked `needs-confirmation`.
- Home-portrait photographer credit / rights confirmation.
- Mwata Kazembe XIX full official biography.
- Royal Council membership, senior-chief portfolios, royal-household officer list.
- Clan register entries (table intentionally empty until officially supplied).
- Lineage confidence items (Mwata V name variant; Mwata XV–XVI dates).

No item above is presented to the public as confirmed fact; all carry confidence labels or dignified institutional phrasing.

---

## 4. Known limitations from restricted network access

- The container's outbound network is restricted (`host_not_allowed`), so **no new images could be sourced or downloaded** during this pass. Image work was limited to deploying the already-approved flag and documenting candidates.
- During screenshot capture, the **Google Fonts CDN was blocked**, so screenshots render in **system-font fallback** (Cormorant Garamond / Source Sans 3 are unavailable offline). This is the site's intended graceful degradation — the only console errors observed were `ERR_CERT_AUTHORITY_INVALID` for the font CDN, not application errors. On a normal network the served fonts load correctly.

---

## 5. Manual checks needed before public launch

1. Confirm and insert official **contact details** (phone/email) for the Royal Office, media, and ceremony committee.
2. Confirm the **home-portrait rights/photographer credit**, or replace with an officially cleared portrait.
3. Confirm the **2026 Umutomboko date** and update `calendar.nextExpected` once announced.
4. Decide which **candidate images** to clear and add (with attribution) from `image-candidates-needing-approval.md`.
5. Have the **Office of the Mwata / Royal Protocol Office review all historical and institutional copy** for cultural accuracy and any corrections.
6. Verify the **embedded Umutomboko YouTube video** (`nvYT2Y-D1yU`) is an approved/appropriate record.
7. Confirm or remove the **simulated Store / Donations / Membership** flows if real transactions are not intended (currently clearly labelled "simulated").
8. Re-run the validation below on a normal network to confirm Google Fonts load.

---

## 6. Recommendation

**Ready for STAGING. Not yet ready for production — requires official cultural/institutional review first.**

The site is structurally complete, internally consistent, well-sourced, mobile-clean, and free of fabricated content. Two genuine bugs (splash flag, deep-link routing) are now fixed. Before production it needs: (a) official contact details, (b) confirmation of the home-portrait rights, (c) a cultural/accuracy review by the Office of the Mwata, and (d) confirmation of the 2026 ceremony date. Deploy to a staging URL for that review, then promote to production once the items in §5 are cleared.

---

## 7. Validation performed (2026-06-03)

```
# Syntax check (all pass)
node --check src/*.js

# Module graph + render smoke test
node --input-type=module -e "import {homePageHtml} from './src/render-home.js'; ..."
  -> homePageHtml renders; 13 credited images; identity gallery category present;
     newsItems=7; archiveRecords=5; all credits have alt+credit.

# Local HTTP server smoke test
python3 -m http.server 8099
  200  /
  200  src/app.js
  200  src/splash.js
  200  src/image-credits.js
  200  assets/images/kazembe/identity/flag.png

# Headless (Playwright/Chromium) user-journey + screenshots
  - home loads; splash flag renders (see splash-flag-fixed.png)
  - navigation works; #kingdom-glance now resolves to home (routing fix verified)
  - gallery Identity filter works (flag + coat of arms)
  - archive routing works (#archive -> newsroom page)
  - newsroom cards render across categories
  - flag and coat of arms load from correct paths
  - console errors: only ERR_CERT_AUTHORITY_INVALID (Google Fonts CDN blocked); no app/JS errors
  - mobile (360px): scrollWidth 360 == innerWidth 360 -> no horizontal overflow
```
