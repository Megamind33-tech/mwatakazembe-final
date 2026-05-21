import {
  agencies,
  calendar,
  developmentPillars,
  governanceSections,
  governanceStructure,
  heroCtas,
  historyChapters,
  kingdomGlance,
  kingdomSections,
  kings,
  latestCommunications,
  leadershipCards,
  mutombokoFeature,
  mwataProfile,
  navigation,
  newsCategories,
  newsItems,
  publications,
  royalMap,
  siteMeta,
  socialLinks,
  symbolsOfAuthority,
  utilityLinks,
  warsDiplomacy,
  ceremonySteps
} from "./kingdom-data.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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

function cardImage(src, alt, label) {
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

function renderUtilityBar() {
  const links = utilityLinks.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("");
  const social = socialLinks
    .map((s) => `<a href="${esc(s.href)}" title="${esc(s.status)}">${esc(s.label)}</a>`)
    .join("");
  $("#utility-bar").innerHTML = `
    <div class="utility-inner">
      <div class="utility-left">${links}</div>
      <div class="utility-right">${social}</div>
    </div>
  `;
}

function renderNav() {
  const desktop = navigation
    .map((item) => {
      const children = item.children
        ? `<div class="nav-dropdown">${item.children
            .map((c) => `<a href="${esc(c.href)}">${esc(c.label)}</a>`)
            .join("")}</div>`
        : "";
      return `
        <div class="nav-item">
          <a href="${esc(item.href)}" data-nav="${esc(item.id)}">${esc(item.label)}</a>
          ${children}
        </div>
      `;
    })
    .join("");
  $("#primary-nav").innerHTML = desktop;

  const mobile = navigation
    .map((item) => {
      const sub = item.children
        ? `<div class="mobile-sub">${item.children
            .map((c) => `<a href="${esc(c.href)}">${esc(c.label)}</a>`)
            .join("")}</div>`
        : "";
      return `
        <div class="mobile-nav-group">
          <a class="mobile-nav-top" href="${esc(item.href)}" data-nav="${esc(item.id)}">${esc(item.label)}</a>
          ${sub}
        </div>
      `;
    })
    .join("");
  $("#mobile-nav").innerHTML = mobile;
}

function renderFooter() {
  const cols = navigation
    .map(
      (item) => `
      <div class="footer-col">
        <h3><a href="${esc(item.href)}">${esc(item.label)}</a></h3>
        ${
          item.children
            ? `<ul>${item.children.map((c) => `<li><a href="${esc(c.href)}">${esc(c.label)}</a></li>`).join("")}</ul>`
            : ""
        }
      </div>
    `
    )
    .join("");
  $("#site-footer").innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <strong>Mwata Kazembe Kingdom</strong>
        <p>${esc(siteMeta.location)}</p>
        <p class="footer-tagline">${esc(siteMeta.tagline)}</p>
      </div>
      <div class="footer-grid">${cols}</div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Mwata Kazembe Kingdom</span>
        <a href="assets/ATTRIBUTION.md">Image and source attribution</a>
      </div>
    </div>
  `;
}

function renderHome() {
  const leadership = leadershipCards
    .map(
      (c) => `
      <article class="authority-card">
        ${c.image ? cardImage(c.image, c.title, c.title) : cardImage("", c.title, c.title)}
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

  const gov = governanceStructure
    .map(
      (g) => `
      <article class="gov-node" data-tier="${g.tier}">
        <span class="gov-tier">Tier ${g.tier}</span>
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.description)}</p>
        ${placeholderBadge(g.placeholder)}
      </article>
    `
    )
    .join("");

  const news = latestCommunications
    .map(
      (n) => `
      <article class="comm-card ${n.placeholder ? "is-placeholder" : ""}">
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
    .map(
      (d) => `
      <article class="pillar-card">
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.summary)}</p>
        ${placeholderBadge(d.placeholder)}
        ${readMore(d.href)}
      </article>
    `
    )
    .join("");

  const mutoStages = mutombokoFeature.stages
    .map((s) => `<li><strong>${esc(s.day)} — ${esc(s.label)}</strong> ${esc(s.title)} · ${esc(s.location)}</li>`)
    .join("");

  const history = historyChapters
    .map(
      (ch) => `
      <article class="history-chapter">
        <span class="chapter-marker">${esc(ch.marker)}</span>
        <h3>${esc(ch.title)}</h3>
        <p>${esc(ch.summary)}</p>
        <a class="btn btn-ghost" href="#kingdom-timeline">Read full history</a>
      </article>
    `
    )
    .join("");

  const wars = warsDiplomacy
    .map((w) => `<article class="triumph-card"><h3>${esc(w.title)}</h3><p>${esc(w.summary)}</p></article>`)
    .join("");

  const agencyList = agencies
    .map((a) => `<li><strong>${esc(a.name)}</strong> — <span>${esc(a.status)}</span></li>`)
    .join("");

  const ctas = heroCtas
    .map(
      (c) =>
        `<a class="btn ${c.primary ? "btn-primary" : "btn-secondary"}" href="${esc(c.href)}">${esc(c.label)}</a>`
    )
    .join("");

  $("#page-home").innerHTML = `
    <section class="royal-hero" id="home">
      <div class="hero-media">
        <img src="${esc(siteMeta.heroImage)}" alt="Mwata Kazembe in royal regalia">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <p class="hero-label">${esc(siteMeta.tagline)}</p>
        <h1>${esc(siteMeta.headline)}</h1>
        <p class="hero-sub">${esc(siteMeta.subheadline)}</p>
        <div class="hero-ctas">${ctas}</div>
      </div>
    </section>

    <section class="section section-statement">
      <div class="container narrow">
        <p class="lead-statement">${esc(siteMeta.openingStatement)}</p>
      </div>
    </section>

    <section class="section section-leadership" id="leadership">
      <div class="container">
        ${sectionHead("Kingdom Authority", "Leadership of the Kingdom")}
        <div class="authority-grid swipe-track" data-swipe="leadership">${leadership}</div>
      </div>
    </section>

    <section class="section section-glance">
      <div class="container">
        ${sectionHead("The Kingdom Today", "Kingdom at a Glance")}
        <div class="facts-strip">${glance}</div>
      </div>
    </section>

    <section class="section section-governance" id="government">
      <div class="container">
        ${sectionHead("Heritage and Governance", "Government of the Kingdom")}
        <p class="section-deck">Power flows from the Mwata through council, chiefs, courts, and public offices — a living structure of traditional authority and administration.</p>
        <div class="governance-panel">${gov}</div>
      </div>
    </section>

    <section class="section section-news">
      <div class="container">
        ${sectionHead("Official Communication", "Latest from the Kingdom")}
        <div class="comm-grid swipe-track" data-swipe="news">${news}</div>
        <p class="section-cta"><a class="btn btn-primary" href="#newsroom" data-nav="newsroom">Visit Newsroom</a></p>
      </div>
    </section>

    <section class="section section-development">
      <div class="container">
        ${sectionHead("Kingdom Development", "Development and Progress")}
        <div class="pillar-grid swipe-track" data-swipe="development">${dev}</div>
      </div>
    </section>

    <section class="section section-mutomboko-feature" id="mutomboko-home">
      <div class="container split-feature">
        <div class="split-media">
          <img src="${esc(mutombokoFeature.gallery[0].image)}" alt="Mwata Kazembe at Umutomboko ceremony">
          <p class="caption">${esc(mutombokoFeature.gallery[0].caption)}</p>
        </div>
        <div class="split-copy">
          ${sectionHead("Ceremonial Protocol", mutombokoFeature.title)}
          <p><strong>What it means:</strong> ${esc(mutombokoFeature.meaning)}</p>
          <p><strong>Why it matters:</strong> ${esc(mutombokoFeature.why)}</p>
          <ul class="ceremony-stages">${mutoStages}</ul>
          <p><strong>Next ceremony:</strong> Expected ${esc(calendar.nextExpected)} (${esc(calendar.status)}).</p>
          <a class="btn btn-primary" href="#mutomboko" data-nav="mutomboko">Full Mutomboko section</a>
        </div>
      </div>
    </section>

    <section class="section section-history">
      <div class="container">
        ${sectionHead("Timeline of Power", "History of Power")}
        <div class="history-grid">${history}</div>
      </div>
    </section>

    <section class="section section-wars">
      <div class="container">
        ${sectionHead("Trade, Land and Community Order", "Wars, Diplomacy and Triumphs")}
        <p class="section-deck">Presented with historical seriousness — defence, state formation, trade power, and cultural continuity.</p>
        <div class="triumph-grid">${wars}</div>
      </div>
    </section>

    <section class="section section-map">
      <div class="container">
        ${sectionHead("The Royal Seat", "Royal Map")}
        <div class="map-layout">
          <figure class="map-figure">
            <img src="${esc(royalMap.image)}" alt="Map of Kazembe Kingdom">
            <figcaption>${esc(royalMap.caption)}</figcaption>
          </figure>
          <aside class="map-aside">
            <h3>Key Places</h3>
            <ul>${royalMap.places.map((p) => `<li><strong>${esc(p.name)}</strong> — ${esc(p.role)}</li>`).join("")}</ul>
            <h3>Historic Routes</h3>
            <ul class="route-list">${royalMap.routes.map((r) => `<li><strong>${esc(r.title)}</strong> (${esc(r.period)})</li>`).join("")}</ul>
            <p class="map-note"><span class="badge badge-required">Map data required</span> for interactive GIS layers.</p>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section-agencies">
      <div class="container">
        ${sectionHead("Institutions", "Agencies, Institutions and Partners")}
        <ul class="agency-list">${agencyList}</ul>
      </div>
    </section>
  `;
}

function renderMwata() {
  const past = kings
    .slice()
    .reverse()
    .map(
      (k) => `
      <tr class="${k.confidence?.includes("uncertain") || k.confidence?.includes("contested") ? "is-uncertain" : ""}">
        <td>${esc(k.title)}</td>
        <td>${esc(k.name)}</td>
        <td>${esc(k.reign)}</td>
        <td><span class="confidence">${esc(k.confidence)}</span></td>
      </tr>
    `
    )
    .join("");

  const symbols = symbolsOfAuthority
    .map(
      (s) => `
      <article class="symbol-card">
        ${s.image ? cardImage(s.image, s.title, s.title) : cardImage("", s.title, "Symbol")}
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.description)}</p>
        ${placeholderBadge(s.placeholder)}
      </article>
    `
    )
    .join("");

  $("#page-mwata").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="page-hero-bg" style="background-image:url('${esc(mwataProfile.image)}')"></div>
      <div class="container page-hero-content">
        <p class="eyebrow">The Mwata</p>
        <h1>Office of the Mwata Kazembe</h1>
        <p>Centre of authority, continuity, ceremony, and public leadership.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection" id="mwata-office">
        ${sectionHead("The Royal Seat", "His Royal Highness Mwata Kazembe")}
        <div class="profile-layout">
          <figure class="profile-portrait">
            <img src="${esc(mwataProfile.image)}" alt="${esc(mwataProfile.name)}">
            <figcaption>Portrait supplied for official use; source rights pending confirmation.</figcaption>
          </figure>
          <div>
            <h3>${esc(mwataProfile.title)} — ${esc(mwataProfile.name)}</h3>
            <p><strong>Reign:</strong> ${esc(mwataProfile.reign)}</p>
            <p>${esc(mwataProfile.role)}</p>
            <ul>${mwataProfile.biography.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          </div>
        </div>
      </section>
      <section class="subsection accordion-block" id="mwata-household">
        <button class="accordion-trigger" type="button" aria-expanded="false">Royal Household</button>
        <div class="accordion-panel"><p>content required — structure and officers of the royal household.</p></div>
      </section>
      <section class="subsection" id="mwata-past">
        ${sectionHead("Continuity of Power", "Past Mwatas")}
        <div class="table-wrap">
          <table class="ruler-table">
            <thead><tr><th>Title</th><th>Name</th><th>Reign</th><th>Record</th></tr></thead>
            <tbody>${past}</tbody>
          </table>
        </div>
      </section>
      <section class="subsection accordion-block" id="mwata-palace">
        <button class="accordion-trigger" type="button" aria-expanded="false">Palace and Royal Court</button>
        <div class="accordion-panel"><p>content required — palace grounds, Ichota, and court protocol at Mwansabombwe.</p></div>
      </section>
      <section class="subsection" id="mwata-symbols">
        ${sectionHead("Ceremonial Protocol", "Symbols of Authority")}
        <div class="symbol-grid">${symbols}</div>
      </section>
    </div>
  `;
}

function renderGovernance() {
  const blocks = governanceSections
    .map(
      (s) => `
      <section class="subsection accordion-block" id="${esc(s.id)}">
        <button class="accordion-trigger" type="button" aria-expanded="false">${esc(s.title)}</button>
        <div class="accordion-panel"><p>${esc(s.body)}</p></div>
      </section>
    `
    )
    .join("");

  $("#page-governance").innerHTML = `
    <div class="page-hero page-hero-compact page-hero-governance">
      <div class="container page-hero-content">
        <p class="eyebrow">Governance</p>
        <h1>Royal Governance and Administration</h1>
        <p>How the Kingdom is organized — council, chiefs, court, land, protocol, and public communication.</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="governance-panel governance-panel-page">${governanceStructure
        .map(
          (g) => `
        <article class="gov-node" data-tier="${g.tier}">
          <h3>${esc(g.title)}</h3>
          <p>${esc(g.description)}</p>
          ${placeholderBadge(g.placeholder)}
        </article>`
        )
        .join("")}</div>
      ${blocks}
    </div>
  `;
}

function renderKingdom() {
  const chapters = historyChapters
    .map(
      (ch) => `
      <article class="history-chapter">
        <span class="chapter-marker">${esc(ch.marker)}</span>
        <h3>${esc(ch.title)}</h3>
        <p>${esc(ch.summary)}</p>
      </article>
    `
    )
    .join("");

  const sections = kingdomSections
    .map(
      (s) => `
      <section class="subsection accordion-block" id="${esc(s.id)}">
        <button class="accordion-trigger" type="button" aria-expanded="false">${esc(s.title)}</button>
        <div class="accordion-panel"><p>${esc(s.body)}</p></div>
      </section>
    `
    )
    .join("");

  const timeline = kings
    .map(
      (k) => `
      <article class="timeline-entry ${k.id === 19 ? "is-current" : ""}">
        <span class="timeline-reign">${esc(k.reign)}</span>
        <h3>${esc(k.title)}</h3>
        <p><strong>${esc(k.name)}</strong> — ${esc(k.note)}</p>
        <span class="confidence">${esc(k.confidence)}</span>
      </article>
    `
    )
    .join("");

  $("#page-kingdom").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">The Kingdom</p>
        <h1>History as State Formation</h1>
        <p>Migration, trade, war, diplomacy, settlement, survival, and triumph — not a dusty archive.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection" id="kingdom-chapters">
        ${sectionHead("Chapters of Power", "History of Power")}
        <div class="history-grid">${chapters}</div>
      </section>
      ${sections}
      <section class="subsection" id="kingdom-timeline">
        ${sectionHead("Timeline of Power", "Mwata Kazembe Line")}
        <div class="timeline-list">${timeline}</div>
      </section>
      <section class="subsection" id="kingdom-map-ref">
        <figure class="map-figure">
          <img src="${esc(royalMap.image)}" alt="Kazembe Kingdom map">
          <figcaption>${esc(royalMap.caption)}</figcaption>
        </figure>
      </section>
    </div>
  `;
}

function renderMutomboko() {
  const program = ceremonySteps
    .map(
      (step) => `
      <article class="ceremony-step">
        <span class="step-day">${esc(step.day)}</span>
        <h3>${esc(step.label)} — ${esc(step.title)}</h3>
        <p class="step-location">${esc(step.location)}</p>
        <p>${esc(step.summary)}</p>
      </article>
    `
    )
    .join("");

  const gallery = mutombokoFeature.gallery
    .map(
      (g) => `
      <figure class="gallery-card">
        <img src="${esc(g.image)}" alt="${esc(g.caption)}">
        <figcaption>${esc(g.caption)}</figcaption>
      </figure>
    `
    )
    .join("");

  $("#page-mutomboko").innerHTML = `
    <div class="page-hero page-hero-mutomboko">
      <div class="page-hero-bg" style="background-image:url('${esc(siteMeta.ceremonyImage)}')"></div>
      <div class="container page-hero-content">
        <p class="eyebrow">State Ceremony</p>
        <h1>Mutomboko — Dance of Victory</h1>
        <p>Ceremonial power, identity, and unity at Mwansabombwe.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection" id="mutomboko-meaning">
        ${sectionHead("Ceremonial Protocol", "Meaning of Mutomboko")}
        <p>${esc(mutombokoFeature.meaning)}</p>
        <p>${esc(mutombokoFeature.why)}</p>
      </section>
      <section class="subsection" id="mutomboko-program">
        ${sectionHead("Ceremony Program", "Ceremony Stages")}
        <div class="ceremony-program">${program}</div>
      </section>
      <section class="subsection accordion-block" id="mutomboko-past">
        <button class="accordion-trigger" type="button" aria-expanded="false">Past Ceremonies</button>
        <div class="accordion-panel"><p>Archive of past ceremony reports and media: content required.</p></div>
      </section>
      <section class="subsection" id="mutomboko-gallery">
        ${sectionHead("Media Gallery", "Photo and Video Gallery")}
        <div class="gallery-grid swipe-track" data-swipe="gallery">${gallery}
          <figure class="gallery-card gallery-placeholder"><span>content required — additional verified media</span></figure>
        </div>
      </section>
      <section class="subsection" id="mutomboko-visitor">
        ${sectionHead("Visitor Information", "Visitor Guidance")}
        <p><strong>Location:</strong> ${esc(calendar.location)}</p>
        <p><strong>Annual pattern:</strong> ${esc(calendar.annualPattern)}</p>
        <p><strong>Expected next:</strong> ${esc(calendar.nextExpected)} (${esc(calendar.status)})</p>
        <p>Confirmed 2025 dates on record: ${esc(calendar.confirmed2025)}.</p>
      </section>
      <section class="subsection" id="mutomboko-protocol">
        ${sectionHead("Dress and Conduct", "Protocol and Dress Guidance")}
        <p>${esc(mutombokoFeature.protocolNote)}</p>
      </section>
    </div>
  `;
}

function renderDevelopment() {
  const pillars = developmentPillars
    .map(
      (d) => `
      <article class="pillar-card pillar-card-page" id="${esc(d.id)}">
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.summary)}</p>
        ${placeholderBadge(d.placeholder)}
      </article>
    `
    )
    .join("");

  $("#page-development").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Kingdom Development</p>
        <h1>Development and Progress</h1>
        <p>The Kingdom active in agriculture, fisheries, tourism, youth, business, and community building.</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="pillar-grid pillar-grid-page">${pillars}</div>
    </div>
  `;
}

function renderNewsroom() {
  const filters = newsCategories
    .map((c) => `<button type="button" class="filter-btn ${c === "all" ? "active" : ""}" data-filter="${esc(c)}">${esc(c === "all" ? "All" : c)}</button>`)
    .join("");

  const items = newsItems
    .map(
      (n) => `
      <article class="news-card" data-category="${esc(n.category)}">
        <span class="comm-category">${esc(n.category)}</span>
        <h3>${esc(n.title)}</h3>
        <time>${esc(n.date)}</time>
        <p>${esc(n.excerpt)}</p>
        ${placeholderBadge(n.placeholder)}
      </article>
    `
    )
    .join("");

  const pubs = publications
    .map(
      (p) => `
      <article class="publication-card">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.note || p.type)}</p>
        ${p.url ? `<a href="${esc(p.url)}" ${p.url.endsWith(".pdf") ? "" : 'target="_blank" rel="noreferrer"'}>Open</a>` : placeholderBadge(p.placeholder)}
      </article>
    `
    )
    .join("");

  $("#page-newsroom").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Newsroom</p>
        <h1>Official Communications</h1>
        <p>Statements, news, speeches, events, and publications from the Kingdom.</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="news-tools">
        <label class="search-label" for="news-search">Search publications and news</label>
        <input id="news-search" type="search" placeholder="Search by title or category" aria-label="Search news">
        <div class="filter-row" id="news-filters">${filters}</div>
      </div>
      <div class="news-grid" id="news-grid">${items}</div>
      <section class="subsection" id="news-publications">
        ${sectionHead("Publications", "Kingdom Publications")}
        <div class="publication-grid">${pubs}</div>
      </section>
    </div>
  `;
}

function renderContact() {
  const offices = Object.values(siteMeta.contact)
    .map(
      (o) => `
      <article class="contact-card">
        <h3>${esc(o.label)}</h3>
        <p>${esc(o.value)}</p>
        <p>${esc(o.email)}</p>
        <span class="badge badge-required">content required</span>
      </article>
    `
    )
    .join("");

  $("#page-contact").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Contact</p>
        <h1>Official Contact</h1>
        <p>Royal office, media, events, and visitor inquiries.</p>
      </div>
    </div>
    <div class="container page-body">
      <p class="contact-location"><strong>Location:</strong> ${esc(siteMeta.location)}</p>
      <div class="contact-grid">${offices}</div>
    </div>
  `;
}

function pageFromHash(hash) {
  if (!hash || hash === "home") return "home";
  if (hash.startsWith("mwata")) return "mwata";
  if (hash.startsWith("gov")) return "governance";
  if (hash.startsWith("kingdom")) return "kingdom";
  if (hash.startsWith("mutomboko")) return "mutomboko";
  if (hash.startsWith("dev")) return "development";
  if (hash.startsWith("news")) return "newsroom";
  if (hash === "contact") return "contact";
  if (hash === "leadership" || hash === "government") return "home";
  const top = hash.split("-")[0];
  return navigation.some((n) => n.id === top) ? top : "home";
}

function showPage(pageId) {
  $$(".page").forEach((p) => p.classList.toggle("active", p.dataset.page === pageId));
  $$("[data-nav]").forEach((el) => {
    if (el.dataset.nav) el.classList.toggle("is-active", el.dataset.nav === pageId);
  });
  document.body.dataset.page = pageId;
  closeMobileDrawer();
  window.scrollTo({ top: 0, behavior: "smooth" });
  animateReveal();
}

function resolvePageFromHash() {
  const hash = (location.hash || "#home").slice(1);
  const pageId = pageFromHash(hash);
  showPage(pageId);
  if (hash && hash !== pageId) {
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function closeMobileDrawer() {
  const drawer = $("#mobile-drawer");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  $("#menu-toggle").setAttribute("aria-expanded", "false");
}

function openMobileDrawer() {
  const drawer = $("#mobile-drawer");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  $("#menu-toggle").setAttribute("aria-expanded", "true");
}

function bindAccordions() {
  $$(".accordion-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.nextElementSibling?.classList.toggle("open", !expanded);
    });
  });
}

function bindNewsFilters() {
  const grid = $("#news-grid");
  if (!grid) return;
  const cards = $$(".news-card", grid);
  const search = $("#news-search");

  function applyFilters() {
    const q = (search?.value || "").toLowerCase();
    const active = $(".filter-btn.active", $("#news-filters"))?.dataset.filter || "all";
    cards.forEach((card) => {
      const cat = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const matchCat = active === "all" || cat === active;
      const matchQ = !q || text.includes(q);
      card.hidden = !(matchCat && matchQ);
    });
  }

  $$(".filter-btn", $("#news-filters")).forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn", $("#news-filters")).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });
  search?.addEventListener("input", applyFilters);
}

function bindNavigation() {
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) {
      e.preventDefault();
      const page = nav.dataset.nav;
      history.pushState(null, "", `#${page}`);
      showPage(page);
      return;
    }
    const href = e.target.closest("a[href^='#']");
    if (href) {
      const id = href.getAttribute("href").slice(1);
      const pageId = pageFromHash(id);
      if (pageId) {
        e.preventDefault();
        history.pushState(null, "", href.getAttribute("href"));
        showPage(pageId);
        requestAnimationFrame(() => {
          const anchor = document.getElementById(id);
          if (anchor && id !== pageId) anchor.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  });

  window.addEventListener("hashchange", resolvePageFromHash);
  window.addEventListener("popstate", resolvePageFromHash);

  $("#menu-toggle")?.addEventListener("click", () => {
    if ($("#mobile-drawer").classList.contains("open")) closeMobileDrawer();
    else openMobileDrawer();
  });
  $("#drawer-close")?.addEventListener("click", closeMobileDrawer);
  $("#mobile-drawer")?.addEventListener("click", (e) => {
    if (e.target === $("#mobile-drawer")) closeMobileDrawer();
  });
}

function animateReveal() {
  if (!window.gsap) return;
  gsap.from(".page.active .section-head, .page.active .royal-hero .hero-content > *", {
    opacity: 0,
    y: 18,
    duration: 0.55,
    stagger: 0.06,
    ease: "power2.out",
    clearProps: "opacity,transform"
  });
}

function init() {
  renderUtilityBar();
  renderNav();
  renderFooter();
  renderHome();
  renderMwata();
  renderGovernance();
  renderKingdom();
  renderMutomboko();
  renderDevelopment();
  renderNewsroom();
  renderContact();
  bindAccordions();
  bindNewsFilters();
  bindNavigation();
  resolvePageFromHash();
}

init();
