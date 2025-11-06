module.exports = [
"[project]/src/utils/price.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Utility: find rate from range-based diamond price chart
__turbopack_context__.s([
    "calculateFinalPrice",
    ()=>calculateFinalPrice
]);
function findRate(weight, ranges) {
    for (const [min, max, rate] of ranges){
        if (weight >= min && weight <= max) return rate;
    }
    return 0;
}
async function calculateFinalPrice({ diamonds = [], goldWeight = 0, goldKarat = "18K" }) {
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
        "18K": gold24Price * (18 / 24)
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
        totalPrice: Number(grandTotal.toFixed(2))
    };
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

// app/search/page.jsx
__turbopack_context__.s([
    "default",
    ()=>SearchResultsPage,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/shopify.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/queries/search.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/price.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatIndianCurrency$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/formatIndianCurrency.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const revalidate = 1800;
async function calculateProductPrice(description, selectedKarat = "10K") {
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
}
async function transformSearchResults(productsEdges) {
    const transformedProducts = await Promise.all(productsEdges.map(async ({ node: product })=>{
        const calculatedPrice = await calculateProductPrice(product.description || "", "10K");
        return {
            id: product.id,
            handle: product.handle,
            title: product.title,
            price: calculatedPrice,
            image: product.featuredImage?.url || "/placeholder.jpg"
        };
    }));
    return transformedProducts;
}
async function SearchResultsPage({ searchParams }) {
    const query = searchParams.q || "";
    if (!query) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 md:px-8 py-20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl md:text-4xl font-bold mb-4",
                        children: "Search Products"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6",
                        children: "Enter a search term using the search bar above"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/rings",
                        className: "inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300",
                        children: "Browse All Rings"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/search/SearchResults.jsx",
                lineNumber: 100,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/search/SearchResults.jsx",
            lineNumber: 99,
            columnNumber: 7
        }, this);
    }
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopifyRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEARCH_PRODUCTS"], {
            query,
            first: 50
        });
        const results = response.data?.products?.edges || [];
        const transformedResults = await transformSearchResults(results);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 md:px-8 py-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold mb-2",
                            children: [
                                'Search Results for "',
                                query,
                                '"'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/search/SearchResults.jsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: [
                                transformedResults.length,
                                " ",
                                transformedResults.length === 1 ? "product" : "products",
                                " found"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/search/SearchResults.jsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/search/SearchResults.jsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                transformedResults.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6",
                    children: transformedResults.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/product/${product.handle}`,
                            className: "group",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative aspect-square overflow-hidden bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: product.image,
                                                alt: product.title,
                                                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 151,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 156,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                        lineNumber: 150,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium text-gray-800 text-base md:text-lg line-clamp-2 mb-2",
                                                children: product.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 160,
                                                columnNumber: 21
                                            }, this),
                                            product.price > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500 mb-1",
                                                        children: "Starting from (10K Gold)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                                        lineNumber: 167,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-bold text-[#0a1833]",
                                                        children: [
                                                            "₹",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatIndianCurrency$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIndianCurrency"])(product.price)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                                        lineNumber: 170,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                                lineNumber: 166,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/search/SearchResults.jsx",
                                        lineNumber: 159,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/search/SearchResults.jsx",
                                lineNumber: 149,
                                columnNumber: 17
                            }, this)
                        }, product.id, false, {
                            fileName: "[project]/src/app/search/SearchResults.jsx",
                            lineNumber: 144,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/search/SearchResults.jsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-24",
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
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 mb-6",
                            children: "Try different keywords or browse our collections"
                        }, void 0, false, {
                            fileName: "[project]/src/app/search/SearchResults.jsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/rings",
                            className: "inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300",
                            children: "Browse All Rings"
                        }, void 0, false, {
                            fileName: "[project]/src/app/search/SearchResults.jsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/search/SearchResults.jsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/search/SearchResults.jsx",
            lineNumber: 128,
            columnNumber: 7
        }, this);
    } catch (error) {
        console.error("Search error:", error);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 md:px-8 py-20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-red-600 mb-3",
                        children: "An error occurred while searching"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 mb-6",
                        children: "Please try again later"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/rings",
                        className: "inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300",
                        children: "Browse All Rings"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/SearchResults.jsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/search/SearchResults.jsx",
                lineNumber: 202,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/search/SearchResults.jsx",
            lineNumber: 201,
            columnNumber: 7
        }, this);
    }
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
];

//# sourceMappingURL=src_1dff1476._.js.map