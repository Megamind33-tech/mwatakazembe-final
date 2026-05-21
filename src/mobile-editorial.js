const mobileQuery = window.matchMedia("(max-width: 760px)");
const sections = Array.from(document.querySelectorAll(".spread"));
const track = document.getElementById("track");
let mobilePage = 0;

function isMobile() {
  return mobileQuery.matches;
}

function setMobileActiveSection(index) {
  mobilePage = Math.max(0, Math.min(sections.length - 1, index));
  const active = sections[mobilePage];
  document.body.dataset.activeMobileSection = active?.id ?? "cover";
  sections.forEach((section, sectionIndex) => {
    section.classList.toggle("mobile-active", sectionIndex === mobilePage);
    section.classList.toggle("active", sectionIndex === mobilePage);
  });
  if (track) track.style.setProperty("--mobile-page", String(mobilePage));
  const prev = document.getElementById("prev-page");
  const next = document.getElementById("next-page");
  if (prev) prev.disabled = mobilePage === 0;
  if (next) next.disabled = mobilePage === sections.length - 1;
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

function closeDrawerById(id) {
  const drawer = document.getElementById(id);
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function bindMobilePageNavigation() {
  document.addEventListener("click", (event) => {
    if (!isMobile()) return;

    const jump = event.target.closest("[data-jump]");
    if (jump) {
      const targetIndex = sections.findIndex((section) => section.id === jump.dataset.jump);
      if (targetIndex >= 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setMobileActiveSection(targetIndex);
      }
      return;
    }

    const contentsItem = event.target.closest(".contents-item");
    if (contentsItem) {
      const items = Array.from(document.querySelectorAll(".contents-item"));
      const targetIndex = items.indexOf(contentsItem);
      if (targetIndex >= 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeDrawerById("contents");
        setMobileActiveSection(targetIndex);
      }
    }
  }, true);
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

function enableIssueSwipe() {
  let startX = 0;
  let startY = 0;

  document.addEventListener("touchstart", (event) => {
    if (!isMobile()) return;
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    if (!isMobile()) return;
    if (event.target.closest(".ceremony-path, .route-rail, .artifact-wall, .king-timeline, .source-grid, .segmented, .source-type-row, .filter-row, .drawer, .modal-panel, .story-panel, .route-card, .ceremony-detail")) return;

    const diffX = startX - event.changedTouches[0].clientX;
    const diffY = startY - event.changedTouches[0].clientY;
    if (Math.abs(diffX) < 58 || Math.abs(diffX) < Math.abs(diffY)) return;
    setMobileActiveSection(mobilePage + (diffX > 0 ? 1 : -1));
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
setMobileActiveSection(0);
bindMobilePageNavigation();
enhanceLocalControls();
enableCeremonySwipe();
enableIssueSwipe();
labelCeremonyDepth();

mobileQuery.addEventListener("change", () => {
  removeMobileGlobalChrome();
  if (isMobile()) setMobileActiveSection(mobilePage);
  else {
    if (track) track.style.removeProperty("--mobile-page");
    sections.forEach((section) => section.classList.remove("mobile-active"));
    document.body.removeAttribute("data-active-mobile-section");
  }
});

window.addEventListener("resize", () => {
  removeMobileGlobalChrome();
  if (isMobile()) setMobileActiveSection(mobilePage);
});