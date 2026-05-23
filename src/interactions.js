import { getCreditById } from "./image-credits.js";
import { kings } from "./kingdom-data.js";
import { enrichKings } from "./ruler-profiles.js";
import { sourceCitation } from "./ui-helpers.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const enrichedById = new Map(enrichKings(kings).map((k) => [k.id, k]));

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function motionEnabled() {
  return Boolean(window.gsap && !reduceMotion.matches);
}

function createLightbox() {
  if ($("#gallery-lightbox")) return;
  const box = document.createElement("div");
  box.id = "gallery-lightbox";
  box.className = "lightbox";
  box.setAttribute("aria-hidden", "true");
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Image viewer");
  box.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>
    <div class="lightbox-inner">
      <figure>
        <img class="lightbox-image" src="" alt="">
        <figcaption class="lightbox-caption">
          <h3 class="lightbox-title"></h3>
          <p class="lightbox-description"></p>
          <p class="lightbox-credit"></p>
          <p class="lightbox-usage"></p>
        </figcaption>
      </figure>
    </div>
  `;
  document.body.appendChild(box);
}

function openLightbox(creditId) {
  const item = getCreditById(creditId);
  const box = $("#gallery-lightbox");
  if (!item || !box) return;
  $(".lightbox-image", box).src = item.src;
  $(".lightbox-image", box).alt = item.altText;
  $(".lightbox-title", box).textContent = item.title;
  $(".lightbox-description", box).textContent = item.description;
  $(".lightbox-credit", box).innerHTML = `${esc(item.creditLine)}${
    item.sourceUrl ? ` · <a href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">Source: ${esc(item.sourceName)}</a>` : ""
  }`;
  $(".lightbox-usage", box).textContent = item.licenseOrUsageNote;
  box.classList.add("open");
  box.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  const box = $("#gallery-lightbox");
  if (!box) return;
  box.classList.remove("open");
  box.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function bindLightbox() {
  createLightbox();
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox]");
    if (trigger) {
      e.preventDefault();
      openLightbox(trigger.dataset.lightbox);
      return;
    }
    if (e.target.closest(".lightbox-close") || e.target.classList.contains("lightbox")) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function bindGalleryFilters() {
  const grid = $("#home-gallery-grid");
  const filters = $("#home-gallery-filters");
  if (!grid || !filters) return;
  const cards = $$(".gallery-item", grid);

  function apply(filter) {
    cards.forEach((card) => {
      const cat = card.dataset.category;
      const show =
        filter === "all" ||
        cat === filter ||
        (filter === "people" && (cat === "ceremony" || cat === "mwata"));
      card.hidden = !show;
    });
  }

  $$(".gallery-filter", filters).forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".gallery-filter", filters).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      apply(btn.dataset.filter);
    });
  });
}

function bindCeremonyJourney() {
  const root = $("#mutomboko-journey");
  if (!root) return;
  const steps = $$(".journey-step", root);
  const panels = $$(".journey-panel", root);
  if (!steps.length) return;

  function activate(id) {
    steps.forEach((s) => s.classList.toggle("active", s.dataset.step === id));
    panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === id));
  }

  steps.forEach((step) => step.addEventListener("click", () => activate(step.dataset.step)));
  activate(steps[0].dataset.step);
}

const lineageImages = {
  1: { src: "assets/generated/reconstruction-weapons.png", credit: "Reconstruction: Lunda weapons" },
  2: { src: "assets/generated/reconstruction-muselo-litter.png", credit: "Reconstruction: Muselo litter" },
  3: { src: "assets/generated/reconstruction-amapango-ulupemba.png", credit: "Reconstruction: Amapango headdress" },
  4: { src: "assets/generated/reconstruction-crowns.png", credit: "Reconstruction: Royal crowns" },
  5: { src: "assets/generated/reconstruction-umondo-drum.png", credit: "Reconstruction: Umondo drum" },
  6: { src: "assets/generated/reconstruction-weapons.png", credit: "Reconstruction: Lunda weapons" },
  7: { src: "assets/generated/reconstruction-amapango-ulupemba.png", credit: "Reconstruction: Amapango headdress" },
  8: { src: "assets/generated/reconstruction-umondo-drum.png", credit: "Reconstruction: Umondo drum" },
  9: { src: "assets/generated/reconstruction-weapons.png", credit: "Reconstruction: Lunda weapons" },
  10: { src: "assets/generated/reconstruction-muselo-litter.png", credit: "Reconstruction: Muselo litter" },
  11: { src: "assets/generated/reconstruction-crowns.png", credit: "Reconstruction: Royal crowns" },
  12: { src: "assets/generated/reconstruction-umondo-drum.png", credit: "Reconstruction: Umondo drum" },
  13: { src: "assets/generated/reconstruction-weapons.png", credit: "Reconstruction: Lunda weapons" },
  14: { src: "assets/generated/reconstruction-amapango-ulupemba.png", credit: "Reconstruction: Amapango headdress" },
  15: { src: "assets/generated/reconstruction-muselo-litter.png", credit: "Reconstruction: Muselo litter" },
  16: { src: "assets/generated/reconstruction-crowns.png", credit: "Reconstruction: Royal crowns" },
  17: { src: "assets/images/kazembe/archive/mwata-xvii-1961.jpg", credit: "Photo: Dr John Edward Parry / Commons" },
  18: { src: "assets/generated/reconstruction-umondo-drum.png", credit: "Reconstruction: Umondo drum" },
  19: { src: "assets/images/kazembe/hero/home-portrait.jpg", credit: "Photo: Office of the Mwata" }
};

function lineageDetailHtml(kingId, btn) {
  const k = enrichedById.get(Number(kingId));
  const imgInfo = lineageImages[Number(kingId)] || { src: "assets/generated/reconstruction-umondo-drum.png", credit: "Reconstruction" };
  
  let infoHtml = "";
  if (!k?.profile) {
    const needsVerify =
      btn.dataset.kingConfidence.includes("uncertain") ||
      btn.dataset.kingConfidence.includes("contested") ||
      btn.dataset.kingConfidence.includes("verification");
    infoHtml = `
      <span class="lineage-reign">${esc(btn.dataset.kingReign)}</span>
      <h3>${esc(btn.dataset.kingTitle)}</h3>
      <p><strong>${esc(btn.dataset.kingName)}</strong></p>
      <p>${esc(btn.dataset.kingNote)}</p>
      <span class="confidence">${esc(btn.dataset.kingConfidence)}</span>
      ${needsVerify ? `<p class="verify-note">Details to be verified against kingdom records.</p>` : ""}
    `;
  } else {
    const p = k.profile;
    const events = (p.keyEvents || []).map((e) => `<li>${esc(e)}</li>`).join("");
    const sourceIds = k.sources || [];
    infoHtml = `
      <span class="lineage-reign">${esc(k.reign)}</span>
      <h3>${esc(k.title)}</h3>
      <p><strong>${esc(k.name)}</strong></p>
      <p class="profile-role"><strong>Historical role:</strong> ${esc(p.historicalRole)}</p>
      ${events ? `<ul class="profile-events">${events}</ul>` : `<p>${esc(k.note)}</p>`}
      ${p.governance ? `<p><strong>Governance:</strong> ${esc(p.governance)}</p>` : ""}
      ${p.warsDiplomacyTrade ? `<p><strong>Trade & diplomacy:</strong> ${esc(p.warsDiplomacyTrade)}</p>` : ""}
      ${p.culturalNote ? `<p><strong>Culture:</strong> ${esc(p.culturalNote)}</p>` : ""}
      <span class="confidence">${esc(k.confidence)}</span>
      ${p.sourceNote ? `<p class="source-note"><em>${esc(p.sourceNote)}</em></p>` : ""}
      ${sourceCitation(sourceIds)}
    `;
  }

  return `
    <div class="lineage-detail-grid">
      <div class="lineage-detail-media-wrap">
        <div class="lineage-detail-media">
          <img src="${esc(imgInfo.src)}" alt="${esc(k ? k.title : "Mwata Kazembe")}" class="lineage-detail-img">
        </div>
        <span class="lineage-detail-credit">${esc(imgInfo.credit)}</span>
      </div>
      <div class="lineage-detail-info">${infoHtml}</div>
    </div>
  `;
}

function bindLineageRail() {
  const detail = $("#lineage-detail");
  const items = $$(".lineage-rail-item");
  if (!detail || !items.length) return;

  function show(btn) {
    items.forEach((b) => b.classList.toggle("active", b === btn));
    detail.innerHTML = lineageDetailHtml(btn.dataset.kingId, btn);
    detail.classList.add("has-content");
  }

  items.forEach((btn) => btn.addEventListener("click", () => show(btn)));
  const current = items.find((b) => b.classList.contains("is-current")) || items[0];
  if (current) show(current);
}

function initHomeSectionNav() {
  const nav = $("#home-section-nav");
  if (!nav) return;
  const links = $$(".home-section-link", nav);
  const sections = links.map((link) => document.getElementById(link.getAttribute("href").slice(1))).filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
}

function bindHistoryChapters() {
  const detail = $("#history-detail");
  if (!detail) return;
  $$("[data-history-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      detail.innerHTML = `
        <span class="chapter-marker">${esc(btn.dataset.historyMarker)}</span>
        <h3>${esc(btn.dataset.historyTitle)}</h3>
        <p>${esc(btn.dataset.historySummary)}</p>
        <a class="btn btn-ghost" href="#kingdom" data-nav="kingdom">Full kingdom history</a>
      `;
      detail.classList.add("has-content");
    });
  });
}

function bindTimelineDetail() {
  const panel = $("#timeline-detail");
  if (!panel) return;
  $$(".timeline-entry[data-king-id]").forEach((entry) => {
    entry.addEventListener("click", () => {
      $$(".timeline-entry").forEach((e) => e.classList.remove("selected"));
      entry.classList.add("selected");
      const source = entry.querySelector(".timeline-detail-source");
      panel.innerHTML = source ? source.innerHTML : entry.innerHTML;
      panel.classList.add("open");
    });
  });
}

function initScrollReveal() {
  $$(".reveal-block").forEach((el) => el.classList.add("is-visible"));
  if (reduceMotion.matches) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
  );
  $$(".section:not(.royal-hero)").forEach((el) => observer.observe(el));
}

function initHeroMotion() {
  const hero = $(".royal-hero-split");
  if (!hero || reduceMotion.matches || !motionEnabled()) return;
  const content = $$(".hero-content > *", hero);
  gsap.fromTo(
    content,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: "power2.out", clearProps: "transform,opacity,visibility" }
  );
}

function initImageHoverCredits() {
  $$(".figure-media img, .gallery-item img, .card-media img, .hero-media img").forEach((img) => {
    const creditId = img.dataset.creditId;
    const item = creditId ? getCreditById(creditId) : null;
    if (!item) return;
    const wrap = img.closest(".figure-media, .gallery-item-media, .card-media, .hero-media");
    if (!wrap || wrap.querySelector(".hover-credit")) return;
    wrap.classList.add("has-hover-credit");
    wrap.insertAdjacentHTML("beforeend", `<span class="hover-credit">${esc(item.creditLine)}</span>`);
  });
}

let bound = false;

export function initInteractions() {
  if (bound) {
    initScrollReveal();
    initImageHoverCredits();
    initHeroMotion();
    bindLineageRail();
    return;
  }
  bound = true;
  bindLightbox();
  bindGalleryFilters();
  bindCeremonyJourney();
  bindLineageRail();
  bindHistoryChapters();
  bindTimelineDetail();
  initScrollReveal();
  initHeroMotion();
  initImageHoverCredits();
  initHomeSectionNav();
}
