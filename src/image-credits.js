/**
 * Central registry for every credited image on the public site.
 * Vanilla ES module — paths relative to site root.
 */

export const imageCredits = [
  {
    id: "hero-home-portrait",
    fileName: "home-portrait.jpg",
    src: "assets/images/kazembe/hero/home-portrait.jpg",
    title: "Mwata Kazembe XIX",
    description: "Portrait of the reigning Mwata Kazembe, used on the royal hero and Office of the Mwata sections.",
    sourceName: "Office of the Mwata / project archive",
    sourceUrl: "",
    photographerOrCredit: "Photographer credit pending confirmation",
    dateAccessed: "2026-05-22",
    licenseOrUsageNote: "Permission required before public launch — confirm rights with the Office of the Mwata.",
    altText: "Mwata Kazembe XIX in royal regalia.",
    sectionUsedIn: "Royal Hero, The Mwata, People of the Kingdom",
    category: "mwata",
    creditLine: "Photo source: Office of the Mwata (credit pending confirmation)"
  },
  {
    id: "mutomboko-ceremony-2017-02",
    fileName: "ceremony-2017-02.png",
    src: "assets/images/kazembe/mutomboko/ceremony-2017-02.png",
    title: "Mwata Kazembe at Umutomboko, 2017",
    description: "Mwata Kazembe during the royal dance at the Umutomboko ceremony in Mwansabombwe.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mwata_Kazembe_at_Mtomboko_2017_02.webp",
    photographerOrCredit: "ChaloNiZambia",
    dateAccessed: "2026-05-22",
    licenseOrUsageNote: "CC BY-SA 4.0",
    altText: "Mwata Kazembe performing the royal dance at Umutomboko surrounded by attendants.",
    sectionUsedIn: "Mutomboko Ceremony, Gallery, People of the Kingdom",
    category: "ceremony",
    creditLine: "Photo: ChaloNiZambia / Wikimedia Commons"
  },
  {
    id: "mutomboko-dance-2017-01",
    fileName: "dance-2017-01.webp",
    src: "assets/images/kazembe/mutomboko/dance-2017-01.webp",
    title: "Royal dance at Umutomboko, 2017",
    description: "Mwata Kazembe performing the victory dance in the main arena at Mwansabombwe.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mwata_Kazembe_at_Mtomboko_2017_01.webp",
    photographerOrCredit: "ChaloNiZambia",
    dateAccessed: "2026-05-22",
    licenseOrUsageNote: "CC BY-SA 4.0",
    altText: "Mwata Kazembe in ceremonial regalia during the Umutomboko royal dance.",
    sectionUsedIn: "Mutomboko Ceremony, People of the Kingdom, Gallery",
    category: "ceremony",
    creditLine: "Photo: ChaloNiZambia / Wikimedia Commons"
  },
  {
    id: "archive-mwata-xvii-1961",
    fileName: "mwata-xvii-1961.jpg",
    src: "assets/images/kazembe/archive/mwata-xvii-1961.jpg",
    title: "Mwata Kazembe XVII on tour, 1961",
    description: "Mwata Kazembe XVII Paul Kanyembo Lutaba carried in an open palanquin shortly after installation, on a tour of the kingdom.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mwata_Kazembe_XVII_Zambia_1961.jpg",
    photographerOrCredit: "Dr John Edward Parry",
    dateAccessed: "2026-05-22",
    licenseOrUsageNote: "CC BY-SA 3.0 / CC BY 2.5 / GFDL",
    altText: "Mwata Kazembe XVII seated in a royal palanquin during a 1961 procession.",
    sectionUsedIn: "Mwata Lineage, Gallery, Archive",
    category: "archive",
    creditLine: "Photo: Dr John Edward Parry / Wikimedia Commons"
  },
  {
    id: "places-kingdom-map-2007",
    fileName: "kingdom-map-2007.jpg",
    src: "assets/images/kazembe/places/kingdom-map-2007.jpg",
    title: "Kazembe Kingdom map",
    description: "Historical map of Kazembe-Lunda routes and regional context in the Luapula Valley.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kazembe_Kingdom_433x455.JPG",
    photographerOrCredit: "Rex Parry",
    dateAccessed: "2026-05-22",
    licenseOrUsageNote: "CC BY 2.5",
    altText: "Map showing Kazembe Kingdom territory, migration routes, and Luapula regional context.",
    sectionUsedIn: "Kingdom at a Glance, The Kingdom, Gallery",
    category: "places",
    creditLine: "Map: Rex Parry / Wikimedia Commons"
  },
  {
    id: "mwata-current-portrait",
    fileName: "current-portrait.jpg",
    src: "assets/images/kazembe/mwata/current-portrait.jpg",
    title: "Office of the Mwata Kazembe",
    description: "Official portrait reference for Mwata Kazembe XIX in governance and leadership contexts.",
    sourceName: "Office of the Mwata / project archive",
    sourceUrl: "",
    photographerOrCredit: "Photographer credit pending confirmation",
    dateAccessed: "2026-05-22",
    licenseOrUsageNote: "Permission required before public launch.",
    altText: "Mwata Kazembe XIX, reigning traditional authority at Mwansabombwe.",
    sectionUsedIn: "The Living Kingdom, Governance",
    category: "mwata",
    creditLine: "Photo source: Office of the Mwata (credit pending confirmation)"
  }
];

const byId = new Map(imageCredits.map((item) => [item.id, item]));
const bySrc = new Map(imageCredits.map((item) => [item.src, item]));

export function getCreditById(id) {
  return byId.get(id) ?? null;
}

export function getCreditBySrc(src) {
  return bySrc.get(src) ?? null;
}

export function creditCaption(id, { compact = false } = {}) {
  const item = getCreditById(id);
  if (!item) return "";
  if (compact) {
    return `<span class="image-credit">${item.creditLine}</span>`;
  }
  const sourceLink = item.sourceUrl
    ? `<a href="${item.sourceUrl}" target="_blank" rel="noreferrer">Source: ${item.sourceName}</a>`
    : `<span>Source: ${item.sourceName}</span>`;
  return `
    <figcaption class="figure-credit">
      <span class="image-credit">${item.creditLine}</span>
      ${sourceLink}
    </figcaption>
  `;
}

export function creditedFigure(id, { className = "" } = {}) {
  const item = getCreditById(id);
  if (!item) return "";
  return `
    <figure class="credited-figure ${className}">
      <div class="figure-media">
        <img src="${item.src}" alt="${item.altText}" loading="lazy" data-credit-id="${item.id}">
      </div>
      ${creditCaption(id)}
    </figure>
  `;
}

export function galleryItems() {
  return imageCredits.filter((item) => item.src);
}

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "mwata", label: "Mwata Kazembe" },
  { id: "ceremony", label: "Ceremony" },
  { id: "people", label: "People" },
  { id: "leadership", label: "Leadership" },
  { id: "places", label: "Places" },
  { id: "archive", label: "Archive" }
];
