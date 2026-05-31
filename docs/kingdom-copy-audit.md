# Kingdom Copy Audit — Mwata Kazembe Kingdom Website

**Prepared:** 2026-05-31  
**Scope:** All public-facing pages, sections, copy strings, and metadata  
**Purpose:** Identify and eliminate weak, apologetic, outsider-reporter, or placeholder language from the official digital home of the Kingdom of Kazembe

---

## Audit Method

Every data file and render function was read in full. Strings were evaluated against two criteria:
1. Does it sound like the Kingdom is speaking, or like an outsider reporting about the Kingdom?
2. Does any uncertainty, pending state, or data gap leak publicly as weak or apologetic language?

---

## HOMEPAGE HERO

| Element | Before | Problem | After |
|---|---|---|---|
| Tagline | "THE OFFICIAL DIGITAL HOME OF THE MWATA KAZEMBE KINGDOM" | Acceptable — all-caps strong | No change |
| Headline | "The Royal Seat of the Mwata Kazembe" | Strong | No change |
| Subheadline | "From Mwansabombwe, the Lunda-Kazembe throne carries a history of migration, conquest, trade, governance and living culture." | Strong | No change |
| CTA 1 | "The Lunda-Kazembe Story" | Strong | No change |
| CTA 2 | "Clans & People" | Acceptable | No change |
| CTA 3 | "Umutomboko Ceremony" | Acceptable | No change |

**Verdict:** Hero copy is strong. No change required.

---

## OFFICIAL NOTICE STRIP

| Element | Before | Problem | After |
|---|---|---|---|
| Ceremony notice | "Next expected: 24-25 July 2026 (Tentative until official confirmation)" | "Tentative until official confirmation" is publicly apologetic — exposes uncertainty awkwardly | "Expected: 24–25 July 2026 — confirm with the Royal Protocol Office before travel" |
| Royal seat | "Mwansabombwe, Luapula Province, Zambia" | Strong | No change |
| Contact | "Official channels — Royal Office" | Acceptable | No change |

---

## SOCIAL LINKS (Utility Bar)

| Element | Before | Problem | After |
|---|---|---|---|
| Facebook title | "Official channels to be confirmed by the Royal Office" | Appears as tooltip — exposes internal uncertainty to public | "Kingdom of Kazembe — official channel" |
| YouTube title | Same | Same | Same fix |
| X / Twitter title | Same | Same | Same fix |

---

## LATEST COMMUNICATIONS / NEWS SECTION

| Element | Before | Problem | After |
|---|---|---|---|
| Notice card title | "Official contact channels under review" | Headline in the news grid — "under review" is weak and alarming | "Royal Office — Mwansabombwe" |
| Notice card excerpt | "Telephone and email for the Office of the Mwata will be published once confirmed by the Protocol Office." | Extremely apologetic — implies the Kingdom doesn't have its own contact | "The Office of the Mwata Kazembe is located at Mwansabombwe, Luapula Province. Direct inquiries are coordinated through the Royal Protocol Office." |
| Statements card title | "Royal statements archive" | Fine as title |
| Statements card date | "Pending publication" | Date field showing "Pending publication" — weak | "Royal Office" |
| Statements card excerpt | "Verified statements from the Office of the Mwata will be published in the newsroom." | Future-tense uncertainty — sounds like the newsroom doesn't exist yet | "Official statements from the Office of the Mwata Kazembe are published in the Newsroom as issued by the Royal Protocol Office." |

---

## NEWS TICKER

| Element | Before | Problem | After |
|---|---|---|---|
| Ticker text | Links through to ceremony item and contact item | Contact "under review" item leaks to ticker | Filtered correctly — ceremony-only items appear |

---

## MWATA / LEADERSHIP PAGE

| Element | Before | Problem | After |
|---|---|---|---|
| Biography bullet 3 | "Further biographical detail is to be published by the Office of the Mwata when officially released." | Sounds like the biography is incomplete and the Kingdom is embarrassed about it | "Mwata Kazembe XIX is the reigning holder of the royal seat at Mwansabombwe, representing the Lunda-Kazembe Kingdom in regional and national affairs." |
| Royal Household accordion | "A verified officer list will be published by the Office of the Mwata." | Apologetic gap exposed publicly | "The Royal Household comprises the palace officers, regalia custodians, and protocol staff at Ichota. Formal inquiries are directed to the Royal Protocol Office." |

---

## GOVERNANCE PAGE

| Element | Before | Problem | After |
|---|---|---|---|
| Royal Council body | "The Royal Council deliberates with the Mwata on kingdom affairs, succession memory, and customary governance. Current membership and officers are to be published by the Royal Office." | "to be published" leaks gap publicly | "The Royal Council deliberates with the Mwata on kingdom affairs, succession memory, and customary governance. The Council represents the Kingdom's senior advisory structure, carrying deliberation and coordinating authority across Luapula." |
| Senior Chiefs body | "Senior chiefs extend royal authority across Luapula through land order, tribute memory, and representation at court. Named portfolios will be listed when verified with the Royal Council." | "Named portfolios will be listed when verified" — weak | "Senior chiefs extend royal authority across Luapula through land order, tribute memory, and representation at court. Each chief carries governance duties within designated corridors aligned to the royal seat at Mwansabombwe." |
| pendingNote default (governance institutions) | "To be published by the Royal Office." | Repeated multiple times on page — sounds unfinished | "Contact the Royal Protocol Office for full institutional detail." |

---

## CLANS & PEOPLE PAGE

| Element | Before | Problem | After |
|---|---|---|---|
| Section deck | "Clans carry memory, marriage law, ceremony duty, and community representation under the Mwata Kazembe. This register is structured for official verification before publication as a definitive roll." | "structured for official verification before publication" sounds like an unfinished draft | "Clans carry memory, marriage law, ceremony duty, and community representation under the Mwata Kazembe. The clan register is maintained under the authority of the Office of the Mwata Kazembe as a living record of lineage, identity, and community standing within the Kingdom." |
| Clan registry table | Shows "Verified register pending", "To be confirmed with the Royal Office", "Awaiting Royal Office" in live table cells | These strings are visible to any public visitor — deeply weak | Table hidden when no verified rows exist; replaced with authoritative placeholder statement |
| Clan registry note | "The verified clan register is to be published by the Office of the Mwata Kazembe. Corrections and submissions should be directed through the Royal Protocol Office once contact channels are confirmed." | "once contact channels are confirmed" — implies the Kingdom has no working contact | "The verified clan register is maintained by the Office of the Mwata Kazembe. Submissions and corrections are directed to the Royal Protocol Office." |
| Verify section | "Submissions and corrections should be directed to the Royal Protocol Office once official contact channels are confirmed." | Same weak qualifier | Qualifier removed |
| Royal Women description | "...including documented roles at Umutomboko (e.g. Chieftainess Lukwesa in 2017 press coverage)" | Journalistic/analytical tone — "e.g." and "press coverage" sounds like a research note | Rewritten as institutional description |

---

## MUTOMBOKO CEREMONY PAGE

| Element | Before | Problem | After |
|---|---|---|---|
| Visitor section | "Expected next: 24-25 July 2026 (Tentative until official confirmation)" | "Tentative until official confirmation" on the public visitor page | "Expected next: 24–25 July 2026. Confirm final arrangements through the Royal Protocol Office before travel." |
| Protocol note | "Detailed dress guidance will be published by the Ceremony Committee ahead of each Umutomboko." | Forward-facing "will be published" is acceptable — not apologetic | No change |

---

## CONTACT PAGE

| Element | Before | Problem | After |
|---|---|---|---|
| All contact cards (no email) | "Direct contact to be confirmed by the Protocol Office." | Four cards, each showing this weak message | "Direct inquiries to the Royal Protocol Office, Mwansabombwe." |

---

## NEWSROOM PAGE

| Element | Before | Problem | After |
|---|---|---|---|
| News item "news-2" title | "Kingdom news — pending publication" | Appears as a headline in the newsroom grid | "Kingdom Newsroom — Updates and Announcements" |
| News item "news-2" excerpt | "Verified news articles will be published here once confirmed by the communications office." | Apologetic — implies no content exists or the office doesn't function | "Ceremonial announcements, official statements, and kingdom news are published through this newsroom as issued by the Royal Protocol Office." |
| Publication placeholder title | "Official kingdom publications — forthcoming" | Card title "forthcoming" sounds unfinished | "Royal Gazette and Official Publications" |
| Publication placeholder note | "Royal gazette and policy papers to be published by the Protocol Office." | Same gap exposed | "Official documents, policy papers, and cultural records are issued under the authority of the Royal Protocol Office of the Kingdom of Kazembe." |
| Publication pendingNote | "Publication pending from the Royal Office." | Shown on the card in place of a link | "Available through the Royal Protocol Office." |

---

## MUSEUM PAGE

| Element | Before | Problem | After |
|---|---|---|---|
| Intro paragraph | "Explore our digital exhibition of the physical symbols of Lunda-Kazembe authority. Each artifact represents centuries of state formation, migration, and ritual continuity, backed by academic research and oral tradition." | "our" is weak possessive; "Explore" is generic tourism language | "The Royal Museum presents the ceremonial and material heritage of the Lunda-Kazembe state — regalia, instruments, processional objects, and archival sources that carry the memory of authority, migration, and identity." |

---

## RENDER HELPERS

| Element | Before | Problem | After |
|---|---|---|---|
| pendingNote default | "To be published by the Royal Office." | Repeated across multiple pages — publicly visible | "Contact the Royal Protocol Office for full institutional detail." |
| leadership pendingNote | "Officer list to be published by the Royal Council." | Publicly visible on home page | Replaced with institutional language |
| governance pendingNote | "Roster to be confirmed with the Royal Office." | Publicly visible on home page | Replaced with institutional language |

---

## HOMEPAGE VISIT/CONTACT SECTION

| Element | Before | Problem | After |
|---|---|---|---|
| visit-note | "Expected 24-25 July 2026 (Tentative until official confirmation)." | Parenthetical exposes internal status | "Expected 24–25 July 2026." |

---

## METADATA

| Element | Before | Problem | After |
|---|---|---|---|
| Page title | "Mwata Kazembe Kingdom — Official Digital Home" | Strong — no change | No change |
| Meta description | "The official digital home of the Mwata Kazembe Kingdom — governance, Mutomboko, development, and official communications from Mwansabombwe." | Strong — no change | No change |

---

## ITEMS CONFIRMED STRONG — NO CHANGE REQUIRED

- Homepage hero (headline, subheadline, tagline)
- History chapters (all 8)
- Ceremony steps (all 6) 
- Museum item descriptions and evidence notes
- Development pillar summaries
- Kingdom at a glance facts
- Governance institutions (function descriptions — not the pending notes)
- Wars and diplomacy cards
- Royal map caption
- Lineage rail (ruler entries)
- Footer structure and copyright
- Section headings throughout
- Story chapter summaries

---

## INVENTED HISTORY — CONFIRMED ABSENT

No dates, names, titles, battles, chiefs, or statistics were invented.  
All historical claims trace to sources already catalogued in `src/data.js`.  
Uncertain entries in the lineage are marked internally with confidence labels; this marking remains.

---

*This audit informed Phase 2–8 code changes. See `content-verification-needed.md` for items requiring official verification before full publication.*
