import { artifacts, kings, sourceClaims, sources } from "./data.js";

const replaceEverywhere = (value) => String(value).replaceAll("Mutomboko", "Umutomboko");

for (const source of sources) {
  if (source.id === "mot2025") source.title = "2025 Umutomboko notice";
  if (source.id === "commons") source.note = "Reusable media category containing the Kazembe map, 2017 ceremony photographs, and a 1961 Mwata Kazembe XVII photograph.";
  if (source.id === "commons-current") source.note = "CC BY-SA 4.0 image by ChaloNiZambia, dated 29 July 2017, showing Mwata Kazembe at the 2017 ceremony.";
  if (source.id === "smithsonian") source.note = "CC0 public-domain 1873 Royal Geographical Society volume gathering Portuguese expedition material connected to the historical Cazembe source title.";
}

for (const artifact of artifacts) {
  artifact.tags = artifact.tags.map(replaceEverywhere);
  artifact.performance = replaceEverywhere(artifact.performance);
  artifact.provenance = replaceEverywhere(artifact.provenance);
}

for (const king of kings) {
  king.note = replaceEverywhere(king.note);
}

for (const claim of sourceClaims) {
  claim.claim = replaceEverywhere(claim.claim);
  if (claim.sources.includes("smithsonian")) claim.claim = "Portuguese expedition material survives in the public-domain 1873 volume titled The Lands of Cazembe.";
}