import {
  artifacts,
  atlasModes,
  calendar,
  ceremonySteps,
  kings,
  mapMarkers,
  routes,
  sourceClaims,
  sources,
  sourceTypes
} from "./data.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const byId = (id) => document.getElementById(id);
const sections = $$(".spread");
const sourceById = new Map(sources.map((source) => [source.id, source]));
const routeById = new Map(routes.map((route) => [route.id, route]));
const artifactById = new Map(artifacts.map((artifact) => [artifact.id, artifact]));
const isMobile = () => window.matchMedia("(max-width: 760px)").matches;

let page = 0;
let activeRouteId = routes[0].id;
let activeStepId = ceremonySteps[0].id;
let activeKingEra = "all";
let activeSourceType = "all";
let mapScale = 1;
let touchStartX = 0;
let wheelLocked = false;

function html(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sourceChips(ids) {
  return `
    <div class="source-list">
      ${ids.map((id) => {
        const source = sourceById.get(id);
        return `<button class="source-chip" type="button" data-source-link="${id}">${html(source?.label ?? id)}</button>`;
      }).join("")}
    </div>
  `;
}

function goToPage(nextPage) {
  page = Math.max(0, Math.min(sections.length - 1, nextPage));
  if (isMobile()) {
    sections[page].scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    byId("track").style.transform = `translateX(-${page * 100}vw)`;
  }
  sections.forEach((section, index) => section.classList.toggle("active", index === page));
  byId("prev-page").disabled = page === 0;
  byId("next-page").disabled = page === sections.length - 1;
  $$(".progress button").forEach((button, index) => button.classList.toggle("active", index === page));
}

function openDrawer(drawer) {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer(drawer) {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function buildNavigation() {
  sections.forEach((section, index) => {
    const title = section.dataset.title;
    const item = document.createElement("button");
    item.type = "button";
    item.className = "contents-item";
    item.innerHTML = `<span class="num">${String(index + 1).padStart(2, "0")}</span><strong>${html(title)}</strong><span class="page">${index + 1}</span>`;
    item.addEventListener("click", () => {
      closeDrawer(byId("contents"));
      goToPage(index);
    });
    byId("contents-list").appendChild(item);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Open ${title}`);
    dot.addEventListener("click", () => goToPage(index));
    byId("progress").appendChild(dot);

  });
}

function renderSourceTypeButtons(container, active, onSelect) {
  container.innerHTML = sourceTypes.map((type) => `
    <button type="button" class="${type.id === active ? "active" : ""}" data-type="${type.id}">${html(type.label)}</button>
  `).join("");
  $$("button", container).forEach((button) => {
    button.addEventListener("click", () => onSelect(button.dataset.type));
  });
}

function renderDrawerSources(active = "all", focus = "") {
  const filtered = sources.filter((source) => active === "all" || source.type === active || source.id === focus);
  byId("drawer-sources").innerHTML = filtered.map((source) => `
    <article class="source-card" id="drawer-source-${source.id}">
      <span class="tag">${html(source.type)}</span>
      <strong>${html(source.title)}</strong>
      <p>${html(source.note)}</p>
      ${source.url ? `<a href="${source.url}" target="_blank" rel="noreferrer">Open source</a>` : ""}
    </article>
  `).join("");
}

function openSource(id = "") {
  openDrawer(byId("source-drawer"));
  renderSourceTypeButtons(byId("drawer-source-types"), activeSourceType, (next) => {
    activeSourceType = next;
    renderDrawerSources(next);
  });
  renderDrawerSources(activeSourceType, id);
  if (id) {
    requestAnimationFrame(() => byId(`drawer-source-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }
}

function markerPoint(marker) {
  return { x: marker.x * 9, y: marker.y * 8.2 };
}

function drawMap(svg, handlers = {}) {
  svg.innerHTML = "";
  routes.forEach((route) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", route.path);
    path.setAttribute("stroke", route.color);
    path.dataset.route = route.id;
    path.classList.add("map-route", "ghost");
    path.addEventListener("click", () => handlers.onRoute?.(route.id));
    svg.appendChild(path);
    path.style.setProperty("--dash", Math.ceil(path.getTotalLength()));
  });
  mapMarkers.forEach((marker) => {
    const point = markerPoint(marker);
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("map-marker");
    group.dataset.marker = marker.id;
    group.setAttribute("transform", `translate(${point.x} ${point.y})`);
    group.innerHTML = `<circle r="${marker.kind === "capital" ? 10 : 7}"></circle><text x="14" y="5">${html(marker.label)}</text>`;
    group.addEventListener("click", () => handlers.onMarker?.(marker.id));
    svg.appendChild(group);
  });
}

function updateMap(svg, routeIds = [], markerIds = []) {
  $$(".map-route", svg).forEach((routePath) => {
    const active = routeIds.includes(routePath.dataset.route);
    routePath.classList.toggle("active", active);
    routePath.classList.toggle("ghost", !active);
  });
  $$(".map-marker", svg).forEach((marker) => {
    marker.classList.toggle("active", markerIds.includes(marker.dataset.marker));
  });
}

function renderAtlas() {
  const svg = byId("atlas-svg");
  const modes = byId("atlas-modes");
  const story = byId("atlas-story");

  drawMap(svg, {
    onRoute: (id) => selectMode((atlasModes.find((mode) => mode.activeRoutes.includes(id)) ?? atlasModes[0]).id),
    onMarker: (id) => selectMode((atlasModes.find((mode) => mode.markers.includes(id)) ?? atlasModes[0]).id)
  });

  modes.innerHTML = atlasModes.map((mode) => `<button type="button" data-mode="${mode.id}">${html(mode.label)}</button>`).join("");
  $$("button", modes).forEach((button) => button.addEventListener("click", () => selectMode(button.dataset.mode)));

  function selectMode(id) {
    const mode = atlasModes.find((item) => item.id === id) ?? atlasModes[0];
    $$("button", modes).forEach((button) => button.classList.toggle("active", button.dataset.mode === id));
    updateMap(svg, mode.activeRoutes, mode.markers);
    story.innerHTML = `
      <div class="meta"><span class="tag">${html(mode.period)}</span><span class="tag">${html(mode.confidence)}</span></div>
      <h3>${html(mode.title)}</h3>
      <p>${html(mode.summary)}</p>
      <p><strong>Evidence label:</strong> ${html(mode.claim)}</p>
      ${sourceChips(mode.sources)}
    `;
  }

  selectMode(atlasModes[0].id);
}

function renderRoutes() {
  const svg = byId("routes-svg");
  const rail = byId("route-rail");
  const shell = byId("route-card-shell");

  drawMap(svg, {
    onRoute: selectRoute,
    onMarker: (id) => {
      const route = routes.find((item) => item.nodes.includes(id));
      if (route) selectRoute(route.id);
    }
  });

  rail.innerHTML = routes.map((route, index) => `
    <button type="button" data-route="${route.id}">
      <span>${String(index + 1).padStart(2, "0")} / ${html(route.period)}</span>
      <strong>${html(route.title)}</strong>
    </button>
  `).join("");
  $$("button", rail).forEach((button) => button.addEventListener("click", () => selectRoute(button.dataset.route)));

  let dragging = false;
  let startX = 0;
  let scrollLeft = 0;
  rail.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.pageX;
    scrollLeft = rail.scrollLeft;
    rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener("pointermove", (event) => {
    if (dragging) rail.scrollLeft = scrollLeft - (event.pageX - startX);
  });
  rail.addEventListener("pointerup", () => {
    dragging = false;
  });

  function selectRoute(id) {
    activeRouteId = id;
    const route = routeById.get(id) ?? routes[0];
    updateMap(svg, [route.id], route.nodes);
    $$("button", rail).forEach((button) => button.classList.toggle("active", button.dataset.route === route.id));
    shell.innerHTML = `
      <article class="route-card">
        <span class="route-number">${html(route.period)} / ${html(route.type)}</span>
        <h3>${html(route.title)}</h3>
        <p>${html(route.summary)}</p>
        <p><strong>Evidence:</strong> ${html(route.evidence)}</p>
        ${sourceChips(route.sources)}
      </article>
    `;
  }

  selectRoute(activeRouteId);
}

function artifactImage(artifact) {
  if (artifact.image) {
    return `<img src="${artifact.image}" alt="${html(artifact.name)} reconstruction plate">`;
  }
  return `<div class="artifact-placeholder">${html(artifact.name)}</div>`;
}

function renderArtifacts() {
  const wall = byId("artifact-wall");
  wall.innerHTML = artifacts.map((artifact) => `
    <button class="artifact-card" type="button" data-artifact="${artifact.id}">
      ${artifactImage(artifact)}
      <span class="artifact-copy">
        <span>${html(artifact.status)} / ${html(artifact.className)}</span>
        <strong>${html(artifact.name)}</strong>
        <p>${html(artifact.meaning)}</p>
      </span>
    </button>
  `).join("");
  $$(".artifact-card", wall).forEach((card) => card.addEventListener("click", () => openFolio(card.dataset.artifact)));
}

function openFolio(id) {
  const artifact = artifactById.get(id);
  if (!artifact) return;
  const modal = byId("folio-modal");
  const content = byId("modal-content");
  const tabs = [
    ["meaning", "Meaning", artifact.meaning],
    ["performance", "Performance Role", artifact.performance],
    ["provenance", "Provenance", artifact.provenance],
    ["visualEvidence", "Visual Evidence", artifact.visualEvidence],
    ["reconstruction", "Reconstruction Notes", artifact.reconstruction],
    ["sources", "Sources", ""]
  ];
  content.innerHTML = `
    <div class="folio-grid">
      <div class="folio-media">${artifactImage(artifact)}</div>
      <div>
        <div class="meta"><span class="tag">${html(artifact.status)}</span><span class="tag">${html(artifact.className)}</span></div>
        <h2>${html(artifact.name)}</h2>
        <div class="folio-tabs">
          ${tabs.map((tab, index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-tab="${tab[0]}">${tab[1]}</button>`).join("")}
        </div>
        <div class="folio-pane" id="folio-pane"></div>
      </div>
    </div>
  `;
  const pane = byId("folio-pane");
  function selectTab(key) {
    $$(".folio-tabs button", content).forEach((button) => button.classList.toggle("active", button.dataset.tab === key));
    if (key === "sources") pane.innerHTML = `<p>Sources connected to this folio:</p>${sourceChips(artifact.sources)}`;
    else pane.innerHTML = `<p>${html((tabs.find((tab) => tab[0] === key) ?? tabs[0])[2])}</p>`;
  }
  $$(".folio-tabs button", content).forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.tab)));
  selectTab("meaning");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  byId("folio-modal").classList.remove("open");
  byId("folio-modal").setAttribute("aria-hidden", "true");
}

function renderCeremony() {
  const path = byId("ceremony-path");
  path.innerHTML = ceremonySteps.map((step, index) => `
    <button class="ceremony-step" type="button" data-step="${step.id}" data-day="${step.day}">
      <span>${html(step.day)} / ${String(index + 1).padStart(2, "0")}</span>
      <strong>${html(step.label)}</strong>
      <p>${html(step.title)}</p>
    </button>
  `).join("");
  $$(".ceremony-step", path).forEach((button) => button.addEventListener("click", () => selectCeremony(button.dataset.step)));
  $$(".day-pill").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".day-pill").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      $$(".ceremony-step").forEach((step) => {
        step.classList.toggle("hidden-by-day", button.dataset.day !== "all" && step.dataset.day !== button.dataset.day);
      });
    });
  });
  selectCeremony(activeStepId);
}

function selectCeremony(id) {
  activeStepId = id;
  const step = ceremonySteps.find((item) => item.id === id) ?? ceremonySteps[0];
  $$(".ceremony-step").forEach((button) => button.classList.toggle("active", button.dataset.step === id));
  const imageArtifact = artifactById.get(step.objectIds[0]) ?? artifacts[0];
  byId("ceremony-detail").innerHTML = `
    <div class="meta"><span class="tag">${html(step.day)}</span><span class="tag">${html(step.location)}</span></div>
    <h3>${html(step.title)}</h3>
    <p>${html(step.summary)}</p>
    <div class="detail-image">${artifactImage(imageArtifact)}</div>
    <p><strong>Evidence:</strong> ${html(step.evidence)}</p>
    <div class="object-chips">
      ${step.objectIds.map((artifactId) => {
        const artifact = artifactById.get(artifactId);
        return artifact ? `<button type="button" data-artifact-link="${artifact.id}">${html(artifact.name)}</button>` : "";
      }).join("")}
    </div>
    ${sourceChips(step.sources)}
  `;
}

function renderKings() {
  const filters = byId("king-filters");
  const eras = ["all", ...new Set(kings.map((king) => king.era))];
  filters.innerHTML = eras.map((era) => `<button type="button" class="${era === "all" ? "active" : ""}" data-era="${era}">${html(era)}</button>`).join("");
  $$("button", filters).forEach((button) => {
    button.addEventListener("click", () => {
      activeKingEra = button.dataset.era;
      $$("button", filters).forEach((item) => item.classList.toggle("active", item.dataset.era === activeKingEra));
      updateKingList();
    });
  });
  byId("king-search").addEventListener("input", updateKingList);
  updateKingList();
}

function updateKingList() {
  const term = byId("king-search").value.trim().toLowerCase();
  const filtered = kings.filter((king) => {
    const matchesEra = activeKingEra === "all" || king.era === activeKingEra;
    const haystack = `${king.name} ${king.reign} ${king.title} ${king.note} ${king.confidence}`.toLowerCase();
    return matchesEra && (!term || haystack.includes(term));
  });
  byId("king-timeline").innerHTML = filtered.length ? filtered.map((king) => `
    <article class="king-card">
      <span>${html(king.era)} / ${html(king.confidence)}</span>
      <strong>${html(king.name)}</strong>
      <em>${html(king.title)} - ${html(king.reign)}</em>
      <p>${html(king.note)}</p>
      ${sourceChips(king.sources)}
      <div class="king-number">${String(king.id).padStart(2, "0")}</div>
    </article>
  `).join("") : `<div class="empty-state">No ruler matches the current filters.</div>`;
}

function renderArchiveDesk() {
  const typeRow = byId("archive-source-types");
  const grid = byId("source-grid");
  const claims = byId("claim-list");

  function render(type = "all") {
    renderSourceTypeButtons(typeRow, type, render);
    const filteredSources = sources.filter((source) => type === "all" || source.type === type);
    const filteredClaims = sourceClaims.filter((claim) => type === "all" || claim.sources.some((id) => sourceById.get(id)?.type === type));
    grid.innerHTML = filteredSources.map((source) => `
      <article class="source-card">
        <span class="tag">${html(source.type)}</span>
        <strong>${html(source.label)}</strong>
        <p>${html(source.note)}</p>
        ${source.url ? `<a href="${source.url}" target="_blank" rel="noreferrer">Open source</a>` : ""}
      </article>
    `).join("");
    claims.innerHTML = filteredClaims.map((claim) => `
      <article class="claim-card">
        <span class="tag">${html(claim.type)}</span>
        <p>${html(claim.claim)}</p>
        ${sourceChips(claim.sources)}
      </article>
    `).join("");
  }

  render("all");
}

function renderCalendar() {
  const target = new Date(calendar.nextDateISO);
  const days = Math.max(0, Math.ceil((target - new Date()) / 86400000));
  byId("countdown").textContent = days > 0 ? `${days} days` : "Now / confirm";
  byId("calendar-copy").textContent = `${calendar.nextExpected} is shown as the expected next ceremony window based on the annual ${calendar.annualPattern} pattern. The 2025 notice listed ${calendar.confirmed2025}. Status: ${calendar.status}. Location: ${calendar.location}.`;
}

function setMapScale(next) {
  mapScale = Math.max(0.85, Math.min(1.55, next));
  $(".map-frame").style.setProperty("--map-scale", mapScale);
}

function bindGlobalEvents() {
  byId("contents-toggle").addEventListener("click", () => openDrawer(byId("contents")));
  byId("source-toggle").addEventListener("click", () => openSource());
  $$("[data-close]").forEach((button) => button.addEventListener("click", () => closeDrawer(byId(button.dataset.close))));
  byId("prev-page").addEventListener("click", () => goToPage(page - 1));
  byId("next-page").addEventListener("click", () => goToPage(page + 1));
  byId("modal-close").addEventListener("click", closeModal);
  byId("folio-modal").addEventListener("click", (event) => {
    if (event.target.id === "folio-modal") closeModal();
  });
  document.addEventListener("click", (event) => {
    const jump = event.target.closest("[data-jump]");
    if (jump) goToPage(sections.findIndex((section) => section.id === jump.dataset.jump));
    const source = event.target.closest("[data-source-link]");
    if (source) openSource(source.dataset.sourceLink);
    const artifact = event.target.closest("[data-artifact-link]");
    if (artifact) openFolio(artifact.dataset.artifactLink);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") goToPage(page + 1);
    if (event.key === "ArrowLeft") goToPage(page - 1);
    if (event.key === "Escape") {
      closeModal();
      closeDrawer(byId("contents"));
      closeDrawer(byId("source-drawer"));
    }
  });
  document.addEventListener("wheel", (event) => {
    if (isMobile() || wheelLocked || Math.abs(event.deltaY) < 35) return;
    wheelLocked = true;
    goToPage(page + (event.deltaY > 0 ? 1 : -1));
    setTimeout(() => {
      wheelLocked = false;
    }, 780);
  }, { passive: true });
  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  document.addEventListener("touchend", (event) => {
    if (isMobile()) return;
    const diff = touchStartX - event.changedTouches[0].screenX;
    if (Math.abs(diff) > 60) goToPage(page + (diff > 0 ? 1 : -1));
  }, { passive: true });
  byId("map-zoom-in").addEventListener("click", () => setMapScale(mapScale + 0.12));
  byId("map-zoom-out").addEventListener("click", () => setMapScale(mapScale - 0.12));
  byId("map-reset").addEventListener("click", () => setMapScale(1));
}

function init() {
  buildNavigation();
  renderSourceTypeButtons(byId("drawer-source-types"), "all", (type) => {
    activeSourceType = type;
    renderDrawerSources(type);
  });
  renderDrawerSources("all");
  renderAtlas();
  renderRoutes();
  renderArtifacts();
  renderCeremony();
  renderKings();
  renderArchiveDesk();
  renderCalendar();
  bindGlobalEvents();
  goToPage(0);
  setTimeout(() => byId("loader").classList.add("hide"), 650);
}

init();
