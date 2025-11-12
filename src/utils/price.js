// src/utils/price.js (UPDATED)

const API_URL =
  process.env.NEXT_PUBLIC_PRICING_API_URL || "http://localhost:3001";

// Cache for pricing config
let cachedConfig = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch pricing configuration from API
async function getPricingConfig() {
  const now = Date.now();

  // Return cached config if still valid
  if (cachedConfig && now - lastFetch < CACHE_DURATION) {
    return cachedConfig;
  }

  try {
    const response = await fetch(`${API_URL}/api/pricing-config`);
    if (!response.ok) {
      throw new Error("Failed to fetch pricing config");
    }

    cachedConfig = await response.json();
    lastFetch = now;
    return cachedConfig;
  } catch (error) {
    console.error("Error fetching pricing config:", error);

    // Return default config as fallback
    return {
      diamondMargins: {
        lessThan1ct: { multiplier: 2.2, flatAddition: 900 },
        greaterThan1ct: { multiplier: 2.7, flatAddition: 0 },
        baseFees: { fee1: 150, fee2: 700 },
      },
      makingCharges: {
        lessThan2g: { ratePerGram: 950 },
        greaterThan2g: { ratePerGram: 700 },
        multiplier: 1.75,
      },
      gstRate: 0.03,
    };
  }
}

// Utility: find rate from range-based diamond price chart
function findRate(weight, ranges) {
  for (const [min, max, rate] of ranges) {
    if (weight >= min && weight <= max) return rate;
  }
  return 0;
}

// === MAIN PRICE FUNCTION ===
export async function calculateFinalPrice({
  diamonds = [],
  goldWeight = 0,
  goldKarat = "18K",
}) {
  // Fetch current pricing configuration
  const config = await getPricingConfig();

  let totalDiamondPrice = 0;

  for (const d of diamonds) {
    const shape = (d.shape || "").toLowerCase();
    const weight = parseFloat(d.weight) || 0;
    const count = parseInt(d.count) || 0;

    if (weight <= 0 || count <= 0) continue;

    const roundShapes = ["round", "rnd", "r"];
    let rate = 0;

    // === Diamond rate logic ===
    if (roundShapes.includes(shape)) {
      if (weight < 1) {
        rate = findRate(weight, [
          [0.001, 0.005, 13500],
          [0.006, 0.009, 11600],
          [0.01, 0.02, 6900],
          [0.025, 0.035, 4600],
          [0.04, 0.07, 4600],
          [0.08, 0.09, 4600],
          [0.1, 0.12, 5100],
          [0.13, 0.17, 5100],
          [0.18, 0.22, 6200],
          [0.23, 0.29, 7000],
          [0.3, 0.39, 6750],
          [0.4, 0.49, 6750],
          [0.5, 0.69, 7100],
          [0.7, 0.89, 7100],
          [0.9, 0.99, 7300],
        ]);
      } else {
        rate = findRate(weight, [
          [1.0, 1.99, 11000],
          [2.0, 2.99, 12500],
          [3.0, 3.99, 13750],
          [4.0, 4.99, 14550],
          [5.0, 5.99, 15500],
        ]);
      }
    } else {
      if (weight < 1) {
        rate = findRate(weight, [[0.001, 0.99, 7800]]);
      } else {
        rate = findRate(weight, [
          [1.0, 1.99, 11500],
          [2.0, 2.99, 13500],
          [3.0, 3.99, 14550],
          [4.0, 4.99, 15550],
          [5.0, 5.99, 16500],
        ]);
      }
    }

    // === Base and adjustment (using config) ===
    const base = weight * count * rate;
    let adjusted = base;

    if (weight >= 1) {
      // ≥ 1ct → use config multiplier
      adjusted =
        base * config.diamondMargins.greaterThan1ct.multiplier +
        config.diamondMargins.greaterThan1ct.flatAddition;
    } else {
      // < 1ct → use config multiplier + flat addition
      adjusted =
        base * config.diamondMargins.lessThan1ct.multiplier +
        config.diamondMargins.lessThan1ct.flatAddition;
    }

    totalDiamondPrice += adjusted;
  }

  // Add base fees from config
  totalDiamondPrice +=
    config.diamondMargins.baseFees.fee1 + config.diamondMargins.baseFees.fee2;

  // === Get gold price from API ===
  const res = await fetch("https://gold-price-india.onrender.com/api/gold/24k");
  const json = await res.json();
  const gold24Price = parseFloat(json.price) || 0;

  const goldRates = {
    "10K": gold24Price * (10 / 24),
    "14K": gold24Price * (14 / 24),
    "18K": gold24Price * (18 / 24),
  };

  const selectedGoldRate = goldRates[goldKarat] || goldRates["18K"] || 0;
  const goldPrice = selectedGoldRate * goldWeight;

  // === Making charges (using config) ===
  let makingCharge =
    goldWeight >= 2
      ? goldWeight * config.makingCharges.greaterThan2g.ratePerGram
      : goldWeight * config.makingCharges.lessThan2g.ratePerGram;

  makingCharge *= config.makingCharges.multiplier;

  // === Subtotal, GST, and Total ===
  const subtotal = Math.round(totalDiamondPrice + goldPrice + makingCharge);
  const gst = Math.round(subtotal * config.gstRate);
  const grandTotal = Math.round(subtotal + gst);

  // === Round neatly ===
  return {
    diamondPrice: Math.round(totalDiamondPrice),
    goldPrice: Math.round(goldPrice),
    makingCharge: Math.round(makingCharge),
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    totalPrice: Math.round(grandTotal),
  };
}

// Clear the config cache (useful for admin updates)
export function clearPricingCache() {
  cachedConfig = null;
  lastFetch = 0;
}
