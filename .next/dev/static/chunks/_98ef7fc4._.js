(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/price.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
            // ≥ 1ct → +80%
            adjusted = base * 1.8;
        } else {
            // < 1ct → +50% + ₹900
            adjusted = base * 1.5 + 900;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/collectionPriceCalculator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// utils/collectionPriceCalculator.js
__turbopack_context__.s([
    "calculateBatchPrices",
    ()=>calculateBatchPrices,
    "calculateCollectionItemPrice",
    ()=>calculateCollectionItemPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$price$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/price.js [app-client] (ecmascript)");
;
async function calculateCollectionItemPrice(item, defaultKarat = "18K") {
    try {
        const descriptionHtml = item.descriptionHtml;
        if (!descriptionHtml) {
            console.warn(`⚠️ No descriptionHtml for ${item.handle}, using fallback price: ₹${item.price}`);
            return item.price || "0.00";
        }
        // Parse the description HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(descriptionHtml, "text/html");
        const liElements = doc.querySelectorAll(".product-description ul li");
        if (liElements.length === 0) {
            console.warn(`⚠️ No product specs found in description for ${item.handle}`);
            return item.price || "0.00";
        }
        // Build spec map
        const specMap = {};
        liElements.forEach((li)=>{
            const key = li.querySelector("strong")?.textContent.replace(":", "").trim();
            const value = li.textContent.replace(li.querySelector("strong")?.textContent || "", "").trim();
            if (key && value) specMap[key] = value;
        });
        console.log(`📊 Specs for ${item.handle}:`, specMap);
        // Extract diamond data
        const shapes = specMap["Diamond Shape"]?.split(",").map((v)=>v.trim()) || [];
        const weights = specMap["Diamond Weight"]?.split(",").map((v)=>v.trim()) || [];
        const counts = specMap["Total Diamonds"]?.split(",").map((v)=>v.trim()) || [];
        const diamonds = shapes.map((shape, i)=>({
                shape,
                weight: parseFloat(weights[i]) || 0,
                count: parseInt(counts[i]) || 0
            }));
        // Extract gold weight for the specified karat
        const goldWeightKey = Object.keys(specMap).find((key)=>key.toLowerCase().includes(defaultKarat.toLowerCase()));
        const goldWeight = parseFloat(specMap[goldWeightKey]) || 0;
        console.log(`💎 Calculating price for ${item.handle}:`, {
            diamonds,
            goldWeight,
            goldKarat: defaultKarat
        });
        // Calculate final price
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$price$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateFinalPrice"])({
            diamonds,
            goldWeight,
            goldKarat: defaultKarat
        });
        console.log(`✅ Calculated price for ${item.handle}: ₹${result.totalPrice}`);
        return result.totalPrice.toFixed(2);
    } catch (error) {
        console.error(`❌ Error calculating price for ${item.handle}:`, error);
        return item.price || "0.00";
    }
}
async function calculateBatchPrices(items, defaultKarat = "18K") {
    console.log(`🔄 Starting batch price calculation for ${items.length} items...`);
    const prices = {};
    // Calculate prices in parallel for better performance
    await Promise.all(items.map(async (item)=>{
        const price = await calculateCollectionItemPrice(item, defaultKarat);
        prices[item.handle] = price;
    }));
    console.log(`✅ Batch calculation complete!`, prices);
    return prices;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/collectionsect.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CollectionSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$collectionPriceCalculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/collectionPriceCalculator.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function CollectionSection({ id, title, items = [] }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [itemsPerPage, setItemsPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(6);
    const [itemPrices, setItemPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loadingPrices, setLoadingPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle responsive page size
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CollectionSection.useEffect": ()=>{
            const updateItemsPerPage = {
                "CollectionSection.useEffect.updateItemsPerPage": ()=>{
                    if (window.innerWidth < 768) {
                        setItemsPerPage(8); // 2 per row * 4 rows (mobile)
                    } else {
                        setItemsPerPage(8); // 4 per row * 2 rows (desktop)
                    }
                }
            }["CollectionSection.useEffect.updateItemsPerPage"];
            updateItemsPerPage();
            window.addEventListener("resize", updateItemsPerPage);
            return ({
                "CollectionSection.useEffect": ()=>window.removeEventListener("resize", updateItemsPerPage)
            })["CollectionSection.useEffect"];
        }
    }["CollectionSection.useEffect"], []);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
    // Calculate prices for current page items
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CollectionSection.useEffect": ()=>{
            const loadPrices = {
                "CollectionSection.useEffect.loadPrices": async ()=>{
                    if (currentItems.length === 0) return;
                    setLoadingPrices(true);
                    try {
                        // Calculate prices for current page items
                        // Using "18K" as default - you can change this or make it configurable
                        const prices = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$collectionPriceCalculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBatchPrices"])(currentItems, "18K");
                        setItemPrices({
                            "CollectionSection.useEffect.loadPrices": (prev)=>({
                                    ...prev,
                                    ...prices
                                })
                        }["CollectionSection.useEffect.loadPrices"]);
                    } catch (error) {
                        console.error("Error loading prices:", error);
                    } finally{
                        setLoadingPrices(false);
                    }
                }
            }["CollectionSection.useEffect.loadPrices"];
            loadPrices();
        }
    }["CollectionSection.useEffect"], [
        currentPage,
        items
    ]);
    const goToPage = (page)=>{
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-12 mb-12 px-3 md:px-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                id: id,
                className: "text-4xl md:text-5xl font-bold mb-10 text-[#0a1833] tracking-tight",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/collectionsect.jsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 transition-all duration-500",
                children: currentItems && currentItems.length > 0 ? currentItems.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98]",
                        onClick: ()=>router.push(`/product/${item.handle}`),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden bg-gray-50 aspect-4/5 md:aspect-square",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.image,
                                        alt: item.name,
                                        className: "w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/collectionsect.jsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/collectionsect.jsx",
                                        lineNumber: 89,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                router.push(`/product/${item.handle}`);
                                            },
                                            className: "w-full bg-white text-[#0a1833] py-2 md:py-2.5 px-3 md:px-4 rounded-lg md:rounded-xl font-medium text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#0a1833] hover:text-white transition-all duration-300 shadow-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "w-3.5 h-3.5 md:w-4 md:h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/collectionsect.jsx",
                                                    lineNumber: 100,
                                                    columnNumber: 21
                                                }, this),
                                                "View Details"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/collectionsect.jsx",
                                            lineNumber: 93,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/collectionsect.jsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/collectionsect.jsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 md:p-5 flex flex-col justify-between min-h-[130px] md:min-h-[140px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium capitalize text-sm md:text-lg text-[#0a1833] group-hover:text-[#1a2f5a] transition-colors duration-300 wrap-break-word leading-snug line-clamp-2 mb-2",
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/collectionsect.jsx",
                                        lineNumber: 108,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-auto",
                                        children: loadingPrices && !itemPrices[item.handle] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 border-2 border-gray-300 border-t-[#0a1833] rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/collectionsect.jsx",
                                                    lineNumber: 116,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500",
                                                    children: "Calculating..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/collectionsect.jsx",
                                                    lineNumber: 117,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/collectionsect.jsx",
                                            lineNumber: 115,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base md:text-lg font-semibold text-[#0a1833]",
                                            children: [
                                                "₹",
                                                itemPrices[item.handle] ? parseFloat(itemPrices[item.handle]).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }) : item.price || "0.00"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/collectionsect.jsx",
                                            lineNumber: 122,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/collectionsect.jsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/collectionsect.jsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm p-1.5 md:p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 shadow-md hover:scale-110 active:scale-95 z-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    className: "w-4 h-4 md:w-6 md:h-6 text-[#0a1833] hover:fill-red-500 hover:text-red-500 transition-colors duration-200"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/collectionsect.jsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/collectionsect.jsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/src/components/collectionsect.jsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full flex flex-col items-center justify-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-12 h-12 text-gray-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/collectionsect.jsx",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/collectionsect.jsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/collectionsect.jsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-500 font-medium",
                            children: "No products available"
                        }, void 0, false, {
                            fileName: "[project]/src/components/collectionsect.jsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-400 mt-1",
                            children: "Check back soon for new arrivals"
                        }, void 0, false, {
                            fileName: "[project]/src/components/collectionsect.jsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/collectionsect.jsx",
                    lineNumber: 145,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/collectionsect.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center gap-2 mt-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>goToPage(currentPage - 1),
                        disabled: currentPage === 1,
                        className: "p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/collectionsect.jsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/collectionsect.jsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this),
                    [
                        ...Array(totalPages)
                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>goToPage(i + 1),
                            className: `w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium transition-colors ${currentPage === i + 1 ? "bg-black text-white border-black" : "hover:bg-gray-100 text-gray-800 border-gray-300"}`,
                            children: i + 1
                        }, i, false, {
                            fileName: "[project]/src/components/collectionsect.jsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>goToPage(currentPage + 1),
                        disabled: currentPage === totalPages,
                        className: "p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/collectionsect.jsx",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/collectionsect.jsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/collectionsect.jsx",
                lineNumber: 173,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/collectionsect.jsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(CollectionSection, "2ehjdt7h5L3VD2zc9ERbW9nhYtE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CollectionSection;
var _c;
__turbopack_context__.k.register(_c, "CollectionSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/queries/necklaces_collection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET_NECKLACES_COLLECTION",
    ()=>GET_NECKLACES_COLLECTION
]);
const GET_NECKLACES_COLLECTION = `
  query GetEarringsCollection {
    collection(handle: "necklaces") {
      title
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  sku
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/pendants/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NecklacesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$collectionsect$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/collectionsect.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/shopify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$necklaces_collection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/queries/necklaces_collection.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function NecklacesPage() {
    _s();
    const [necklaces, setNecklaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NecklacesPage.useEffect": ()=>{
            fetchNecklaces();
        }
    }["NecklacesPage.useEffect"], []);
    const fetchNecklaces = async ()=>{
        try {
            setLoading(true);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shopifyRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$necklaces_collection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GET_NECKLACES_COLLECTION"]);
            if (response.data?.collection?.products?.edges) {
                const transformedNecklaces = transformNecklacesData(response.data.collection.products.edges);
                setNecklaces(transformedNecklaces);
            }
        } catch (err) {
            console.error("Error fetching necklaces:", err);
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    const transformNecklacesData = (productsEdges)=>{
        // First, transform the data
        const transformed = productsEdges.map(({ node: product })=>{
            const firstVariant = product.variants.edges[0]?.node;
            const goldKarat = firstVariant?.selectedOptions.find((opt)=>opt.name === "Gold Karat")?.value || "";
            const goldColor = firstVariant?.selectedOptions.find((opt)=>opt.name === "Gold Color")?.value || "";
            const diamondGrade = firstVariant?.selectedOptions.find((opt)=>opt.name === "Diamond Grade")?.value || "";
            const diamondDetails = extractDiamondDetails(product.description);
            return {
                productCode: firstVariant?.sku || "",
                handle: product.handle,
                name: product.title,
                gold: `${goldKarat} ${goldColor}`.trim(),
                goldPrice: firstVariant?.price.amount || "0",
                diamondDetails: {
                    carat: diamondDetails.carat,
                    quality: diamondGrade || diamondDetails.quality,
                    shape: diamondDetails.shape,
                    count: diamondDetails.count
                },
                price: firstVariant?.price.amount || "0",
                currency: firstVariant?.price.currencyCode || "INR",
                image: product.featuredImage?.url || firstVariant?.image?.url || "",
                images: product.images?.edges?.map((img)=>({
                        url: img.node.url,
                        altText: img.node.altText
                    })) || [],
                allVariants: product.variants.edges.map((v)=>v.node)
            };
        });
        // Then, sort the transformed data
        return transformed.sort((a, b)=>{
            const titleA = a.name.toLowerCase();
            const titleB = b.name.toLowerCase();
            const aHasPendants = titleA.includes("pendant");
            const bHasPendants = titleB.includes("pendant");
            const aHasBracelets = titleA.includes("bracelet");
            const bHasBracelets = titleB.includes("bracelet");
            // Pendants come first
            if (aHasPendants && !bHasPendants) return -1;
            if (!aHasPendants && bHasPendants) return 1;
            // Then bracelets
            if (aHasBracelets && !bHasBracelets) return -1;
            if (!aHasBracelets && bHasBracelets) return 1;
            // Everything else maintains original order
            return 0;
        });
    };
    const extractDiamondDetails = (description)=>{
        const caratMatch = description.match(/Total Diamond Carat:\s*([\d.]+)/);
        const qualityMatch = description.match(/Diamond Quality:\s*([^\n]+)/);
        const shapeMatch = description.match(/Diamond Shape:\s*([^\n]+)/);
        const countMatch = description.match(/Total Diamonds:\s*(\d+)/);
        return {
            carat: caratMatch?.[1] || "",
            quality: qualityMatch?.[1]?.trim() || "",
            shape: shapeMatch?.[1]?.trim() || "",
            count: countMatch?.[1] || ""
        };
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "m-10 py-10 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Loading Necklaces..."
            }, void 0, false, {
                fileName: "[project]/src/app/pendants/page.jsx",
                lineNumber: 120,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/pendants/page.jsx",
            lineNumber: 119,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "m-10 py-10 text-center text-red-600",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Error loading Necklaces: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pendants/page.jsx",
                lineNumber: 128,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/pendants/page.jsx",
            lineNumber: 127,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-3 md:px-6 lg:px-8 py-10 md:py-25",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$collectionsect$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            title: "Necklaces",
            items: necklaces
        }, void 0, false, {
            fileName: "[project]/src/app/pendants/page.jsx",
            lineNumber: 135,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/pendants/page.jsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(NecklacesPage, "itwCXhYoTTcWOcTmF3lQ+HH225I=");
_c = NecklacesPage;
var _c;
__turbopack_context__.k.register(_c, "NecklacesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    ()=>Heart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
            key: "mvr1a0"
        }
    ]
];
const Heart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("heart", __iconNode);
;
 //# sourceMappingURL=heart.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
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
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
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
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
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
const Eye = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("eye", __iconNode);
;
 //# sourceMappingURL=eye.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Eye",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_98ef7fc4._.js.map