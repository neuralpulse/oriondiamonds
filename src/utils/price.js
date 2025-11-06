// Utility: find rate from range-based diamond price chart
function findRate(weight, ranges) {
  for (const [min, max, rate] of ranges) {
    if (weight >= min && weight <= max) return rate;
  }
  return 0;
}

// === MAIN PRICE FUNCTION ===
export async function calculateFinalPrice({
  diamonds = [], // array of { shape, weight, count }
  goldWeight = 0,
  goldKarat = "18K", // '10K', '14K', or '18K'
}) {
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

    // === Base and adjustment ===
    const base = weight * count * rate;
    let adjusted = base;

    if (weight >= 1) {
      // ≥ 1ct → +200%
      adjusted = base * 3.0;
    } else {
      // < 1ct → +150% + ₹900
      adjusted = base * 2.5 + 900;
    }

    totalDiamondPrice += adjusted;
  }

  // ✅ Add flat ₹150 + ₹700 once after all diamonds
  totalDiamondPrice += 150 + 700;

  // === 2️⃣ Get gold price from API ===
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

  // === 3️⃣ Making charges (75% increase) ===
  let makingCharge = goldWeight >= 2 ? goldWeight * 700 : goldWeight * 950;
  makingCharge *= 1.75;

  // === 4️⃣ Subtotal, GST, and Total ===
  const subtotal = totalDiamondPrice + goldPrice + makingCharge;
  const gst = subtotal * 0.03;
  const grandTotal = subtotal + gst;

  // === Round neatly ===
  return {
    diamondPrice: Number(totalDiamondPrice.toFixed(2)),
    goldPrice: Number(goldPrice.toFixed(2)),
    makingCharge: Number(makingCharge.toFixed(2)),
    subtotal: Number(subtotal.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    totalPrice: Number(grandTotal.toFixed(2)),
  };
}
