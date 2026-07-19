import {
  calendar,
  kingdomGlance,
  kingdomFigures,
  latestCommunications,
  mutombokoFeature,
  newsItems,
  officialNoticeStrip,
  royalMap,
  siteMeta,
  heroCtas
} from "./kingdom-data.js";
import { creditCaption, getCreditById } from "./image-credits.js";
import { esc, sectionHead } from "./ui-helpers.js";

function readMore(href, label = "Read more") {
  return `<a class="link-arrow" href="${esc(href)}">${esc(label)}</a>`;
}

// The homepage is a gateway: each primary section is previewed once and links
// to the single canonical page that owns its content. Content is not repeated
// here — it lives on The Mwata, Governance, Heritage, Development, Newsroom.
const pathwayCards = [
  {
    id: "mwata",
    label: "The Throne",
    title: "The Mwata",
    deck: "The office, royal household, and symbols of authority of His Royal Highness Mwata Kazembe XIX at Mwansabombwe.",
    href: "#mwata"
  },
  {
    id: "governance",
    label: "Administration",
    title: "Governance",
    deck: "The Royal Council, senior chiefs, clans and people, the traditional court, and the administration of the Kingdom.",
    href: "#governance"
  },
  {
    id: "kingdom",
    label: "History & Culture",
    title: "Heritage & Culture",
    deck: "State formation on the Luapula, the Mwata Kazembe line, the Umutomboko ceremony, the royal museum, and the gallery.",
    href: "#kingdom"
  },
  {
    id: "development",
    label: "Public Life",
    title: "Development",
    deck: "Agriculture, fisheries, tourism, youth and skills, business, and community projects across the Luapula valley.",
    href: "#development"
  },
  {
    id: "newsroom",
    label: "Communications",
    title: "Newsroom",
    deck: "Official statements, public notices, speeches, events, kingdom publications, and the royal archive.",
    href: "#newsroom"
  },
  {
    id: "contact",
    label: "Reach the Kingdom",
    title: "Contact",
    deck: "Reach the Office of the Mwata, media and communications, ceremony and events, and visitor affairs.",
    href: "#contact"
  }
];

export function homePageHtml() {
  const heroCredit = getCreditById("hero-home-portrait");
  const mapCredit = getCreditById("places-kingdom-map-2007");
  const flagCredit = getCreditById("identity-flag");

  const glance = kingdomGlance
    .map((f) => `<div class="fact-cell"><span class="fact-label">${esc(f.label)}</span><strong>${esc(f.value)}</strong></div>`)
    .join("");

  const figures = kingdomFigures
    .map(
      (f) => `
      <li class="figure-cell">
        <div class="figure-number">
          ${f.prefix ? `<span class="figure-affix">${esc(f.prefix)}</span>` : ""}
          <span class="figure-value" data-count="${esc(String(f.value))}"${f.noComma ? " data-no-comma=\"true\"" : ""}>0</span>
          ${f.suffix ? `<span class="figure-affix">${esc(f.suffix)}</span>` : ""}
        </div>
        <span class="figure-label">${esc(f.label)}</span>
        ${f.note ? `<span class="figure-note">${esc(f.note)}</span>` : ""}
      </li>
    `
    )
    .join("");

  const pathways = pathwayCards
    .map(
      (c) => `
      <a class="pathway-card" href="${esc(c.href)}" data-nav="${esc(c.id)}">
        <span class="pathway-label">${esc(c.label)}</span>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.deck)}</p>
        <span class="pathway-go" aria-hidden="true">Enter →</span>
      </a>
    `
    )
    .join("");

  const news = newsItems
    .filter((n) => !n.placeholder)
    .slice(0, 3)
    .map(
      (n) => `
      <article class="comm-card">
        <span class="comm-category">${esc(n.category)}</span>
        <h3>${esc(n.title)}</h3>
        <time>${esc(n.date)}</time>
        <p>${esc(n.excerpt)}</p>
        ${readMore(n.href || "#newsroom")}
      </article>
    `
    )
    .join("");

  const noticeStrip = officialNoticeStrip
    .map((n) => `<a class="notice-strip-item" href="${esc(n.href)}"><span>${esc(n.label)}</span> ${esc(n.text)}</a>`)
    .join("");

  const tickerItems = latestCommunications
    .filter((n) => n.showOnTicker || (!n.placeholder && !n.title.toLowerCase().includes("pending")))
    .map((n) => `<a href="${esc(n.href || "#newsroom")}">${esc(n.title)}</a>`)
    .join("");

  const ctas = heroCtas
    .map((c) => `<a class="btn ${c.primary ? "btn-primary" : "btn-secondary"}" href="${esc(c.href)}">${esc(c.label)}</a>`)
    .join("");

  const ceremonyCredit = getCreditById("mutomboko-dance-2017-01");

  return `
    <section class="royal-hero royal-hero-split" id="home">
      <div class="hero-content">
        <p class="hero-label">${esc(siteMeta.tagline)}</p>
        <h1>${esc(siteMeta.headline)}</h1>
        <p class="hero-sub">${esc(siteMeta.subheadline)}</p>
        <div class="hero-ctas">${ctas}</div>
        <p class="hero-credit">${esc(heroCredit?.creditLine || "")}</p>
      </div>
      <div class="hero-media">
        <img src="${esc(heroCredit?.src || siteMeta.heroImage)}" alt="${esc(heroCredit?.altText || "Mwata Kazembe in royal regalia")}" data-credit-id="hero-home-portrait">
        <div class="hero-overlay"></div>
      </div>
    </section>

    <section class="official-notice-strip" id="official-notices" aria-label="Official notices">
      <div class="container notice-strip-inner">
        <span class="notice-strip-heading">Official notices</span>
        <div class="notice-strip-items">${noticeStrip}</div>
      </div>
    </section>

    <div class="news-ticker news-ticker-static" aria-label="Ceremony update">
      <span class="ticker-label">Notice</span>
      <div class="ticker-track" id="news-ticker-track">${tickerItems || `<span>Umutomboko — ${esc(calendar.nextExpected)}</span>`}</div>
    </div>

    <section class="section section-glance" id="kingdom-glance">
      <div class="container">
        ${sectionHead("The Royal Seat at Mwansabombwe", "Kingdom at a Glance")}
        <div class="facts-strip">${glance}</div>
        <div class="glance-media">
          <figure class="credited-figure glance-flag">
            <div class="figure-media has-hover-credit">
              <img src="${esc(flagCredit?.src || "assets/images/kazembe/identity/flag.png")}" alt="${esc(flagCredit?.altText || "Flag of the Mwata Kazembe Kingdom")}" loading="lazy" data-credit-id="identity-flag">
              <span class="hover-credit">${esc(flagCredit?.creditLine || "")}</span>
            </div>
            <figcaption class="figure-credit"><span class="image-credit">Flag of the Mwata Kazembe Kingdom — the crossed axe and sword, feathered crown, and royal litter of the Lunda-Kazembe state.</span></figcaption>
          </figure>
          <figure class="credited-figure glance-map">
            <div class="figure-media has-hover-credit">
              <img src="${esc(mapCredit?.src || royalMap.image)}" alt="${esc(mapCredit?.altText || "Kazembe Kingdom map")}" loading="lazy" data-credit-id="places-kingdom-map-2007">
              <span class="hover-credit">${esc(mapCredit?.creditLine || "")}</span>
            </div>
            ${creditCaption("places-kingdom-map-2007")}
          </figure>
        </div>
      </div>
    </section>

    <section class="section section-figures" id="kingdom-figures">
      <div class="container">
        ${sectionHead("Facts & Figures", "The Kingdom in Numbers")}
        <ul class="figures-grid" data-count-up>${figures}</ul>
      </div>
    </section>

    <section class="section section-pathways" id="kingdom-pathways">
      <div class="container">
        ${sectionHead("Explore the Kingdom", "Where would you like to go?")}
        <p class="section-deck">Six sections carry the official record of the Mwata Kazembe Kingdom. Each opens its own page — the full account lives there.</p>
        <div class="pathway-grid">${pathways}</div>
      </div>
    </section>

    <section class="section section-mutomboko-feature" id="mutomboko-feature">
      <div class="container feature-layout">
        <figure class="feature-media credited-figure">
          <div class="figure-media has-hover-credit">
            <img src="${esc(ceremonyCredit?.src || siteMeta.ceremonyImage)}" alt="${esc(ceremonyCredit?.altText || "Umutomboko ceremony at Mwansabombwe")}" loading="lazy" data-credit-id="mutomboko-dance-2017-01">
            <span class="hover-credit">${esc(ceremonyCredit?.creditLine || "")}</span>
          </div>
        </figure>
        <div class="feature-body">
          ${sectionHead("State Ceremony", "Umutomboko — the Dance of Conquest")}
          <p class="section-deck">${esc(mutombokoFeature.meaning)}</p>
          <p class="feature-note"><strong>Next ceremony:</strong> Expected ${esc(calendar.nextExpected)} at ${esc(calendar.location)}.</p>
          <p class="section-cta"><a class="btn btn-primary" href="#mutomboko">Ceremony &amp; visitor protocol</a></p>
        </div>
      </div>
    </section>

    <section class="section section-news" id="royal-news">
      <div class="container">
        ${sectionHead("Communications", "Latest from the Newsroom")}
        <div class="comm-grid swipe-track" data-swipe="news">${news}</div>
        <p class="section-cta"><a class="btn btn-ghost" href="#newsroom" data-nav="newsroom">All notices &amp; publications</a></p>
      </div>
    </section>

    <section class="section section-support" id="support-kingdom">
      <div class="container visit-cta-panel">
        ${sectionHead("Get Involved", "Support the Kingdom")}
        <p class="section-deck">Partner with the Kingdom in cultural preservation, heritage archives, and community development — or plan a visit for the Umutomboko ceremony.</p>
        <div class="visit-actions">
          <a class="btn btn-primary" href="#donations" data-nav="donations">Support / Donate</a>
          <a class="btn btn-ghost" href="#membership" data-nav="membership">Membership &amp; registry</a>
          <a class="btn btn-ghost" href="#store" data-nav="store">Heritage store</a>
          <a class="btn btn-ghost" href="#contact" data-nav="contact">Official contact</a>
        </div>
        <p class="visit-note"><strong>Planning a visit?</strong> Umutomboko is expected ${esc(calendar.nextExpected)}. ${esc(calendar.location)}. Confirm final arrangements through the Royal Protocol Office.</p>
      </div>
    </section>
  `;
}
