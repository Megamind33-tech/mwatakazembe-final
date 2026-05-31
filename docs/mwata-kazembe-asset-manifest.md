# Mwata Kazembe Asset Manifest
## Approved Assets — Audit and Usage Registry

**Last updated:** 2026-05-31
**Status:** All approved identity assets are present.

---

## 1. Identity Assets

### 1.1 Approved Coat of Arms

| Field | Value |
|---|---|
| **File path** | `assets/images/kazembe/identity/coat-of-arms.png` |
| **Purpose** | Primary kingdom identity mark |
| **Where used** | Header brand, mobile drawer header, footer brand, favicon source |
| **Required display size** | Header: 44×44px; Drawer: 36×36px; Footer: 44×44px |
| **Transparent background** | No — RGB, white background (original file) |
| **Favicon safe** | Yes — used as source for all favicon sizes |
| **Mobile overflow risk** | None — sized with `width/height` attribute + `object-fit: contain` |
| **Status** | ✅ Present |

### 1.2 Approved Flag

| Field | Value |
|---|---|
| **File path** | `assets/images/kazembe/identity/flag.png` |
| **Purpose** | Official kingdom flag — available for use in identity and governance sections |
| **Where used** | Not yet placed on any page — stored and ready |
| **Required display size** | Flexible — responsive with `max-width: 100%` |
| **Transparent background** | No — RGB |
| **Mobile overflow risk** | Low — use `max-width: 100%; height: auto` |
| **Status** | ✅ Present |

---

## 2. Favicon Files

All favicon files were generated from the approved coat of arms PNG using Python/Pillow.

| File | Size | Format | Status |
|---|---|---|---|
| `assets/favicon/favicon.ico` | 16/32/48px multi-size | ICO (PNG-in-ICO) | ✅ Present |
| `assets/favicon/favicon-16x16.png` | 16×16 | PNG | ✅ Present |
| `assets/favicon/favicon-32x32.png` | 32×32 | PNG | ✅ Present |
| `assets/favicon/apple-touch-icon.png` | 180×180 | PNG | ✅ Present |
| `assets/favicon/android-chrome-192x192.png` | 192×192 | PNG | ✅ Present |
| `assets/favicon/android-chrome-512x512.png` | 512×512 | PNG | ✅ Present |
| `assets/favicon/site.webmanifest` | — | JSON | ✅ Present |

**Web manifest settings:**
- `theme_color`: `#405f8f` (Royal blue)
- `background_color`: `#f4f0e6` (Ivory)
- `display`: `standalone`

---

## 3. Hero Images

| File | Purpose | Credit | Mobile overflow risk |
|---|---|---|---|
| `assets/images/kazembe/hero/home-portrait.jpg` | Homepage hero portrait | Office of the Mwata | Low — `object-fit: cover` in hero grid |
| `assets/images/kazembe/mwata/current-portrait.jpg` | Mwata office page portrait | Source needs confirmation | Low — contained in `.profile-layout` |
| `assets/images/mwata-kazembe-home-portrait.jpg` | Alternate portrait | Source needs confirmation | Low |
| `assets/images/mwata-kazembe-current-2017.png` | 2017 ceremony portrait (Wikimedia) | CC BY-SA 4.0, ChaloNiZambia | Low |

**Missing hero assets:** None critical. Portrait images are present.

---

## 4. Cultural / Ceremony Images

| File | Purpose | Source | Status |
|---|---|---|---|
| `assets/images/kazembe/mutomboko/ceremony-2017-02.png` | Ceremony 2017 | Wikimedia Commons | ✅ Present |
| `assets/images/kazembe/mutomboko/dance-2017-01.webp` | Mutomboko dance | Wikimedia Commons | ✅ Present |
| `assets/images/kazembe/mutomboko/mpembwe-shrine.jpg` | Mpembwe shrine | Wikimedia Commons | ✅ Present |
| `assets/images/kazembe/mutomboko/muselo-crowd.jpg` | Muselo procession crowd | Wikimedia Commons | ✅ Present |
| `assets/images/kazembe/mutomboko/muselo-mwata.jpg` | Mwata in Muselo | Wikimedia Commons | ✅ Present |
| `assets/images/kazembe/mutomboko/ngona-mwata-blessing.jpg` | Ng'ona river blessing | Wikimedia Commons | ✅ Present |
| `assets/images/kazembe/mutomboko/ngona-river-offerings.jpg` | Ng'ona river offerings | Wikimedia Commons | ✅ Present |

---

## 5. Historical / Archive Images

| File | Purpose | Source | Status |
|---|---|---|---|
| `assets/images/kazembe/archive/mwata-xvii-1961.jpg` | Mwata Kazembe XVII, 1961 | Dr John Edward Parry / Wikimedia | ✅ Present |
| `assets/images/kazembe-kingdom-map-2007.jpg` | Kingdom map | Rex Parry / Wikimedia CC BY 2.5 | ✅ Present |
| `assets/images/kazembe/places/kingdom-map-2007.jpg` | Kingdom map (alternate path) | Rex Parry / Wikimedia CC BY 2.5 | ✅ Present |

---

## 6. Reconstruction Plates (AI-generated, labeled as such)

These files are clearly labeled "reconstruction" throughout the codebase. They are NOT documentary photographs.

| File | Status |
|---|---|
| `assets/generated/atlas-parchment-map.png` | ✅ Present |
| `assets/generated/hero-living-archive.png` | ✅ Present |
| `assets/generated/reconstruction-amapango-ulupemba.png` | ✅ Present |
| `assets/generated/reconstruction-crowns.png` | ✅ Present |
| `assets/generated/reconstruction-muselo-litter.png` | ✅ Present |
| `assets/generated/reconstruction-umondo-drum.png` | ✅ Present |
| `assets/generated/reconstruction-weapons.png` | ✅ Present |

---

## 7. Archive Documents

| File | Purpose | Status |
|---|---|---|
| `assets/archive/the-lands-of-cazembe-1873.pdf` | Public-domain 1873 archival source | ✅ Present |
| `assets/ATTRIBUTION.md` | Image and source attribution | ✅ Present |

---

## 8. Missing Assets — Report

**No critical assets are missing.**

The following are noted as pending (not missing — they require future official approval):

- Official roster photographs for governance officers (leadership cards show placeholders — correct behavior)
- Official high-resolution ceremony photographs beyond what is available on Wikimedia (sourcing to be confirmed with Royal Council)
- Flag usage placement on site pages (flag is stored and ready but not yet positioned on any page)

---

## 9. Overflow Risk Summary

| Asset | Risk | Mitigation |
|---|---|---|
| Coat of arms (header) | None | `width: 44px; height: 44px; object-fit: contain; flex-shrink: 0` |
| Coat of arms (drawer) | None | `width: 36px; height: 36px; object-fit: contain` |
| Coat of arms (footer) | None | `width: 44px; height: 44px; object-fit: contain` |
| Hero portrait | Low | `object-fit: cover` in flex/grid, `max-width: 100%` global |
| Clan registry table | Fixed | `overflow-x: auto` on `.clan-registry-wrap` |
| All card grids | Fixed | `minmax(min(Xpx, 100%), 1fr)` pattern throughout |
| Flag (unused in templates) | TBD | Apply `max-width: 100%; height: auto` when placed |
