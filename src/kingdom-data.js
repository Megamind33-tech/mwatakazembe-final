import { calendar, ceremonySteps, kings, routes, sources } from "./data.js";

export const siteMeta = {
  title: "Mwata Kazembe Kingdom — Official Digital Home",
  tagline: "THE OFFICIAL DIGITAL HOME OF THE MWATA KAZEMBE KINGDOM",
  headline: "A Kingdom of Authority, Memory, Victory and Progress",
  subheadline:
    "From the royal seat of Mwansabombwe, the Mwata Kazembe Kingdom governs the Luapula Valley through kingship, council, Umutomboko, and public leadership.",
  openingStatement:
    "The royal seat at Mwansabombwe is where council deliberates, chiefs receive directives, ceremonies affirm victory, and the kingdom addresses its people — a living institution, not a closed archive.",
  heroImage: "assets/images/kazembe/hero/home-portrait.jpg",
  ceremonyImage: "assets/images/kazembe/mutomboko/ceremony-2017-02.png",
  mapImage: "assets/images/kazembe/places/kingdom-map-2007.jpg",
  location: "Mwansabombwe, Luapula Province, Zambia",
  contact: {
    royalOffice: { label: "Office of the Mwata", value: "content required", email: "content required" },
    media: { label: "Media and Communications", value: "content required", email: "content required" },
    events: { label: "Ceremony and Events", value: "content required", email: "content required" },
    visitors: { label: "Visitor Affairs", value: "content required", email: "content required" }
  }
};

export const utilityLinks = [
  { label: "Mwansabombwe, Luapula", href: "#contact" },
  { label: "Public Notices", href: "#newsroom" },
  { label: "Official Contact", href: "#contact" }
];

export const socialLinks = [
  { label: "Facebook", href: "#", status: "content required" },
  { label: "YouTube", href: "#", status: "content required" },
  { label: "X / Twitter", href: "#", status: "content required" }
];

export const navigation = [
  {
    id: "home",
    label: "Home",
    href: "#home"
  },
  {
    id: "mwata",
    label: "The Mwata",
    href: "#mwata",
    children: [
      { label: "Office of the Mwata", href: "#mwata-office" },
      { label: "Royal Household", href: "#mwata-household" },
      { label: "Past Mwatas", href: "#mwata-past" },
      { label: "Palace and Royal Court", href: "#mwata-palace" },
      { label: "Symbols of Authority", href: "#mwata-symbols" }
    ]
  },
  {
    id: "governance",
    label: "Governance",
    href: "#governance",
    children: [
      { label: "Royal Council", href: "#gov-council" },
      { label: "Senior Chiefs", href: "#gov-chiefs" },
      { label: "Traditional Court", href: "#gov-court" },
      { label: "Administration", href: "#gov-admin" },
      { label: "Land and Community Affairs", href: "#gov-land" },
      { label: "Protocol and Public Affairs", href: "#gov-protocol" }
    ]
  },
  {
    id: "kingdom",
    label: "The Kingdom",
    href: "#kingdom",
    children: [
      { label: "Origin and Migration", href: "#kingdom-origin" },
      { label: "Wars and Triumphs", href: "#kingdom-wars" },
      { label: "Trade and Diplomacy", href: "#kingdom-trade" },
      { label: "Luapula and Lake Mweru", href: "#kingdom-geography" },
      { label: "Clans and People", href: "#kingdom-clans" },
      { label: "Timeline of Power", href: "#kingdom-timeline" }
    ]
  },
  {
    id: "mutomboko",
    label: "Mutomboko",
    href: "#mutomboko",
    children: [
      { label: "Meaning of Mutomboko", href: "#mutomboko-meaning" },
      { label: "Ceremony Program", href: "#mutomboko-program" },
      { label: "Past Ceremonies", href: "#mutomboko-past" },
      { label: "Photo and Video Gallery", href: "#mutomboko-gallery" },
      { label: "Visitor Information", href: "#mutomboko-visitor" },
      { label: "Protocol and Dress Guidance", href: "#mutomboko-protocol" }
    ]
  },
  {
    id: "development",
    label: "Development",
    href: "#development",
    children: [
      { label: "Agriculture", href: "#dev-agriculture" },
      { label: "Fisheries", href: "#dev-fisheries" },
      { label: "Tourism", href: "#dev-tourism" },
      { label: "Youth and Skills", href: "#dev-youth" },
      { label: "Business and Investment", href: "#dev-business" },
      { label: "Culture and Creative Economy", href: "#dev-culture" },
      { label: "Community Projects", href: "#dev-community" }
    ]
  },
  {
    id: "newsroom",
    label: "Newsroom",
    href: "#newsroom",
    children: [
      { label: "Official Statements", href: "#news-statements" },
      { label: "Latest News", href: "#news-latest" },
      { label: "Speeches", href: "#news-speeches" },
      { label: "Events", href: "#news-events" },
      { label: "Media Gallery", href: "#news-gallery" },
      { label: "Publications", href: "#news-publications" }
    ]
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact"
  }
];

export const heroCtas = [
  { label: "The Lunda-Kazembe Story", href: "#kingdom-story", primary: true },
  { label: "Official Communications", href: "#newsroom" },
  { label: "Umutomboko Ceremony", href: "#mutomboko-journey" }
];

export const homeLeadershipCards = [
  {
    id: "mwata",
    title: "His Royal Highness Mwata Kazembe",
    role: "Office of the Mwata",
    description:
      "Paul Mpemba Kanyembo Kapale Mpalume, Mwata Kazembe XIX, holds the royal seat at Mwansabombwe as the centre of authority, ceremony, and public leadership.",
    imageCreditId: "hero-home-portrait",
    href: "#mwata"
  },
  {
    id: "council",
    title: "Royal Council",
    role: "Traditional Governance",
    description:
      "The Royal Council advises the Mwata, deliberates on kingdom affairs, and upholds customary law alongside public administration.",
    href: "#gov-council",
    placeholder: true
  },
  {
    id: "mutomboko",
    title: "Umutomboko Ceremony",
    role: "State Ceremony of Victory",
    description:
      "Umutomboko commemorates Lunda arrival, royal installation, and the dance of victory — a public affirmation of identity and unity.",
    imageCreditId: "mutomboko-ceremony-2017-02",
    href: "#mutomboko-journey"
  }
];

export const leadershipCards = [
  {
    id: "mwata",
    title: "His Royal Highness Mwata Kazembe",
    role: "Office of the Mwata",
    description:
      "Paul Mpemba Kanyembo Kapale Mpalume, Mwata Kazembe XIX, holds the royal seat at Mwansabombwe as the centre of authority, ceremony, and public leadership.",
    image: siteMeta.heroImage,
    href: "#mwata"
  },
  {
    id: "council",
    title: "Royal Council",
    role: "Traditional Governance",
    description:
      "The Royal Council advises the Mwata, deliberates on kingdom affairs, and upholds customary law alongside public administration.",
    href: "#gov-council",
    placeholder: true
  },
  {
    id: "chiefs",
    title: "Senior Chiefs",
    role: "Traditional Authority",
    description:
      "Senior chiefs and headmen extend royal authority across Luapula, maintaining land order, community representation, and ceremonial duty.",
    href: "#gov-chiefs",
    placeholder: true
  },
  {
    id: "mutomboko",
    title: "Mutomboko Ceremony",
    role: "State Ceremony of Victory",
    description:
      "Umutomboko commemorates Lunda arrival, royal installation, and the dance of victory — a public affirmation of identity and unity.",
    image: siteMeta.ceremonyImage,
    href: "#mutomboko"
  },
  {
    id: "admin",
    title: "Kingdom Administration",
    role: "Public Affairs and Development",
    description:
      "Administrative offices coordinate protocol, communications, development committees, and official engagement with the public.",
    href: "#gov-admin",
    placeholder: true
  }
];

export const storyChapters = ["origins", "trade", "present"];

export const featuredKingIds = [1, 3, 17, 18, 19];

export const peopleSpotlights = [
  {
    creditId: "mutomboko-dance-2017-01",
    title: "Royal performance at Umutomboko",
    note: "The Mwata's public dance closes two days of ritual — victory made visible before the kingdom."
  },
  {
    creditId: "archive-mwata-xvii-1961",
    title: "Procession and public witness, 1961",
    note: "Mwata Kazembe XVII carried on tour shortly after installation — authority moving through the land."
  },
  {
    creditId: "hero-home-portrait",
    title: "Office of the reigning Mwata",
    note: "Mwata Kazembe XIX presides over council, ceremony, and cross-border Lunda diplomatic presence."
  }
];

export const homeDevelopmentIds = ["dev-agriculture", "dev-fisheries", "dev-tourism", "dev-youth"];

export const kingdomGlance = [
  { label: "Royal Seat", value: "Mwansabombwe" },
  { label: "Region", value: "Luapula Province, Zambia" },
  { label: "Cultural Identity", value: "Luba-Lunda / Lunda-Kazembe" },
  { label: "Major Ceremony", value: "Mutomboko (Umutomboko)" },
  {
    label: "Historic Strength",
    value: "Trade, diplomacy, migration, conquest, governance"
  },
  {
    label: "Natural Geography",
    value: "Luapula River, Lake Mweru, fertile lands, fisheries"
  },
  {
    label: "Governance",
    value: "Mwata, Royal Council, Senior Chiefs, headmen, traditional court"
  }
];

export const governanceStructure = [
  {
    id: "mwata",
    title: "Mwata Kazembe",
    tier: 1,
    description: "Supreme traditional authority, ceremonial head of state, and public symbol of the Kingdom."
  },
  {
    id: "council",
    title: "Royal Council",
    tier: 2,
    description: "Senior advisers and councilors who deliberate on kingdom policy, succession memory, and public order.",
    placeholder: true
  },
  {
    id: "chiefs",
    title: "Senior Chiefs",
    tier: 2,
    description: "Regional traditional leaders who represent communities and uphold royal directives across the kingdom.",
    placeholder: true
  },
  {
    id: "court",
    title: "Traditional Court",
    tier: 3,
    description: "Customary adjudication, dispute resolution, and protocol for land, lineage, and community matters.",
    placeholder: true
  },
  {
    id: "headmen",
    title: "Headmen and Community Structures",
    tier: 3,
    description: "Local authority linking villages to the royal seat through tribute, representation, and ceremony.",
    placeholder: true
  },
  {
    id: "protocol",
    title: "Protocol and Communication Office",
    tier: 3,
    description: "Official statements, public notices, media coordination, and ceremonial protocol.",
    placeholder: true
  },
  {
    id: "development",
    title: "Development Committees",
    tier: 3,
    description: "Kingdom-facing programmes in agriculture, fisheries, tourism, youth, and community investment.",
    placeholder: true
  }
];

export const latestCommunications = [
  {
    id: "stmt-1",
    category: "Official Statements",
    title: "content required — Official statement from the Office of the Mwata",
    date: "content required",
    excerpt: "Structured placeholder for verified official communications.",
    placeholder: true
  },
  {
    id: "notice-1",
    category: "Public Notices",
    title: "content required — Public notice",
    date: "content required",
    excerpt: "Kingdom notices will appear here once confirmed by the communications office.",
    placeholder: true
  },
  {
    id: "ceremony-1",
    category: "Ceremony Updates",
    title: `Umutomboko — expected ${calendar.nextExpected}`,
    date: calendar.annualPattern,
    excerpt: `The ceremony is associated with Mwansabombwe, Luapula Province. Annual pattern: ${calendar.annualPattern}. Status: ${calendar.status}.`,
    placeholder: false,
    href: "#mutomboko-visitor"
  },
  {
    id: "dev-1",
    category: "Development Announcements",
    title: "content required — Kingdom development announcement",
    date: "content required",
    excerpt: "Development-facing communications from kingdom committees.",
    placeholder: true
  },
  {
    id: "community-1",
    category: "Community Messages",
    title: "content required — Community message",
    date: "content required",
    excerpt: "Messages to communities across Luapula and the wider kingdom.",
    placeholder: true
  },
  {
    id: "speech-1",
    category: "Speeches",
    title: "content required — Royal address",
    date: "content required",
    excerpt: "Official speeches and public addresses from the Mwata and senior officeholders.",
    placeholder: true
  }
];

export const developmentPillars = [
  {
    id: "dev-agriculture",
    title: "Agriculture and Food Security",
    summary: "Fertile Luapula corridors support subsistence and market agriculture under kingdom and community coordination.",
    href: "#dev-agriculture",
    placeholder: true
  },
  {
    id: "dev-fisheries",
    title: "Fisheries and Lake Mweru Economy",
    summary: "Lake Mweru and river fisheries remain central to livelihood, trade, and regional food supply.",
    href: "#dev-fisheries",
    placeholder: true
  },
  {
    id: "dev-tourism",
    title: "Tourism and Cultural Economy",
    summary: "Mutomboko and royal heritage draw visitors to Mwansabombwe while requiring dignified, protocol-led hospitality.",
    href: "#dev-tourism"
  },
  {
    id: "dev-youth",
    title: "Youth Participation",
    summary: "Youth skills, education, and cultural participation strengthen the kingdom's future leadership.",
    href: "#dev-youth",
    placeholder: true
  },
  {
    id: "dev-land",
    title: "Land and Community Order",
    summary: "Traditional authority guides land use, settlement, and community representation alongside public law.",
    href: "#gov-land",
    placeholder: true
  },
  {
    id: "dev-business",
    title: "Business, Trade and Investment",
    summary: "Historic trade power on the Luapula continues through regional commerce and investment desks.",
    href: "#dev-business",
    placeholder: true
  },
  {
    id: "dev-heritage",
    title: "Heritage Protection",
    summary: "Ceremony, regalia, and historical memory are governed as living heritage — not museum storage.",
    href: "#kingdom"
  },
  {
    id: "dev-education",
    title: "Education and Skills",
    summary: "Schools, skills programmes, and cultural education extend the kingdom's public mission.",
    href: "#dev-youth",
    placeholder: true
  }
];

export const mutombokoFeature = {
  title: "Mutomboko: Dance of Victory",
  meaning:
    "Umutomboko is publicly described as a dance of victory — commemorating Lunda-Luba arrival from Kola, royal installation, and the continuity of Kazembe authority at Mwansabombwe.",
  why:
    "The ceremony unites ancestry, water offerings, palace emergence, royal procession, and public dance into a state ritual of identity, not a spectacle alone.",
  stages: ceremonySteps.map((step) => ({
    label: step.label,
    title: step.title,
    day: step.day,
    location: step.location,
    summary: step.summary
  })),
  calendar,
  protocolNote:
    "Visitors should observe ceremonial protocol, dress respectfully, and follow guidance from kingdom officials. Full dress code publication: content required.",
  gallery: [
    {
      imageCreditId: "mutomboko-ceremony-2017-02",
      verified: true
    },
    {
      imageCreditId: "mutomboko-dance-2017-01",
      verified: true
    },
    {
      imageCreditId: "archive-mwata-xvii-1961",
      verified: true
    }
  ]
};

export const historyChapters = [
  {
    id: "origins",
    title: "Origins from the Luba-Lunda World",
    summary:
      "Kazembe authority emerges from the wider Lunda political universe associated with Mwata Yamvo's world. The founding memory ties dynasty to movement, legitimacy, and ancestral law.",
    marker: "c. 1740"
  },
  {
    id: "migration",
    title: "Migration toward Luapula",
    summary:
      "Oral tradition records Ng'anga Bilonda's movement from Kola toward the Luapula Valley, with the Matanda crossing as a durable landscape memory — treated as memory, not a GPS route.",
    marker: "Migration"
  },
  {
    id: "conquest",
    title: "Conquest and Settlement",
    summary:
      "Successive Mwatas expanded tribute networks, folded communities into Kazembe citizenship, and consolidated authority across river, lake, and forest corridors.",
    marker: "Expansion"
  },
  {
    id: "trade",
    title: "Trade Routes and Diplomacy",
    summary:
      "Portuguese, Arab, and Swahili networks intersected the Kazembe court. Copper, ivory, and caravan diplomacy made the kingdom an interior node of regional power.",
    marker: "18th–19th c."
  },
  {
    id: "foreign",
    title: "Encounters with Foreign Powers",
    summary:
      "Expedition accounts and missionary presence entered the historical record. The kingdom navigated outsiders while defending court protocol and territorial memory.",
    marker: "19th c."
  },
  {
    id: "resistance",
    title: "Resistance, Pressure, and Survival",
    summary:
      "Military pressure, succession conflict, and colonial disruption tested Kazembe institutions. Authority was rebuilt at Mwansabombwe through survival and adaptation.",
    marker: "1890s–1920"
  },
  {
    id: "modern",
    title: "Modernisation and Development",
    summary:
      "From indirect rule through independence to contemporary Zambia, the Mwata's office has bridged customary authority, civil administration, and national cultural recognition.",
    marker: "20th–21st c."
  },
  {
    id: "present",
    title: "Present-Day Continuity",
    summary:
      "Mwata Kazembe XIX presides over Mutomboko, cross-border Lunda diplomacy, and public leadership — the kingdom active in governance, communication, and development.",
    marker: "1998–present"
  }
];

export const warsDiplomacy = [
  {
    title: "Military Strength and State Formation",
    summary:
      "Kazembe power grew through organised authority and regional control — wars understood here as history of defence, consolidation, and statehood, not glorification of violence."
  },
  {
    title: "Strategic Migration",
    summary: "Movement from Kola anchored legitimacy in landscape memory and the Luapula-Mweru domain."
  },
  {
    title: "Trade Power",
    summary: "Tribute, fisheries, and caravan trade sustained a well-watered kingdom at the heart of interior networks."
  },
  {
    title: "Resistance to Outside Domination",
    summary: "Colonial-era pressure and succession conflict tested the throne; rebuilding at Mwansabombwe marks survival."
  },
  {
    title: "Diplomatic Encounters",
    summary: "Portuguese expeditions and trader diplomacy entered the archive as outsider accounts requiring critical reading."
  },
  {
    title: "Triumph through Cultural Continuity",
    summary: "Mutomboko and royal regalia affirm victory as identity — cultural continuity as political triumph."
  }
];

export const royalMap = {
  image: siteMeta.mapImage,
  caption:
    "Kazembe Kingdom map (Rex Parry, 2007, Wikimedia Commons CC BY 2.5). Routes and zones below use verified historical synthesis; full GIS integration: content required.",
  places: [
    { name: "Mwansabombwe", role: "Royal seat and ceremony grounds" },
    { name: "Luapula River", role: "Water corridor and fisheries" },
    { name: "Lake Mweru", role: "Lake economy and regional connection" },
    { name: "Kola", role: "Migration memory — Lunda world origin" },
    { name: "Matanda", role: "Crossing memory in migration tradition" }
  ],
  routes: routes.map((r) => ({ title: r.title, period: r.period, summary: r.summary }))
};

export const agencies = [
  { name: "Cultural Affairs", status: "content required" },
  { name: "Ceremony Committee", status: "content required" },
  { name: "Media and Communications", status: "content required" },
  { name: "Tourism and Visitor Affairs", status: "content required" },
  { name: "Youth and Community Development", status: "content required" },
  { name: "Heritage Protection", status: "content required" },
  { name: "Business and Investment Desk", status: "content required" },
  { name: "Royal Protocol Office", status: "content required" }
];

export const mwataProfile = {
  name: "Paul Mpemba Kanyembo Kapale Mpalume",
  title: "Mwata Kazembe XIX",
  reign: "1998–present",
  image: siteMeta.heroImage,
  role: "The Mwata is the centre of authority, continuity, ceremony, unity, and public leadership for the Kazembe Kingdom.",
  biography: [
    "Listed in public lineage references as Mwata Kazembe XIX from 1998 onward.",
    "Presides over contemporary Umutomboko and represents the kingdom in regional Lunda diplomatic contexts.",
    "Biographical detail beyond verified public listings: content required — Office of the Mwata."
  ],
  appearances: [
    {
      label: "Umutomboko 2017",
      image: siteMeta.ceremonyImage,
      note: "Documentary photograph, Wikimedia Commons CC BY-SA 4.0."
    }
  ]
};

export const governanceSections = [
  {
    id: "gov-council",
    title: "Royal Council",
    body: "The Royal Council deliberates with the Mwata on kingdom affairs, succession memory, and customary governance. Council membership and current officers: content required."
  },
  {
    id: "gov-chiefs",
    title: "Senior Chiefs",
    body: "Senior chiefs extend royal authority across Luapula. Names, jurisdictions, and portfolios: content required."
  },
  {
    id: "gov-court",
    title: "Traditional Court",
    body: "The traditional court adjudicates customary matters, land disputes, and community order under established protocol."
  },
  {
    id: "gov-admin",
    title: "Administration",
    body: "Kingdom administration coordinates public services, records, and liaison with civil government where applicable."
  },
  {
    id: "gov-land",
    title: "Land and Community Affairs",
    body: "Land, settlement, and community representation are governed through traditional authority structures linked to the royal seat."
  },
  {
    id: "gov-protocol",
    title: "Protocol and Public Affairs",
    body: "Official communications, media relations, and ceremonial protocol are issued through the protocol and public affairs office."
  }
];

export const kingdomSections = [
  {
    id: "kingdom-origin",
    title: "Origin and Migration",
    body: "The founding story follows Lunda movement from Kola toward the Luapula Valley, with Ng'anga Bilonda associated with establishment of Kazembe authority at Mwansabombwe."
  },
  {
    id: "kingdom-wars",
    title: "Wars and Triumphs",
    body: "Military history is presented as state formation, defence, and survival — see the dedicated section on the homepage and full timeline for context."
  },
  {
    id: "kingdom-trade",
    title: "Trade and Diplomacy",
    body: "Copper, ivory, and caravan networks connected the court to Portuguese, Arab, and Swahili worlds documented in expedition and academic sources."
  },
  {
    id: "kingdom-geography",
    title: "Luapula and Lake Mweru",
    body: "River, lake, lagoon, and forest corridors shaped tribute, fisheries, agriculture, and the political landscape of the kingdom."
  },
  {
    id: "kingdom-clans",
    title: "Clans and People",
    body: "Luba-Lunda identity and clan structures bind communities to the royal seat. Detailed clan registry: content required."
  },
  {
    id: "kingdom-timeline",
    title: "Timeline of Power",
    body: "Nineteen recorded Mwata Kazembe rulers from founding memory to the present officeholder — uncertain entries remain visibly marked."
  }
];

export const newsCategories = [
  "all",
  "Official Statements",
  "Latest News",
  "Speeches",
  "Events",
  "Media Gallery",
  "Publications"
];

export const newsItems = [
  ...latestCommunications,
  {
    id: "news-2",
    category: "Latest News",
    title: "content required — Kingdom news item",
    date: "content required",
    excerpt: "Verified news articles will be published here.",
    placeholder: true
  },
  {
    id: "event-1",
    category: "Events",
    title: `Umutomboko Ceremony — ${calendar.nextExpected} (expected)`,
    date: calendar.annualPattern,
    excerpt: calendar.location,
    placeholder: false,
    href: "#mutomboko"
  }
];

export const publications = [
  {
    title: "The Lands of Cazembe (1873)",
    type: "Historical reference",
    url: "assets/archive/the-lands-of-cazembe-1873.pdf",
    note: "Public-domain expedition volume — read critically as outsider account."
  },
  {
    title: "content required — Kingdom publication",
    type: "Official publication",
    url: "",
    placeholder: true
  }
];

export const symbolsOfAuthority = [
  {
    title: "Royal Regalia at Ceremony",
    description:
      "Crowns, beadwork, red and blue regalia language, sword, and axe appear in Umutomboko performance as symbols of authority and victory.",
    image: siteMeta.ceremonyImage,
    verified: true
  },
  {
    title: "Talking Drum (Umondo)",
    description:
      "Ceremony accounts describe the royal drum marking communication and ancestral attention before public movement.",
    placeholder: true
  },
  {
    title: "Royal Litter (Muselo)",
    description: "Processional carriage transforms the Mwata's movement into public witness of authority.",
    placeholder: true
  }
];

export { kings, ceremonySteps, calendar, sources };
