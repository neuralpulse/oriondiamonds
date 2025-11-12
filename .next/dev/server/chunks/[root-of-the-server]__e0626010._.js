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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/utils/shopify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SHOPIFY_STORE_DOMAIN",
    ()=>SHOPIFY_STORE_DOMAIN,
    "STOREFRONT_ACCESS_TOKEN",
    ()=>STOREFRONT_ACCESS_TOKEN,
    "STOREFRONT_API_URL",
    ()=>STOREFRONT_API_URL,
    "shopifyRequest",
    ()=>shopifyRequest
]);
const SHOPIFY_STORE_DOMAIN = ("TURBOPACK compile-time value", "orion-diamonds-2.myshopify.com");
const STOREFRONT_ACCESS_TOKEN = ("TURBOPACK compile-time value", "c641e74a414f2399377ee372da6dd2b9");
const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
// Validation
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
async function shopifyRequest(query, variables = {}) {
    try {
        const response = await fetch(STOREFRONT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN
            },
            body: JSON.stringify({
                query,
                variables
            })
        });
        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        if (json.errors) {
            console.error("GraphQL Errors:", json.errors);
            throw new Error(json.errors[0].message);
        }
        return json;
    } catch (error) {
        console.error("Error making Shopify request:", error);
        throw error;
    }
}
}),
"[project]/src/queries/customer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/queries/customer.js
__turbopack_context__.s([
    "CUSTOMER_CREATE",
    ()=>CUSTOMER_CREATE,
    "CUSTOMER_LOGIN",
    ()=>CUSTOMER_LOGIN,
    "GET_CUSTOMER_INFO",
    ()=>GET_CUSTOMER_INFO
]);
const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        message
      }
    }
  }
`;
const CUSTOMER_LOGIN = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
      }
    }
  }
`;
const GET_CUSTOMER_INFO = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      acceptsMarketing
      createdAt
      updatedAt
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
        firstName
        lastName
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            country
            zip
            firstName
            lastName
            phone
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
}),
"[project]/src/app/api/auth/[...nextauth]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/google.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/shopify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$customer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/queries/customer.js [app-route] (ecmascript)");
;
;
;
;
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn ({ user, account, profile }) {
            if (account.provider === "google") {
                try {
                    // Check if customer exists in Shopify or create new one
                    const email = user.email;
                    const firstName = user.name?.split(" ")[0] || "User";
                    const lastName = user.name?.split(" ").slice(1).join(" ") || "";
                    // Try to create customer (will fail if exists)
                    const randomPassword = Math.random().toString(36).slice(-12) + "Aa1!";
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shopify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shopifyRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$queries$2f$customer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CUSTOMER_CREATE"], {
                            input: {
                                email,
                                password: randomPassword,
                                firstName,
                                lastName
                            }
                        });
                    } catch (error) {
                        // Customer might already exist, that's okay
                        console.log("Customer might already exist:", error.message);
                    }
                    return true;
                } catch (error) {
                    console.error("Error creating Shopify customer:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt ({ token, account, user }) {
            // Store user info in token
            if (account && user) {
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
            }
            return token;
        },
        async session ({ session, token }) {
            // Make user info available in session
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.image = token.picture;
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET
});
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e0626010._.js.map