import { sources as sourceCatalog } from "./data.js";

export function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Public-facing pending state — never show raw "content required" */
export function pendingNote(message = "To be published by the Royal Office.") {
  return `<p class="pending-note">${esc(message)}</p>`;
}

export function sectionHead(eyebrow, title, deck = "") {
  return `
    <header class="section-head">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
      <h2>${esc(title)}</h2>
      ${deck ? `<p class="section-deck">${esc(deck)}</p>` : ""}
    </header>
  `;
}

export function sourceCitation(ids = []) {
  const items = ids
    .map((id) => sourceCatalog.find((s) => s.id === id))
    .filter(Boolean)
    .map(
      (s) =>
        `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.label)}</a> — ${esc(s.note)}</li>`
    )
    .join("");
  if (!items) return "";
  return `<ul class="source-citation">${items}</ul>`;
}

export function confidenceLabel(confidence) {
  return `<span class="confidence">${esc(confidence)}</span>`;
}
