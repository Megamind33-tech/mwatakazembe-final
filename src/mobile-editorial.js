/**
 * Mobile enhancements: swipe hint labels and sticky section clarity.
 */
const mq = window.matchMedia("(max-width: 760px)");

function markSwipeTracks() {
  document.querySelectorAll(".swipe-track").forEach((track) => {
    if (mq.matches && !track.dataset.swipeReady) {
      track.dataset.swipeReady = "true";
      track.setAttribute("role", "region");
      track.setAttribute("aria-label", `${track.dataset.swipe || "content"} — swipe horizontally`);
    }
  });
}

mq.addEventListener("change", markSwipeTracks);
markSwipeTracks();
