module.exports = [
"[project]/src/utils/price.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/price.js (UPDATED)
__turbopack_context__.s([
    "calculateFinalPrice",
    ()=>calculateFinalPrice,
    "clearPricingCache",
    ()=>clearPricingCache
]);
const API_URL = ("TURBOPACK compile-time value", "https://margin-updater.onrender.com") || "http://localhost:3001";
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
                lessThan1ct: {
                    multiplier: 2.2,
                    flatAddition: 900
                },
                greaterThan1ct: {
                    multiplier: 2.7,
                    flatAddition: 0
                },
                baseFees: {
                    fee1: 150,
                    fee2: 700
                }
            },
            makingCharges: {
                lessThan2g: {
                    ratePerGram: 950
                },
                greaterThan2g: {
                    ratePerGram: 700
                },
                multiplier: 1.75
            },
            gstRate: 0.03
        };
    }
}
// Utility: find rate from range-based diamond price chart
function findRate(weight, ranges) {
    for (const [min, max, rate] of ranges){
        if (weight >= min && weight <= max) return rate;
    }
    return 0;
}
async function calculateFinalPrice({ diamonds = [], goldWeight = 0, goldKarat = "18K" }) {
    // Fetch current pricing configuration
    const config = await getPricingConfig();
    let totalDiamondPrice = 0;
    for (const d of diamonds){
        const shape = (d.shape || "").toLowerCase();
        const weight = parseFloat(d.weight) || 0;
        const count = parseInt(d.count) || 0;
        if (weight <= 0 || count <= 0) continue;
        const roundShapes = [
            "round",
            "rnd",
            "r"
        ];
        let rate = 0;
        // === Diamond rate logic ===
        if (roundShapes.includes(shape)) {
            if (weight < 1) {
                rate = findRate(weight, [
                    [
                        0.001,
                        0.005,
                        13500
                    ],
                    [
                        0.006,
                        0.009,
                        11600
                    ],
                    [
                        0.01,
                        0.02,
                        6900
                    ],
                    [
                        0.025,
                        0.035,
                        4600
                    ],
                    [
                        0.04,
                        0.07,
                        4600
                    ],
                    [
                        0.08,
                        0.09,
                        4600
                    ],
                    [
                        0.1,
                        0.12,
                        5100
                    ],
                    [
                        0.13,
                        0.17,
                        5100
                    ],
                    [
                        0.18,
                        0.22,
                        6200
                    ],
                    [
                        0.23,
                        0.29,
                        7000
                    ],
                    [
                        0.3,
                        0.39,
                        6750
                    ],
                    [
                        0.4,
                        0.49,
                        6750
                    ],
                    [
                        0.5,
                        0.69,
                        7100
                    ],
                    [
                        0.7,
                        0.89,
                        7100
                    ],
                    [
                        0.9,
                        0.99,
                        7300
                    ]
                ]);
            } else {
                rate = findRate(weight, [
                    [
                        1.0,
                        1.99,
                        11000
                    ],
                    [
                        2.0,
                        2.99,
                        12500
                    ],
                    [
                        3.0,
                        3.99,
                        13750
                    ],
                    [
                        4.0,
                        4.99,
                        14550
                    ],
                    [
                        5.0,
                        5.99,
                        15500
                    ]
                ]);
            }
        } else {
            if (weight < 1) {
                rate = findRate(weight, [
                    [
                        0.001,
                        0.99,
                        7800
                    ]
                ]);
            } else {
                rate = findRate(weight, [
                    [
                        1.0,
                        1.99,
                        11500
                    ],
                    [
                        2.0,
                        2.99,
                        13500
                    ],
                    [
                        3.0,
                        3.99,
                        14550
                    ],
                    [
                        4.0,
                        4.99,
                        15550
                    ],
                    [
                        5.0,
                        5.99,
                        16500
                    ]
                ]);
            }
        }
        // === Base and adjustment (using config) ===
        const base = weight * count * rate;
        let adjusted = base;
        if (weight >= 1) {
            // ≥ 1ct → use config multiplier
            adjusted = base * config.diamondMargins.greaterThan1ct.multiplier + config.diamondMargins.greaterThan1ct.flatAddition;
        } else {
            // < 1ct → use config multiplier + flat addition
            adjusted = base * config.diamondMargins.lessThan1ct.multiplier + config.diamondMargins.lessThan1ct.flatAddition;
        }
        totalDiamondPrice += adjusted;
    }
    // Add base fees from config
    totalDiamondPrice += config.diamondMargins.baseFees.fee1 + config.diamondMargins.baseFees.fee2;
    // === Get gold price from API ===
    const res = await fetch("https://gold-price-india.onrender.com/api/gold/24k");
    const json = await res.json();
    const gold24Price = parseFloat(json.price) || 0;
    const goldRates = {
        "10K": gold24Price * (10 / 24),
        "14K": gold24Price * (14 / 24),
        "18K": gold24Price * (18 / 24)
    };
    const selectedGoldRate = goldRates[goldKarat] || goldRates["18K"] || 0;
    const goldPrice = selectedGoldRate * goldWeight;
    // === Making charges (using config) ===
    let makingCharge = goldWeight >= 2 ? goldWeight * config.makingCharges.greaterThan2g.ratePerGram : goldWeight * config.makingCharges.lessThan2g.ratePerGram;
    makingCharge *= config.makingCharges.multiplier;
    // === Subtotal, GST, and Total ===
    const subtotal = totalDiamondPrice + goldPrice + makingCharge;
    const gst = subtotal * config.gstRate;
    const grandTotal = subtotal + gst;
    // === Round neatly ===
    return {
        diamondPrice: Number(totalDiamondPrice.toFixed(2)),
        goldPrice: Number(goldPrice.toFixed(2)),
        makingCharge: Number(makingCharge.toFixed(2)),
        subtotal: Number(subtotal.toFixed(2)),
        gst: Number(gst.toFixed(2)),
        totalPrice: Number(grandTotal.toFixed(2))
    };
}
function clearPricingCache() {
    cachedConfig = null;
    lastFetch = 0;
}
}),
"[project]/src/utils/formatIndianCurrency.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// utils/formatIndianCurrency.js
/**
 * Formats a number in Indian currency format with commas
 * Example: 1234567.89 -> 12,34,567.89
 * @param {number|string} amount - The amount to format
 * @param {boolean} showDecimals - Whether to show decimal places (default: true)
 * @returns {string} Formatted amount
 */ __turbopack_context__.s([
    "formatINR",
    ()=>formatINR,
    "formatIndianCurrency",
    ()=>formatIndianCurrency
]);
function formatIndianCurrency(amount, showDecimals = true) {
    if (amount === null || amount === undefined || amount === "") {
        return "0";
    }
    // Convert to number and handle invalid values
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(num)) {
        return "0";
    }
    // Split into integer and decimal parts
    const [integerPart, decimalPart] = num.toFixed(2).split(".");
    // Indian numbering system:
    // Last 3 digits, then groups of 2 from right to left
    let result = "";
    let count = 0;
    // Process from right to left
    for(let i = integerPart.length - 1; i >= 0; i--){
        if (count === 3 || count > 3 && (count - 3) % 2 === 0) {
            result = "," + result;
        }
        result = integerPart[i] + result;
        count++;
    }
    // Add decimal part if needed
    if (showDecimals && decimalPart) {
        result += "." + decimalPart;
    }
    return result;
}
function formatINR(amount, showDecimals = true) {
    return "₹" + formatIndianCurrency(amount, showDecimals);
}
}),
"[project]/src/app/search/SearchResults.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchResultsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/shopify.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/queries/search.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/price.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatIndianCurrency$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/formatIndianCurrency.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function SearchResultsPage() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const query = searchParams.get("q") || "";
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const itemsPerPage = 8;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (query) performSearch();
    }, [
        query
    ]);
    const calculateProductPrice = async (description, selectedKarat = "10K")=>{
        try {
            const diamondShapeMatch = description.match(/Diamond Shape:\s*([A-Za-z,\s]+?)(?=Total Diamonds|Diamond Weight|$)/i);
            const totalDiamondsMatch = description.match(/Total Diamonds:\s*([\d,\s]+?)(?=Diamond Weight|Total Diamond Weight|Metal Weights|$)/i);
            const diamondWeightMatch = description.match(/Diamond Weight:\s*([\d.,\s]+?)(?=Total Diamond Weight|Metal Weights|$)/i);
            const goldWeightMatch = description.match(new RegExp(`${selectedKarat} Gold:\\s*([\\d.]+)g`, "i"));
            const diamondShapes = diamondShapeMatch ? diamondShapeMatch[1].trim().split(",").map((s)=>s.trim()).filter((s)=>s) : [];
            const diamondCounts = totalDiamondsMatch ? totalDiamondsMatch[1].trim().split(",").map((s)=>s.trim()).filter((s)=>s && !isNaN(s)).map((c)=>parseInt(c)) : [];
            const diamondWeights = diamondWeightMatch ? diamondWeightMatch[1].trim().split(",").map((s)=>s.trim()).filter((s)=>s && !isNaN(s)).map((w)=>parseFloat(w)) : [];
            const goldWeight = goldWeightMatch ? parseFloat(goldWeightMatch[1]) : 0;
            const diamonds = diamondShapes.map((shape, i)=>({
                    shape,
                    weight: diamondWeights[i] || 0,
                    count: diamondCounts[i] || 0
                }));
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateFinalPrice"])({
                diamonds,
                goldWeight,
                goldKarat: selectedKarat
            });
            return result.totalPrice;
        } catch (error) {
            console.error("Error calculating price:", error);
            return 0;
        }
    };
    const performSearch = async ()=>{
        try {
            setLoading(true);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopifyRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEARCH_PRODUCTS"], {
                query,
                first: 50
            });
            if (response.data?.products?.edges) {
                // Transform products with price calculation
                const transformedProducts = await Promise.all(response.data.products.edges.map(async ({ node: product })=>{
                    const firstVariant = product.variants?.edges?.[0]?.node;
                    // Calculate actual price using pricing logic
                    const calculatedPrice = await calculateProductPrice(product.description || "", "10K");
                    return {
                        id: product.id,
                        handle: product.handle,
                        name: product.title,
                        image: product.featuredImage?.url || firstVariant?.image?.url || "/placeholder.jpg",
                        price: calculatedPrice,
                        description: product.description || ""
                    };
                }));
                setResults(transformedProducts);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally{
            setLoading(false);
        }
    };
    const totalPages = Math.ceil(results.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = results.slice(startIndex, startIndex + itemsPerPage);
    const goToPage = (page)=>{
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xl text-gray-700 animate-pulse",
                children: "Searching..."
            }, void 0, false, {
                fileName: "[project]/src/app/search/SearchResults.jsx",
                lineNumber: 145,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/search/SearchResults.jsx",
            lineNumber: 144,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-3 md:px-6 lg:px-8 py-10 md:py-25 mt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl font-bold mb-4 text-[#0a1833] tracking-tight",
                        children: [
                            'Search Results for "',
                            query,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-lg",
                        children: [
                            results.length,
                            " ",
                            results.length === 1 ? "product" : "products",
                            " found"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/search/SearchResults.jsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            currentItems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 transition-all duration-500",
                        children: currentItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98]",
                                onClick: ()=>router.push(`/product/${item.handle}`),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative overflow-hidden bg-gray-50 aspect-4/5 md:aspect-square",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.image,
                                                alt: item.name,
                                                className: "w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 179,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        router.push(`/product/${item.handle}`);
                                                    },
                                                    className: "w-full bg-white text-[#0a1833] py-2 md:py-2.5 px-3 md:px-4 rounded-lg md:rounded-xl font-medium text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#0a1833] hover:text-white transition-all duration-300 shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            className: "w-3.5 h-3.5 md:w-4 md:h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/SearchResults.jsx",
                                                            lineNumber: 190,
                                                            columnNumber: 23
                                                        }, this),
                                                        "View Details"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/search/SearchResults.jsx",
                                                    lineNumber: 183,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 182,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 md:p-5 flex flex-col justify-between min-h-[120px] md:min-h-[130px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium capitalize text-sm md:text-lg text-[#0a1833] group-hover:text-[#1a2f5a] transition-colors duration-300 leading-snug line-clamp-2 mb-2",
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs md:text-sm text-gray-500 mb-1",
                                                        children: "Starting from (10K Gold)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                                        lineNumber: 204,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg md:text-xl font-bold text-[#0a1833]",
                                                        children: [
                                                            "₹",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatIndianCurrency$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIndianCurrency"])(item.price)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                                        lineNumber: 207,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center items-center gap-2 mt-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>goToPage(currentPage - 1),
                                disabled: currentPage === 1,
                                className: "p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/SearchResults.jsx",
                                    lineNumber: 224,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                lineNumber: 219,
                                columnNumber: 15
                            }, this),
                            [
                                ...Array(totalPages)
                            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>goToPage(i + 1),
                                    className: `w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium ${currentPage === i + 1 ? "bg-black text-white border-black" : "hover:bg-gray-100 text-gray-800 border-gray-300"}`,
                                    children: i + 1
                                }, i, false, {
                                    fileName: "[project]/src/app/search/SearchResults.jsx",
                                    lineNumber: 228,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>goToPage(currentPage + 1),
                                disabled: currentPage === totalPages,
                                className: "p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/SearchResults.jsx",
                                    lineNumber: 246,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 218,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-span-full flex flex-col items-center justify-center py-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-gray-700 mb-3",
                        children: [
                            'No products found for "',
                            query,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 mb-6",
                        children: "Try different keywords or browse our collections"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/rings",
                        className: "inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300",
                        children: "Browse All Rings"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/search/SearchResults.jsx",
                lineNumber: 252,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/search/SearchResults.jsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/search/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchPageWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$search$2f$SearchResults$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/search/SearchResults.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function SearchPageWrapper() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-10 text-center",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/search/page.jsx",
            lineNumber: 8,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$search$2f$SearchResults$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/search/page.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/search/page.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Eye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
            key: "1nclc0"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "3",
            key: "1v7zrd"
        }
    ]
];
const Eye = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("eye", __iconNode);
;
 //# sourceMappingURL=eye.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Eye",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_cdaf4d2d._.js.map