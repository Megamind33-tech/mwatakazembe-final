import { getCreditById } from "./image-credits.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
    const panel = panels.find((p) => p.dataset.panel === id);
    if (motionEnabled() && panel) {
      gsap.fromTo(panel, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", clearProps: "transform,opacity,visibility" });
    }
  }

  steps.forEach((step) => step.addEventListener("click", () => activate(step.dataset.step)));
  activate(steps[0].dataset.step);
}

function bindLineageRail() {
  const detail = $("#lineage-detail");
  const items = $$(".lineage-rail-item");
  if (!detail || !items.length) return;

  function show(btn) {
    items.forEach((b) => b.classList.toggle("active", b === btn));
    const needsVerify =
      btn.dataset.kingConfidence.includes("uncertain") ||
      btn.dataset.kingConfidence.includes("contested") ||
      btn.dataset.kingConfidence.includes("verification");
    detail.innerHTML = `
      <span class="lineage-reign">${esc(btn.dataset.kingReign)}</span>
      <h3>${esc(btn.dataset.kingTitle)}</h3>
      <p><strong>${esc(btn.dataset.kingName)}</strong></p>
      <p>${esc(btn.dataset.kingNote)}</p>
      <span class="confidence">${esc(btn.dataset.kingConfidence)}</span>
      ${needsVerify ? `<p class="verify-note">Details to be verified against kingdom records.</p>` : ""}
    `;
    detail.classList.add("has-content");
    if (motionEnabled()) {
      gsap.fromTo(detail, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity,visibility" });
    }
  }

  items.forEach((btn) => btn.addEventListener("click", () => show(btn)));
  const current = items.find((b) => b.classList.contains("is-current")) || items[items.length - 1];
  if (current) show(current);
}

function initStatCounters() {
  const cards = $$(".stat-card .stat-value[data-stat-numeric]");
  if (!cards.length || reduceMotion.matches) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.statNumeric);
        if (!target || el.dataset.counted === "true") return;
        el.dataset.counted = "true";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val);
          }
        });
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  cards.forEach((el) => observer.observe(el));
}

function initNewsTicker() {
  const track = $("#news-ticker-track");
  if (!track || track.dataset.ready === "true") return;
  track.dataset.ready = "true";
  track.innerHTML = track.innerHTML + track.innerHTML;
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
      if (motionEnabled()) {
        gsap.fromTo(detail, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "transform,opacity,visibility" });
      }
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

function initScrollProgress() {
  if ($("#scroll-progress")) return;
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  bar.innerHTML = "<span></span>";
  document.body.prepend(bar);
  const track = $("span", bar);
  window.addEventListener(
    "scroll",
    () => {
      const doc = document.documentElement;
      const pct = doc.scrollHeight > doc.clientHeight ? (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100 : 0;
      track.style.width = `${pct}%`;
    },
    { passive: true }
  );
}

function initScrollReveal() {
  if (reduceMotion.matches) {
    $$(".reveal-block").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        if (motionEnabled()) {
          gsap.fromTo(
            entry.target,
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out", clearProps: "transform,opacity,visibility" }
          );
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal-block").forEach((el) => observer.observe(el));
}

function initHeroMotion() {
  const hero = $(".royal-hero");
  if (!hero || reduceMotion.matches) return;
  const media = $(".hero-media img", hero);
  const content = $$(".hero-content > *", hero);
  if (motionEnabled()) {
    if (media) gsap.fromTo(media, { scale: 1.06 }, { scale: 1, duration: 1.2, ease: "power2.out" });
    gsap.fromTo(content, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.15, ease: "power3.out", clearProps: "transform,opacity,visibility" });
    window.addEventListener(
      "scroll",
      () => {
        if (!media) return;
        const y = Math.min(window.scrollY * 0.18, 80);
        media.style.transform = `translate3d(0, ${y}px, 0) scale(1.04)`;
      },
      { passive: true }
    );
  }
}

function initImageHoverCredits() {
  $$(".figure-media img, .gallery-item img, .card-media img").forEach((img) => {
    const creditId = img.dataset.creditId;
    const item = creditId ? getCreditById(creditId) : null;
    if (!item) return;
    const wrap = img.closest(".figure-media, .gallery-item-media, .card-media");
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
    initStatCounters();
    return;
  }
  bound = true;
  bindLightbox();
  bindGalleryFilters();
  bindCeremonyJourney();
  bindLineageRail();
  bindHistoryChapters();
  bindTimelineDetail();
  initScrollProgress();
  initScrollReveal();
  initHeroMotion();
  initImageHoverCredits();
  initStatCounters();
  initNewsTicker();
  initHomeSectionNav();
}
