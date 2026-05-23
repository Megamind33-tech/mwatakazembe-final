import {
  calendar,
  developmentPillars,
  heroCtas,
  historyChapters,
  homeDevelopmentIds,
  homeLeadershipCards,
  kingdomAgencies,
  kingdomGlance,
  kings,
  latestCommunications,
  mutombokoFeature,
  officialNoticeStrip,
  peopleSpotlights,
  royalMap,
  siteMeta,
  storyChapters,
  ceremonySteps,
  externalMediaSources,
  governanceInstitutions
} from "./kingdom-data.js";
import { clansIntroduction, clanRegistry, clanRegistryNote } from "./clans-data.js";
import { enrichKings } from "./ruler-profiles.js";
import { creditCaption, galleryCategories, getCreditById, imageCredits } from "./image-credits.js";
import { esc, pendingNote, sectionHead } from "./ui-helpers.js";

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

const enrichedKings = enrichKings(kings);

function lineageRailHtml() {
  return enrichedKings
    .map((k) => {
      const uncertain =
        k.confidence.includes("uncertain") ||
        k.confidence.includes("contested") ||
        k.confidence.includes("verification");
      return `
      <button type="button" class="lineage-rail-item ${k.id === 19 ? "is-current" : ""} ${uncertain ? "is-uncertain" : ""}"
        data-king-id="${k.id}"
        data-king-title="${esc(k.title)}"
        data-king-name="${esc(k.name)}"
        data-king-reign="${esc(k.reign)}"
        data-king-note="${esc(k.note)}"
        data-king-confidence="${esc(k.confidence)}"
        data-king-sources="${esc((k.sources || []).join(","))}">
        <span class="lineage-rail-num">${String(k.id).padStart(2, "0")}</span>
        <span class="lineage-rail-title">${esc(k.title)}</span>
        <span class="lineage-rail-name">${esc(k.name)}</span>
        <span class="lineage-rail-reign">${esc(k.reign)}</span>
      </button>
    `;
    })
    .join("");
}

export function homePageHtml() {
  const heroCredit = getCreditById("hero-home-portrait");
  const mapCredit = getCreditById("places-kingdom-map-2007");

  const leadership = homeLeadershipCards
    .map(
      (c) => `
      <article class="authority-card">
        ${c.imageCreditId ? cardImage("", c.title, c.title, c.imageCreditId) : cardImage("", c.title, c.title)}
        <div class="authority-card-body">
          <p class="office-label">${esc(c.role)}</p>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.description)}</p>
          ${c.placeholder ? pendingNote("Officer list to be published by the Royal Council.") : ""}
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
    .filter((n) => !n.placeholder)
    .slice(0, 3)
    .concat(latestCommunications.filter((n) => n.placeholder).slice(0, 1))
    .map(
      (n) => `
      <article class="comm-card ${n.placeholder ? "is-pending" : ""}">
        <span class="comm-category">${esc(n.category)}</span>
        <h3>${esc(n.title)}</h3>
        <time>${esc(n.date)}</time>
        <p>${esc(n.excerpt)}</p>
        ${n.placeholder ? pendingNote() : readMore(n.href || "#newsroom")}
      </article>
    `
    )
    .join("");

  const dev = developmentPillars
    .filter((d) => homeDevelopmentIds.includes(d.id))
    .map(
      (d) => `
      <article class="pillar-card">
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.summary)}</p>
        ${readMore(d.href)}
      </article>
    `
    )
    .join("");

  const story = historyChapters
    .filter((ch) => storyChapters.includes(ch.id))
    .map(
      (ch) => `
      <button type="button" class="story-chip" data-history-id="${esc(ch.id)}" data-history-title="${esc(ch.title)}" data-history-marker="${esc(ch.marker)}" data-history-summary="${esc(ch.summary)}">
        <span class="chapter-marker">${esc(ch.marker)}</span>
        <strong>${esc(ch.title)}</strong>
      </button>
    `
    )
    .join("");

  const govCards = governanceInstitutions.slice(0, 6)
    .map(
      (g) => `
      <article class="gov-institution-card">
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.function)}</p>
        ${g.pending ? pendingNote("Roster to be confirmed with the Royal Office.") : readMore(`#${g.id === "protocol" ? "protocol" : "governance"}`)}
      </article>
    `
    )
    .join("");

  const clanRoles = clansIntroduction.roles
    .map((r) => `<article class="clan-role-card"><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></article>`)
    .join("");

  const clanRows = clanRegistry
    .map(
      (row) => `
      <tr>
        <td>${row.clanName ? esc(row.clanName) : '<em class="pending-cell">Verified register pending</em>'}</td>
        <td>${row.clanHead ? esc(row.clanHead) : "—"}</td>
        <td>${esc(row.area || "—")}</td>
        <td>${esc(row.ceremonyRole || "—")}</td>
        <td><span class="verification-badge">${esc(row.verification === "pending_official_register" ? "Awaiting Royal Office" : row.verification)}</span></td>
      </tr>
    `
    )
    .join("");

  const agencies = kingdomAgencies
    .map(
      (a) => `
      <article class="agency-card" id="${esc(a.id)}">
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.function)}</p>
        ${a.pending ? pendingNote() : readMore(a.href)}
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
      let imageHtml = "";
      if (step.id === "arena-dance") {
        imageHtml = cardImage("", step.title, step.label, "mutomboko-dance-2017-01");
      } else if (step.id === "muselo-procession") {
        imageHtml = `
          <div class="step-images-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            ${cardImage("", "Mwata Kazembe XIX carried in the Muselo", step.label, "mutomboko-muselo-crowd")}
            ${cardImage("", "Mwata Kazembe XIX in the Muselo", step.label, "mutomboko-muselo-mwata")}
          </div>
        `;
      } else if (step.id === "ngona") {
        imageHtml = `
          <div class="step-images-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            ${cardImage("", "Traditional offerings at the Ng'ona River", step.label, "mutomboko-ngona-offerings")}
            ${cardImage("", "Mwata Kazembe XIX blessing the Ng'ona River", step.label, "mutomboko-ngona-blessing")}
          </div>
        `;
      } else if (step.id === "mpembwe") {
        imageHtml = cardImage("", "Mwata Kazembe XIX at the Mpembwe Shrine", step.label, "mutomboko-mpembwe-shrine");
      }
      return `
      <article class="journey-panel ${i === 0 ? "active" : ""}" data-panel="${esc(step.id)}">
        ${imageHtml}
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
      <article class="people-card">
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
      <button type="button" class="gallery-item" data-category="${esc(item.category)}" data-lightbox="${esc(item.id)}" aria-label="Open ${esc(item.title)}">
        <div class="gallery-item-media has-hover-credit">
          <img src="${esc(item.src)}" alt="${esc(item.altText)}" loading="lazy" data-credit-id="${esc(item.id)}">
          <span class="hover-credit">${esc(item.creditLine)}</span>
        </div>
        <span class="gallery-item-title">${esc(item.title)}</span>
        <span class="gallery-item-type">${esc(item.imageType || "documentary")}</span>
      </button>
    `
    )
    .join("");

  const mediaSources = externalMediaSources
    .map(
      (s) => `
      <li class="media-source-item">
        <a href="${esc(s.url)}" target="_blank" rel="noreferrer"><strong>${esc(s.title)}</strong></a>
        <span>${esc(s.publisher)}</span>
        <p>${esc(s.note)}</p>
      </li>
    `
    )
    .join("");

  const ctas = heroCtas
    .map((c) => `<a class="btn ${c.primary ? "btn-primary" : "btn-secondary"}" href="${esc(c.href)}">${esc(c.label)}</a>`)
    .join("");

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

    <section class="section section-office" id="office-mwata">
      <div class="container">
        ${sectionHead("Centre of Authority", "Office of the Mwata Kazembe")}
        <p class="section-deck">His Royal Highness Mwata Kazembe XIX presides over ceremony, council deliberation, and public leadership from Mwansabombwe.</p>
        <div class="authority-grid swipe-track" data-swipe="leadership">${leadership}</div>
        <p class="section-cta"><a class="btn btn-ghost" href="#mwata" data-nav="mwata">Full Office of the Mwata</a></p>
      </div>
    </section>

    <section class="section section-governance-home" id="home-governance">
      <div class="container">
        ${sectionHead("Traditional Administration", "The Council, Chiefs and Court of the Kingdom")}
        <div class="gov-institution-grid">${govCards}</div>
        <p class="section-cta"><a class="btn btn-ghost" href="#governance" data-nav="governance">Royal governance</a></p>
      </div>
    </section>

    <section class="section section-clans-home" id="clans-people">
      <div class="container">
        ${sectionHead("Lineage and Community", clansIntroduction.title)}
        <p class="section-deck">${esc(clansIntroduction.deck)}</p>
        <div class="clan-roles-grid">${clanRoles}</div>
        <div class="clan-registry-wrap">
          <h3 class="subsection-title">Clan register</h3>
          <table class="clan-registry-table">
            <thead><tr><th>Clan</th><th>Head / representative</th><th>Area</th><th>Ceremony / governance</th><th>Status</th></tr></thead>
            <tbody>${clanRows}</tbody>
          </table>
          <p class="editorial-note">${esc(clanRegistryNote)}</p>
          <p class="section-cta">
            <a class="btn btn-primary" href="#clans" data-nav="clans">Clans & People</a>
            <a class="btn btn-ghost" href="#clans-verify" data-nav="clans">Submit correction</a>
          </p>
        </div>
      </div>
    </section>

    <section class="section section-story" id="kingdom-story">
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

    <section class="section section-lineage" id="mwata-lineage">
      <div class="container">
        ${sectionHead("Continuity of Kingship", "The Mwata Kazembe Line")}
        <p class="section-deck">Nineteen recorded rulers from Mwata Kazembe I to XIX — select a Mwata for reign dates, historical role, and source notes.</p>
        <div class="lineage-shell">
          <div class="lineage-rail swipe-track" data-swipe="lineage" role="tablist" aria-label="Mwata Kazembe rulers">${lineageRailHtml()}</div>
          <aside class="lineage-detail" id="lineage-detail" aria-live="polite">
            <p class="lineage-detail-placeholder">Select a Mwata to open the ruler profile.</p>
          </aside>
        </div>
        <p class="section-cta">
          <a class="btn btn-ghost" href="#early-mwatas" data-nav="kingdom">Early Mwatas — full profiles</a>
          <a class="btn btn-ghost" href="#kingdom-timeline" data-nav="kingdom">Kingdom timeline</a>
        </p>
      </div>
    </section>

    <section class="section section-mutomboko-journey" id="mutomboko-journey">
      <div class="container">
        ${sectionHead("State Ceremony", "Umutomboko: The State Ceremony of Conquest")}
        <p class="section-deck">${esc(mutombokoFeature.meaning)}</p>
        <div class="journey-shell">
          <div class="journey-rail" role="tablist" aria-label="Ceremony stages">${journeySteps}</div>
          <div class="journey-panels">${journeyPanels}</div>
        </div>
        <p class="section-cta"><a class="btn btn-primary" href="#mutomboko" data-nav="mutomboko">Ceremony and visitor protocol</a></p>
      </div>
    </section>

    <section class="section section-agencies" id="kingdom-agencies">
      <div class="container">
        ${sectionHead("Royal Administration", "Kingdom Agencies and Development Desks")}
        <div class="agency-grid">${agencies}</div>
        <p class="section-cta"><a class="btn btn-ghost" href="#agencies" data-nav="governance">All agencies</a></p>
      </div>
    </section>

    <section class="section section-development" id="development-public">
      <div class="container">
        ${sectionHead("Luapula Public Life", "Development & Public Life")}
        <div class="pillar-grid swipe-track" data-swipe="development">${dev}</div>
        <p class="section-cta"><a class="btn btn-ghost" href="#development" data-nav="development">All development pillars</a></p>
      </div>
    </section>

    <section class="section section-news" id="royal-news">
      <div class="container">
        ${sectionHead("Communications", "Royal Notices and Public Affairs")}
        <div class="comm-grid swipe-track" data-swipe="news">${news}</div>
        <p class="section-cta"><a class="btn btn-primary" href="#newsroom" data-nav="newsroom">Visit Newsroom</a></p>
      </div>
    </section>

    <section class="section section-gallery" id="home-gallery">
      <div class="container">
        ${sectionHead("Visual Record", "Gallery & Sources")}
        <div class="filter-row" id="home-gallery-filters">${galleryFilters}</div>
        <div class="gallery-grid premium-gallery" id="home-gallery-grid">${gallery}</div>
        <div class="media-sources-panel">
          <h3>Further verified media sources</h3>
          <p class="section-deck">Ceremony and kingdom photography from official and press sources — use with publisher permission where required.</p>
          <ul class="media-sources-list">${mediaSources}</ul>
        </div>
      </div>
    </section>

    <section class="section section-people" id="people-kingdom">
      <div class="container">
        ${sectionHead("Ceremony and Court", "Clans, Lineage and the People of Luapula")}
        <p class="section-deck">Documented ceremony participants and royal office — every image credited to source.</p>
        <div class="people-grid swipe-track" data-swipe="people">${people}</div>
      </div>
    </section>

    <section class="section section-visit" id="visit-support">
      <div class="container visit-cta-panel">
        ${sectionHead("Official Contact", "Visit · Learn · Support")}
        <p class="section-deck">Ceremony dates, visitor protocol, royal office contact, and official publications.</p>
        <div class="visit-actions">
          <a class="btn btn-primary" href="#mutomboko-visitor" data-nav="mutomboko">Umutomboko visitor guidance</a>
          <a class="btn btn-ghost" href="#contact" data-nav="contact">Official contact</a>
          <a class="btn btn-ghost" href="#publications" data-nav="newsroom">Publications</a>
          <a class="btn btn-ghost" href="#gallery" data-nav="newsroom">Gallery</a>
        </div>
        <p class="visit-note"><strong>Next ceremony:</strong> Expected ${esc(calendar.nextExpected)} (${esc(calendar.status)}). ${esc(calendar.location)}.</p>
      </div>
    </section>
  `;
}
