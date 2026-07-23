// GSAP motion layer — page transitions, hero entrances, scroll-driven
// parallax and reveals. Everything degrades to static, fully visible content
// when GSAP is absent or the visitor prefers reduced motion.

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
// Scrub-based parallax recomputes on every scroll frame; skip it on small
// screens (phones/tablets) where it is the main source of scroll jank. The
// once-off reveals below stay on — they fire a single timeline and are cheap.
const smallScreen = window.matchMedia("(max-width: 700px)");

const CLEAR = "transform,opacity,visibility";

let pluginRegistered = false;
let cleanupFns = [];
let currentPageId = null;
let splashGone = !document.getElementById("splash");

window.addEventListener("splash:dismissed", () => {
  splashGone = true;
});

function motionEnabled() {
  return Boolean(window.gsap) && !reduceMotion.matches;
}

function scrollMotionEnabled() {
  if (!motionEnabled() || !window.ScrollTrigger) return false;
  if (!pluginRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    pluginRegistered = true;
  }
  return true;
}

function onCleanup(fn) {
  cleanupFns.push(fn);
}

function cleanupPageMotion() {
  cleanupFns.forEach((fn) => {
    try {
      fn();
    } catch {
      /* element may be gone; nothing to restore */
    }
  });
  cleanupFns = [];
  if (pluginRegistered) {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    // Drop remembered scroll positions, or the next refresh() restores the
    // previous page's scroll offset and undoes our jump to the top.
    ScrollTrigger.clearScrollMemory("manual");
  }
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Wraps each word of a heading in an overflow-hidden mask so lines can rise
// into view. Idempotent: re-runs return the existing inner spans.
function splitWords(el) {
  if (!el) return [];
  if (el.dataset.motionSplit !== "true") {
    const words = (el.textContent || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    el.innerHTML = words
      .map((w) => `<span class="motion-word"><span class="motion-word-inner">${esc(w)}</span></span>`)
      .join(" ");
    el.dataset.motionSplit = "true";
  }
  return $$(".motion-word-inner", el);
}

/* ---------------------------------------------------------------- entrances */

// Home hero: media settles from a slow zoom while the headline rises
// word by word, followed by the supporting copy and calls to action.
function animateHomeHero(page) {
  const hero = $(".royal-hero", page);
  if (!hero) return false;

  const media = $(".hero-media img", hero);
  const overlay = $(".hero-overlay", hero);
  const words = splitWords($("h1", hero));
  const label = $(".hero-label", hero);
  const sub = $(".hero-sub", hero);
  const ctas = $$(".hero-ctas .btn", hero);
  const credit = $(".hero-credit", hero);

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (media) tl.fromTo(media, { scale: 1.14, autoAlpha: 0.5 }, { scale: 1, autoAlpha: 1, duration: 1.6, ease: "power2.out" }, 0);
  if (overlay) tl.from(overlay, { autoAlpha: 0, duration: 1.1 }, 0);
  if (label) tl.from(label, { y: 18, autoAlpha: 0, duration: 0.55, clearProps: CLEAR }, 0.15);
  if (words.length) tl.from(words, { yPercent: 115, duration: 0.75, stagger: 0.05 }, 0.3);
  if (sub) tl.from(sub, { y: 24, autoAlpha: 0, duration: 0.65, clearProps: CLEAR }, 0.62);
  if (ctas.length) tl.from(ctas, { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.09, clearProps: CLEAR }, 0.75);
  if (credit) tl.from(credit, { autoAlpha: 0, duration: 0.7, clearProps: CLEAR }, 1);
  return true;
}

// Sub-page hero: background breathes in, eyebrow and headline rise.
function animatePageHero(page) {
  const hero = $(".page-hero", page);
  if (!hero) return false;

  const bg = $(".page-hero-bg", hero);
  const content = $(".page-hero-content", hero);
  if (!content) return false;
  const h1 = $("h1", content);
  const words = splitWords(h1);
  const rest = Array.from(content.children).filter((el) => el !== h1);

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (bg) tl.fromTo(bg, { scale: 1.08, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.35, duration: 1.4, ease: "power2.out" }, 0);
  if (words.length) tl.from(words, { yPercent: 115, duration: 0.7, stagger: 0.04 }, 0.15);
  if (rest.length) tl.from(rest, { y: 20, autoAlpha: 0, duration: 0.55, stagger: 0.09, clearProps: CLEAR }, 0.35);
  return true;
}

// Cross-fade the page container itself so navigation feels like a transition
// rather than an instant swap.
function animatePageIn(page) {
  gsap.fromTo(
    page,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.45, ease: "power1.out", clearProps: "opacity,visibility" }
  );
}

/* ------------------------------------------------------------ scroll motion */

// Depth on scroll: hero imagery drifts slower than the page. Images are
// oversized first so the drift never exposes container edges.
function initParallax(page) {
  const heroImg = $(".royal-hero-split .hero-media img", page);
  if (heroImg) {
    gsap.set(heroImg, { height: "115%" });
    onCleanup(() => gsap.set(heroImg, { clearProps: "height,transform" }));
    gsap.to(heroImg, {
      yPercent: -11,
      ease: "none",
      scrollTrigger: { trigger: heroImg.closest(".royal-hero"), start: "top top", end: "bottom top", scrub: 0.6 },
    });
  }

  const heroBg = $(".page-hero-bg", page);
  if (heroBg) {
    onCleanup(() => gsap.set(heroBg, { clearProps: "transform" }));
    gsap.fromTo(
      heroBg,
      { yPercent: 0, scale: 1.15 },
      {
        yPercent: -10,
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: heroBg.closest(".page-hero"), start: "top top", end: "bottom top", scrub: 0.6 },
      }
    );
  }

  // Decorative figures drift gently in opposite directions for depth.
  $$(".glance-media .credited-figure", page).forEach((fig, i) => {
    onCleanup(() => gsap.set(fig, { clearProps: "transform" }));
    gsap.fromTo(
      fig,
      { y: i % 2 ? 26 : 12 },
      {
        y: i % 2 ? -26 : -12,
        ease: "none",
        scrollTrigger: { trigger: fig.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
      }
    );
  });
}

// Section heads announce themselves: eyebrow slides in, title and deck rise.
// Plays immediately on page-enter (no scroll trigger) and animates only the
// transform, so a head is never left invisible if anything misfires.
function initSectionHeadReveals(page) {
  $$(".section-head", page).forEach((head, i) => {
    const eyebrow = $(".eyebrow", head);
    const title = $("h2", head);
    const deck = $(".section-deck", head);
    const parts = [eyebrow, title, deck].filter(Boolean);
    if (!parts.length) return;

    onCleanup(() => gsap.set(parts, { clearProps: "transform" }));
    const tl = gsap.timeline({
      delay: Math.min(i * 0.05, 0.35),
      defaults: { ease: "power3.out", clearProps: "transform" },
    });
    if (eyebrow) tl.from(eyebrow, { x: -18, duration: 0.5 }, 0);
    if (title) tl.from(title, { y: 24, duration: 0.6 }, 0.06);
    if (deck) tl.from(deck, { y: 16, duration: 0.55 }, 0.16);
  });
}

// Sub-page content blocks rise in on page-enter. Home page blocks are handled
// by interactions.js, so this only targets .page-body. The reveal animates
// the transform only and is not gated behind a scroll trigger, so a section
// can never be left blank if a trigger fails to fire or refresh.
function initBlockReveals(page) {
  const blocks = $$(".page-body > *", page).filter((el) => el.offsetParent !== null || el.offsetHeight > 0);
  if (!blocks.length) return;

  onCleanup(() => gsap.set(blocks, { clearProps: "transform" }));

  gsap.from(blocks, {
    y: 20,
    duration: 0.5,
    stagger: 0.05,
    ease: "power2.out",
    clearProps: "transform",
  });
}

/* ----------------------------------------------------------------- exports */

// Refresh only once the scroll position has settled: refresh() cancels any
// smooth scroll still in flight and restores the pre-refresh position, which
// would strand the page mid-scroll after a navigation.
function refreshWhenScrollSettles(tries = 0) {
  const y = window.scrollY;
  requestAnimationFrame(() => {
    if (Math.abs(window.scrollY - y) < 2 || tries > 90) ScrollTrigger.refresh();
    else refreshWhenScrollSettles(tries + 1);
  });
}

function runPageMotion(page) {
  animatePageIn(page);
  if (!animateHomeHero(page)) animatePageHero(page);
  if (scrollMotionEnabled()) {
    if (!smallScreen.matches) initParallax(page);
    initSectionHeadReveals(page);
    initBlockReveals(page);
    refreshWhenScrollSettles();
  }
}

export function initPageMotion(pageId) {
  const page = $(`.page[data-page="${pageId}"]`) || $(".page.active");
  if (!page) return;
  if (pageId === currentPageId) return; // same-page anchor navigation: don't replay
  currentPageId = pageId;

  cleanupPageMotion();
  if (!motionEnabled()) return;

  // On first load the splash overlay covers the viewport for a few seconds —
  // hold the entrance until it lifts so the animation is actually seen.
  if (!splashGone) {
    const start = () => runPageMotion(page);
    window.addEventListener("splash:dismissed", start, { once: true });
    onCleanup(() => window.removeEventListener("splash:dismissed", start));
    return;
  }
  runPageMotion(page);
}
