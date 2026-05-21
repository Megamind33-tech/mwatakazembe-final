import {
  artifacts,
  ceremonySteps,
  kings,
  sources
} from "./data.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const gsap = window.gsap;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sections = $$(".spread");

const sectionMeta = [
  {
    id: "cover",
    label: "Current Mwata",
    image: "assets/images/mwata-kazembe-home-portrait.jpg",
    summary: "The living office of Mwata Kazembe XIX anchors the royal library.",
    chips: ["Current office", "Portrait"]
  },
  {
    id: "atlas",
    label: "Kingdom Atlas",
    image: "assets/images/kazembe-kingdom-map-2007.jpg",
    summary: "Migration memory, regional context, trade routes, and disruption layers.",
    chips: ["Map", "Evidence layer"]
  },
  {
    id: "routes",
    label: "Routes of Memory",
    image: "assets/generated/atlas-parchment-map.png",
    summary: "Route cards connect Kola, Matanda, Luapula, Mwansabombwe, and collection displacement.",
    chips: ["Routes", "Oral tradition"]
  },
  {
    id: "regalia",
    label: "Regalia Vault",
    image: "assets/generated/reconstruction-crowns.png",
    summary: "Object folios for crowns, weapons, drums, royal litter, and ceremonial materials.",
    chips: ["Reconstruction", "Folio"]
  },
  {
    id: "ceremony",
    label: "Umutomboko Ceremony",
    image: "assets/images/mwata-kazembe-current-2017.png",
    summary: "A two-day ritual path from ancestral homage to the public dance of victory.",
    chips: ["Umutomboko", "Ritual path"]
  },
  {
    id: "lineage",
    label: "Lineage and Governance",
    image: "assets/images/mwata-kazembe-home-portrait.jpg",
    summary: "Royal timeline from foundation memory to the current Mwata.",
    chips: ["Lineage", "Confidence labels"]
  },
  {
    id: "archive-desk",
    label: "Archive Desk",
    image: "assets/generated/atlas-parchment-map.png",
    summary: "Source cards separate official, academic, archival, media, and reconstruction claims.",
    chips: ["Sources", "Verification"]
  },
  {
    id: "visit",
    label: "Visit and Calendar",
    image: "assets/generated/hero-living-archive.png",
    summary: "Visitor context and calendar notes remain separate from historical claims.",
    chips: ["Calendar", "Tentative"]
  }
];

function hasGsap() {
  return Boolean(gsap && !reduceMotion.matches);
}

function storageGet(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* session storage may be unavailable in some privacy modes */
  }
}

function setMode(mode) {
  const next = mode === "index" ? "index" : "orbit";
  document.body.dataset.exploreMode = next;
  const index = $("#archive-index");
  index?.setAttribute("aria-hidden", String(next !== "index"));
  $$("[data-mode-choice]").forEach((button) => {
    const active = button.dataset.modeChoice === next;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (hasGsap() && index) {
    if (next === "index") {
      gsap.fromTo(index, { y: 24 }, { y: 0, duration: 0.55, ease: "power3.out", clearProps: "transform" });
      gsap.fromTo($$(".index-card", index), { y: 18 }, { y: 0, duration: 0.45, stagger: 0.025, delay: 0.1, ease: "power2.out", clearProps: "transform,opacity,visibility" });
    }
  }
}

function playDrumPulse() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(92, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(42, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.34);
    setTimeout(() => ctx.close(), 500);
  } catch {
    /* The entry state still works if audio output is blocked. */
  }
}

function closeIntro(playSound) {
  if (playSound) playDrumPulse();
  storageSet("mwataArchiveIntroSeen", "true");
  const intro = $("#intro-ritual");
  if (!intro) return;
  if (hasGsap()) {
    gsap.to(intro, {
      autoAlpha: 0,
      scale: 1.02,
      duration: 0.65,
      ease: "power2.inOut",
      onComplete: () => {
        intro.classList.add("seen");
        gsap.set(intro, { clearProps: "transform" });
      }
    });
  } else {
    intro.classList.add("seen");
  }
}

function initIntro() {
  const intro = $("#intro-ritual");
  if (!intro) return;
  const params = new URLSearchParams(window.location.search);
  if (params.get("intro") === "skip") {
    storageSet("mwataArchiveIntroSeen", "true");
    intro.classList.add("seen");
    return;
  }
  if (storageGet("mwataArchiveIntroSeen") === "true") {
    intro.classList.add("seen");
    return;
  }
  if (hasGsap()) {
    gsap.fromTo(".intro-panel", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.72, ease: "power3.out", clearProps: "transform,opacity,visibility" });
    gsap.fromTo(".intro-orbit", { rotate: -12, scale: 0.92, autoAlpha: 0 }, { rotate: 0, scale: 1, autoAlpha: 1, duration: 1, delay: 0.55, ease: "power2.out", clearProps: "transform,opacity,visibility" });
  }
  $$("[data-enter-archive]").forEach((button) => {
    button.addEventListener("click", () => closeIntro(button.dataset.enterArchive === "drum"));
  });
}

function splitTitle(title) {
  if (!title || title.dataset.splitTitle === "true") return;
  const text = title.textContent.trim();
  if (!text) return;
  title.dataset.splitTitle = "true";
  title.setAttribute("aria-label", text);
  title.innerHTML = text.split(/\s+/).map((word) => `<span class="split-word" aria-hidden="true">${word}</span>`).join(" ");
}

function animateActiveTitle(section) {
  if (!hasGsap() || !section) return;
  const words = $$(".split-word", section);
  if (!words.length) return;
  gsap.fromTo(words, { autoAlpha: 0, yPercent: 42, rotateX: -18 }, { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 0.62, stagger: 0.035, ease: "power3.out", clearProps: "transform,opacity,visibility" });
}

function animateActiveCards(section) {
  if (!hasGsap() || !section) return;
  const cards = $$(".evidence-card, .current-mwata-card, .artifact-card, .ceremony-step, .king-card, .source-card, .route-card", section).slice(0, 12);
  if (!cards.length) return;
  gsap.fromTo(cards, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.035, ease: "power2.out", clearProps: "transform,opacity,visibility" });
}

function animateRoutes(section) {
  if (!hasGsap() || !section) return;
  $$(".map-route.active, .cover-route path", section).forEach((path) => {
    const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 1200;
    gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.25, ease: "power2.inOut" });
  });
}

function updateOrbitMotif(section) {
  if (!section) return;
  const id = section.id;
  $$(".orbit-node").forEach((node) => {
    const active = node.dataset.orbitNode === id || (id === "visit" && node.dataset.orbitNode === "archive-desk");
    node.classList.toggle("active", active);
  });
}

function handleActiveSection() {
  const active = $(".spread.active") || sections[0];
  updateOrbitMotif(active);
  animateActiveTitle(active);
  animateActiveCards(active);
  animateRoutes(active);
}

function observeActiveSections() {
  sections.forEach((section) => {
    const observer = new MutationObserver(() => {
      if (section.classList.contains("active")) handleActiveSection();
    });
    observer.observe(section, { attributes: true, attributeFilter: ["class"] });
  });
  handleActiveSection();
}

function buildArchiveDrawer() {
  const list = $("#contents-list");
  if (!list) return;
  list.innerHTML = sectionMeta.map((item, index) => `
    <button type="button" class="contents-item archive-preview" data-jump="${item.id}">
      <span class="preview-media"><img src="${item.image}" alt=""></span>
      <span class="preview-copy">
        <span class="preview-kicker">${String(index + 1).padStart(2, "0")} / ${item.id === "cover" ? "living office" : "exhibit"}</span>
        <strong>${item.label}</strong>
        <p>${item.summary}</p>
        <span class="preview-chips">${item.chips.map((chip) => `<span>${chip}</span>`).join("")}</span>
      </span>
    </button>
  `).join("");
  list.addEventListener("click", (event) => {
    const item = event.target.closest("[data-jump]");
    if (!item) return;
    $("#contents")?.classList.remove("open");
    $("#contents")?.setAttribute("aria-hidden", "true");
  });
}

function shortText(value, length = 118) {
  const text = String(value ?? "").trim();
  return text.length > length ? `${text.slice(0, length - 1)}...` : text;
}

function indexCard(label, title, detail, attrs = "") {
  return `
    <button type="button" class="index-card" ${attrs}>
      <strong>${title}</strong>
      <span>${label}</span>
      <p>${shortText(detail)}</p>
    </button>
  `;
}

function buildIndexMode() {
  const grid = $("#index-grid");
  if (!grid) return;
  const sectionCards = sectionMeta.map((item, index) => indexCard(
    `Section ${String(index + 1).padStart(2, "0")}`,
    item.label,
    item.summary,
    `data-jump="${item.id}"`
  )).join("");
  const artifactCards = artifacts.map((artifact) => indexCard(artifact.className || "Regalia", artifact.name, artifact.meaning, `data-artifact-link="${artifact.id}"`)).join("");
  const ceremonyCards = ceremonySteps.map((step) => indexCard(`${step.day} / ${step.location}`, step.title, step.summary, `data-jump="ceremony"`)).join("");
  const kingCards = kings.map((king) => indexCard(`${king.title} / ${king.reign}`, king.name, king.note, `data-jump="lineage"`)).join("");
  const sourceCards = sources.map((source) => indexCard(source.type, source.label, source.note, `data-source-link="${source.id}"`)).join("");
  grid.innerHTML = `
    <div class="index-column"><h3>Sections</h3>${sectionCards}</div>
    <div class="index-column"><h3>Regalia and Ceremony</h3>${artifactCards}${ceremonyCards}</div>
    <div class="index-column"><h3>Lineage and Sources</h3>${kingCards}${sourceCards}</div>
  `;
  grid.addEventListener("click", (event) => {
    const shouldReturn = event.target.closest("[data-jump], [data-artifact-link], [data-source-link]");
    if (shouldReturn) setMode("orbit");
  });
}

function observeDrawers() {
  if (!hasGsap()) return;
  $$(".drawer").forEach((drawer) => {
    const observer = new MutationObserver(() => {
      if (!drawer.classList.contains("open")) {
        gsap.set(drawer, { clearProps: "transform" });
        return;
      }
      gsap.fromTo(drawer, { x: drawer.classList.contains("drawer-left") ? "-6%" : "6%" }, { x: "0%", duration: 0.42, ease: "power3.out" });
      gsap.fromTo($$(".contents-item, .source-card", drawer), { autoAlpha: 0, x: drawer.classList.contains("drawer-left") ? -18 : 18 }, { autoAlpha: 1, x: 0, duration: 0.36, stagger: 0.025, ease: "power2.out", clearProps: "transform,opacity,visibility" });
    });
    observer.observe(drawer, { attributes: true, attributeFilter: ["class"] });
  });
}

function bindModeToggle() {
  document.body.dataset.exploreMode = "orbit";
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mode-choice]");
    if (!button) return;
    setMode(button.dataset.modeChoice);
  });
}

function init() {
  $$(".section-heading h2, .visit-hero h2").forEach(splitTitle);
  bindModeToggle();
  buildArchiveDrawer();
  buildIndexMode();
  initIntro();
  observeActiveSections();
  observeDrawers();
  if (new URLSearchParams(window.location.search).get("mode") === "index") setMode("index");
}

init();
