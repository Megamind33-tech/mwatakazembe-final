export const sources = [
  {
    id: "zta",
    type: "official",
    label: "Zambia Tourism Agency",
    title: "Umutomboko Ceremony",
    url: "https://www.zambia.travel/umutomboko.html",
    note: "Official tourism summary: location, annual timing, two-day structure, Kola migration memory, and the meaning of Umutomboko as a dance of victory."
  },
  {
    id: "unza",
    type: "academic",
    label: "UNZA dissertation",
    title: "Cultural Tourism in Zambia: A Case Study of Umutomboko Traditional Ceremony, 1961-2017",
    url: "https://dspace.unza.zm/bitstreams/9ecd9cbe-8b9c-46f5-8b75-3f4b5fce9bb8/download",
    note: "Caroline Mwiinga's 2023 MA dissertation documents the transformation of Umutomboko, ritual processions, social effects, and ceremony logistics."
  },
  {
    id: "smithsonian",
    type: "archive",
    label: "Smithsonian Libraries",
    title: "The Lands of Cazembe",
    url: "https://library.si.edu/digital-library/book/landsofcazembel00roya",
    note: "CC0 public-domain 1873 Royal Geographical Society volume gathering Portuguese expedition material connected to the historical Cazembe source title."
  },
  {
    id: "commons",
    type: "media",
    label: "Wikimedia Commons",
    title: "Kazembe media category",
    url: "https://commons.wikimedia.org/wiki/Category:Kazembe",
    note: "Reusable media category containing the Kazembe map, Mtomboko 2017 ceremony photographs, and a 1961 Mwata Kazembe XVII photograph."
  },
  {
    id: "commons-current",
    type: "media",
    label: "Commons portrait",
    title: "Mwata Kazembe at Mtomboko 2017 02",
    url: "https://commons.wikimedia.org/wiki/File:Mwata_Kazembe_at_Mtomboko_2017_02.webp",
    note: "CC BY-SA 4.0 image by ChaloNiZambia, dated 29 July 2017, showing Mwata Kazembe at the Mtomboko Ceremony."
  },
  {
    id: "kazembe-lineage",
    type: "reference",
    label: "Kazembe lineage table",
    title: "Kazembe / Mwata Kazembe lineage",
    url: "https://www.chalochatu.org/Mwata_Kazembe",
    note: "Lineage reference used for the contemporary entry listing Mwata Kazembe XIX as Paul Mpemba Kanyembo Kapale Mpalume from 1998 onward."
  },
  {
    id: "gordon",
    type: "academic",
    label: "Journal of African History",
    title: "History on the Luapula Retold",
    url: "https://www.cambridge.org/core/journals/journal-of-african-history/article/history-on-the-luapula-retold-landscape-memory-and-identity-in-the-kazembe-kingdom/19989870F232E77A3CB7057EAA8BDABF",
    note: "David Gordon's study of landscape, memory, identity, and historical retelling in the Kazembe Kingdom."
  },
  {
    id: "britannica",
    type: "reference",
    label: "Britannica",
    title: "Kazembe",
    url: "https://www.britannica.com/place/Kazembe",
    note: "Reference overview of Kazembe as a highly organized Lunda kingdom and its tribute/trade networks."
  },
  {
    id: "mot2025",
    type: "official",
    label: "Ministry of Tourism",
    title: "2025 Umutomboko notice",
    url: "https://www.mot.gov.zm/?p=4471",
    note: "Government notice used for the archived 2025 ceremony date; site labels it separately from the annual timing pattern."
  },
  {
    id: "reconstruction",
    type: "reconstruction",
    label: "GPT Images",
    title: "Generated reconstruction plates",
    url: "",
    note: "Visual reconstructions produced for missing or hard-to-license artifacts. These are not documentary photographs."
  }
];

export const sourceTypes = [
  { id: "all", label: "All" },
  { id: "official", label: "Official" },
  { id: "academic", label: "Academic" },
  { id: "archive", label: "Archive" },
  { id: "media", label: "Media" },
  { id: "reference", label: "Reference" },
  { id: "reconstruction", label: "Recon." }
];

export const atlasModes = [
  {
    id: "migration",
    label: "c. 1740 migration",
    period: "Foundation",
    confidence: "oral tradition + secondary synthesis",
    title: "From Kola to the Luapula",
    summary: "The founding story follows Ng'anga Bilonda's Lunda movement from Mwata Yamvo's wider Lunda world toward the Luapula Valley, with the crossing at Matanda becoming a durable memory point.",
    claim: "The migration story is treated here as oral-history-centered memory, not a GPS route.",
    sources: ["zta", "gordon", "britannica"],
    activeRoutes: ["migration"],
    markers: ["kola", "matanda", "mwansabombwe"]
  },
  {
    id: "peak",
    label: "c. 1800 peak",
    period: "Expansion",
    confidence: "secondary synthesis",
    title: "Tribute, Citizenship, and Territory",
    summary: "Kazembe authority consolidated across a well-watered region of river, lake, fisheries, forest, and trade. The site emphasizes governance and tribute rather than a fixed modern border.",
    claim: "Kazembe II and later rulers expanded political control and folded conquered communities into a tribute network.",
    sources: ["britannica", "commons"],
    activeRoutes: ["domain"],
    markers: ["mweru", "luapula", "mwansabombwe", "mofwe"]
  },
  {
    id: "trade",
    label: "trade routes",
    period: "18th-19th c.",
    confidence: "archive + expedition accounts",
    title: "Copper, Ivory, Caravans",
    summary: "Portuguese, Arab, and Swahili networks intersected the Kazembe court. The map connects western, eastern, and lake routes without pretending one single corridor carried every journey.",
    claim: "Expedition accounts recorded Kazembe's court as a major interior node for trade and diplomacy.",
    sources: ["smithsonian", "unza", "britannica"],
    activeRoutes: ["portuguese", "swahili"],
    markers: ["tete", "ujiji", "zanzibar", "mwansabombwe"]
  },
  {
    id: "colonial",
    label: "colonial disruption",
    period: "1890s-1920",
    confidence: "colonial archive + museum trail",
    title: "Removal, Rebuilding, and Memory",
    summary: "The late nineteenth and early twentieth centuries brought military pressure, capital rebuilding, mission presence, and museum displacement. The Bulawayo thread is shown as a collection trail, not a cultural endpoint.",
    claim: "Removed works and colonial-era collections require careful provenance language and further custodial review.",
    sources: ["gordon", "smithsonian", "commons"],
    activeRoutes: ["bulawayo"],
    markers: ["bulawayo", "mwansabombwe"]
  }
];

export const mapMarkers = [
  { id: "kola", label: "Kola / Lunda world", x: 18, y: 32, kind: "origin" },
  { id: "matanda", label: "Matanda crossing", x: 45, y: 52, kind: "crossing" },
  { id: "mwansabombwe", label: "Mwansabombwe", x: 61, y: 61, kind: "capital" },
  { id: "luapula", label: "Luapula River", x: 54, y: 48, kind: "water" },
  { id: "mweru", label: "Lake Mweru", x: 47, y: 25, kind: "water" },
  { id: "mofwe", label: "Mofwe Lagoon", x: 58, y: 47, kind: "water" },
  { id: "tete", label: "Portuguese coast routes", x: 22, y: 72, kind: "trade" },
  { id: "ujiji", label: "Ujiji / Tanganyika", x: 77, y: 42, kind: "trade" },
  { id: "zanzibar", label: "Zanzibar networks", x: 88, y: 22, kind: "trade" },
  { id: "bulawayo", label: "Bulawayo collection trail", x: 39, y: 88, kind: "archive" }
];

export const routes = [
  {
    id: "migration",
    title: "The Lunda Migration",
    period: "c. 1740",
    type: "oral tradition",
    path: "M120 190 C210 240 286 310 356 315 S470 346 548 368",
    color: "#b87333",
    nodes: ["kola", "matanda", "mwansabombwe"],
    summary: "The story of movement from Kola into the Luapula Valley holds together dynasty, landscape, and legitimacy. The Matanda crossing anchors the route as memory more than cartographic certainty.",
    evidence: "Visible as oral tradition and landscape memory, supported by tourism summaries and historical analysis.",
    sources: ["zta", "gordon"]
  },
  {
    id: "domain",
    title: "Luapula-Mweru Domain",
    period: "18th-19th c.",
    type: "political landscape",
    path: "M440 145 C395 225 428 315 515 375 C583 423 626 393 650 330",
    color: "#1a237e",
    nodes: ["mweru", "luapula", "mwansabombwe", "mofwe"],
    summary: "Kazembe power depended on water, fisheries, fertile corridors, tribute, and movement. This layer frames the kingdom as a lived landscape rather than a single border line.",
    evidence: "Secondary references describe the kingdom's organization and resource-rich position.",
    sources: ["britannica", "commons"]
  },
  {
    id: "portuguese",
    title: "Portuguese Expeditions",
    period: "1798-1832",
    type: "archive route",
    path: "M548 368 C460 470 355 503 230 520 C165 528 120 560 86 595",
    color: "#8b0000",
    nodes: ["mwansabombwe", "tete"],
    summary: "Expeditions and pombeiro journeys brought Portuguese records into the archive. They are useful, but the interface marks them as outsider accounts.",
    evidence: "The public-domain Cazembe volume is used as an archival source object.",
    sources: ["smithsonian"]
  },
  {
    id: "swahili",
    title: "Arab and Swahili Networks",
    period: "19th c.",
    type: "trade route",
    path: "M548 368 C642 332 688 285 733 238 C774 194 805 155 850 118",
    color: "#4a7c82",
    nodes: ["mwansabombwe", "ujiji", "zanzibar"],
    summary: "Eastern networks moved through lake corridors and caravan towns. The layer helps connect court history to broader Indian Ocean trade worlds without over-drawing certainty.",
    evidence: "Supported by expedition and historical references to traders active at or near the Kazembe court.",
    sources: ["smithsonian", "unza"]
  },
  {
    id: "bulawayo",
    title: "Colonial Collection Trail",
    period: "1890s-1920",
    type: "museum displacement",
    path: "M548 368 C518 477 430 556 352 620 C292 670 252 710 226 760",
    color: "#4a0404",
    nodes: ["mwansabombwe", "bulawayo"],
    summary: "This route is a provenance warning line: removed artworks and museum collections should be treated as a research and repatriation question, not as a neutral archive fact.",
    evidence: "Shown as a disputed/collection history layer pending fuller inventory confirmation.",
    sources: ["gordon", "commons"]
  }
];

export const artifacts = [
  {
    id: "akatasa-cibangula",
    name: "Akatasa and Cibangula Crowns",
    className: "Royal head regalia",
    image: "assets/generated/reconstruction-crowns.png",
    status: "reconstruction",
    tags: ["reconstruction", "regalia", "Umutomboko"],
    meaning: "The crowns signal royal authority during public ceremony and visually connect the Mwata Kazembe court to wider Luba-Lunda regalia worlds.",
    performance: "Displayed in the site as a combined reconstruction because available public images are limited and context-specific.",
    provenance: "Luba-Lunda stylistic heritage, worn in contemporary ceremonial settings under custodial protocols.",
    visualEvidence: "Public ceremony photographs confirm the importance of crown, bead, red, and blue regalia language, but this exact plate is generated.",
    reconstruction: "Generated as an exhibit plate from textual descriptions; not a photograph or cataloged museum object.",
    sources: ["commons", "reconstruction"]
  },
  {
    id: "mpoko-imbafi",
    name: "Mpoko Sword and Imbafi Axe",
    className: "Ceremonial weapons",
    image: "assets/generated/reconstruction-weapons.png",
    status: "reconstruction",
    tags: ["reconstruction", "dance", "authority"],
    meaning: "The sword and axe embody victory, protection, and the Mwata's public statement of authority during the dance of conquest.",
    performance: "The Umutomboko dance includes directional gestures and vertical claims of authority; the site separates choreography from mythic overstatement.",
    provenance: "Court regalia associated with Umutomboko performance.",
    visualEvidence: "Described in ceremony accounts and contemporary visual records; exact object details need custodial verification.",
    reconstruction: "Generated as a museum-style object plate to avoid fabricating documentary evidence.",
    sources: ["unza", "reconstruction"]
  },
  {
    id: "umondo",
    name: "Umondo Talking Drum",
    className: "Ritual sound object",
    image: "assets/generated/reconstruction-umondo-drum.png",
    status: "reconstruction",
    tags: ["reconstruction", "sound", "ritual"],
    meaning: "The umondo marks communication, rhythm, and ancestral attention in ceremony narratives.",
    performance: "Ceremony documentation describes the Mwata beating the drum before climactic movement into the public arena.",
    provenance: "Lunda court practice maintained by royal drummers and attendants.",
    visualEvidence: "The UNZA dissertation lists a figure of Mwata Kazembe XIX playing the umoondo/talking drum.",
    reconstruction: "Generated plate based on general material descriptions: wood, skin, lacing, woven display surface.",
    sources: ["unza", "reconstruction"]
  },
  {
    id: "muselo",
    name: "Muselo Royal Litter",
    className: "Processional vehicle",
    image: "assets/generated/reconstruction-muselo-litter.png",
    status: "reconstruction",
    tags: ["reconstruction", "procession", "Umutomboko"],
    meaning: "The muselo transforms the Mwata's movement into public theatre: authority is carried, witnessed, and rhythmically advanced.",
    performance: "The royal litter appears in descriptions of the procession from palace space toward the main arena.",
    provenance: "Ceremonial tradition associated with bearers and public procession.",
    visualEvidence: "The UNZA dissertation lists figures of the royal carriage and procession sequence.",
    reconstruction: "Generated empty-litter plate to avoid implying access to a restricted original object.",
    sources: ["unza", "reconstruction"]
  },
  {
    id: "amapango-ulupemba",
    name: "Amapango and Ulupemba",
    className: "Body and ritual materials",
    image: "assets/generated/reconstruction-amapango-ulupemba.png",
    status: "reconstruction",
    tags: ["reconstruction", "body", "ritual"],
    meaning: "Armbands, powder, and tactile materials make ceremony visible on the body and in ritual action.",
    performance: "The site treats these as a cluster of ceremonial materials rather than a single fixed museum object.",
    provenance: "Royal performance context requiring further custodial review for exact materials and preparation.",
    visualEvidence: "Textual accounts mention armbands and ceremonial body materials, while exact public catalog images are not available.",
    reconstruction: "Generated as a careful material study; animal materials are represented without violence.",
    sources: ["unza", "reconstruction"]
  },
  {
    id: "cazembe-volume",
    name: "The Lands of Cazembe",
    className: "Archival source object",
    image: "",
    status: "public domain",
    tags: ["archive", "expedition", "CC0"],
    meaning: "A public-domain 1873 book that gathers expedition accounts and anchors the site’s colonial-source layer.",
    performance: "Not ceremonial; it appears in the Archive Desk as an object to be read critically.",
    provenance: "Royal Geographical Society / J. Murray, 1873; Smithsonian Libraries digital copy.",
    visualEvidence: "Local PDF stored in assets/archive/the-lands-of-cazembe-1873.pdf.",
    reconstruction: "No reconstruction; this is a downloaded CC0 archival source.",
    sources: ["smithsonian"]
  }
];

export const ceremonySteps = [
  {
    id: "mpembwe",
    day: "Day 1",
    label: "Mpembwe",
    title: "Ancestral Ground",
    location: "Mpembwe ya Keleka",
    objectIds: ["umondo"],
    summary: "A return to a remembered refuge and ancestral point, treated by the site as sacred landscape rather than spectacle.",
    evidence: "UNZA records ritual processions prior to the public celebration and names Mpembwe in the ceremony sequence.",
    sources: ["unza"]
  },
  {
    id: "mutentamo",
    day: "Day 1",
    label: "Mutentamo",
    title: "Installation and Tribute",
    location: "Palace grounds / miyombo trees",
    objectIds: ["amapango-ulupemba"],
    summary: "Installation and recognition of hereditary authority, with court hierarchy made public through naming, blessing, and seating.",
    evidence: "Described in ceremony documentation as part of the pre-arena ritual order.",
    sources: ["unza"]
  },
  {
    id: "ngona",
    day: "Day 2",
    label: "Ng'ona",
    title: "River Offering",
    location: "Ng'ona River",
    objectIds: ["umondo", "amapango-ulupemba"],
    summary: "Food, drink, and ritual action connect water, memory, and the spirits of Chinyanta and Kasombola before public return.",
    evidence: "UNZA figure list and descriptions identify river offering scenes and ancestral feeding at Ng'ona.",
    sources: ["unza"]
  },
  {
    id: "ichota",
    day: "Day 2",
    label: "Ichota",
    title: "Palace Threshold",
    location: "Ichota palace",
    objectIds: ["akatasa-cibangula", "umondo"],
    summary: "The Mwata's emergence from palace space marks a threshold between restricted royal preparation and mass public witness.",
    evidence: "Ceremony accounts describe palace-to-arena transition, royal regalia, and drumming.",
    sources: ["unza", "commons"]
  },
  {
    id: "muselo-procession",
    day: "Day 2",
    label: "Muselo",
    title: "Carried Authority",
    location: "Palace route",
    objectIds: ["muselo", "akatasa-cibangula"],
    summary: "The procession converts route into theatre. The crowd sees authority move through space before the dance.",
    evidence: "UNZA figure list includes the royal carriage and procession imagery.",
    sources: ["unza"]
  },
  {
    id: "arena-dance",
    day: "Day 2",
    label: "Umutomboko",
    title: "Dance of Victory",
    location: "Main arena, Mwansabombwe",
    objectIds: ["mpoko-imbafi", "akatasa-cibangula"],
    summary: "The public dance centers victory, conquest memory, and continuity. The site avoids flattening it into performance-only tourism.",
    evidence: "Zambia Tourism defines Umutomboko as a dance of victory and places it in the last weekend of July.",
    sources: ["zta", "unza"]
  }
];

export const kings = [
  { id: 1, name: "Ng'anga Bilonda", reign: "c. 1740-1745", title: "Mwata Kazembe I", era: "foundation", confidence: "oral tradition", note: "Founder associated with the Lunda migration and Luapula crossing memory.", sources: ["zta", "gordon"] },
  { id: 2, name: "Kanyembo Mpemba", reign: "c. 1745-1760", title: "Mwata Kazembe II", era: "expansion", confidence: "secondary synthesis", note: "Expanded territory, tribute, and citizenship networks.", sources: ["britannica"] },
  { id: 3, name: "Ilunga Lukwesa", reign: "c. 1760-1805", title: "Mwata Kazembe III", era: "trade", confidence: "secondary synthesis", note: "Associated with peak-era diplomacy, Portuguese contact, and the Nachituti memory.", sources: ["smithsonian", "britannica"] },
  { id: 4, name: "Kibangu Keleka", reign: "1805-1850", title: "Mwata Kazembe IV", era: "trade", confidence: "archive-supported", note: "Encouraged contact with Portuguese traders and the copper/ivory trade world.", sources: ["smithsonian"] },
  { id: 5, name: "Name under review", reign: "c. 1850-1854", title: "Mwata Kazembe V", era: "trade", confidence: "uncertain", note: "The interface keeps this entry open because accessible public sources are inconsistent.", sources: ["gordon"] },
  { id: 6, name: "Chinyanta Munona", reign: "1854-1862", title: "Mwata Kazembe VI", era: "trade", confidence: "needs verification", note: "Reign placed in a period of increasing external contact and regional pressure.", sources: ["gordon"] },
  { id: 7, name: "Mwonga Nsemba", reign: "1862-1870", title: "Mwata Kazembe VII", era: "trade", confidence: "archive-supported", note: "Associated with David Livingstone's 1867-1868 visit to the Kazembe court.", sources: ["smithsonian"] },
  { id: 8, name: "Chinkonkole Kafuti", reign: "1870-1872", title: "Mwata Kazembe VIII", era: "trade", confidence: "fragmentary", note: "Short reign during unstable regional and caravan-trade conditions.", sources: ["gordon"] },
  { id: 9, name: "Lukwesa Mpanga", reign: "1872-1883 / 1885-1886", title: "Mwata Kazembe IX", era: "colonial", confidence: "contested dates", note: "Disputed reigns reflect succession conflict and weakening political control.", sources: ["gordon"] },
  { id: 10, name: "Kanyembo Ntemena", reign: "1883-1885 / 1886-1904", title: "Mwata Kazembe X", era: "colonial", confidence: "secondary synthesis", note: "Linked to rebuilding at Mwansabombwe after British punitive pressure.", sources: ["gordon"] },
  { id: 11, name: "Mwonga Kapakata", reign: "1904-1919", title: "Mwata Kazembe XI", era: "colonial", confidence: "colonial period", note: "Ruled during early indirect administration and mission-era change.", sources: ["gordon"] },
  { id: 12, name: "Chinyanta Kasasa", reign: "1919-1936", title: "Mwata Kazembe XII", era: "colonial", confidence: "colonial period", note: "Maintained chiefly authority inside colonial administrative structures.", sources: ["gordon"] },
  { id: 13, name: "Chinkonkole", reign: "1936-1941", title: "Mwata Kazembe XIII", era: "colonial", confidence: "limited public record", note: "Short reign preceding the modernizing period.", sources: ["gordon"] },
  { id: 14, name: "Shadreck Chinyanta Nankula", reign: "1941-1950", title: "Mwata Kazembe XIV", era: "independence", confidence: "documented", note: "Modernizing ruler linked with Ifikolwe Fyandi, palace building, and Lunda associations.", sources: ["gordon"] },
  { id: 15, name: "Brown Ngombe", reign: "1950-1957", title: "Mwata Kazembe XV", era: "independence", confidence: "needs verification", note: "Reign sits in the pre-independence nationalist period.", sources: ["gordon"] },
  { id: 16, name: "Kanyembo Kapema", reign: "1957-1961", title: "Mwata Kazembe XVI", era: "independence", confidence: "needs verification", note: "Final reign before Zambian independence-era transformation.", sources: ["gordon"] },
  { id: 17, name: "Paul Kanyembo Lutaba", reign: "1961-1983", title: "Mwata Kazembe XVII", era: "independence", confidence: "photographic + academic", note: "Crowned in 1961; linked to the emergence of Umutomboko as a national cultural event.", sources: ["unza", "commons"] },
  { id: 18, name: "Munona Chinyanta", reign: "1983-1998", title: "Mwata Kazembe XVIII", era: "contemporary", confidence: "modern record", note: "Bridged traditional authority and civil administration during late one-party and early multiparty eras.", sources: ["unza"] },
  { id: 19, name: "Paul Mpemba Kanyembo Kapale Mpalume", reign: "1998-present", title: "Mwata Kazembe XIX", era: "contemporary", confidence: "current office", note: "Presides over contemporary Umutomboko and cross-border Lunda diplomatic presence. The library foregrounds his office as the living center of the archive.", sources: ["kazembe-lineage", "commons-current", "zta", "unza"] }
];

export const sourceClaims = [
  { claim: "Umutomboko is held in Mwansabombwe, Luapula Province, on the last weekend of July.", sources: ["zta"], type: "verified" },
  { claim: "The ceremony commemorates Lunda-Luba arrival from Kola in present-day DR Congo.", sources: ["zta", "gordon"], type: "oral tradition" },
  { claim: "The modern ceremony expanded from local royal practice into a national tourism event after 1971.", sources: ["unza"], type: "academic" },
  { claim: "Portuguese expedition material survives in the public-domain 1873 Cazembe volume.", sources: ["smithsonian"], type: "archive" },
  { claim: "The current Mwata Kazembe XIX is listed as Paul Mpemba Kanyembo Kapale Mpalume, from 1998 onward.", sources: ["kazembe-lineage"], type: "reference" },
  { claim: "Some artifact visuals in this site are generated reconstructions, not documentary records.", sources: ["reconstruction"], type: "reconstruction" }
];

export const calendar = {
  annualPattern: "Last weekend of July",
  confirmed2025: "25-26 July 2025",
  nextExpected: "24-25 July 2026",
  nextDateISO: "2026-07-24T09:00:00+02:00",
  status: "Tentative until official confirmation",
  location: "Mwansabombwe, Luapula Province, Zambia",
  sources: ["zta", "mot2025"]
};