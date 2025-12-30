module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/models/PricingConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PricingConfig",
    ()=>PricingConfig
]);
// src/models/PricingConfig.js
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const pricingConfigSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].Schema({
    diamondMargins: {
        lessThan1ct: {
            multiplier: {
                type: Number,
                required: true
            },
            flatAddition: {
                type: Number,
                required: true
            },
            description: {
                type: String
            }
        },
        greaterThan1ct: {
            multiplier: {
                type: Number,
                required: true
            },
            flatAddition: {
                type: Number,
                required: true
            },
            description: {
                type: String
            }
        },
        baseFees: {
            fee1: {
                type: Number,
                required: true
            },
            fee2: {
                type: Number,
                required: true
            },
            description: {
                type: String
            }
        }
    },
    makingCharges: {
        lessThan2g: {
            ratePerGram: {
                type: Number,
                required: true
            },
            description: {
                type: String
            }
        },
        greaterThan2g: {
            ratePerGram: {
                type: Number,
                required: true
            },
            description: {
                type: String
            }
        },
        multiplier: {
            type: Number,
            required: true
        },
        description: {
            type: String
        }
    },
    gstRate: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        default: "system"
    }
});
const PricingConfig = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.PricingConfig || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("PricingConfig", pricingConfigSchema);
}),
"[project]/src/utils/mongodb.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// src/lib/mongodb.js
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your .env file");
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log("✅ MongoDB connected");
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[project]/src/app/api/pricing-config/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
// src/app/api/pricing-config/route.js
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PricingConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/PricingConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mongodb.js [app-route] (ecmascript)"); // CORRECT: mongodb.js is in utils folder
;
;
;
// Get admin password
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "changeme123").trim();
console.log("🔑 Admin password configured:", ADMIN_PASSWORD);
// Default configuration (used only if no document exists)
const DEFAULT_CONFIG = {
    diamondMargins: {
        lessThan1ct: {
            multiplier: 5,
            flatAddition: 900,
            description: "For diamonds < 1ct: multiply by 5 and add ₹900"
        },
        greaterThan1ct: {
            multiplier: 2.7,
            flatAddition: 0,
            description: "For diamonds ≥ 1ct: multiply by 2.7"
        },
        baseFees: {
            fee1: 150,
            fee2: 700,
            description: "Flat fees added to all diamond prices"
        }
    },
    makingCharges: {
        lessThan2g: {
            ratePerGram: 950,
            description: "For gold weight < 2g"
        },
        greaterThan2g: {
            ratePerGram: 700,
            description: "For gold weight ≥ 2g"
        },
        multiplier: 1.75,
        description: "Final making charge is multiplied by 1.75"
    },
    gstRate: 0.03,
    lastUpdated: new Date().toISOString(),
    updatedBy: "system"
};
// Helper to get or create the singleton config
async function getOrCreateConfig() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    let config = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PricingConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PricingConfig"].findOne();
    if (!config) {
        config = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PricingConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PricingConfig"].create(DEFAULT_CONFIG);
        console.log("✅ Initialized pricing config in MongoDB");
    }
    return config;
}
async function GET() {
    try {
        const config = await getOrCreateConfig();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(config.toObject());
    } catch (error) {
        console.error("Error loading config:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load configuration"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const body = await request.json();
        const { password, config: newConfig, updatedBy } = body;
        console.log("=== PRICING-CONFIG POST ===");
        console.log("Password received:", password ? "***" : "EMPTY");
        console.log("Expected password:", ADMIN_PASSWORD);
        console.log("Match:", String(password || "").trim() === ADMIN_PASSWORD);
        // Verify password
        if (!password || String(password).trim() !== ADMIN_PASSWORD) {
            console.log("❌ Password mismatch!");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid admin password"
            }, {
                status: 401
            });
        }
        if (!newConfig || !newConfig.diamondMargins || !newConfig.makingCharges) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid configuration structure"
            }, {
                status: 400
            });
        }
        // Update the singleton document
        const updatedConfig = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$PricingConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PricingConfig"].findOneAndUpdate({}, {
            ...newConfig,
            lastUpdated: new Date(),
            updatedBy: updatedBy || "admin"
        }, {
            new: true,
            upsert: true
        } // Create if not exists
        );
        console.log("✅ Config saved to MongoDB");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            config: updatedConfig.toObject()
        });
    } catch (error) {
        console.error("Error saving config:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to save configuration"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d9fa5eff._.js.map