import {
  calendar,
  developmentPillars,
  featuredKingIds,
  heroCtas,
  historyChapters,
  homeDevelopmentIds,
  homeLeadershipCards,
  kingdomGlance,
  kings,
  latestCommunications,
  mutombokoFeature,
  peopleSpotlights,
  royalMap,
  siteMeta,
  storyChapters,
  ceremonySteps
} from "./kingdom-data.js";
import { creditCaption, galleryCategories, getCreditById, imageCredits } from "./image-credits.js";

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function placeholderBadge(show) {
  return show ? `<span class="badge badge-required">content required</span>` : "";
}

function cardImage(src, alt, label, creditId = "") {
  if (creditId) {
    const item = getCreditById(creditId);
    if (item) {
      return `<div class="card-media has-hover-credit"><img src="${esc(item.src)}" alt="${esc(item.altText)}" loading="lazy" data-credit-id="${esc(creditId)}"><span class="hover-credit">${esc(item.creditLine)}</span></div>`;
    }
  }
  if (src) {
    return `<div class="card-media"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></div>`;
  }
  return `<div class="card-media card-media-placeholder"><span>${esc(label || "Image")}</span></div>`;
}

function readMore(href, label = "Read more") {
  return `<a class="link-arrow" href="${esc(href)}">${esc(label)}</a>`;
}

function sectionHead(eyebrow, title, deck = "") {
  return `
    <header class="section-head">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
      <h2>${esc(title)}</h2>
      ${deck ? `<p class="section-deck">${esc(deck)}</p>` : ""}
    </header>
  `;
}

export function homePageHtml() {
  const heroCredit = getCreditById("hero-home-portrait");
  const mapCredit = getCreditById("places-kingdom-map-2007");

  const leadership = homeLeadershipCards
    .map(
      (c) => `
      <article class="authority-card reveal-block">
        ${c.imageCreditId ? cardImage("", c.title, c.title, c.imageCreditId) : cardImage("", c.title, c.title)}
        <div class="authority-card-body">
          <p class="office-label">${esc(c.role)}</p>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.description)}</p>
          ${placeholderBadge(c.placeholder)}
          ${readMore(c.href)}
        </div>
      </article>
    `
    )
    .join("");

  const glance = kingdomGlance
    .map((f) => `<div class="fact-cell"><span class="fact-label">${esc(f.label)}</span><strong>${esc(f.value)}</strong></div>`)
    .join("");

  const news = latestCommunications
    .slice(0, 3)
    .map(
      (n) => `
      <article class="comm-card reveal-block ${n.placeholder ? "is-placeholder" : ""}">
        <span class="comm-category">${esc(n.category)}</span>
        <h3>${esc(n.title)}</h3>
        <time>${esc(n.date)}</time>
        <p>${esc(n.excerpt)}</p>
        ${placeholderBadge(n.placeholder)}
        ${n.href ? readMore(n.href) : readMore("#newsroom")}
      </article>
    `
    )
    .join("");

  const dev = developmentPillars
    .filter((d) => homeDevelopmentIds.includes(d.id))
    .map(
      (d) => `
      <article class="pillar-card reveal-block">
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.summary)}</p>
        ${placeholderBadge(d.placeholder)}
        ${readMore(d.href)}
      </article>
    `
    )
    .join("");

  const story = historyChapters
    .filter((ch) => storyChapters.includes(ch.id))
    .map(
      (ch) => `
      <button type="button" class="story-chip reveal-block" data-history-id="${esc(ch.id)}" data-history-title="${esc(ch.title)}" data-history-marker="${esc(ch.marker)}" data-history-summary="${esc(ch.summary)}">
        <span class="chapter-marker">${esc(ch.marker)}</span>
        <strong>${esc(ch.title)}</strong>
      </button>
    `
    )
    .join("");

  const lineage = kings
    .filter((k) => featuredKingIds.includes(k.id))
    .map((k) => {
      const imageId = k.id === 19 ? "hero-home-portrait" : k.id === 17 ? "archive-mwata-xvii-1961" : "";
      const needsVerify =
        k.confidence.includes("uncertain") ||
        k.confidence.includes("contested") ||
        k.confidence.includes("verification");
      return `
      <article class="lineage-card reveal-block ${k.id === 19 ? "is-current" : ""}">
        <button type="button" class="lineage-trigger" aria-expanded="false">
          <span class="lineage-reign">${esc(k.reign)}</span>
          <h3>${esc(k.title)}</h3>
          <p><strong>${esc(k.name)}</strong></p>
        </button>
        <div class="lineage-panel">
          ${imageId ? cardImage("", k.name, k.title, imageId) : ""}
          <p>${esc(k.note)}</p>
          <span class="confidence">${esc(k.confidence)}</span>
          ${needsVerify ? `<p class="verify-note">Details to be verified against kingdom records.</p>` : ""}
          <a class="link-arrow" href="#kingdom-timeline" data-nav="kingdom">Full lineage</a>
        </div>
      </article>
    `;
    })
    .join("");

  const journeySteps = ceremonySteps
    .map(
      (step, i) => `
      <button type="button" class="journey-step ${i === 0 ? "active" : ""}" data-step="${esc(step.id)}">
        <span>${esc(step.day)}</span>
        <strong>${esc(step.label)}</strong>
      </button>
    `
    )
    .join("");

  const journeyPanels = ceremonySteps
    .map((step, i) => {
      const imageId =
        step.id === "arena-dance"
          ? "mutomboko-dance-2017-01"
          : step.id === "ichota" || step.id === "muselo-procession"
            ? "mutomboko-ceremony-2017-02"
            : "";
      return `
      <article class="journey-panel ${i === 0 ? "active" : ""}" data-panel="${esc(step.id)}">
        ${imageId ? cardImage("", step.title, step.label, imageId) : ""}
        <h3>${esc(step.label)} — ${esc(step.title)}</h3>
        <p class="step-location">${esc(step.location)}</p>
        <p>${esc(step.summary)}</p>
      </article>
    `;
    })
    .join("");

  const people = peopleSpotlights
    .map(
      (p) => `
      <article class="people-card reveal-block">
        ${cardImage("", p.title, p.title, p.creditId)}
        <div class="people-card-body">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.note)}</p>
          ${creditCaption(p.creditId, { compact: true })}
        </div>
      </article>
    `
    )
    .join("");

  const galleryFilters = galleryCategories
    .map((c) => `<button type="button" class="gallery-filter ${c.id === "all" ? "active" : ""}" data-filter="${esc(c.id)}">${esc(c.label)}</button>`)
    .join("");

  const gallery = imageCredits
    .map(
      (item) => `
      <button type="button" class="gallery-item reveal-block" data-category="${esc(item.category)}" data-lightbox="${esc(item.id)}" aria-label="Open ${esc(item.title)}">
        <div class="gallery-item-media has-hover-credit">
          <img src="${esc(item.src)}" alt="${esc(item.altText)}" loading="lazy" data-credit-id="${esc(item.id)}">
          <span class="hover-credit">${esc(item.creditLine)}</span>
        </div>
        <span class="gallery-item-title">${esc(item.title)}</span>
      </button>
    `
    )
    .join("");

  const ctas = heroCtas
    .map((c) => `<a class="btn ${c.primary ? "btn-primary" : "btn-secondary"}" href="${esc(c.href)}">${esc(c.label)}</a>`)
    .join("");

  return `
    <section class="royal-hero" id="home">
      <div class="hero-media">
        <img src="${esc(heroCredit?.src || siteMeta.heroImage)}" alt="${esc(heroCredit?.altText || "Mwata Kazembe in royal regalia")}" data-credit-id="hero-home-portrait">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <p class="hero-label">${esc(siteMeta.tagline)}</p>
        <h1>${esc(siteMeta.headline)}</h1>
        <p class="hero-sub">${esc(siteMeta.subheadline)}</p>
        <div class="hero-ctas">${ctas}</div>
        <p class="hero-credit">${esc(heroCredit?.creditLine || "")}</p>
      </div>
    </section>

    <section class="section section-glance reveal-block" id="kingdom-glance">
      <div class="container">
        ${sectionHead("The Kingdom Today", "Kingdom at a Glance")}
        <div class="facts-strip">${glance}</div>
        <div class="glance-map">
          <figure class="credited-figure">
            <div class="figure-media has-hover-credit">
              <img src="${esc(mapCredit?.src || royalMap.image)}" alt="${esc(mapCredit?.altText || "Kazembe Kingdom map")}" loading="lazy" data-credit-id="places-kingdom-map-2007">
              <span class="hover-credit">${esc(mapCredit?.creditLine || "")}</span>
            </div>
            ${creditCaption("places-kingdom-map-2007")}
          </figure>
        </div>
      </div>
    </section>

    <section class="section section-living-kingdom reveal-block" id="living-kingdom">
      <div class="container">
        ${sectionHead("Governance and Public Life", "The Living Kingdom")}
        <p class="section-deck">${esc(siteMeta.openingStatement)}</p>
        <div class="authority-grid swipe-track" data-swipe="leadership">${leadership}</div>
        <p class="section-cta"><a class="btn btn-ghost" href="#governance" data-nav="governance">Royal governance and administration</a></p>
      </div>
    </section>

    <section class="section section-story reveal-block" id="kingdom-story">
      <div class="container story-layout">
        <div>
          ${sectionHead("Migration and Rule", "The Lunda-Kazembe Story")}
          <p class="section-deck">From Kola toward the Luapula Valley — conquest, trade diplomacy, colonial pressure, and continuity at Mwansabombwe.</p>
          <div class="story-chips">${story}</div>
        </div>
        <aside class="history-detail" id="history-detail" aria-live="polite">
          <p class="history-detail-placeholder">Select a chapter to read the kingdom narrative.</p>
        </aside>
      </div>
    </section>

    <section class="section section-lineage reveal-block" id="mwata-lineage">
      <div class="container">
        ${sectionHead("Continuity of Kingship", "The Mwata Lineage")}
        <p class="section-deck">Selected rulers from founding memory to the present officeholder. Uncertain entries remain visibly marked.</p>
        <div class="lineage-grid">${lineage}</div>
      </div>
    </section>

    <section class="section section-mutomboko-journey reveal-block" id="mutomboko-journey">
      <div class="container">
        ${sectionHead("State Ceremony", "Umutomboko — Ceremonial Journey")}
        <p class="section-deck">${esc(mutombokoFeature.meaning)}</p>
        <div class="journey-shell">
          <div class="journey-rail" role="tablist" aria-label="Ceremony stages">${journeySteps}</div>
          <div class="journey-panels">${journeyPanels}</div>
        </div>
        <p class="section-cta"><a class="btn btn-primary" href="#mutomboko" data-nav="mutomboko">Full ceremony section</a></p>
      </div>
    </section>

    <section class="section section-people reveal-block" id="people-kingdom">
      <div class="container">
        ${sectionHead("Community and Ceremony", "People of the Kingdom")}
        <p class="section-deck">Elders, dancers, chiefs, and visitors appear in documented ceremony and royal procession — shown here with source credit.</p>
        <div class="people-grid swipe-track" data-swipe="people">${people}</div>
      </div>
    </section>

    <section class="section section-development reveal-block" id="projects-progress">
      <div class="container">
        ${sectionHead("Kingdom Development", "Projects and Progress")}
        <div class="pillar-grid swipe-track" data-swipe="development">${dev}</div>
        <p class="section-cta"><a class="btn btn-ghost" href="#development" data-nav="development">All development pillars</a></p>
      </div>
    </section>

    <section class="section section-news reveal-block" id="royal-news">
      <div class="container">
        ${sectionHead("Official Communication", "Royal News and Notices")}
        <div class="comm-grid swipe-track" data-swipe="news">${news}</div>
        <p class="section-cta"><a class="btn btn-primary" href="#newsroom" data-nav="newsroom">Visit Newsroom</a></p>
      </div>
    </section>

    <section class="section section-gallery reveal-block" id="home-gallery">
      <div class="container">
        ${sectionHead("Visual Record", "Gallery")}
        <div class="filter-row" id="home-gallery-filters">${galleryFilters}</div>
        <div class="gallery-grid premium-gallery" id="home-gallery-grid">${gallery}</div>
      </div>
    </section>

    <section class="section section-visit reveal-block" id="visit-support">
      <div class="container visit-cta-panel">
        ${sectionHead("Official Contact", "Visit · Learn · Support")}
        <p class="section-deck">Ceremony dates, visitor protocol, royal office contact, and official publications.</p>
        <div class="visit-actions">
          <a class="btn btn-primary" href="#mutomboko-visitor" data-nav="mutomboko">Umutomboko visitor guidance</a>
          <a class="btn btn-ghost" href="#contact" data-nav="contact">Official contact</a>
          <a class="btn btn-ghost" href="#news-publications" data-nav="newsroom">Publications</a>
        </div>
        <p class="visit-note"><strong>Next ceremony:</strong> Expected ${esc(calendar.nextExpected)} (${esc(calendar.status)}). ${esc(calendar.location)}.</p>
      </div>
    </section>
  `;
}
