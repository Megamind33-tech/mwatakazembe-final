import {
  calendar,
  developmentPillars,
  governanceInstitutions,
  governanceSections,
  governanceStructure,
  historyChapters,
  kingdomAgencies,
  kingdomSections,
  kings,
  latestCommunications,
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
  ceremonySteps,
  museumItems,
  storeProducts
} from "./kingdom-data.js";
import {
  clansIntroduction,
  clanRegistry,
  clanRegistryNote,
  royalFamilyOffices
} from "./clans-data.js";
import { creditCaption, getCreditById } from "./image-credits.js";
import { initInteractions } from "./interactions.js";
import { homePageHtml } from "./render-home.js";
import { enrichKings } from "./ruler-profiles.js";
import { esc, pendingNote, sectionHead, sourceCitation } from "./ui-helpers.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const enrichedKings = enrichKings(kings);

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
        <div class="footer-brand-identity">
          <img class="footer-coa" src="assets/images/kazembe/identity/coat-of-arms.png" alt="Mwata Kazembe Coat of Arms" width="44" height="44" loading="lazy">
          <div>
            <strong>Mwata Kazembe Kingdom</strong>
            <p class="footer-tagline">${esc(siteMeta.tagline)}</p>
          </div>
        </div>
        <p>${esc(siteMeta.location)}</p>
      </div>
      <div class="footer-grid">${cols}</div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Mwata Kazembe Kingdom</span>
        <a href="assets/ATTRIBUTION.md">Image and source attribution</a>
      </div>
    </div>
  `;

  if (!document.getElementById("back-to-top")) {
    const btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.className = "back-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.textContent = "↑";
    document.body.appendChild(btn);
  }
}

function renderHome() {
  $("#page-home").innerHTML = homePageHtml();
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
        ${s.image || s.verified ? cardImage("", s.title, s.title, "mutomboko-dance-2017-01") : cardImage("", s.title, "Symbol")}
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.description)}</p>
        ${s.placeholder ? pendingNote() : ""}
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
          <figure class="profile-portrait credited-figure">
            <div class="figure-media has-hover-credit">
              <img src="${esc(getCreditById("hero-home-portrait")?.src || mwataProfile.image)}" alt="${esc(mwataProfile.name)}" data-credit-id="hero-home-portrait">
              <span class="hover-credit">${esc(getCreditById("hero-home-portrait")?.creditLine || "")}</span>
            </div>
            ${creditCaption("hero-home-portrait")}
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
        <div class="accordion-panel"><p>The Royal Household comprises the palace officers, regalia custodians, and protocol staff at Ichota and the royal compound. Formal inquiries regarding royal household matters are directed to the Royal Protocol Office.</p></div>
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
        <div class="accordion-panel"><p>Palace grounds, Ichota, and court protocol at Mwansabombwe are described in ceremony and academic sources; official visitor guidance is published under Umutomboko.</p></div>
      </section>
      <section class="subsection" id="mwata-symbols">
        ${sectionHead("Ceremonial Protocol", "Symbols of Authority")}
        <div class="symbol-grid">${symbols}</div>
      </section>
    </div>
  `;
}

function renderClans() {
  const roles = clansIntroduction.roles
    .map((r) => `<article class="clan-role-card"><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></article>`)
    .join("");

  const rows = clanRegistry
    .map(
      (row) => `
      <tr>
        <td>${row.clanName ? esc(row.clanName) : '<em class="pending-cell">Verified register pending</em>'}</td>
        <td>${row.clanHead ? esc(row.clanHead) : "—"}</td>
        <td>${esc(row.area || "—")}</td>
        <td>${esc(row.ceremonyRole || "—")}</td>
        <td><span class="verification-badge">Awaiting Royal Office</span></td>
      </tr>
    `
    )
    .join("");

  const family = royalFamilyOffices
    .map((o) => `<article class="royal-family-card"><h3>${esc(o.title)}</h3><p>${esc(o.function)}</p></article>`)
    .join("");

  $("#page-clans").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Clans & People</p>
        <h1>${esc(clansIntroduction.title)}</h1>
        <p>${esc(clansIntroduction.deck)}</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection" id="clans-roles">
        ${sectionHead("Custodians of identity", "Clan roles in the kingdom")}
        <div class="clan-roles-grid">${roles}</div>
      </section>
      <section class="subsection" id="clans-register">
        ${sectionHead("Official register", "Clan register")}
        ${rows ? `<table class="clan-registry-table">
          <thead><tr><th>Clan</th><th>Head / representative</th><th>Area</th><th>Ceremony / governance</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>` : ""}
        <p class="editorial-note">${esc(clanRegistryNote)}</p>
      </section>
      <section class="subsection" id="royal-family">
        ${sectionHead("Royal household", "Royal family and senior offices")}
        <div class="royal-family-grid">${family}</div>
      </section>
      <section class="subsection" id="clans-verify">
        ${sectionHead("Corrections", "Verify a clan record")}
        <p>Submissions and corrections are directed to the Royal Protocol Office at Mwansabombwe. Use the official contact page to reach the Royal Office.</p>
        <p class="section-cta"><a class="btn btn-primary" href="#contact" data-nav="contact">Official contact</a></p>
      </section>
    </div>
  `;
}

function renderGovernance() {
  const govAnchor = (id) => (["council", "chiefs", "protocol"].includes(id) ? id : `gov-${id}`);
  const institutions = governanceInstitutions
    .map(
      (g) => `
      <article class="gov-institution-card" id="${esc(govAnchor(g.id))}">
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.function)}</p>
        ${g.pending ? pendingNote() : ""}
      </article>
    `
    )
    .join("");

  const agencyCards = kingdomAgencies
    .map(
      (a) => `
      <article class="agency-card" id="${esc(a.id)}">
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.function)}</p>
        ${a.pending ? pendingNote() : ""}
      </article>
    `
    )
    .join("");

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
      <section class="subsection" id="council">
        ${sectionHead("Deliberation", "Royal Council")}
      </section>
      <div class="gov-institution-grid">${institutions}</div>
      <section class="subsection" id="agencies">
        ${sectionHead("Kingdom desks", "Kingdom Agencies")}
        <div class="agency-grid">${agencyCards}</div>
      </section>
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

  function rulerProfilePanel(k) {
    const p = k.profile;
    if (!p) {
      return `<h3>${esc(k.title)} — ${esc(k.name)}</h3><p><strong>Reign:</strong> ${esc(k.reign)}</p><p>${esc(k.note)}</p><span class="confidence">${esc(k.confidence)}</span>`;
    }
    const events = (p.keyEvents || []).map((e) => `<li>${esc(e)}</li>`).join("");
    return `
      <h3>${esc(k.title)} — ${esc(k.name)}</h3>
      <p><strong>Reign:</strong> ${esc(k.reign)}</p>
      <p><strong>Historical role:</strong> ${esc(p.historicalRole)}</p>
      ${events ? `<ul class="profile-events">${events}</ul>` : ""}
      ${p.governance ? `<p><strong>Governance:</strong> ${esc(p.governance)}</p>` : ""}
      ${p.warsDiplomacyTrade ? `<p><strong>Trade & diplomacy:</strong> ${esc(p.warsDiplomacyTrade)}</p>` : ""}
      ${p.culturalNote ? `<p><strong>Culture:</strong> ${esc(p.culturalNote)}</p>` : ""}
      <span class="confidence">${esc(k.confidence)}</span>
      ${p.sourceNote ? `<p class="source-note"><em>${esc(p.sourceNote)}</em></p>` : ""}
      ${sourceCitation(k.sources || [])}
    `;
  }

  const earlyMwatas = enrichedKings
    .filter((k) => k.id <= 10)
    .map(
      (k) => `
      <article class="ruler-profile-card" id="mwata-${k.id}">
        ${rulerProfilePanel(k)}
      </article>
    `
    )
    .join("");

  const timeline = enrichedKings
    .map(
      (k) => `
      <article class="timeline-entry ${k.id === 19 ? "is-current" : ""}" data-king-id="${k.id}" role="button" tabindex="0">
        <span class="timeline-reign">${esc(k.reign)}</span>
        <h3>${esc(k.title)}</h3>
        <p><strong>${esc(k.name)}</strong> — ${esc(k.note)}</p>
        <span class="confidence">${esc(k.confidence)}</span>
        <div class="timeline-detail-source hidden">${rulerProfilePanel(k)}</div>
      </article>
    `
    )
    .join("");

  $("#page-kingdom").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">The Kingdom</p>
        <h1>History as State Formation</h1>
        <p>Migration, trade, diplomacy, settlement, and the continuity of Lunda-Kazembe rule on the Luapula.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection" id="kingdom-chapters">
        ${sectionHead("State formation", "The Lunda-Kazembe Story")}
        <div class="history-grid">${chapters}</div>
      </section>
      ${sections}
      <section class="subsection" id="early-mwatas">
        ${sectionHead("Founding rulers", "The Lunda-Kazembe Line of Authority")}
        <p class="section-deck">Source-backed profiles for early and colonial-era Mwatas. Uncertain entries remain marked.</p>
        <div class="ruler-profiles-grid">${earlyMwatas}</div>
      </section>
      <section class="subsection" id="kingdom-timeline">
        ${sectionHead("Full line", "The Mwata Kazembe Line")}
        <div class="timeline-layout">
          <div class="timeline-list">${timeline}</div>
          <aside class="timeline-detail" id="timeline-detail" aria-live="polite">
            <p>Select a ruler to view the profile panel.</p>
          </aside>
        </div>
      </section>
      <section class="subsection" id="kingdom-map-ref">
        <figure class="map-figure credited-figure">
          <div class="figure-media">
            <img src="${esc(getCreditById("places-kingdom-map-2007")?.src || royalMap.image)}" alt="Kazembe Kingdom map" data-credit-id="places-kingdom-map-2007">
          </div>
          ${creditCaption("places-kingdom-map-2007")}
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
    .map((g) => {
      const creditId = g.imageCreditId || (g.image ? null : null);
      const item = creditId ? getCreditById(creditId) : null;
      if (!item) return "";
      return `
      <button type="button" class="gallery-item" data-lightbox="${esc(item.id)}" aria-label="Open ${esc(item.title)}">
        <div class="gallery-item-media has-hover-credit">
          <img src="${esc(item.src)}" alt="${esc(item.altText)}" loading="lazy" data-credit-id="${esc(item.id)}">
          <span class="hover-credit">${esc(item.creditLine)}</span>
        </div>
        <span class="gallery-item-title">${esc(item.title)}</span>
        <span class="gallery-item-type">${esc(item.imageType || "documentary")}</span>
      </button>
    `;
    })
    .join("");

  $("#page-mutomboko").innerHTML = `
    <div class="page-hero page-hero-mutomboko">
      <div class="page-hero-bg" style="background-image:url('${esc(siteMeta.ceremonyImage)}')"></div>
      <div class="container page-hero-content">
        <p class="eyebrow">State Ceremony</p>
        <h1>Umutomboko — Dance of Conquest</h1>
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
        <div class="accordion-panel"><p>Archive of past ceremony reports and press photography is linked from the Gallery and verified media sources on the homepage.</p></div>
      </section>
      <section class="subsection" id="mutomboko-gallery">
        ${sectionHead("Media Gallery", "Photo and Video Gallery")}
        <div class="gallery-grid premium-gallery swipe-track" data-swipe="gallery">${gallery}</div>
        
        <div class="video-container-wrap" style="margin-top: 3rem;">
          <h3 class="subsection-title" style="margin-bottom: 1rem; font-family: var(--font-serif); font-size: 1.35rem; color: var(--royal-blue-mid); font-weight: 600;">Official Umutomboko Video Record</h3>
          <div class="video-responsive" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border: 1px solid var(--border); background: #000;">
            <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/nvYT2Y-D1yU" title="Umutomboko Ceremony Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
          <p style="font-size: 0.82rem; color: var(--stone); margin-top: 0.6rem; text-align: center; font-style: italic;">Documentary record of the Umutomboko ceremony at Mwansabombwe.</p>
        </div>
      </section>
      <section class="subsection" id="mutomboko-visitor">
        ${sectionHead("Visitor Information", "Visitor Guidance")}
        <p><strong>Location:</strong> ${esc(calendar.location)}</p>
        <p><strong>Annual pattern:</strong> ${esc(calendar.annualPattern)}</p>
        <p><strong>Expected next:</strong> ${esc(calendar.nextExpected)}. Confirm final arrangements through the Royal Protocol Office before travel.</p>
        <p>2025 ceremony dates on record: ${esc(calendar.confirmed2025)}.</p>
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
        ${d.placeholder ? pendingNote() : ""}
      </article>
    `
    )
    .join("");

  $("#page-development").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Kingdom Development</p>
        <h1>Development & Public Life</h1>
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
        ${n.placeholder ? pendingNote() : ""}
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
        ${p.url ? `<a href="${esc(p.url)}" ${p.url.endsWith(".pdf") ? "" : 'target="_blank" rel="noreferrer"'}>Open</a>` : pendingNote("Available through the Royal Protocol Office.")}
      </article>
    `
    )
    .join("");

  $("#page-newsroom").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Newsroom</p>
        <h1>Royal Notices and Public Affairs</h1>
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
      <section class="subsection" id="publications">
        ${sectionHead("Publications", "Kingdom Publications")}
        <div class="publication-grid">${pubs}</div>
      </section>
      <section class="subsection" id="gallery">
        ${sectionHead("Media", "Gallery")}
        <p class="section-deck">Credited images from ceremony, archive, and press sources. <a href="#home-gallery" data-nav="home">View homepage gallery</a>.</p>
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
        ${o.email ? `<p><a href="mailto:${esc(o.email)}">${esc(o.email)}</a></p>` : pendingNote("Direct inquiries to the Royal Protocol Office, Mwansabombwe.")}
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

// --- Museum, Store, Donations, Membership Page Renderers ---

function renderMuseum() {
  $("#page-museum").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Royal Museum</p>
        <h1>Ancestral Regalia & Archives</h1>
        <p>Preserving the physical heritage, sacred symbols, and documented history of the Lunda-Kazembe state.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection">
        ${sectionHead("Royal Collection", "Sacred Regalia & Artifacts")}
        <p class="donations-deck">The Royal Museum presents the ceremonial and material heritage of the Lunda-Kazembe state — regalia, instruments, processional objects, and archival sources that carry the memory of authority, migration, and identity across three centuries of continuity.</p>
        <div class="museum-grid">
          ${museumItems.map(item => `
            <article class="museum-item">
              <div class="museum-media">
                <img src="${esc(item.src)}" alt="${esc(item.title)}" loading="lazy">
              </div>
              <div class="museum-body">
                <span class="museum-era">${esc(item.era)}</span>
                <h3>${esc(item.title)}</h3>
                <p>${esc(item.description)}</p>
                <p class="museum-evidence"><strong>Academic Reference:</strong> ${esc(item.evidence)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

// Shopping Cart State
let cart = [];

function renderStore() {
  $("#page-store").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Kingdom Store</p>
        <h1>Royal Heritage Store</h1>
        <p>Acquire official publications, traditional textiles, and commemorative heritage collectables.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection">
        <div class="store-header-bar">
          <div>
            <h2 style="font-family: var(--font-serif); margin: 0; color: var(--royal-blue-mid); font-size: 1.5rem;">Heritage Catalog</h2>
            <p style="font-size: 0.88rem; color: var(--stone); margin: 0.25rem 0 0 0;">All proceeds support historical preservation and Mwansabombwe community projects.</p>
          </div>
          <button type="button" class="cart-toggle-btn" id="cart-toggle-btn">
            <span>🛒 View Cart</span>
            <span class="cart-badge" id="cart-badge-count">0</span>
          </button>
        </div>
        <div class="store-grid">
          ${storeProducts.map(p => `
            <article class="product-card" data-product-id="${esc(p.id)}">
              <div class="product-media">
                <img src="${esc(p.src)}" alt="${esc(p.title)}" loading="lazy">
              </div>
              <div class="product-body">
                <span class="product-category">${esc(p.category)}</span>
                <h3>${esc(p.title)}</h3>
                <p>${esc(p.description)}</p>
                <div class="product-footer">
                  <span class="product-price">$${p.price.toFixed(2)}</span>
                  <button type="button" class="btn-add-cart" data-id="${esc(p.id)}">Add to Cart</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    </div>
  `;

  // Inject cart overlay and drawer to body if not already present
  if (!$("#cart-drawer")) {
    const overlay = document.createElement("div");
    overlay.className = "cart-overlay";
    overlay.id = "cart-overlay";
    
    const drawer = document.createElement("div");
    drawer.className = "cart-drawer";
    drawer.id = "cart-drawer";
    drawer.innerHTML = `
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="cart-close-btn" id="cart-close-btn" type="button" aria-label="Close cart">&times;</button>
      </div>
      <div class="cart-items-container" id="cart-items-container">
        <div class="cart-empty-msg">Your cart is empty.</div>
      </div>
      <div class="cart-footer">
        <div class="cart-total-row">
          <span>Subtotal:</span>
          <span id="cart-subtotal-val">$0.00</span>
        </div>
        <button class="btn-checkout" id="btn-checkout" type="button">Proceed to Checkout</button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }
}

function updateCartUI() {
  const badge = $("#cart-badge-count");
  const container = $("#cart-items-container");
  const subtotalVal = $("#cart-subtotal-val");
  
  if (!container || !subtotalVal) return;
  
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "grid" : "none";
  }
  
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty-msg">Your cart is empty.</div>`;
    subtotalVal.textContent = "$0.00";
    return;
  }
  
  let subtotal = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.product.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item" data-id="${esc(item.product.id)}">
        <div class="cart-item-media">
          <img src="${esc(item.product.src)}" alt="${esc(item.product.title)}">
        </div>
        <div class="cart-item-info">
          <h4>${esc(item.product.title)}</h4>
          <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
          <div class="cart-item-qty">
            <button type="button" class="cart-qty-btn btn-qty-minus" data-id="${esc(item.product.id)}">-</button>
            <span class="cart-item-qty-val">${item.qty}</span>
            <button type="button" class="cart-qty-btn btn-qty-plus" data-id="${esc(item.product.id)}">+</button>
            <span style="flex-grow: 1;"></span>
            <button type="button" class="cart-item-remove" data-id="${esc(item.product.id)}">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  subtotalVal.textContent = `$${subtotal.toFixed(2)}`;
}

function bindCartEvents() {
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".btn-add-cart");
    if (addBtn) {
      const id = addBtn.dataset.id;
      const product = storeProducts.find(p => p.id === id);
      if (product) {
        const existing = cart.find(item => item.product.id === id);
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ product, qty: 1 });
        }
        updateCartUI();
        $("#cart-drawer")?.classList.add("open");
        $("#cart-overlay")?.classList.add("open");
      }
      return;
    }
    
    if (e.target.closest("#cart-toggle-btn")) {
      $("#cart-drawer")?.classList.add("open");
      $("#cart-overlay")?.classList.add("open");
      return;
    }
    
    if (e.target.closest("#cart-close-btn") || e.target.matches("#cart-overlay")) {
      $("#cart-drawer")?.classList.remove("open");
      $("#cart-overlay")?.classList.remove("open");
      return;
    }
    
    const plusBtn = e.target.closest(".btn-qty-plus");
    if (plusBtn) {
      const id = plusBtn.dataset.id;
      const item = cart.find(i => i.product.id === id);
      if (item) {
        item.qty++;
        updateCartUI();
      }
      return;
    }
    
    const minusBtn = e.target.closest(".btn-qty-minus");
    if (minusBtn) {
      const id = minusBtn.dataset.id;
      const item = cart.find(i => i.product.id === id);
      if (item) {
        item.qty--;
        if (item.qty <= 0) {
          cart = cart.filter(i => i.product.id !== id);
        }
        updateCartUI();
      }
      return;
    }
    
    const removeBtn = e.target.closest(".cart-item-remove");
    if (removeBtn) {
      const id = removeBtn.dataset.id;
      cart = cart.filter(i => i.product.id !== id);
      updateCartUI();
      return;
    }
    
    if (e.target.closest("#btn-checkout")) {
      if (cart.length === 0) return;
      
      const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
      
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.inset = "0";
      modal.style.background = "rgba(18, 18, 18, 0.6)";
      modal.style.zIndex = "1000";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.padding = "1.5rem";
      
      modal.innerHTML = `
        <div style="background: var(--white); border: 2px solid var(--royal-blue); padding: 2.5rem; max-width: 440px; text-align: center; box-shadow: var(--shadow); position: relative;">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 1rem;">👑</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--royal-blue-mid); margin: 0 0 1rem 0;">Simulated Secure Checkout</h3>
          <p style="font-size: 0.9rem; color: var(--stone); line-height: 1.5; margin-bottom: 1.5rem;">
            You are placing a simulated order of <strong>$${totalAmount.toFixed(2)}</strong>. All proceeds from the Kingdom Store support cultural archives and youth projects in Mwansabombwe.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button type="button" id="modal-cancel" class="btn-add-cart" style="padding: 0.6rem 1.2rem;">Cancel</button>
            <button type="button" id="modal-confirm" class="btn-checkout" style="padding: 0.6rem 1.2rem; width: auto; background: var(--ceremonial-red);">Confirm Order</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      modal.querySelector("#modal-cancel").addEventListener("click", () => {
        modal.remove();
      });
      
      modal.querySelector("#modal-confirm").addEventListener("click", () => {
        modal.innerHTML = `
          <div style="background: var(--white); border: 2px solid var(--royal-blue); padding: 2.5rem; max-width: 440px; text-align: center; box-shadow: var(--shadow);">
            <span style="font-size: 2.5rem; display: block; margin-bottom: 1rem;">✨</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--royal-blue-mid); margin: 0 0 1rem 0;">Order Successful!</h3>
            <p style="font-size: 0.9rem; color: var(--stone); line-height: 1.5; margin-bottom: 1.5rem;">
              Thank you for supporting the Mwata Kazembe Kingdom. Your order has been registered in our simulated database.
            </p>
            <button type="button" id="modal-close" class="btn-checkout" style="padding: 0.6rem 1.2rem; width: 100%; background: var(--royal-blue);">Back to Store</button>
          </div>
        `;
        
        cart = [];
        updateCartUI();
        $("#cart-drawer")?.classList.remove("open");
        $("#cart-overlay")?.classList.remove("open");
        
        modal.querySelector("#modal-close").addEventListener("click", () => {
          modal.remove();
        });
      });
    }
  });
}

function renderDonations() {
  $("#page-donations").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Support & Philanthropy</p>
        <h1>Donations & Support</h1>
        <p>Partner with the Kingdom in cultural preservation, heritage archives, and education development.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection">
        ${sectionHead("Invest in Heritage", "Philanthropic Tiers")}
        <p class="donations-deck">Your contributions go directly towards preserving royal archives, maintaining museum artifacts, funding the annual Umutomboko cultural exhibitions, and supporting community education initiatives in Mwansabombwe.</p>
        
        <div class="donation-tiers-grid" id="donation-tiers-grid">
          <div class="donation-tier-card" data-amount="25">
            <div class="donation-tier-val">$25</div>
            <div class="donation-tier-title">Friend of Heritage</div>
            <p class="donation-tier-desc">Supports conservation of digitised archival documents and digital library tools.</p>
          </div>
          <div class="donation-tier-card" data-amount="50">
            <div class="donation-tier-val">$50</div>
            <div class="donation-tier-title">Cultural Guardian</div>
            <p class="donation-tier-desc">Contributes directly to restoration projects for regional historical archives.</p>
          </div>
          <div class="donation-tier-card active" data-amount="100">
            <div class="donation-tier-val">$100</div>
            <div class="donation-tier-title">Royal Custodian</div>
            <p class="donation-tier-desc">Underwrites academic research and transcription of royal Lunda lineage accounts.</p>
          </div>
          <div class="donation-tier-card" data-amount="250">
            <div class="donation-tier-val">$250</div>
            <div class="donation-tier-title">Mwata Benefactor</div>
            <p class="donation-tier-desc">Sponsors school educational visits and museum tour guides in Mwansabombwe.</p>
          </div>
        </div>

        <div class="custom-donation-input-group">
          <label for="custom-donation-amount">Or enter custom support amount</label>
          <div class="input-currency-wrap">
            <span class="input-currency-symbol">$</span>
            <input type="number" id="custom-donation-amount" class="custom-amount-field" placeholder="Other amount" min="5" step="1">
          </div>
        </div>

        <div class="donation-form-panel">
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--royal-blue-mid); margin-bottom: 1.25rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">Contribution Details</h3>
          <form id="donation-checkout-form">
            <div class="form-group">
              <label for="donor-name">Full Name</label>
              <input type="text" id="donor-name" class="form-control" required placeholder="Dr. / Mr. / Ms. Name">
            </div>
            <div class="form-group">
              <label for="donor-email">Email Address</label>
              <input type="email" id="donor-email" class="form-control" required placeholder="email@example.com">
            </div>
            <div class="form-group">
              <label for="donor-card">Card Details (Simulated)</label>
              <input type="text" id="donor-card" class="form-control" required placeholder="4111 2222 3333 4444" pattern="[0-9\\s]{13,19}">
            </div>
            <div style="margin-top: 1.5rem;">
              <button type="submit" class="btn-checkout" style="background: var(--ceremonial-red); width: 100%;">
                Submit Secure Contribution of <span id="donation-submit-amt">$100.00</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  `;
}

let activeDonationAmount = 100;

function bindDonationsEvents() {
  const container = $("#donation-tiers-grid");
  const customInput = $("#custom-donation-amount");
  const submitAmt = $("#donation-submit-amt");
  const form = $("#donation-checkout-form");
  
  if (!container || !customInput || !submitAmt || !form) return;
  
  function updateAmount(amt) {
    activeDonationAmount = parseFloat(amt) || 0;
    submitAmt.textContent = `$${activeDonationAmount.toFixed(2)}`;
  }
  
  container.addEventListener("click", (e) => {
    const card = e.target.closest(".donation-tier-card");
    if (card) {
      $$(".donation-tier-card", container).forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      customInput.value = "";
      updateAmount(card.dataset.amount);
    }
  });
  
  customInput.addEventListener("input", () => {
    $$(".donation-tier-card", container).forEach(c => c.classList.remove("active"));
    const val = parseFloat(customInput.value) || 0;
    updateAmount(val);
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (activeDonationAmount <= 0) {
      alert("Please select or enter a valid donation amount.");
      return;
    }
    
    const donorName = $("#donor-name")?.value;
    const donorEmail = $("#donor-email")?.value;
    
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.inset = "0";
    modal.style.background = "rgba(18, 18, 18, 0.6)";
    modal.style.zIndex = "1000";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "1.5rem";
    
    modal.innerHTML = `
      <div style="background: var(--white); border: 2px solid var(--royal-blue); padding: 2.5rem; max-width: 440px; text-align: center; box-shadow: var(--shadow);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 1rem;">🤝</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--royal-blue-mid); margin: 0 0 1rem 0;">Thank You, Guardian!</h3>
        <p style="font-size: 0.9rem; color: var(--stone); line-height: 1.5; margin-bottom: 1.5rem;">
          Dear <strong>${esc(donorName)}</strong>, your simulated contribution of <strong>$${activeDonationAmount.toFixed(2)}</strong> was processed successfully.
        </p>
        <p style="font-size: 0.8rem; color: var(--stone); line-height: 1.4; margin-bottom: 1.5rem; font-style: italic;">
          A simulated receipt has been dispatched to <strong>${esc(donorEmail)}</strong>. Your support is instrumental in maintaining the historical legacy of the Luapula-Lunda.
        </p>
        <button type="button" id="donation-modal-close" class="btn-checkout" style="padding: 0.6rem 1.2rem; width: 100%; background: var(--royal-blue);">Close</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    form.reset();
    $$(".donation-tier-card", container).forEach(c => c.classList.remove("active"));
    const defaultCard = $$(".donation-tier-card", container).find(c => c.dataset.amount === "100");
    if (defaultCard) defaultCard.classList.add("active");
    updateAmount(100);
    
    modal.querySelector("#donation-modal-close").addEventListener("click", () => {
      modal.remove();
    });
  });
}

function renderMembership() {
  $("#page-membership").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Registry</p>
        <h1>Royal Membership & Registry</h1>
        <p>Enrol in the official register of supporters to receive cultural updates and historic bulletins.</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="membership-layout">
        <div class="membership-form-wrap">
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--royal-blue-mid); margin-bottom: 1.25rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">Registry Enrolment</h3>
          <form id="membership-reg-form">
            <div class="form-group">
              <label for="member-fullname">Full Name (to appear on certificate)</label>
              <input type="text" id="member-fullname" class="form-control" required placeholder="Gift Lukwesa">
            </div>
            <div class="form-group">
              <label for="member-email">Email Address</label>
              <input type="email" id="member-email" class="form-control" required placeholder="gift@example.com">
            </div>
            <div class="form-group">
              <label for="member-country">Residence / Region</label>
              <input type="text" id="member-country" class="form-control" required placeholder="Zambia, Luapula Province">
            </div>
            <div class="form-group">
              <label for="member-tier">Membership Category</label>
              <select id="member-tier" class="form-control" required style="background: var(--white);">
                <option value="Standard Supporter">Standard Supporter</option>
                <option value="Cultural Custodian">Cultural Custodian</option>
                <option value="Archival Contributor">Archival Contributor</option>
                <option value="Honorary Elder">Honorary Elder</option>
              </select>
            </div>
            <div style="margin-top: 1.5rem;">
              <button type="submit" class="btn-checkout" style="background: var(--royal-blue); width: 100%;">Enrol and Generate Certificate</button>
            </div>
          </form>
        </div>
        
        <div class="certificate-preview-panel">
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--stone); text-align: center; margin-bottom: 1.5rem; width: 100%;">Digital Enrolment Scroll</h3>
          <div id="certificate-target" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
            <div style="text-align: center; color: var(--stone); padding: 3rem 1.5rem; border: 2px dashed var(--border); width: 100%; max-width: 580px; box-sizing: border-box; background: var(--surface);">
              <p style="font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-serif);">No active enrolment found.</p>
              <p style="font-size: 0.85rem; margin: 0;">Complete the registry form to instantly generate and print your parchment-style Certificate of Support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindMembershipEvents() {
  const form = $("#membership-reg-form");
  const target = $("#certificate-target");
  
  if (!form || !target) return;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = $("#member-fullname").value;
    const tier = $("#member-tier").value;
    
    const today = new Date();
    const day = today.getDate();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${day}${suffix} ${months[today.getMonth()]} ${today.getFullYear()}`;
    
    const certNo = `MK-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const certHtml = `
      <div class="certificate-card">
        <span class="cert-header">Mwata Kazembe Kingdom</span>
        <h2 class="cert-title">Certificate of Support</h2>
        <span class="cert-statement">This official scroll hereby recognizes that</span>
        <span class="cert-name" id="cert-display-name">${esc(name)}</span>
        <span class="cert-statement">has been formally registered in the Royal Archives as a</span>
        <strong style="display: block; font-size: 1.25rem; text-transform: uppercase; color: #4a3418; margin: 0.5rem 0; letter-spacing: 0.05em;">${esc(tier)}</strong>
        <p class="cert-desc">
          In recognition of their dedicated commitment to the preservation of Lunda-Kazembe history, the protection of sacred cultural regalia, and the support of education and community development across the Luapula valley.
        </p>
        <div class="cert-meta-row">
          <div class="cert-meta-item">
            <strong>Registration No.</strong>
            <span>${esc(certNo)}</span>
          </div>
          <div class="cert-meta-item">
            <strong>Date of Registry</strong>
            <span>${esc(formattedDate)}</span>
          </div>
          <div class="cert-meta-item">
            <strong>Authority</strong>
            <span>Royal Protocol Office</span>
          </div>
        </div>
        <div class="cert-seal">MK</div>
      </div>
      <button type="button" class="cert-print-btn" id="cert-print-btn">
        🖨 Print Scroll
      </button>
    `;
    
    target.innerHTML = certHtml;
    
    target.querySelector("#cert-print-btn").addEventListener("click", () => {
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.write(`
        <html>
          <head>
            <title>Certificate of Support - Mwata Kazembe Kingdom</title>
            <style>
              body {
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                padding: 0;
              }
              .certificate-card {
                width: 100%;
                max-width: 580px;
                background: linear-gradient(135deg, #fbf7ef 0%, #f4edd8 100%);
                border: 12px double #a18357;
                padding: 2rem;
                box-shadow: none !important;
                position: relative;
                text-align: center;
                color: #3b2f1f;
                font-family: Georgia, serif;
                box-sizing: border-box;
              }
              .certificate-card::after {
                content: "";
                position: absolute;
                inset: 6px;
                border: 1px solid rgba(161, 131, 87, 0.4);
                pointer-events: none;
              }
              .cert-header {
                font-size: 0.8rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                color: #7a603c;
                margin-bottom: 0.75rem;
                display: block;
              }
              .cert-title {
                font-size: 2.1rem;
                font-weight: 700;
                color: #4a3418;
                margin: 0 0 1rem 0;
                line-height: 1.1;
                border-bottom: 1px solid rgba(161, 131, 87, 0.3);
                padding-bottom: 0.75rem;
              }
              .cert-statement {
                font-size: 0.95rem;
                font-style: italic;
                margin-bottom: 1.25rem;
                color: #5c4a34;
                display: block;
              }
              .cert-name {
                font-size: 2rem;
                font-weight: 700;
                color: #f71932;
                margin: 0.75rem 0;
                text-decoration: underline;
                text-decoration-thickness: 1px;
                text-underline-offset: 6px;
                display: block;
              }
              .cert-desc {
                font-family: sans-serif;
                font-size: 0.82rem;
                line-height: 1.5;
                color: #5c4a34;
                margin: 1rem auto;
                max-width: 32rem;
                display: block;
              }
              .cert-meta-row {
                display: flex;
                justify-content: space-around;
                margin-top: 1.75rem;
                border-top: 1px solid rgba(161, 131, 87, 0.2);
                padding-top: 1rem;
                font-family: sans-serif;
                font-size: 0.78rem;
              }
              .cert-meta-item strong {
                display: block;
                font-size: 0.82rem;
                color: #4a3418;
                margin-bottom: 0.15rem;
              }
              .cert-seal {
                width: 55px;
                height: 55px;
                background: radial-gradient(circle, #f71932 0%, #a00617 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ffd700;
                font-weight: 700;
                font-size: 0.8rem;
                margin: 1.25rem auto 0;
                position: relative;
              }
              .cert-seal::after {
                content: "OFFICIAL SEAL";
                position: absolute;
                font-size: 0.35rem;
                bottom: 8px;
                letter-spacing: 0.05em;
                color: rgba(255, 215, 0, 0.8);
              }
              @media print {
                body {
                  height: auto;
                }
                .certificate-card {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
            </style>
          </head>
          <body>
            <div class="certificate-card">
              <span class="cert-header">Mwata Kazembe Kingdom</span>
              <h2 class="cert-title">Certificate of Support</h2>
              <span class="cert-statement">This official scroll hereby recognizes that</span>
              <span class="cert-name">${name}</span>
              <span class="cert-statement">has been formally registered in the Royal Archives as a</span>
              <strong style="display: block; font-size: 1.25rem; text-transform: uppercase; color: #4a3418; margin: 0.5rem 0; letter-spacing: 0.05em;">${tier}</strong>
              <p class="cert-desc">
                In recognition of their dedicated commitment to the preservation of Lunda-Kazembe history, the protection of sacred cultural regalia, and the support of education and community development across the Luapula valley.
              </p>
              <div class="cert-meta-row">
                <div class="cert-meta-item">
                  <strong>Registration No.</strong>
                  <span>${certNo}</span>
                </div>
                <div class="cert-meta-item">
                  <strong>Date of Registry</strong>
                  <span>${formattedDate}</span>
                </div>
                <div class="cert-meta-item">
                  <strong>Authority</strong>
                  <span>Royal Protocol Office</span>
                </div>
              </div>
              <div class="cert-seal">MK</div>
            </div>
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  });
}

function pageFromHash(hash) {
  if (!hash || hash === "home") return "home";
  if (hash.startsWith("clans") || hash === "royal-family") return "clans";
  if (hash === "council" || hash === "chiefs" || hash === "agencies" || hash === "protocol" || hash.startsWith("gov"))
    return "governance";
  if (hash.startsWith("mwata") && hash !== "mwata-lineage") return "mwata";
  if (hash.startsWith("kingdom") || hash === "early-mwatas") return "kingdom";
  if (hash.startsWith("mutomboko")) return "mutomboko";
  if (hash.startsWith("dev") || hash === "development-public") return "development";
  if (hash.startsWith("news") || hash === "publications" || hash === "gallery") return "newsroom";
  if (hash === "contact") return "contact";
  if (hash === "museum") return "museum";
  if (hash === "store") return "store";
  if (hash === "donations") return "donations";
  if (hash === "membership") return "membership";
  
  const homeAnchors = new Set([
    "official-notices",
    "kingdom-story",
    "mwata-lineage",
    "mutomboko-journey",
    "people-kingdom",
    "clans-people",
    "royal-news",
    "home-gallery",
    "visit-support",
    "kingdom-glance",
    "office-mwata",
    "home-governance",
    "kingdom-agencies",
    "development-public",
    "living-kingdom",
    "projects-progress",
    "royal-spotlight",
    "kingdom-stats"
  ]);
  if (homeAnchors.has(hash)) return "home";
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
  if (pageId === "home") initInteractions();
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
  document.body.style.overflowX = "";
}

function openMobileDrawer() {
  const header = document.getElementById("site-header");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 72;
  document.documentElement.style.setProperty("--drawer-top", headerBottom + "px");
  const drawer = $("#mobile-drawer");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  $("#menu-toggle").setAttribute("aria-expanded", "true");
  document.body.style.overflowX = "hidden";
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#mobile-drawer")?.classList.contains("open")) {
      closeMobileDrawer();
    }
  });
}

function bindBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function animateReveal() {
  if (!window.gsap) return;
  gsap.from(".page.active .royal-hero .hero-content > *", {
    opacity: 0,
    y: 20,
    duration: 0.75,
    stagger: 0.09,
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
  renderClans();
  renderGovernance();
  renderKingdom();
  renderMutomboko();
  renderDevelopment();
  renderNewsroom();
  renderContact();
  renderMuseum();
  renderStore();
  renderDonations();
  renderMembership();
  bindAccordions();
  bindNewsFilters();
  bindNavigation();
  bindCartEvents();
  bindDonationsEvents();
  bindMembershipEvents();
  bindBackToTop();
  resolvePageFromHash();
  initInteractions();
}

init();
