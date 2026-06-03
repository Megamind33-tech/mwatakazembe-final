# Image Candidates Needing Approval

**Prepared:** 2026-06-03
**Purpose:** Real, relevant images that could further strengthen the site but were **not** downloaded
into the project because their reuse rights are uncertain or require permission (rule 9: do not copy
copyrighted images unless usage is allowed). Each candidate must be cleared before use.

> Note: The container's outbound network is restricted by policy (`host_not_allowed`), so these
> candidates could not be fetched or re-verified live during this pass. The links and rights notes
> below are drawn from sources already catalogued in `src/data.js` and `assets/ATTRIBUTION.md`.
> **Confirm each link and licence before downloading anything into the project.**

---

## 1. Smithsonian Photo Contest — "Mutomboko: War dance of the Luba-Lunda Empire"

- **Source:** https://photocontest.smithsonianmag.com/photocontest/detail/mutomboko-war-dance-of-the-luba-lunda-empire/
- **Author:** Ulf Krone, July 2016, Mwansabombwe
- **Why relevant:** High-quality, location-accurate Umutomboko ceremony photograph.
- **Where it would be used:** Mutomboko ceremony gallery / homepage gallery.
- **Usage concern:** Contest submission — all rights reserved. **Requires the photographer's written permission** for reuse beyond linking. Do not download.

## 2. Additional Wikimedia Commons "Category:Kazembe" media

- **Source:** https://commons.wikimedia.org/wiki/Category:Kazembe
- **Why relevant:** May contain further freely-licensed ceremony, portrait, or regalia images beyond the four already used.
- **Where it would be used:** Gallery, ceremony, archive.
- **Usage concern:** Licences vary per file (CC BY-SA, CC BY, GFDL, or all-rights-reserved). **Each file's licence and author must be checked individually**, and attribution recorded in `image-credits.js` before download.

## 3. Lusaka Times / ZANIS 2017 ceremony picture report (full set)

- **Source:** https://www.lusakatimes.com/2017/07/31/last-week-pictures-5/
- **Author:** Charles Banda / ZANIS
- **Why relevant:** Several strong documentary frames of the 2017 Umutomboko (some already referenced; more exist in the report).
- **Where it would be used:** Ceremony gallery, archive, people of the kingdom.
- **Usage concern:** ZANIS press photos — **reuse rights must be confirmed with the publisher/agency**. The frames currently used are treated as fair reference with credit; broader republication needs clearance.

## 4. Official Umutomboko / Ministry of Tourism ceremony imagery

- **Source:** https://www.mot.gov.zm/?p=4471 (and Zambia Tourism Agency)
- **Why relevant:** Government-published ceremony imagery would carry official weight.
- **Where it would be used:** Newsroom, ceremony, homepage hero alternates.
- **Usage concern:** Government copyright terms vary — **confirm reuse permission** with the ministry/agency before download.

## 5. Lunda heritage, Luapula landscape, and royal-grounds photography

- **Why relevant:** The site would benefit from a dedicated Lunda-heritage and Luapula-landscape image (drums, regalia close-ups, Mwansabombwe royal grounds, Lake Mweru / Luapula River).
- **Where it would be used:** A future Lunda Heritage section, Development (fisheries/agriculture), Kingdom geography.
- **Usage concern:** No freely-licensed, **verifiably location-accurate** image has been identified. Generic "African drum/village/palace" stock is explicitly disallowed (rule 3). Best sourced directly from the Kingdom or a credited Zambian photographer. **Pending official supply.**

---

---

## Video / embed candidates (rights or availability review needed)

These could enrich the Mutomboko "Public Records & Media" block but were **not embedded** because
their channel attribution, embed permission, or availability could not be verified offline
(restricted network). Do not embed until reviewed.

| Candidate | Where it would help | Concern |
|---|---|---|
| Carried-over YouTube embed `nvYT2Y-D1yU` (already live) | Mutomboko ceremony section | Channel attribution and suitability unconfirmed — verify with the Royal Protocol Office, then update `verificationStatus` in `src/kazembe-supporting-media.js`. |
| Additional public YouTube Umutomboko coverage (official Zambian broadcasters / ZNBC, news channels) | Mutomboko public records | Must confirm the specific video is public, embedding is enabled, and the channel is appropriate before adding a verified embed URL. Do not guess video IDs. |
| Facebook / social ceremony videos | Mutomboko public records | Do not download or copy thumbnails. Embed only if the platform's official embed is permitted and the page is public-facing. Listed as candidate only. |

## Supplied images held back (2026-06-03 batch)

A batch of images was supplied for the Kingdom website. Eight were placed live (see
`kazembe-site-audit.md` → Supplied Media Batch). The following were **deliberately NOT placed live**:

| File (upload) | What it shows | Why held back |
|---|---|---|
| `…3142029d` | The Mwata on horseback in white ceremonial robes | Bears a visible third-party watermark **"© ANDY LUKU JR. PHOTOGRAPHY"**. Needs the photographer's written permission before any use. |
| `…a92d2da7` | "Luba → Lunda → Kazembe/Bemba/Luvale" family-tree infographic | Carries third-party branding **"Explore Zambia with Prosper"**; also a generic educational graphic. Not appropriate for the official institutional site without permission and a Kingdom-made version. |
| `…db33a9cb` | Two men in suits/hat embracing | Could not be confidently identified; risk of misattribution. Needs identification before use. |
| `…27c8d23d` | A two-storey building / compound | Possibly the royal residence/guesthouse at Mwansabombwe, but unconfirmed. Needs confirmation it is a Kingdom building before captioning. |
| `…fd3a3229` | Compound with royal women seated under a tree | Same building as above plus royal women; building identity unconfirmed. |
| `…0996b4e0`, `…6f0a948d`, `…10efe568`, `…a462ec67`, `…c83af38f` | Near-duplicate Umutomboko crowd / litter scenes at Mwansabombwe | Redundant with the two crowd/procession images already placed live. Available as alternates if higher-resolution or better-composed frames are wanted. |

For all of the above, original photographer/source and reuse rights should be confirmed with the
Royal Protocol Office before any are added.

## Preferred path

The most reliable route for these is **official supply from the Office of the Mwata / Royal Protocol
Office**, which would also resolve the photographer-credit question on the existing home portrait
(see `content-verification-needed.md` item 10). Until then, the site relies on the verified
CC-licensed Wikimedia images and the project-supplied portrait already in place.
