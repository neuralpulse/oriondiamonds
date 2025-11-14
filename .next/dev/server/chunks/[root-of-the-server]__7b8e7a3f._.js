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
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/src/app/api/cart/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/app/api/cart/route.js
__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
;
// MongoDB connection
let isConnected = false;
async function connectDB() {
    if (isConnected && __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.readyState === 1) {
        return;
    }
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(process.env.MONGODB_URI, {
            bufferCommands: false
        });
        isConnected = true;
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
}
// Cart Schema - stores the actual cart items
const CartSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    items: [
        {
            variantId: {
                type: String,
                required: true
            },
            handle: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            variantTitle: String,
            image: String,
            price: Number,
            calculatedPrice: Number,
            currencyCode: {
                type: String,
                default: "INR"
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            selectedOptions: [
                {
                    name: String,
                    value: String
                }
            ],
            descriptionHtml: String
        }
    ]
}, {
    timestamps: true
});
const Cart = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Cart || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Cart", CartSchema);
async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email required"
            }, {
                status: 400
            });
        }
        const cart = await Cart.findOne({
            email: email.toLowerCase()
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            items: cart?.items || [],
            itemCount: cart?.items?.length || 0
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch cart",
            details: error.message
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        await connectDB();
        const { email, items } = await request.json();
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email required"
            }, {
                status: 400
            });
        }
        if (!Array.isArray(items)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Items must be an array"
            }, {
                status: 400
            });
        }
        // Validate items
        const validItems = items.filter((item)=>{
            return item && item.variantId && item.handle && item.title && item.quantity && item.quantity > 0;
        });
        if (validItems.length !== items.length) {
            console.warn(`Filtered out ${items.length - validItems.length} invalid items`);
        }
        // Upsert (update or insert) cart
        const cart = await Cart.findOneAndUpdate({
            email: email.toLowerCase()
        }, {
            email: email.toLowerCase(),
            items: validItems
        }, {
            upsert: true,
            new: true,
            runValidators: true
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            itemCount: cart.items.length,
            message: "Cart saved successfully"
        });
    } catch (error) {
        console.error("Error saving cart:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to save cart",
            details: error.message
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        await connectDB();
        const { email, item } = await request.json();
        if (!email || !item) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email and item required"
            }, {
                status: 400
            });
        }
        // Validate item
        if (!item.variantId || !item.handle || !item.title || !item.quantity || item.quantity < 1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid item data"
            }, {
                status: 400
            });
        }
        const cart = await Cart.findOne({
            email: email.toLowerCase()
        });
        if (!cart) {
            // Create new cart with this item
            const newCart = await Cart.create({
                email: email.toLowerCase(),
                items: [
                    item
                ]
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                itemCount: newCart.items.length,
                message: "Item added to new cart"
            });
        }
        // Check if item already exists
        const existingItemIndex = cart.items.findIndex((i)=>i.variantId === item.variantId);
        if (existingItemIndex > -1) {
            // Update existing item
            cart.items[existingItemIndex] = {
                ...cart.items[existingItemIndex].toObject(),
                ...item
            };
        } else {
            // Add new item
            cart.items.push(item);
        }
        await cart.save();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            itemCount: cart.items.length,
            message: "Item added/updated successfully"
        });
    } catch (error) {
        console.error("Error updating cart item:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to update cart item",
            details: error.message
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");
        const variantId = searchParams.get("variantId");
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email required"
            }, {
                status: 400
            });
        }
        if (variantId) {
            // Remove specific item from cart
            const cart = await Cart.findOne({
                email: email.toLowerCase()
            });
            if (!cart) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: "Cart not found"
                });
            }
            cart.items = cart.items.filter((item)=>item.variantId !== variantId);
            await cart.save();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                itemCount: cart.items.length,
                message: "Item removed from cart"
            });
        } else {
            // Clear entire cart
            await Cart.deleteOne({
                email: email.toLowerCase()
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: "Cart cleared"
            });
        }
    } catch (error) {
        console.error("Error deleting cart:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to delete cart",
            details: error.message
        }, {
            status: 500
        });
    }
}
async function PATCH(request) {
    try {
        await connectDB();
        const { email, variantId, quantity } = await request.json();
        if (!email || !variantId || !quantity) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email, variantId, and quantity required"
            }, {
                status: 400
            });
        }
        if (quantity < 1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Quantity must be at least 1"
            }, {
                status: 400
            });
        }
        const cart = await Cart.findOne({
            email: email.toLowerCase()
        });
        if (!cart) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Cart not found"
            }, {
                status: 404
            });
        }
        const itemIndex = cart.items.findIndex((item)=>item.variantId === variantId);
        if (itemIndex === -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Item not found"
            }, {
                status: 404
            });
        }
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Quantity updated"
        });
    } catch (error) {
        console.error("Error updating quantity:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to update quantity",
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7b8e7a3f._.js.map