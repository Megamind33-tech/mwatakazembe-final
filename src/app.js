import {
  archiveRecords,
  baluunda,
  bashafumu,
  impembwe,
  builtHeritage,
  calendar,
  developmentPillars,
  governanceInstitutions,
  governanceStructure,
  seniorChiefSeats,
  subChiefs,
  historyChapters,
  kingdomAgencies,
  kingdomAgenciesIntro,
  mwataCabinet,
  spiritualSystem,
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
  supportNav,
  symbolsOfAuthority,
  utilityLinks,
  ceremonySteps,
  museumItems,
  storeProducts,
  externalMediaSources
} from "./kingdom-data.js";
import {
  clansIntroduction,
  clanRegistry,
  clanRegistryNote,
  royalFamilyOffices
} from "./clans-data.js";
import { creditCaption, getCreditById, galleryCategories, imageCredits } from "./image-credits.js";
import { supportingReferences, supportingVideos } from "./kazembe-supporting-media.js";
import { initInteractions } from "./interactions.js";
import { initPageMotion } from "./motion.js";
import { homePageHtml } from "./render-home.js";
import { enrichKings } from "./ruler-profiles.js";
import { esc, pendingNote, sectionHead, sourceCitation } from "./ui-helpers.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const enrichedKings = enrichKings(kings);

// The arms of the Kingdom stand in wherever a portrait is owed but not yet
// supplied — as they already do for the unphotographed Mwatas of the ruler line.
const KINGDOM_ARMS = "assets/images/kazembe/identity/coat-of-arms.png";

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

function creditFigureCard(id) {
  const item = getCreditById(id);
  if (!item) return "";
  return `
    <figure class="credited-figure media-figure">
      <div class="figure-media has-hover-credit">
        <img src="${esc(item.src)}" alt="${esc(item.altText)}" loading="lazy" data-credit-id="${esc(id)}">
        <span class="hover-credit">${esc(item.creditLine)}</span>
      </div>
      <figcaption class="figure-credit"><span class="image-credit"><strong>${esc(item.title)}</strong></span></figcaption>
    </figure>
  `;
}

// Canonical Kingdom gallery — the single home for the full credited image
// collection (filters + grid + external media sources). Lives on the
// Heritage & Culture page; the lightbox is bound globally in interactions.js.
function heritageGalleryHtml() {
  const filters = galleryCategories
    .map((c) => `<button type="button" class="gallery-filter ${c.id === "all" ? "active" : ""}" data-filter="${esc(c.id)}">${esc(c.label)}</button>`)
    .join("");

  const items = imageCredits
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

  return `
    <section class="subsection section-gallery" id="kingdom-gallery">
      ${sectionHead("Visual Record", "Gallery & Sources")}
      <p class="section-deck">The kingdom's credited image collection covers identity, ceremony, people, places, and archive, drawn from official and press sources. Select any image for its full caption, credit, and usage.</p>
      <div class="filter-row" id="gallery-filters">${filters}</div>
      <div class="gallery-grid premium-gallery" id="gallery-grid">${items}</div>
      <div class="media-sources-panel">
        <h3>Further verified media sources</h3>
        <p class="section-deck">Ceremony and kingdom photography from official and press sources. Use with publisher permission where required.</p>
        <ul class="media-sources-list">${mediaSources}</ul>
      </div>
    </section>
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
  const desktopItem = (item, extraClass = "") => {
    const children = item.children
      ? `<div class="nav-dropdown">${item.children
          .map((c) => `<a href="${esc(c.href)}">${esc(c.label)}</a>`)
          .join("")}</div>`
      : "";
    return `
        <div class="nav-item ${extraClass}">
          <a href="${esc(item.href)}" data-nav="${esc(item.id)}">${esc(item.label)}</a>
          ${children}
        </div>
      `;
  };
  const desktop =
    navigation.map((item) => desktopItem(item)).join("") +
    desktopItem(supportNav, "nav-item-support");
  $("#primary-nav").innerHTML = desktop;

  const mobileItem = (item, extraClass = "") => {
    const hasChildren = item.children && item.children.length;
    const sub = hasChildren
      ? `<div class="mobile-sub" id="msub-${esc(item.id)}" hidden>${item.children
          .map((c) => `<a href="${esc(c.href)}">${esc(c.label)}</a>`)
          .join("")}</div>`
      : "";
    const toggle = hasChildren
      ? `<button class="mobile-sub-toggle" type="button" aria-expanded="false" aria-controls="msub-${esc(item.id)}" aria-label="Show ${esc(item.label)} sections"></button>`
      : "";
    return `
        <div class="mobile-nav-group ${extraClass}">
          <div class="mobile-nav-row">
            <a class="mobile-nav-top" href="${esc(item.href)}" data-nav="${esc(item.id)}">${esc(item.label)}</a>
            ${toggle}
          </div>
          ${sub}
        </div>
      `;
  };
  const mobile =
    navigation.map((item) => mobileItem(item)).join("") +
    mobileItem(supportNav, "mobile-nav-group-support");
  $("#mobile-nav").innerHTML = mobile;
}

function renderFooter() {
  const footerCol = (item) => `
      <div class="footer-col">
        <h3><a href="${esc(item.href)}">${esc(item.label)}</a></h3>
        ${
          item.children
            ? `<ul>${item.children.map((c) => `<li><a href="${esc(c.href)}">${esc(c.label)}</a></li>`).join("")}</ul>`
            : ""
        }
      </div>
    `;
  const cols = navigation.map(footerCol).join("") + footerCol(supportNav);
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
            <h3>${esc(mwataProfile.title)}, ${esc(mwataProfile.name)}</h3>
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
      <section class="subsection" id="mwata-continuity">
        ${sectionHead("Historical continuity", "Past Mwatas and Royal Occasions")}
        <p class="section-deck">These photographs record earlier holders of the office of the Mwata Kazembe and past royal occasions. They are distinct from the reigning Mwata shown above. Where a photograph is firmly identified, the officeholder and dates are named; other identifications are held pending official confirmation.</p>
        <div class="media-figure-grid">
          ${creditFigureCard("archive-mwata-x-kanyembo-ntemena")}
          ${creditFigureCard("archive-mwata-xi-kapakata")}
          ${creditFigureCard("archive-mwata-xii-chinyanta-kasasa")}
          ${creditFigureCard("archive-mwata-xiii-chinkonkole")}
          ${creditFigureCard("archive-mwata-xiv-shadreck-statue")}
          ${creditFigureCard("archive-mwata-xv-brown-ngombe")}
          ${creditFigureCard("archive-mwata-xvi-kanyembo-kapema")}
          ${creditFigureCard("archive-mwata-xvii-1961")}
          ${creditFigureCard("archive-mwata-xvii-ceremony")}
          ${creditFigureCard("archive-mwata-staff-of-office")}
          ${creditFigureCard("archive-royal-ceremony-colonial")}
          ${creditFigureCard("mwata-beaded-crown")}
        </div>
      </section>
      <section class="subsection accordion-block" id="mwata-palace">
        <button class="accordion-trigger" type="button" aria-expanded="false">Palace and Royal Court</button>
        <div class="accordion-panel"><p>Palace grounds, Ichota, and court protocol at Mwansabombwe are described in ceremony and academic sources; official visitor guidance is published under Umutomboko.</p></div>
      </section>
      <section class="subsection" id="mwata-symbols">
        ${sectionHead("Ceremonial Protocol", "Symbols of Authority")}
        <figure class="identity-figure credited-figure">
          <div class="figure-media has-hover-credit">
            <img src="${esc(getCreditById("identity-flag")?.src || "assets/images/kazembe/identity/flag.png")}" alt="${esc(getCreditById("identity-flag")?.altText || "Flag of the Mwata Kazembe Kingdom")}" loading="lazy" data-credit-id="identity-flag">
            <span class="hover-credit">${esc(getCreditById("identity-flag")?.creditLine || "")}</span>
          </div>
          <figcaption class="figure-credit"><span class="image-credit">The flag of the Kingdom gathers the symbols of authority into a single emblem: the crossed ceremonial axe and sword, the feathered amapango crown, and the royal litter, set on a royal-blue field above a red-white-red band.</span></figcaption>
        </figure>
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
        <td data-label="Clan">${row.clanName ? esc(row.clanName) : "—"}</td>
        <td data-label="Head">${row.clanHead ? esc(row.clanHead) : "—"}</td>
        <td data-label="Area">${esc(row.area || "—")}</td>
        <td data-label="Ceremony &amp; Governance">${esc(row.ceremonyRole || "—")}</td>
        <td data-label="Status"><span class="verification-badge">${esc(row.verification)}</span></td>
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
        <div class="clan-registry-wrap">
          <table class="clan-registry-table">
            <thead>
              <tr>
                <th>Clan</th>
                <th>Head / representative</th>
                <th>Area</th>
                <th>Ceremony &amp; governance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr class="registry-empty-row"><td colspan="5">${esc(clanRegistryNote)}</td></tr>`}
            </tbody>
          </table>
          ${rows ? `<p class="editorial-note">${esc(clanRegistryNote)}</p>` : ""}
        </div>
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

function councilChartHtml() {
  const byTier = (t) => governanceStructure.filter((n) => n.tier === t);
  // The chart is where the Royal Council, Senior Chiefs, Traditional Court, and
  // Headmen are stated, so its nodes carry the gov-* anchors the navigation and
  // the home leadership cards link to.
  // Every station of the chart carries a medallion, the way an executive chart
  // carries the face of each office: a photograph where the officeholder has
  // been photographed, and the arms of the Kingdom where one is still to be
  // supplied — the same stand-in the ruler line uses for unphotographed
  // Mwatas. Medallions are held well under the Mwata's portrait at the apex.
  // An office carries a round seal; a person carries a portrait frame, holding
  // the arms until a photograph is supplied. The two shapes keep a body of the
  // Kingdom legible from an officeholder at a glance.
  const medallion = (image, alt, kind = "office") =>
    image
      ? `<div class="chart-medallion"><img src="${esc(image)}" alt="${esc(alt)}" loading="lazy"></div>`
      : `<div class="chart-medallion chart-medallion-arms ${kind === "office" ? "chart-medallion-seal" : ""}">
           <img src="${esc(KINGDOM_ARMS)}" alt="Arms of the Mwata Kazembe, standing for ${esc(alt)}" loading="lazy">
         </div>`;

  const node = (n, extraClass = "") => `
    <article class="chart-node node-${esc(n.id)} ${extraClass}" id="gov-${esc(n.id)}" data-chart-node>
      ${medallion(n.image, n.title)}
      <span class="chart-node-tier">Tier ${esc(String(n.tier))}</span>
      <h3>${esc(n.title)}</h3>
      <p>${esc(n.description)}</p>
    </article>
  `;

  const portrait = getCreditById("hero-home-portrait");
  const root = `
    <article class="chart-node node-root chart-apex" data-chart-node>
      <div class="chart-apex-portrait">
        <img src="${esc(portrait?.src || mwataProfile.image)}" alt="His Royal Highness ${esc(mwataProfile.title)}, ${esc(mwataProfile.name)}" loading="lazy">
      </div>
      <span class="chart-node-tier">Supreme Authority</span>
      <h3>${esc(mwataProfile.title)}</h3>
      <p class="chart-apex-name">${esc(mwataProfile.name)}</p>
      <p>The apex of the Kingdom. The Royal Council, the Baluunda, the Senior Chiefs, and every office of state derive their authority from the throne and serve it.</p>
    </article>
  `;
  const branch = byTier(2).map((n) => node(n, "node-branch")).join("");
  const tier3 = byTier(3).map((n) => node(n, "node-tier3")).join("");
  const support = byTier(4).map((n) => node(n)).join("");

  const seats = seniorChiefSeats
    .map(
      (s) => `
      <article class="chart-seat ${s.pending ? "is-pending" : ""}" data-chart-seat id="seat-${esc(s.id)}">
        ${medallion(s.image, s.title, "person")}
        <h4>${esc(s.title)}</h4>
        <p>${esc(s.area)}</p>
      </article>
    `
    )
    .join("");

  const rail = `<div class="chart-rail" data-chart-rail aria-hidden="true"></div>`;

  return `
    <section class="subsection council-chart-section" id="council-chart">
      ${sectionHead("Lines of Authority", "The Governance Structure", "Authority in the Kingdom flows from the Mwata at the apex, to the Royal Council, and from the Council to the Baluunda judiciary and the Senior Chiefs, down to the offices that serve the people.")}
      <div class="council-chart" data-council-chart>
        <div class="chart-level chart-level-root">${root}</div>
        ${rail}
        <div class="chart-level chart-level-branch">${branch}</div>
        ${rail}
        <div class="chart-level chart-level-tier3">${tier3}</div>
        <div class="chart-seats-wrap">
          <p class="chart-seats-label">Senior Chiefs, children of the Mwata</p>
          <div class="chart-seats">${seats}</div>
        </div>
        ${rail}
        <div class="chart-level chart-level-support">${support}</div>
      </div>
    </section>
  `;
}

function baluundaSectionHtml() {
  const initials = (name) =>
    name
      .replace(/^Kapa\s+/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const cards = baluunda.members
    .map((m, i) => {
      // The seat number recorded for the office, not the card's position, so
      // the roster stays truthful if a seat is ever added or set aside.
      const seatNo = m.seat ?? i + 1;
      const media = m.image
        ? `<div class="baluunda-media">
             <img src="${esc(m.image)}" alt="${esc(m.name)}, ${esc(m.role)}, Muluunda of the Kazembe High Court" loading="lazy">
             <span class="baluunda-seat">Seat ${seatNo}</span>
           </div>`
        : `<div class="baluunda-media baluunda-media-pending">
             <span class="baluunda-monogram" aria-hidden="true">${esc(initials(m.name))}</span>
             <span class="baluunda-seat">Seat ${seatNo}</span>
           </div>`;
      const clan = m.clan
        ? `<p class="baluunda-clan"><span class="baluunda-clan-name">${esc(m.clan)}</span>${
            m.emblem ? `<span class="baluunda-emblem">${esc(m.emblem)}</span>` : ""
          }</p>`
        : "";
      return `
      <article class="baluunda-card ${m.image ? "" : "is-pending"}">
        ${media}
        <div class="baluunda-body">
          <h3>${esc(m.name)}</h3>
          <p class="baluunda-role">${esc(m.role)}</p>
          ${clan}
        </div>
      </article>
    `;
    })
    .join("");

  return `
    <section class="subsection baluunda-section" id="baluunda">
      ${sectionHead("The High Court of the Kingdom", "The Baluunda Judicial Council")}
      <p class="section-deck">${esc(baluunda.intro)}</p>
      <p class="section-deck">${esc(baluunda.inheritance)}</p>
      <div class="baluunda-grid">${cards}</div>
      <p class="editorial-note">${esc(baluunda.note)}</p>
    </section>
  `;
}

function subChiefsSectionHtml() {
  const initials = (name) =>
    name
      .replace(/^Kapa\s+/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const cards = subChiefs.members
    .map((m) => {
      const media = m.image
        ? `<div class="baluunda-media">
             <img src="${esc(m.image)}" alt="${esc(m.name)}, Sub Chief of the Kazembe Kingdom" loading="lazy">
           </div>`
        : `<div class="baluunda-media baluunda-media-pending">
             <span class="baluunda-monogram" aria-hidden="true">${esc(initials(m.name))}</span>
           </div>`;
      return `
      <article class="baluunda-card ${m.image ? "" : "is-pending"}">
        ${media}
        <div class="baluunda-body">
          <h3>${esc(m.name)}</h3>
          <p class="baluunda-role">Sub Chief</p>
        </div>
      </article>
    `;
    })
    .join("");

  return `
    <section class="subsection subchiefs-section" id="sub-chiefs">
      ${sectionHead("Territorial Authority", "The Sub Chiefs")}
      <p class="section-deck">${esc(subChiefs.intro)}</p>
      <div class="baluunda-grid">${cards}</div>
    </section>
  `;
}

// Several officeholders hold more than one seat — Kapa Kasumpa sits in the
// Baluunda and is also named among the Bashafumu and the Cabinet, for
// instance. The portrait is filed once, under the Baluunda or Sub Chiefs, so
// every later mention of the same person looks it up here rather than falling
// back to a name-only card.
const rosterKey = (name) =>
  name
    .replace(/^(Kapa|Sub Chief|Senior Chief|Kazembe)\s+/i, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim();

const portraitIndex = (() => {
  const byName = new Map();
  const byFirstWord = new Map();
  [...baluunda.members, ...subChiefs.members]
    .filter((m) => m.image)
    .forEach((m) => {
      const key = rosterKey(m.name);
      if (!byName.has(key)) byName.set(key, m.image);
      const first = key.split(/\s+/)[0];
      // Only single-holder first names are usable: "Mwine" belongs to two
      // seats, so it must never resolve to one of them.
      byFirstWord.set(first, byFirstWord.has(first) ? null : m.image);
    });
  return { byName, byFirstWord };
})();

function portraitFor(name) {
  const key = rosterKey(name);
  return portraitIndex.byName.get(key) || portraitIndex.byFirstWord.get(key) || undefined;
}

// A roster card matching the Baluunda / Sub Chiefs style. Shows a portrait
// when one is supplied, otherwise a monogram placeholder. `note` carries the
// longer duty text used for the officers of the spiritual system.
function rosterCard(name, role, image, note) {
  const initials = name
    .replace(/^(Kapa|Sub Chief|Senior Chief)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const media = image
    ? `<div class="baluunda-media"><img src="${esc(image)}" alt="${esc(name)}" loading="lazy"></div>`
    : `<div class="baluunda-media baluunda-media-pending"><span class="baluunda-monogram" aria-hidden="true">${esc(initials)}</span></div>`;
  return `
      <article class="baluunda-card ${image ? "" : "is-pending"}">
        ${media}
        <div class="baluunda-body">
          <h3>${esc(name)}</h3>
          ${role ? `<p class="baluunda-role">${esc(role)}</p>` : ""}
          ${note ? `<p class="baluunda-note">${esc(note)}</p>` : ""}
        </div>
      </article>
    `;
}

function mwataCabinetSectionHtml() {
  const c = mwataCabinet.chair;
  const cards = mwataCabinet.members
    .map((n) => rosterCard(n, "Member of the Cabinet", portraitFor(n)))
    .join("");
  return `
    <section class="subsection cabinet-section" id="mwata-cabinet">
      ${sectionHead("The Mwata's Council", "The Mwata's Cabinet")}
      <p class="section-deck">${esc(mwataCabinet.intro)}</p>
      <p class="cabinet-members-label">Chair of the Cabinet</p>
      <div class="baluunda-grid baluunda-grid-lead">${rosterCard(c.name, c.role, portraitFor(c.name))}</div>
      <p class="cabinet-members-label">Members of the Cabinet</p>
      <div class="baluunda-grid">${cards}</div>
    </section>
  `;
}

// A credited plate: the registry supplies file, alt text, and credit line; the
// caption is the one given by the Office of the Mwata.
function captionedPlate(creditId, caption) {
  const item = getCreditById(creditId);
  if (!item) return "";
  return `
      <figure class="credited-figure media-figure">
        <div class="figure-media has-hover-credit">
          <img src="${esc(item.src)}" alt="${esc(item.altText)}" loading="lazy" data-credit-id="${esc(creditId)}">
          <span class="hover-credit">${esc(item.creditLine)}</span>
        </div>
        <figcaption class="figure-credit"><span class="image-credit">${esc(caption)}</span></figcaption>
      </figure>
    `;
}

function impembweSectionHtml() {
  const body = impembwe.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  const figures = impembwe.figures.map((f) => captionedPlate(f.creditId, f.caption)).join("");
  return `
    <section class="subsection impembwe-section" id="impembwe">
      ${sectionHead(impembwe.eyebrow, impembwe.title)}
      <p class="section-deck">${esc(impembwe.intro)}</p>
      <div class="impembwe-body">${body}</div>
      <p class="cabinet-members-label">Before Impembwe is cleaned for the ceremony</p>
      <div class="media-figure-grid">${figures}</div>
      <p class="editorial-note">${esc(impembwe.note)}</p>
      ${sourceCitation(impembwe.sourceIds)}
    </section>
  `;
}

function spiritualSystemSectionHtml() {
  const priests = spiritualSystem.highPriests
    .map((m) => rosterCard(m.name, m.role, portraitFor(m.name), m.note))
    .join("");
  const headmen = spiritualSystem.headmen
    .map((m) => rosterCard(m.name, m.role, portraitFor(m.name)))
    .join("");

  // Documentary plates of the Ba Kashikayi. The registry supplies the file,
  // alt text, and credit line; the caption is the one given by the Office.
  const figures = (spiritualSystem.figures || [])
    .map((f) => captionedPlate(f.creditId, f.caption))
    .join("");

  return `
    <section class="subsection spiritual-section" id="spiritual-system">
      ${sectionHead("Faith and the Ancestors", "The Spiritual System of the Kingdom")}
      <p class="section-deck">${esc(spiritualSystem.intro)}</p>
      <p class="cabinet-members-label">High Priests of the Throne</p>
      <div class="baluunda-grid baluunda-row swipe-track" data-swipe="High Priests of the Throne">${priests}</div>
      <p class="cabinet-members-label">Senior Headmen and Traditional Councillors</p>
      <div class="baluunda-grid baluunda-row swipe-track" data-swipe="Senior Headmen and Traditional Councillors">${headmen}</div>
      ${figures ? `<p class="cabinet-members-label">The Ba Kashikayi at Mpembwe</p><div class="media-figure-grid">${figures}</div>` : ""}
    </section>
  `;
}

function bashafumuSectionHtml() {
  const cards = bashafumu.members.map((n) => rosterCard(n, "Shafumu", portraitFor(n))).join("");
  return `
    <section class="subsection bashafumu-section" id="bashafumu">
      ${sectionHead("Traditional Office", "The Bashafumu")}
      <p class="section-deck">${esc(bashafumu.intro)}</p>
      <div class="baluunda-grid">${cards}</div>
    </section>
  `;
}

function renderGovernance() {
  // Institution cards carry gov-* anchors, matching the chart nodes above and
  // keeping them clear of the #gov-offices section that wraps them.
  const govAnchor = (id) => `gov-${id}`;
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

  $("#page-governance").innerHTML = `
    <div class="page-hero page-hero-compact page-hero-governance">
      <div class="container page-hero-content">
        <p class="eyebrow">Governance</p>
        <h1>Royal Governance and Administration</h1>
        <p>The Mwata presides over two councils, the Baluunda judiciary and the Council of Chiefs, alongside the court, land, protocol, and public administration of the Kingdom.</p>
      </div>
    </div>
    <div class="container page-body">
      ${councilChartHtml()}
      ${mwataCabinetSectionHtml()}
      ${baluundaSectionHtml()}
      ${bashafumuSectionHtml()}
      ${subChiefsSectionHtml()}
      ${spiritualSystemSectionHtml()}
      ${impembweSectionHtml()}
      <section class="subsection" id="gov-offices">
        ${sectionHead("The royal seat", "Offices of the Royal Seat")}
        <div class="gov-institution-grid">${institutions}</div>
      </section>
      <section class="subsection" id="agencies">
        ${sectionHead("Kingdom desks", "Kingdom Agencies", kingdomAgenciesIntro)}
        <div class="agency-grid">${agencyCards}</div>
      </section>
    </div>
  `;
}

function builtHeritageHtml() {
  const intro = builtHeritage.intro.map((p) => `<p class="section-deck">${esc(p)}</p>`).join("");
  const monument = builtHeritage.monument
    ? `
      <figure class="built-monument">
        <div class="built-monument-media">
          <img src="${esc(builtHeritage.monument.src)}" alt="${esc(builtHeritage.monument.caption)}" loading="lazy">
        </div>
        <figcaption>${esc(builtHeritage.monument.caption)}</figcaption>
      </figure>
    `
    : "";
  const items = builtHeritage.items
    .map(
      (it) => `
      <figure class="built-card">
        <div class="built-card-media">
          <img src="${esc(it.src)}" alt="${esc(it.caption)}" loading="lazy">
          <span class="built-card-group">${esc(it.group)}</span>
        </div>
        <figcaption>${esc(it.caption)}</figcaption>
      </figure>
    `
    )
    .join("");

  return `
    <section class="subsection built-heritage-section" id="kingdom-built-heritage">
      ${sectionHead("Built Heritage", "Traditional Homes and Old Administration")}
      ${intro}
      ${monument}
      <div class="built-grid">${items}</div>
    </section>
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
      return `<h3>${esc(k.title)}, ${esc(k.name)}</h3><p><strong>Reign:</strong> ${esc(k.reign)}</p><p>${esc(k.note)}</p><span class="confidence">${esc(k.confidence)}</span>`;
    }
    const events = (p.keyEvents || []).map((e) => `<li>${esc(e)}</li>`).join("");
    return `
      <h3>${esc(k.title)}, ${esc(k.name)}</h3>
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
        <p><strong>${esc(k.name)}</strong>. ${esc(k.note)}</p>
        <span class="confidence">${esc(k.confidence)}</span>
        <div class="timeline-detail-source hidden">${rulerProfilePanel(k)}</div>
      </article>
    `
    )
    .join("");

  $("#page-kingdom").innerHTML = `
    <div class="page-hero page-hero-compact">
      <div class="container page-hero-content">
        <p class="eyebrow">Heritage & Culture</p>
        <h1>Heritage & Culture of the Kazembe Kingdom</h1>
        <p>State formation on the Luapula, the Mwata Kazembe line, the Umutomboko ceremony, the royal museum, and the visual record.</p>
      </div>
    </div>
    <div class="container page-body">
      <section class="subsection heritage-hub" id="heritage-hub" aria-label="Heritage sections">
        <div class="heritage-hub-grid">
          <a class="heritage-hub-link" href="#kingdom-chapters">History &amp; State Formation</a>
          <a class="heritage-hub-link" href="#kingdom-timeline">The Ruler Line</a>
          <a class="heritage-hub-link" href="#mutomboko">Umutomboko Ceremony</a>
          <a class="heritage-hub-link" href="#kingdom-built-heritage">Built Heritage</a>
          <a class="heritage-hub-link" href="#museum">Royal Museum</a>
          <a class="heritage-hub-link" href="#kingdom-gallery">Gallery</a>
        </div>
      </section>
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
      ${builtHeritageHtml()}
      ${heritageGalleryHtml()}
    </div>
  `;
}

function mutombokoMediaBlock() {
  const videos = supportingVideos("mutomboko");
  const refs = supportingReferences("mutomboko");
  if (!videos.length && !refs.length) return "";

  const videoHtml = videos
    .map(
      (v) => `
      <figure class="media-video">
        <div class="video-embed" data-embed="${esc(v.embedUrl)}" data-title="${esc(v.title)}">
          <button class="video-embed-play" type="button" aria-label="Load and play: ${esc(v.title)}">
            <span class="video-embed-icon" aria-hidden="true">▶</span>
            <span class="video-embed-label">Play video</span>
          </button>
        </div>
        <figcaption class="media-caption">
          <span>${esc(v.caption)}</span>
          ${v.sourceUrl ? `<a class="link-arrow" href="${esc(v.sourceUrl)}" target="_blank" rel="noreferrer">Watch on ${esc(v.sourceName || "source platform")}</a>` : ""}
        </figcaption>
      </figure>
    `
    )
    .join("");

  const refHtml = refs.length
    ? `
      <div class="media-refs">
        <h4 class="media-refs-title">Selected public references</h4>
        <ul class="media-ref-list">
          ${refs
            .map(
              (r) => `
            <li>
              <a href="${esc(r.sourceUrl)}" target="_blank" rel="noreferrer"><strong>${esc(r.title)}</strong></a>
              <span class="media-ref-source">${esc(r.sourceName)}</span>
              <p>${esc(r.caption)}</p>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `
    : "";

  return `
    <div class="media-records" id="mutomboko-records">
      <h3 class="media-records-title">Public Records &amp; Media</h3>
      <p class="media-records-deck">Selected public video and references documenting the Umutomboko ceremony at Mwansabombwe. Media is embedded or linked from its source platform, not hosted by the Kingdom.</p>
      ${videoHtml}
      ${refHtml}
    </div>
  `;
}

function renderMutomboko() {
  const program = ceremonySteps
    .map(
      (step) => `
      <article class="ceremony-step">
        <span class="step-day">${esc(step.day)}</span>
        <h3>${esc(step.label)}: ${esc(step.title)}</h3>
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
        <h1>Umutomboko, the Dance of Conquest</h1>
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
        ${mutombokoMediaBlock()}
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

  const archives = archiveRecords
    .map(
      (a) => `
      <article class="archive-card ${a.available ? "" : "is-pending"}">
        <span class="archive-type">${esc(a.type)}</span>
        <h3>${esc(a.title)}</h3>
        <time>${esc(a.date)}</time>
        <p>${esc(a.note)}</p>
        ${a.available && a.url ? `<a class="link-arrow" href="${esc(a.url)}" ${a.url.startsWith("#") ? 'data-nav="home"' : a.url.endsWith(".pdf") ? "" : 'target="_blank" rel="noreferrer"'}>Open record</a>` : ""}
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
      <section class="subsection" id="archive">
        ${sectionHead("Records", "Kingdom Archive")}
        <p class="section-deck">Historical records, ceremony photography, and documents held or referenced by the Kingdom. Records not yet available are marked as pending official material. The full credited image collection is presented in the <a href="#kingdom-gallery">Heritage &amp; Culture gallery</a>.</p>
        <div class="archive-grid">${archives}</div>
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
        <p class="donations-deck">The Royal Museum presents the ceremonial and material heritage of the Lunda-Kazembe state: its regalia, instruments, processional objects, and archival sources carry the memory of authority, migration, and identity across three centuries of continuity.</p>
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
            <h2 class="store-header-title">Heritage Catalog</h2>
            <p class="store-header-note">All proceeds support historical preservation and Mwansabombwe community projects.</p>
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
      modal.className = "kingdom-modal";

      modal.innerHTML = `
        <div class="kingdom-modal-card">
          <span class="kingdom-modal-icon">👑</span>
          <h3>Simulated Secure Checkout</h3>
          <p>
            You are placing a simulated order of <strong>$${totalAmount.toFixed(2)}</strong>. All proceeds from the Kingdom Store support cultural archives and youth projects in Mwansabombwe.
          </p>
          <div class="kingdom-modal-actions">
            <button type="button" id="modal-cancel" class="btn-add-cart btn-compact">Cancel</button>
            <button type="button" id="modal-confirm" class="btn-checkout btn-compact">Confirm Order</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector("#modal-cancel").addEventListener("click", () => {
        modal.remove();
      });

      modal.querySelector("#modal-confirm").addEventListener("click", () => {
        modal.innerHTML = `
          <div class="kingdom-modal-card">
            <span class="kingdom-modal-icon">✨</span>
            <h3>Order Successful!</h3>
            <p>
              Thank you for supporting the Mwata Kazembe Kingdom. Your order has been registered in our simulated database.
            </p>
            <button type="button" id="modal-close" class="btn-checkout btn-royal">Back to Store</button>
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
          <h3 class="form-panel-title">Contribution Details</h3>
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
            <div class="form-actions">
              <button type="submit" class="btn-checkout">
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
    modal.className = "kingdom-modal";

    modal.innerHTML = `
      <div class="kingdom-modal-card">
        <span class="kingdom-modal-icon">🤝</span>
        <h3>Thank You, Guardian!</h3>
        <p>
          Dear <strong>${esc(donorName)}</strong>, your simulated contribution of <strong>$${activeDonationAmount.toFixed(2)}</strong> was processed successfully.
        </p>
        <p class="is-fine">
          A simulated receipt has been dispatched to <strong>${esc(donorEmail)}</strong>. Your support is instrumental in maintaining the historical legacy of the Luapula-Lunda.
        </p>
        <button type="button" id="donation-modal-close" class="btn-checkout btn-royal">Close</button>
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
          <h3 class="form-panel-title">Registry Enrolment</h3>
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
              <select id="member-tier" class="form-control" required>
                <option value="Standard Supporter">Standard Supporter</option>
                <option value="Cultural Custodian">Cultural Custodian</option>
                <option value="Archival Contributor">Archival Contributor</option>
                <option value="Honorary Elder">Honorary Elder</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-checkout btn-royal">Enrol and Generate Certificate</button>
            </div>
          </form>
        </div>

        <div class="certificate-preview-panel">
          <h3 class="form-panel-title is-centered">Digital Enrolment Scroll</h3>
          <div id="certificate-target" class="cert-target">
            <div class="cert-empty">
              <p class="cert-empty-title">No active enrolment found.</p>
              <p class="cert-empty-sub">Complete the registry form to instantly generate and print your parchment-style Certificate of Support.</p>
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
        <strong class="cert-tier">${esc(tier)}</strong>
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

const HOME_ANCHORS = new Set([
  "official-notices",
  "kingdom-glance",
  "kingdom-figures",
  "kingdom-pathways",
  "mwata-lineage",
  "mutomboko-feature",
  "royal-news",
  "support-kingdom"
]);

const GOVERNANCE_ANCHORS = new Set([
  "council",
  "chiefs",
  "agencies",
  "protocol",
  "baluunda",
  "council-chart",
  "mwata-cabinet",
  "bashafumu",
  "sub-chiefs",
  "spiritual-system",
  "impembwe"
]);

function pageFromHash(hash) {
  if (!hash || hash === "home") return "home";
  // Explicit home-section anchors win over the broad prefix checks below
  // (e.g. #kingdom-glance is a home section, not the Kingdom page).
  if (HOME_ANCHORS.has(hash)) return "home";
  if (hash.startsWith("clans") || hash === "royal-family") return "clans";
  // Roster sections of the governance page. Without these, #spiritual-system
  // and #sub-chiefs fall through to the home page, and #mwata-cabinet is
  // caught by the Mwata rule below, so a link to a roster opens the wrong page.
  if (GOVERNANCE_ANCHORS.has(hash) || hash.startsWith("gov")) return "governance";
  if (hash.startsWith("mwata") && hash !== "mwata-lineage") return "mwata";
  if (hash.startsWith("kingdom") || hash === "early-mwatas") return "kingdom";
  if (hash.startsWith("mutomboko")) return "mutomboko";
  if (hash.startsWith("dev") || hash === "development-public") return "development";
  if (hash.startsWith("news") || hash === "publications" || hash === "gallery" || hash === "archive") return "newsroom";
  if (hash === "contact") return "contact";
  if (hash === "museum") return "museum";
  if (hash === "store") return "store";
  if (hash === "donations") return "donations";
  if (hash === "membership") return "membership";

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
  // Instant jump: the page cross-fade in initPageMotion covers the swap, and
  // scroll-triggered reveals must be created from the top of the new page.
  // Both the inline override and behavior:"instant" are needed to beat the
  // global `scroll-behavior: smooth` — a smooth scroll left in flight gets
  // cancelled by ScrollTrigger.refresh(), stranding the page mid-scroll.
  const rootStyle = document.documentElement.style;
  const prevScrollBehavior = rootStyle.scrollBehavior;
  rootStyle.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  rootStyle.scrollBehavior = prevScrollBehavior;
  initPageMotion(pageId);
  if (pageId === "home") initInteractions();
  if (pageId === "governance") initCouncilChart();
}

// Anchors kept alive after the repeated governance accordion was removed, so
// older links and bookmarks still land on the section that now carries the
// subject.
const ANCHOR_ALIASES = {
  chiefs: "gov-chiefs",
  council: "gov-council",
  "gov-admin": "agencies",
  "gov-protocol": "protocol",
  "gov-development": "agencies"
};

function resolvePageFromHash() {
  const hash = (location.hash || "#home").slice(1);
  const pageId = pageFromHash(hash);
  showPage(pageId);
  if (hash && hash !== pageId) {
    requestAnimationFrame(() => {
      const el = document.getElementById(hash) || document.getElementById(ANCHOR_ALIASES[hash] || "");
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
    // Mobile drawer: chevron toggles a section's sub-links without navigating.
    const subToggle = e.target.closest(".mobile-sub-toggle");
    if (subToggle) {
      const expanded = subToggle.getAttribute("aria-expanded") === "true";
      subToggle.setAttribute("aria-expanded", String(!expanded));
      const panel = document.getElementById(subToggle.getAttribute("aria-controls"));
      if (panel) panel.hidden = expanded;
      return;
    }

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

function bindVideoEmbeds() {
  // Click-to-load (lazy) facade: third-party video iframes are only injected on
  // user intent, so hidden pages never load external embeds.
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".video-embed-play");
    if (!trigger) return;
    const wrap = trigger.closest(".video-embed");
    if (!wrap) return;
    const src = wrap.dataset.embed;
    const title = wrap.dataset.title || "Embedded video";
    if (!src) return;
    const autoplaySrc = src + (src.includes("?") ? "&" : "?") + "autoplay=1";
    wrap.innerHTML = `<iframe src="${esc(autoplaySrc)}" title="${esc(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    wrap.classList.add("is-loaded");
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

const councilMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function playCouncilChart(chart) {
  if (chart.dataset.animated === "true") return;
  chart.dataset.animated = "true";
  if (!window.gsap || councilMotionQuery.matches) return; // chart is visible by default

  const q = (sel) => Array.from(chart.querySelectorAll(sel));
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(chart.querySelectorAll(".node-root"), { autoAlpha: 0, y: 18, scale: 0.96, duration: 0.6, clearProps: "transform,opacity,visibility" })
    .from(q("[data-chart-rail]"), { scaleY: 0, transformOrigin: "top center", duration: 0.4, stagger: 0.12, clearProps: "transform" }, "-=0.2")
    .from(chart.querySelectorAll(".node-branch"), { autoAlpha: 0, y: 22, duration: 0.5, stagger: 0.12, clearProps: "transform,opacity,visibility" }, "-=0.45")
    .from(chart.querySelectorAll(".chart-level-tier3 .chart-node"), { autoAlpha: 0, y: 22, duration: 0.5, stagger: 0.12, clearProps: "transform,opacity,visibility" }, "-=0.25")
    .from(q("[data-chart-seat]"), { autoAlpha: 0, y: 16, duration: 0.42, stagger: 0.08, clearProps: "transform,opacity,visibility" }, "-=0.2")
    .from(chart.querySelectorAll(".chart-level-support .chart-node"), { autoAlpha: 0, y: 22, duration: 0.5, stagger: 0.09, clearProps: "transform,opacity,visibility" }, "-=0.1");
}

function initCouncilChart() {
  const chart = document.querySelector("[data-council-chart]");
  if (!chart || chart.dataset.observed === "true") return;
  chart.dataset.observed = "true";

  if (!window.gsap || councilMotionQuery.matches) {
    chart.dataset.animated = "true";
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        playCouncilChart(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );
  observer.observe(chart);
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
  bindVideoEmbeds();
  bindBackToTop();
  resolvePageFromHash();
  initInteractions();
  initCouncilChart();
}

init();
