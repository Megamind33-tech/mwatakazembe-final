const mobileQuery = window.matchMedia("(max-width: 760px)");
const sections = Array.from(document.querySelectorAll(".spread"));
let mobileObserver;

function isMobile() {
  return mobileQuery.matches;
}

function setMobileActiveSection(id) {
  document.body.dataset.activeMobileSection = id;
  sections.forEach((section) => section.classList.toggle("mobile-active", section.id === id));
}

function setupMobileSectionObserver() {
  if (mobileObserver) mobileObserver.disconnect();
  if (!isMobile()) {
    sections.forEach((section) => section.classList.remove("mobile-active"));
    document.body.removeAttribute("data-active-mobile-section");
    return;
  }

  mobileObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setMobileActiveSection(visible.target.id);
    },
    { threshold: [0.45, 0.62, 0.8] }
  );

  sections.forEach((section) => mobileObserver.observe(section));
  setMobileActiveSection(sections[0]?.id ?? "cover");
}

function removeMobileGlobalChrome() {
  const mobileNav = document.getElementById("mobile-nav");
  const progress = document.getElementById("progress");
  if (mobileNav) {
    mobileNav.innerHTML = "";
    mobileNav.setAttribute("aria-hidden", "true");
  }
  if (progress && isMobile()) progress.setAttribute("aria-hidden", "true");
}

function centerLocalControl(container, active) {
  if (!container || !active || !isMobile()) return;
  active.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
}

function enhanceLocalControls() {
  document.addEventListener("click", (event) => {
    const day = event.target.closest(".day-pill");
    if (day) {
      setTimeout(() => centerLocalControl(document.querySelector(".ceremony-controls"), day), 40);
      const firstVisibleStep = Array.from(document.querySelectorAll(".ceremony-step"))
        .find((step) => !step.classList.contains("hidden-by-day"));
      if (firstVisibleStep && !document.querySelector(".ceremony-step.active:not(.hidden-by-day)")) firstVisibleStep.click();
    }

    const ceremonyStep = event.target.closest(".ceremony-step");
    if (ceremonyStep) centerLocalControl(document.getElementById("ceremony-path"), ceremonyStep);

    const atlasButton = event.target.closest("#atlas-modes button");
    if (atlasButton) centerLocalControl(document.getElementById("atlas-modes"), atlasButton);

    const sourceButton = event.target.closest("#archive-source-types button, #drawer-source-types button");
    if (sourceButton) centerLocalControl(sourceButton.parentElement, sourceButton);

    const kingFilter = event.target.closest("#king-filters button");
    if (kingFilter) centerLocalControl(document.getElementById("king-filters"), kingFilter);
  });
}

function enableCeremonySwipe() {
  const path = document.getElementById("ceremony-path");
  if (!path) return;

  let startX = 0;
  path.addEventListener("touchstart", (event) => {
    if (!isMobile()) return;
    startX = event.changedTouches[0].clientX;
  }, { passive: true });

  path.addEventListener("touchend", (event) => {
    if (!isMobile()) return;
    const diff = startX - event.changedTouches[0].clientX;
    if (Math.abs(diff) < 42) return;

    const visibleSteps = Array.from(document.querySelectorAll(".ceremony-step"))
      .filter((step) => !step.classList.contains("hidden-by-day"));
    const currentIndex = Math.max(0, visibleSteps.findIndex((step) => step.classList.contains("active")));
    const nextIndex = Math.max(0, Math.min(visibleSteps.length - 1, currentIndex + (diff > 0 ? 1 : -1)));
    visibleSteps[nextIndex]?.click();
  }, { passive: true });
}

function labelCeremonyDepth() {
  const detail = document.getElementById("ceremony-detail");
  if (!detail || detail.querySelector(".mobile-return-note")) return;
  const note = document.createElement("p");
  note.className = "mobile-return-note";
  note.textContent = "Swipe the ritual cards or use All / Day 1 / Day 2 to revisit each ceremonial moment.";
  detail.prepend(note);
}

const ceremonyDetail = document.getElementById("ceremony-detail");
if (ceremonyDetail) {
  const observer = new MutationObserver(() => labelCeremonyDepth());
  observer.observe(ceremonyDetail, { childList: true });
}

removeMobileGlobalChrome();
setupMobileSectionObserver();
enhanceLocalControls();
enableCeremonySwipe();
labelCeremonyDepth();

mobileQuery.addEventListener("change", () => {
  removeMobileGlobalChrome();
  setupMobileSectionObserver();
});

window.addEventListener("resize", removeMobileGlobalChrome);