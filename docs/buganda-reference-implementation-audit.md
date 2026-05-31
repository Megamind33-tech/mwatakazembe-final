# Buganda Reference Implementation Audit
## Mwata Kazembe Kingdom — Behavioral Reference from buganda.or.ug

**Purpose:** This document records behavioral patterns from buganda.or.ug that inform improvements to the Mwata Kazembe site. No Buganda assets, text, imagery, audio, code, or cultural symbols are copied. This is a behavioral and structural reference only.

---

## Pattern 1 — Sticky Official Mobile Header

**Where it appears on Buganda:**
The primary header remains anchored to the top of the viewport while the user scrolls. The logo, site title, and hamburger menu button all remain accessible at all times without reaching the top.

**Behavior it creates:**
The site feels like a living institution — always reachable, always present. Users can navigate without scrolling back to the top.

**Why it matters for a kingdom website:**
A royal website has dozens of sections. Users browsing ceremony details, governance, or the lineage must be able to navigate without losing orientation. A floating header signals stability and authority.

**Mwata Kazembe implementation:**
`position: sticky; top: 0; z-index: 300;` on `.site-header`. Dynamic `--drawer-top` CSS variable set via JS (`getBoundingClientRect`) when the menu opens, so the mobile drawer always positions itself below the actual header bottom — accounting for whether the utility bar has scrolled away.

**Assets used:**
Approved coat of arms (`assets/images/kazembe/identity/coat-of-arms.png`) in the header brand. No Buganda logo, colors, or icons.

**Files changed:** `src/styles.css`, `src/app.js`

**Must not copy:** Buganda logo, Buganda colors, Buganda font, Buganda navigation labels.

**Acceptance condition:** At 390px, header remains visible while scrolling. Brand coat of arms is not clipped. Menu button is inside the screen at all breakpoints.

---

## Pattern 2 — Full-Width Mobile Menu Dropdown

**Where it appears on Buganda:**
When the mobile hamburger is tapped, the navigation opens as a full-width panel directly below the sticky header — not a side drawer. The panel fills the available width and the header remains visible.

**Behavior it creates:**
The menu feels attached to the header. Navigation links are wide and easy to tap. The header logo and close button are both visible without scrolling.

**Why it matters for a kingdom website:**
A narrow side-panel feels like a generic app. A full-width dropdown below the header feels more official — like the navigation belongs to the institution.

**Mwata Kazembe implementation:**
`.mobile-drawer` positioned `fixed; top: var(--drawer-top)` (dynamic). `.mobile-drawer-panel` uses `width: 100%`, not `100vw`. Overlay covers the area below the header. Drawer panel slides down (`translateY(-8px → 0)`) with fade. Panel includes a branded header row with coat of arms, title, and close button.

**Assets used:** Approved coat of arms in drawer header. Kingdom name text. Red accent border.

**Files changed:** `src/styles.css`, `src/app.js`, `index.html`

**Must not copy:** Buganda's menu structure, link text, sub-menu items, colors.

**Acceptance condition:** Menu opens cleanly below the sticky header at 320–430px. Close button is inside viewport. No horizontal overflow. Body scroll locked on X axis while menu is open.

---

## Pattern 3 — Controlled Section Reveal Animations

**Where it appears on Buganda:**
Content sections, headings, and card grids animate into view as the user scrolls — a fade-up motion rather than a pop or bounce. The animation is restrained and official-feeling.

**Behavior it creates:**
The site feels alive and premium without being distracting. Content draws attention as it enters the viewport.

**Why it matters for a kingdom website:**
A scroll-reveal system that is restrained (not bouncy, not over-animated) communicates gravitas. It also aids attention — new content announces itself as the user reaches it.

**Mwata Kazembe implementation:**
IntersectionObserver watches `.section-head`, card grids, and key content blocks. When they enter the viewport, `is-visible` class is added. CSS transition: `opacity 0.65s var(--ease), transform 0.65s var(--ease)` from `translateY(20px)`. Hero content uses GSAP for a slightly richer staggered reveal. Reduced-motion users see static content with no transitions.

**Assets used:** None — pure CSS/JS behavior.

**Files changed:** `src/interactions.js`, `src/styles.css`

**Must not copy:** Buganda's specific animation values, JS code, or GSAP plugin usage.

**Acceptance condition:** Sections below the fold reveal on scroll without layout shift. Hero content reveals on page load. No animation occurs for `prefers-reduced-motion: reduce`.

---

## Pattern 4 — Back-to-Top Button

**Where it appears on Buganda:**
After scrolling past a threshold, a small button appears in the corner of the screen allowing the user to return to the top of the page. It fades in and out.

**Behavior it creates:**
Long-scrolling institutional pages (history, governance, lineage) become navigable. The user is never stranded at the bottom.

**Why it matters for a kingdom website:**
The Mwata Kazembe site has sections that scroll dozens of screens. A back-to-top button reduces friction without cluttering the layout.

**Mwata Kazembe implementation:**
Fixed button (`position: fixed; bottom: 1.75rem; right: 1.25rem`) using royal blue background. Appears with fade/slide-up after 400px scroll. Uses upward arrow (↑). Hover: ceremonial red. Screen reader accessible with `aria-label="Back to top"`.

**Assets used:** None. Color from existing design system (`--royal-blue`, `--ceremonial-red`).

**Files changed:** `src/app.js`, `src/styles.css`

**Must not copy:** Buganda's button design, icon, or positioning.

**Acceptance condition:** Button appears after scrolling past 400px. Clicking returns to top. Button does not cause horizontal overflow on mobile. Button is not visible at top of page.

---

## Pattern 5 — Footer Official Identity

**Where it appears on Buganda:**
The footer includes the official kingdom logo and a brief description alongside navigation links. The footer feels like part of the kingdom identity, not a generic site template.

**Behavior it creates:**
The brand is reinforced at the end of the page. Users who scroll through the entire site are reminded of the official kingdom identity as they reach the footer.

**Why it matters for a kingdom website:**
The footer is often the last thing a user sees. An institutional site should end with authority, not just a copyright line.

**Mwata Kazembe implementation:**
Footer brand section updated to include the approved coat of arms image alongside the kingdom name and location. No invented marks. Coat of arms is `object-fit: contain`, no border, transparent background preserved.

**Assets used:** Approved coat of arms (`assets/images/kazembe/identity/coat-of-arms.png`).

**Files changed:** `src/app.js`, `src/styles.css`

**Must not copy:** Buganda's footer layout, colors, link structure, or social icons.

**Acceptance condition:** Coat of arms appears in footer at all screen widths without clipping. Footer does not cause horizontal overflow.

---

## Pattern 6 — Card Hover Lift (Desktop Only)

**Where it appears on Buganda:**
Cards and content panels subtly lift (translate upward) on hover with a smooth transition. The effect is restrained — 2–4px, not a dramatic jump.

**Behavior it creates:**
Cards feel interactive and premium. The hover state signals that the element is tappable/clickable.

**Why it matters for a kingdom website:**
A static card grid feels like a printed document. Subtle hover states bring the site to life on desktop without making it feel like a consumer app.

**Mwata Kazembe implementation:**
`@media (hover: hover)` guard ensures the effect only applies on pointer devices (not touch screens). Applied to: `.authority-card`, `.comm-card`, `.news-card`, `.pillar-card`. Transition: `transform 0.22s var(--ease), box-shadow 0.22s var(--ease)`. Lift: `translateY(-3px)`. Museum and product cards already had this effect.

**Assets used:** None.

**Files changed:** `src/styles.css`

**Must not copy:** Buganda's specific hover animation values.

**Acceptance condition:** On desktop, cards lift subtly on hover. On mobile/touch, no hover state applies. No layout shift.

---

## Pattern 7 — Escape Key Menu Close

**Where it appears on Buganda:**
The mobile menu can be closed by pressing the Escape key in addition to the close button and overlay tap.

**Behavior it creates:**
The mobile menu behaves like a properly implemented accessible dialog. Keyboard users can close it naturally.

**Why it matters for a kingdom website:**
An official site should be fully accessible. Escape-to-close is a standard keyboard interaction pattern for modal dialogs.

**Mwata Kazembe implementation:**
`document.addEventListener("keydown")` in `bindNavigation()` checks for `e.key === "Escape"` and calls `closeMobileDrawer()` if the drawer is open.

**Assets used:** None.

**Files changed:** `src/app.js`

**Must not copy:** None — this is standard web behavior.

**Acceptance condition:** Pressing Escape closes the mobile menu. Desktop navigation is unaffected.

---

## What Was NOT Copied

The following Buganda elements were studied as behavioral references ONLY and were NOT copied in any form:

- Buganda coat of arms, logo, or kingdom symbols
- Buganda flag, colors, or pattern language
- Buganda menu items, section titles, or copy
- Buganda photography, illustrations, or cultural artwork
- Buganda JavaScript code, CSS files, or HTML markup
- Buganda fonts (if custom)
- Buganda audio or video content
- Any specific Buganda cultural, historical, or religious content
