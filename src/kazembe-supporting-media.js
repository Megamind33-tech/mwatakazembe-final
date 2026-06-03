/**
 * Lightweight supporting-media layer.
 *
 * This is NOT an archive system. It holds a small, restrained set of public
 * media references that strengthen existing institutional sections (chiefly the
 * Mutomboko ceremony section). Nothing here is invented.
 *
 * verificationStatus: "official" | "sourced" | "needs-confirmation"
 *                   | "needs-rights-review" | "replace-before-launch"
 *
 * Rules honoured:
 *  - Videos are embedded only where public embedding is allowed; never
 *    downloaded or re-uploaded. Each carries a "watch on source platform" link.
 *  - No fabricated channel names, titles, dates, or video IDs.
 *  - Items with unclear rights are listed in
 *    docs/image-candidates-needing-approval.md, not placed live.
 */

export const kazembeSupportingMedia = [
  {
    id: "mutomboko-public-video-01",
    type: "video",
    platform: "youtube",
    title: "Umutomboko Ceremony — public video record",
    year: null,
    section: "mutomboko",
    sourceName: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=nvYT2Y-D1yU",
    embedUrl: "https://www.youtube.com/embed/nvYT2Y-D1yU",
    credit: "Source channel to be confirmed",
    usageNote:
      "Public embed only; do not download or re-upload. Confirm channel attribution and suitability with the Royal Protocol Office before launch.",
    caption: "Public video record of the Umutomboko ceremony at Mwansabombwe.",
    alt: "Video player for a public record of the Umutomboko ceremony",
    verificationStatus: "needs-confirmation"
  },
  {
    id: "mutomboko-ref-zta",
    type: "reference",
    title: "Umutomboko Ceremony — official overview",
    year: null,
    section: "mutomboko",
    sourceName: "Zambia Tourism Agency",
    sourceUrl: "https://www.zambia.travel/umutomboko.html",
    credit: "Zambia Tourism Agency",
    usageNote: "External reference link only.",
    caption: "Official tourism summary of timing, location, and meaning of the ceremony.",
    verificationStatus: "sourced"
  },
  {
    id: "mutomboko-ref-lusakatimes-2017",
    type: "reference",
    title: "Umutomboko 2017 — picture report",
    year: 2017,
    section: "mutomboko",
    sourceName: "Lusaka Times / ZANIS",
    sourceUrl: "https://www.lusakatimes.com/2017/07/31/last-week-pictures-5/",
    credit: "Charles Banda / ZANIS",
    usageNote: "External reference link only; image reuse requires publisher permission.",
    caption: "Press photographs from the 2017 ceremony at Mwansabombwe.",
    verificationStatus: "sourced"
  },
  {
    id: "mutomboko-ref-mot-2025",
    type: "reference",
    title: "2025 Umutomboko notice",
    year: 2025,
    section: "mutomboko",
    sourceName: "Ministry of Tourism, Zambia",
    sourceUrl: "https://www.mot.gov.zm/?p=4471",
    credit: "Ministry of Tourism, Zambia",
    usageNote: "External reference link only.",
    caption: "Government notice recording the 2025 ceremony dates.",
    verificationStatus: "sourced"
  }
];

export function supportingVideos(section = null) {
  return kazembeSupportingMedia.filter(
    (m) => m.type === "video" && (!section || m.section === section)
  );
}

export function supportingReferences(section = null) {
  return kazembeSupportingMedia.filter(
    (m) => m.type === "reference" && (!section || m.section === section)
  );
}
