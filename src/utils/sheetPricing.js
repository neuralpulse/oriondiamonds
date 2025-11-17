import Papa from "papaparse";

let pricingCache = null;
let lastFetch = 0;

export async function getSheetPricing() {
  const now = Date.now();

  // Cache for 1 hour
  if (pricingCache && now - lastFetch < 3600 * 1000) {
    return pricingCache;
  }

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/1D3CY-ehqCLo9dd7LzjxEu2vnts8f8BSaUW146Pha3uI/export?format=csv&id=1D3CY-ehqCLo9dd7LzjxEu2vnts8f8BSaUW146Pha3uI&gid=284657393";

  const res = await fetch(csvUrl);
  const csv = await res.text();

  const parsed = Papa.parse(csv, { header: true });
  const rows = parsed.data;

  // Build lookup table
  const map = {};

  rows.forEach((row) => {
    if (!row.Handle) return;

    map[row.Handle.trim()] = {
      price10K: Number(row["10K Price"] || 0),
      price14K: Number(row["14K Price"] || 0),
      price18K: Number(row["18K Price"] || 0),
    };
  });

  pricingCache = map;
  lastFetch = now;

  return map;
}
