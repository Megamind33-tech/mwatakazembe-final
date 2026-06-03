import { calendar, ceremonySteps, kings, routes, sources } from "./data.js";

export const siteMeta = {
  title: "Mwata Kazembe Kingdom — Official Digital Home",
  tagline: "THE OFFICIAL DIGITAL HOME OF THE MWATA KAZEMBE KINGDOM",
  headline: "The Royal Seat of the Mwata Kazembe",
  subheadline:
    "From Mwansabombwe, the Lunda-Kazembe throne carries a history of migration, conquest, trade, governance and living culture.",
  openingStatement:
    "Council, senior chiefs, and the Office of the Mwata coordinate public order, land affairs, Umutomboko, and official communication from the royal seat at Mwansabombwe.",
  heroImage: "assets/images/kazembe/hero/home-portrait.jpg",
  ceremonyImage: "assets/images/kazembe/mutomboko/dance-2017-01.webp",
  mapImage: "assets/images/kazembe/places/kingdom-map-2007.jpg",
  location: "Mwansabombwe, Luapula Province, Zambia",
  contact: {
    royalOffice: { label: "Office of the Mwata", value: "Mwansabombwe, Luapula Province", email: null, pending: true },
    media: { label: "Media and Communications", value: "Royal Protocol and Communications Office", email: null, pending: true },
    events: { label: "Ceremony and Events", value: "Ceremony Committee — Umutomboko coordination", email: null, pending: true },
    visitors: { label: "Visitor Affairs", value: "Visitor guidance published under Umutomboko", email: null, pending: true }
  }
};

export const utilityLinks = [
  { label: "Mwansabombwe, Luapula", href: "#contact" },
  { label: "Public Notices", href: "#newsroom" },
  { label: "Official Contact", href: "#contact" }
];

export const socialLinks = [
  { label: "Facebook", href: "#contact", status: "Kingdom of Kazembe — official channel" },
  { label: "YouTube", href: "#contact", status: "Kingdom of Kazembe — official channel" },
  { label: "X / Twitter", href: "#contact", status: "Kingdom of Kazembe — official channel" }
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
    id: "clans",
    label: "Clans & People",
    href: "#clans",
    children: [
      { label: "Clan Register", href: "#clans-register" },
      { label: "Clan Roles", href: "#clans-roles" },
      { label: "Royal Family", href: "#royal-family" },
      { label: "Verify a Record", href: "#clans-verify" }
    ]
  },
  {
    id: "governance",
    label: "Governance",
    href: "#governance",
    children: [
      { label: "Royal Council", href: "#council" },
      { label: "Senior Chiefs", href: "#chiefs" },
      { label: "Traditional Court", href: "#gov-court" },
      { label: "Administration", href: "#gov-admin" },
      { label: "Land and Community Affairs", href: "#gov-land" },
      { label: "Protocol", href: "#protocol" }
    ]
  },
  {
    id: "kingdom",
    label: "The Kingdom",
    href: "#kingdom",
    children: [
      { label: "Origin and Migration", href: "#kingdom-origin" },
      { label: "Wars and Resistance", href: "#kingdom-wars" },
      { label: "Trade and Diplomacy", href: "#kingdom-trade" },
      { label: "Luapula and Lake Mweru", href: "#kingdom-geography" },
      { label: "Early Mwatas", href: "#early-mwatas" },
      { label: "Full Ruler Line", href: "#kingdom-timeline" }
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
      { label: "Gallery", href: "#gallery" },
      { label: "Publications", href: "#publications" },
      { label: "Archive", href: "#archive" }
    ]
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact"
  },
  {
    id: "museum",
    label: "Museum",
    href: "#museum"
  },
  {
    id: "store",
    label: "Store",
    href: "#store"
  },
  {
    id: "donations",
    label: "Support",
    href: "#donations"
  },
  {
    id: "membership",
    label: "Membership",
    href: "#membership"
  }
];

export const heroCtas = [
  { label: "The Lunda-Kazembe Story", href: "#kingdom-story", primary: true },
  { label: "Clans & People", href: "#clans-people" },
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
    role: "State Ceremony of Conquest",
    description:
      "Umutomboko commemorates Lunda arrival, royal installation, and the dance of conquest — a public affirmation of identity and unity.",
    imageCreditId: "mutomboko-dance-2017-01",
    href: "#mutomboko-journey"
  }
];

export const kingdomStats = [
  { id: "rulers", label: "Recorded Mwata Kazembe rulers", value: 19, note: "Lineage I–XIX on record" },
  { id: "seat", label: "Royal seat", value: 1, display: "Mwansabombwe", note: "Luapula Province, Zambia" },
  { id: "ceremony", label: "State ceremony", value: 1, display: "Umutomboko", note: "Last weekend of July" },
  { id: "identity", label: "Political tradition", value: 1, display: "Lunda-Kazembe", note: "Luapula Valley authority" }
];

export const royalSpotlight = [
  {
    id: "mwata",
    role: "Office of the Mwata",
    name: "Mwata Kazembe XIX",
    person: "Paul Mpemba Kanyembo Kapale Mpalume",
    summary: "Reigning Mwata from 1998; presides over Umutomboko and kingdom public leadership.",
    imageCreditId: "hero-home-portrait",
    href: "#mwata",
    navId: "mwata"
  },
  {
    id: "ceremony",
    role: "State ceremony",
    name: "Umutomboko",
    person: "Dance of conquest",
    summary: "Two days of ritual at Mwansabombwe commemorating Lunda arrival and royal authority.",
    imageCreditId: "mutomboko-dance-2017-01",
    href: "#mutomboko-journey",
    navId: "mutomboko"
  },
  {
    id: "governance",
    role: "Royal governance",
    name: "Council and chiefs",
    person: "Traditional administration",
    summary: "Royal Council, senior chiefs, and protocol offices extend authority across Luapula.",
    imageCreditId: "",
    href: "#governance",
    navId: "governance",
    placeholder: true
  }
];

export const externalMediaSources = [
  {
    title: "Umutomboko 2017 — Lusaka Times picture report",
    publisher: "Lusaka Times / ZANIS",
    url: "https://www.lusakatimes.com/2017/07/31/last-week-pictures-5/",
    note: "Charles Banda photographs including Chieftainess Lukwesa, Princess Kanyanta, Prince Kanyembo, and Mwata Kazembe at the ceremony."
  },
  {
    title: "Umutomboko Ceremony",
    publisher: "Zambia Tourism Agency",
    url: "https://www.zambia.travel/umutomboko.html",
    note: "Official summary of timing, location, and meaning of the ceremony."
  },
  {
    title: "2025 Umutomboko notice",
    publisher: "Ministry of Tourism, Zambia",
    url: "https://www.mot.gov.zm/?p=4471",
    note: "Government notice for the 2025 ceremony dates."
  },
  {
    title: "Mutomboko — War dance of the Luba-Lunda Empire",
    publisher: "Smithsonian Photo Contest",
    url: "https://photocontest.smithsonianmag.com/photocontest/detail/mutomboko-war-dance-of-the-luba-lunda-empire/",
    note: "Ulf Krone, July 2016, Mwansabombwe — contact photographer for reuse beyond linking."
  }
];

export const homeSectionNav = [
  { id: "official-notices", label: "Notices" },
  { id: "kingdom-glance", label: "At a glance" },
  { id: "office-mwata", label: "Office of the Mwata" },
  { id: "home-governance", label: "Governance" },
  { id: "clans-people", label: "Clans & People" },
  { id: "kingdom-story", label: "Lunda-Kazembe story" },
  { id: "mwata-lineage", label: "Mwata line" },
  { id: "mutomboko-journey", label: "Umutomboko" },
  { id: "kingdom-agencies", label: "Agencies" },
  { id: "development-public", label: "Development" },
  { id: "royal-news", label: "Newsroom" },
  { id: "home-gallery", label: "Gallery" },
  { id: "visit-support", label: "Contact" }
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
    role: "State Ceremony of Conquest",
    description:
      "Umutomboko commemorates Lunda arrival, royal installation, and the dance of conquest — a public affirmation of identity and unity.",
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

export const peopleSpotlights = [
  {
    creditId: "people-lukwesa-umutomboko-2017",
    title: "Chieftainess Lukwesa at Umutomboko",
    note: "Senior royal woman performing the conquest dance during the 2017 ceremony at Mwansabombwe."
  },
  {
    creditId: "mutomboko-dance-2017-01",
    title: "Mwata Kazembe at Umutomboko, 2017",
    note: "Mwata Kazembe XIX performing the royal dance in the main arena — documented at the 2017 ceremony."
  },
  {
    creditId: "archive-mwata-xvii-1961",
    title: "Mwata Kazembe XVII, 1961",
    note: "Mwata Kazembe XVII Paul Kanyembo Lutaba on tour shortly after installation."
  },
  {
    creditId: "people-royal-women-regalia",
    title: "Royal women in ceremonial dress",
    note: "Senior royal women in the red, white, and blue of the Kingdom at a Kingdom occasion."
  },
  {
    creditId: "hero-home-portrait",
    title: "Office of the reigning Mwata",
    note: "Mwata Kazembe XIX — public leadership from the royal seat at Mwansabombwe."
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
  },
  {
    label: "Recorded Rulers",
    value: "19 Mwatas (Lineage I–XIX on record)"
  }
];

export const governanceInstitutions = [
  {
    id: "mwata",
    title: "Office of the Mwata Kazembe",
    function:
      "Supreme traditional authority: installation memory, Umutomboko presidency, public leadership, and final customary decisions at Mwansabombwe."
  },
  {
    id: "household",
    title: "Royal Household",
    function:
      "Palace officers, regalia custodians, Ichota protocol, and domestic arrangements for the reigning Mwata and senior royal family."
  },
  {
    id: "council",
    title: "Royal Council",
    function:
      "Deliberates policy, succession memory, land disputes referred upward, and coordination with civil administration.",
    pending: true
  },
  {
    id: "chiefs",
    title: "Senior Chiefs",
    function: "Regional traditional leaders representing communities, tribute corridors, and ceremony duty across Luapula.",
    pending: true
  },
  {
    id: "court",
    title: "Traditional Court",
    function: "Customary adjudication for lineage, marriage, land, and community order under established court protocol."
  },
  {
    id: "headmen",
    title: "Headmen and Village Structures",
    function: "Village-level authority linking households to chiefs and the royal seat for tax, ceremony, and dispute referral."
  },
  {
    id: "protocol",
    title: "Protocol and Communications Office",
    function: "Royal notices, press protocol, dignitary visits, and official tone for public communications.",
    pending: true
  },
  {
    id: "ceremony",
    title: "Ceremony Committee",
    function: "Umutomboko planning, procession order, arena protocol, and visitor briefings."
  },
  {
    id: "development",
    title: "Development and Investment Desk",
    function: "Agriculture, fisheries, tourism, youth programmes, and investment inquiries under council oversight.",
    pending: true
  },
  {
    id: "heritage",
    title: "Heritage and Culture Office",
    function: "Archives, oral history verification, schools outreach, and museum liaison."
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
    id: "ceremony-1",
    category: "Ceremony Updates",
    title: `Umutomboko — ${calendar.nextExpected}`,
    date: calendar.annualPattern,
    excerpt: `The state ceremony of Umutomboko is held at Mwansabombwe, Luapula Province, in the last weekend of July each year. Expected next: ${calendar.nextExpected}.`,
    placeholder: false,
    href: "#mutomboko-visitor",
    showOnTicker: true
  },
  {
    id: "notice-contact",
    category: "Public Notices",
    title: "Royal Office — Mwansabombwe",
    date: "Royal Office",
    excerpt: "The Office of the Mwata Kazembe is located at Mwansabombwe, Luapula Province. Direct inquiries are coordinated through the Royal Protocol Office.",
    placeholder: true,
    href: "#contact"
  },
  {
    id: "stmt-pending",
    category: "Official Statements",
    title: "Official Statements — Kingdom of Kazembe",
    date: "Royal Office",
    excerpt: "Official statements from the Office of the Mwata Kazembe are published in the Newsroom as issued by the Royal Protocol Office.",
    placeholder: true,
    href: "#news-statements"
  }
];

export const officialNoticeStrip = [
  {
    label: "Umutomboko",
    text: `Expected: ${calendar.nextExpected} — confirm with the Royal Protocol Office before travel`,
    href: "#mutomboko-visitor"
  },
  { label: "Royal seat", text: "Mwansabombwe, Luapula Province, Zambia", href: "#kingdom-glance" },
  { label: "Contact", text: "Official channels — Royal Office", href: "#contact" }
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
  title: "Mutomboko: Dance of Conquest",
  meaning:
    "Umutomboko is publicly described as a dance of conquest — commemorating Lunda-Luba arrival from Kola, royal installation, and the continuity of Kazembe authority at Mwansabombwe.",
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
    "Visitors should observe ceremonial protocol, dress respectfully, and follow guidance from kingdom officials. Detailed dress guidance will be published by the Ceremony Committee ahead of each Umutomboko.",
  gallery: [
    {
      imageCreditId: "people-lukwesa-umutomboko-2017",
      verified: true
    },
    {
      imageCreditId: "mutomboko-dance-2017-01",
      verified: true
    },
    {
      imageCreditId: "mutomboko-ngona-offerings",
      verified: true
    },
    {
      imageCreditId: "mutomboko-ngona-blessing",
      verified: true
    },
    {
      imageCreditId: "mutomboko-mpembwe-shrine",
      verified: true
    },
    {
      imageCreditId: "mutomboko-muselo-crowd",
      verified: true
    },
    {
      imageCreditId: "mutomboko-muselo-mwata",
      verified: true
    },
    {
      imageCreditId: "mwata-white-ceremonial-dress",
      verified: true
    },
    {
      imageCreditId: "mutomboko-muselo-procession",
      verified: true
    },
    {
      imageCreditId: "mutomboko-ceremony-crowd",
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
    title: "Trade, Tribute and Diplomacy on the Luapula",
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
    summary: "Mutomboko and royal regalia affirm conquest as identity — cultural continuity as political triumph."
  }
];

export const royalMap = {
  image: siteMeta.mapImage,
  caption:
    "Kazembe Kingdom map (Rex Parry, 2007, Wikimedia Commons CC BY 2.5). Routes and zones use verified historical synthesis; detailed GIS layers to follow official survey publication.",
  places: [
    { name: "Mwansabombwe", role: "Royal seat and ceremony grounds" },
    { name: "Luapula River", role: "Water corridor and fisheries" },
    { name: "Lake Mweru", role: "Lake economy and regional connection" },
    { name: "Kola", role: "Migration memory — Lunda world origin" },
    { name: "Matanda", role: "Crossing memory in migration tradition" }
  ],
  routes: routes.map((r) => ({ title: r.title, period: r.period, summary: r.summary }))
};

export const kingdomAgencies = [
  {
    id: "heritage-culture",
    title: "Heritage and Culture Office",
    function:
      "Custodianship of oral history, regalia memory, museum liaison, and publication of verified cultural records for schools and the public.",
    href: "#agencies",
    pending: false
  },
  {
    id: "ceremony-committee",
    title: "Ceremony Committee",
    function:
      "Plans Umutomboko stages, procession routes, arena protocol, and coordination with chiefs, dancers, and visitors at Mwansabombwe.",
    href: "#mutomboko-program",
    pending: false
  },
  {
    id: "protocol-comms",
    title: "Protocol and Communications Office",
    function:
      "Issues royal notices, manages press accreditation, and maintains official tone for statements, speeches, and public affairs.",
    href: "#protocol",
    pending: true
  },
  {
    id: "tourism-visitors",
    title: "Tourism and Visitor Affairs",
    function:
      "Visitor guidance for ceremony weekends, dignified conduct briefings, and liaison with provincial tourism authorities.",
    href: "#mutomboko-visitor",
    pending: false
  },
  {
    id: "youth-community",
    title: "Youth and Community Development",
    function:
      "Skills, education outreach, and community projects linking villages to kingdom development priorities.",
    href: "#dev-youth",
    pending: true
  },
  {
    id: "development-desk",
    title: "Development and Investment Desk",
    function:
      "Agriculture, fisheries, business facilitation, and investment inquiries under royal council oversight.",
    href: "#development-public",
    pending: true
  }
];

/** @deprecated use kingdomAgencies */
export const agencies = kingdomAgencies.map((a) => ({ name: a.title, status: a.pending ? "pending" : "active" }));

export const mwataProfile = {
  name: "Paul Mpemba Kanyembo Kapale Mpalume",
  title: "Mwata Kazembe XIX",
  reign: "1998–present",
  image: siteMeta.heroImage,
  role: "The Mwata is the centre of authority, continuity, ceremony, unity, and public leadership for the Kazembe Kingdom.",
  biography: [
    "Listed in public lineage references as Mwata Kazembe XIX from 1998 onward.",
    "Presides over Umutomboko and represents the Kingdom in regional Lunda diplomatic contexts, including cross-border Lunda affairs.",
    "Mwata Kazembe XIX is the reigning holder of the royal seat at Mwansabombwe, carrying the duties of authority, ceremony, and public leadership for the Lunda-Kazembe people."
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
    body:
      "The Royal Council deliberates with the Mwata on kingdom affairs, succession memory, and customary governance. The Council represents the Kingdom's senior advisory structure, carrying deliberation and coordinating authority across Luapula."
  },
  {
    id: "gov-chiefs",
    title: "Senior Chiefs",
    body:
      "Senior chiefs extend royal authority across Luapula through land order, tribute memory, and representation at court. Each chief carries governance duties within designated corridors aligned to the royal seat at Mwansabombwe."
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
    body:
      "Luba-Lunda identity and clan structures bind communities to the royal seat. The verified clan register is published on the Clans & People section."
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

/**
 * Newsroom entries.
 * `verification` is an internal record only — it is NOT rendered loudly on the
 * public site. Allowed values: "verified" | "sourced" | "official" |
 * "needs-confirmation" | "draft". Items that are not officially issued by the
 * Royal Protocol Office carry `placeholder: true` so the public render keeps a
 * dignified, non-overclaiming tone. No fictional announcements are listed here.
 */
export const newsItems = [
  {
    id: "ceremony-annual",
    category: "Events",
    title: "Umutomboko — the State Ceremony of Conquest",
    date: calendar.annualPattern,
    excerpt: `Umutomboko is held at ${calendar.location} on the last weekend of July, commemorating Lunda arrival from Kola, royal installation, and the continuity of Kazembe authority.`,
    placeholder: false,
    href: "#mutomboko",
    verification: "verified"
  },
  {
    id: "ceremony-1",
    category: "Events",
    title: `Umutomboko — Expected ${calendar.nextExpected}`,
    date: calendar.annualPattern,
    excerpt: `Following the annual pattern, the next Umutomboko is expected on ${calendar.nextExpected} at Mwansabombwe. Confirm final dates through the Royal Protocol Office before travel.`,
    placeholder: false,
    href: "#mutomboko-visitor",
    verification: "needs-confirmation"
  },
  {
    id: "ceremony-2025",
    category: "Latest News",
    title: "2025 Umutomboko on record",
    date: calendar.confirmed2025,
    excerpt: "The 2025 Umutomboko was held at Mwansabombwe on the dates recorded in the Ministry of Tourism notice. Photographic and press coverage is consolidated in the Gallery and verified media sources.",
    placeholder: false,
    href: "#gallery",
    verification: "sourced"
  },
  {
    id: "notice-contact",
    category: "Public Notices",
    title: "Official correspondence — Royal Protocol Office",
    date: "Royal Office",
    excerpt: "Cultural inquiries, media accreditation, heritage records, and official correspondence are coordinated through the Royal Protocol Office at Mwansabombwe, Luapula Province.",
    placeholder: false,
    href: "#contact",
    verification: "official"
  },
  {
    id: "notice-clans",
    category: "Public Notices",
    title: "Clan register — submissions and corrections",
    date: "Royal Office",
    excerpt: "The clan register is maintained under the authority of the Office of the Mwata Kazembe. Submissions and corrections are directed to the Royal Protocol Office.",
    placeholder: false,
    href: "#clans-verify",
    verification: "official"
  },
  {
    id: "heritage-archive",
    category: "Publications",
    title: "The Lands of Cazembe (1873) in the Kingdom archive",
    date: "Archive",
    excerpt: "The public-domain 1873 expedition volume is available in the Kingdom archive as a primary historical reference, to be read critically as an outsider account.",
    placeholder: false,
    href: "#publications",
    verification: "sourced"
  },
  {
    id: "stmt-pending",
    category: "Official Statements",
    title: "Official Statements — Kingdom of Kazembe",
    date: "Royal Office",
    excerpt: "Official statements from the Office of the Mwata Kazembe are published in the Newsroom as issued by the Royal Protocol Office.",
    placeholder: true,
    href: "#news-statements",
    verification: "official"
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
    title: "Royal Gazette and Official Publications",
    type: "Official publication",
    url: "",
    placeholder: true,
    note: "Official documents, policy papers, and cultural records are issued under the authority of the Royal Protocol Office of the Kingdom of Kazembe."
  }
];

/**
 * Archive register. Records with `available: false` are surfaced with the
 * dignified label "Archive entry pending official material" rather than a
 * broken link. No archival content is fabricated.
 */
export const archiveRecords = [
  {
    id: "arc-cazembe-1873",
    title: "The Lands of Cazembe (1873)",
    type: "Document — expedition volume",
    date: "1873",
    note: "Public-domain Royal Geographical Society volume gathering Portuguese expedition material connected to Cazembe. Read critically as an outsider account.",
    url: "assets/archive/the-lands-of-cazembe-1873.pdf",
    available: true
  },
  {
    id: "arc-mwata-xvii-1961",
    title: "Mwata Kazembe XVII on tour, 1961",
    type: "Photograph — documentary",
    date: "1961",
    note: "Mwata Kazembe XVII Paul Kanyembo Lutaba carried in an open palanquin shortly after installation. Held on Wikimedia Commons.",
    creditId: "archive-mwata-xvii-1961",
    available: true
  },
  {
    id: "arc-umutomboko-2017",
    title: "Umutomboko 2017 — photographic record",
    type: "Photographs — ceremony",
    date: "2017",
    note: "Ceremony photography from the 2017 Umutomboko, consolidated in the Gallery with full source credit.",
    url: "#home-gallery",
    available: true
  },
  {
    id: "arc-speeches",
    title: "Royal speeches and addresses",
    type: "Records — speeches",
    date: "Pending",
    note: "Archive entry pending official material from the Royal Protocol Office.",
    available: false
  },
  {
    id: "arc-gazette",
    title: "Royal Gazette and official statements",
    type: "Records — official documents",
    date: "Pending",
    note: "Archive entry pending official material from the Royal Protocol Office.",
    available: false
  }
];

export const symbolsOfAuthority = [
  {
    title: "Royal Regalia at Ceremony",
    description:
      "Crowns, beadwork, red and blue regalia language, sword, and axe appear in Umutomboko performance as symbols of authority and conquest.",
    imageCreditId: "mutomboko-dance-2017-01",
    verified: true
  },
  {
    imageCreditId: "people-lukwesa-umutomboko-2017",
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

export const museumItems = [
  {
    id: "mus-umondo",
    title: "Umondo Royal Talking Drum",
    era: "FOUNDATION ERA",
    description: "The royal slot-drum used for formal court communication, summoning clans, and signaling the emergence of the Mwata. Carved from a single block of dense river wood, its acoustics are tuned to mark royal protocol.",
    evidence: "UNZA recordings document the unique rhythmic calls of the Umondo during pre-arena rituals.",
    src: "assets/generated/reconstruction-umondo-drum.png"
  },
  {
    id: "mus-amapango",
    title: "Amapango Feathered Crown",
    era: "CEREMONIAL REGALIA",
    description: "The tall, feathered red crown worn by the Mwata Kazembe during the Umutomboko royal dance of conquest. It symbolizes royal majesty, conquest, and the blessing of ancestral authority.",
    evidence: "Contemporary photographs and historical sketches from the 1961 and 2017 ceremonies document its central role.",
    src: "assets/generated/reconstruction-crowns.png"
  },
  {
    id: "mus-muselo",
    title: "Muselo Royal Processional Litter",
    era: "TRAVEL & DIPLOMACY",
    description: "The wooden processional carriage/hammock used by designated royal carriers (*Amapango*) to carry the Mwata Kazembe from the Ichota palace to the main arena during state ceremonies.",
    evidence: "Dr. John Edward Parry's 1961 photo and contemporary media reports document the carrying of the Mwata in the Muselo.",
    src: "assets/generated/reconstruction-muselo-litter.png"
  },
  {
    id: "mus-weapons",
    title: "Cibangula Ceremonial Swords",
    era: "MILITARY ERA",
    description: "Traditional broad swords and combat shields carried by the Mwata during processional displays and used to perform the climax of the Umutomboko dance, where the sword points to the earth, sky, and directions of migration.",
    evidence: "UNZA historical synthesis documents the military usage of broadswords in Luapula state formation.",
    src: "assets/generated/reconstruction-weapons.png"
  }
];

export const storeProducts = [
  {
    id: "prod-lands-cazembe",
    title: "The Lands of Cazembe (1873)",
    category: "Books & History",
    price: 35.00,
    description: "Official public-domain facsimile edition of the Portuguese expedition volume, translated by the Royal Geographical Society in 1873. A valuable resource for interior history researchers.",
    src: "assets/generated/hero-living-archive.png"
  },
  {
    id: "prod-mutomboko-book",
    title: "Umutomboko: Official Booklet",
    category: "Publications",
    price: 15.00,
    description: "A comprehensive guide published under the supervision of the Ceremony Committee, outlining the history, timeline, protocols, dress guides, and meanings of the dance of conquest.",
    src: "assets/generated/atlas-parchment-map.png"
  },
  {
    id: "prod-royal-cloth",
    title: "Traditional Lunda Sash & Cloth",
    category: "Textiles",
    price: 45.00,
    description: "High-quality woven ceremonial cloth featuring traditional Lunda geometric patterns and royal blue highlights, suitable for official Umutomboko ceremonial wear.",
    src: "assets/images/kazembe/hero/home-portrait.jpg"
  },
  {
    id: "prod-tribute-coin",
    title: "Heritage Souvenir Coin",
    category: "Collectibles",
    price: 25.00,
    description: "Limited-edition bronze alloy coin commemorating the lineage of the 19 recorded rulers of the Mwata Kazembe Kingdom. Features the royal seal on the front and lineage list on the back.",
    src: "assets/generated/reconstruction-crowns.png"
  }
];

export { kings, ceremonySteps, calendar, sources };
