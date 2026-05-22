import {
  calendar,
  developmentPillars,
  governanceSections,
  governanceStructure,
  historyChapters,
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
  ceremonySteps
} from "./kingdom-data.js";
import { creditCaption, getCreditById } from "./image-credits.js";
import { initInteractions } from "./interactions.js";
import { homePageHtml } from "./render-home.js";

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
        ${s.image ? cardImage("", s.title, s.title, "mutomboko-ceremony-2017-02") : cardImage("", s.title, "Symbol")}
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
      <article class="timeline-entry ${k.id === 19 ? "is-current" : ""}" data-king-id="${k.id}" role="button" tabindex="0">
        <span class="timeline-reign">${esc(k.reign)}</span>
        <h3>${esc(k.title)}</h3>
        <p><strong>${esc(k.name)}</strong> — ${esc(k.note)}</p>
        <span class="confidence">${esc(k.confidence)}</span>
        <div class="timeline-detail-source hidden">
          <h3>${esc(k.title)} — ${esc(k.name)}</h3>
          <p><strong>Reign:</strong> ${esc(k.reign)}</p>
          <p>${esc(k.note)}</p>
          <p><strong>Record status:</strong> ${esc(k.confidence)}</p>
        </div>
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
      const item = getCreditById(g.imageCreditId);
      if (!item) return "";
      return `
      <button type="button" class="gallery-card" data-lightbox="${esc(item.id)}">
        <img src="${esc(item.src)}" alt="${esc(item.altText)}" data-credit-id="${esc(item.id)}">
        <figcaption>${esc(item.creditLine)}</figcaption>
      </button>
    `;
    })
    .join("");

  $("#page-mutomboko").innerHTML = `
    <div class="page-hero page-hero-mutomboko">
      <div class="page-hero-bg" style="background-image:url('${esc(siteMeta.ceremonyImage)}')"></div>
      <div class="container page-hero-content">
        <p class="eyebrow">State Ceremony</p>
        <h1>Umutomboko — Dance of Victory</h1>
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
        <div class="gallery-grid swipe-track" data-swipe="gallery">${gallery}</div>
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
  if (hash === "leadership" || hash === "government" || hash === "living-kingdom") return "home";
  if (hash === "kingdom-story" || hash === "mwata-lineage" || hash === "mutomboko-journey" || hash === "people-kingdom" || hash === "projects-progress" || hash === "royal-news" || hash === "home-gallery" || hash === "visit-support" || hash === "kingdom-glance") return "home";
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
  initInteractions();
}

init();
