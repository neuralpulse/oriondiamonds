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
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/pricing-config/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/app/api/pricing-config/route.js
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "HEAD",
    ()=>HEAD,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
const CONFIG_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "pricing-config.json");
// Get admin password with proper fallback
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "changeme123").trim();
console.log("🔑 Admin password configured:", ADMIN_PASSWORD); // Debug log on startup
async function HEAD() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 200
    });
}
// Default configuration
const DEFAULT_CONFIG = {
    diamondMargins: {
        lessThan1ct: {
            multiplier: 2.2,
            flatAddition: 900,
            description: "For diamonds < 1ct: multiply by 2.2 and add ₹900"
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
// Initialize config file if it doesn't exist
async function initializeConfig() {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(CONFIG_FILE);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2));
        console.log("✅ Initialized pricing config file");
    }
}
// Read config
async function getConfig() {
    try {
        await initializeConfig();
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(CONFIG_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading config:", error);
        return DEFAULT_CONFIG;
    }
}
// Write config
async function saveConfig(config) {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}
async function GET() {
    try {
        const config = await getConfig();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(config);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load configuration"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json().catch(()=>({}));
        const { password, config, updatedBy } = body || {};
        // Debug logs
        console.log("=== PRICING-CONFIG POST ===");
        console.log("Request body keys:", Object.keys(body));
        console.log("Password received:", password ? "***" : "EMPTY");
        console.log("Password length:", String(password || "").length);
        console.log("Expected password:", ADMIN_PASSWORD);
        console.log("Match:", String(password || "").trim() === ADMIN_PASSWORD);
        // Verify password exists
        if (!password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Password is required"
            }, {
                status: 401
            });
        }
        // Verify admin password
        const receivedPassword = String(password).trim();
        if (receivedPassword !== ADMIN_PASSWORD) {
            console.log("❌ Password mismatch!");
            console.log("Received (trimmed):", receivedPassword);
            console.log("Expected:", ADMIN_PASSWORD);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid admin password"
            }, {
                status: 401
            });
        }
        console.log("✅ Password verified");
        // Validate config structure
        if (!config || !config.diamondMargins || !config.makingCharges) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid configuration structure"
            }, {
                status: 400
            });
        }
        // Add metadata
        const updatedConfig = {
            ...config,
            lastUpdated: new Date().toISOString(),
            updatedBy: updatedBy || "admin"
        };
        await saveConfig(updatedConfig);
        console.log("✅ Config saved successfully");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            config: updatedConfig
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

//# sourceMappingURL=%5Broot-of-the-server%5D__44e4cfbd._.js.map