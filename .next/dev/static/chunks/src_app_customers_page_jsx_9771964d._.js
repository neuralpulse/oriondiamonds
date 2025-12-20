(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/customers/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrionMiniERP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
// Storage keys for persistent storage
const STORAGE_KEYS = {
    customers: "orion_erp_customers",
    enquiries: "orion_erp_enquiries",
    orders: "orion_erp_orders"
};
// Utility functions for persistent storage with proper error handling
const getFromStorage = async (key)=>{
    try {
        // Check if window.storage exists
        if (("TURBOPACK compile-time value", "object") !== "undefined" && window.storage && typeof window.storage.get === "function") {
            const result = await window.storage.get(key);
            return result ? JSON.parse(result.value) : [];
        } else {
            // Fallback to localStorage if window.storage is not available
            if (("TURBOPACK compile-time value", "object") !== "undefined" && window.localStorage) {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : [];
            }
        }
        return [];
    } catch (error) {
        console.error("Error reading from storage:", error);
        return [];
    }
};
const saveToStorage = async (key, data)=>{
    try {
        // Check if window.storage exists
        if (("TURBOPACK compile-time value", "object") !== "undefined" && window.storage && typeof window.storage.set === "function") {
            await window.storage.set(key, JSON.stringify(data));
        } else {
            // Fallback to localStorage if window.storage is not available
            if (("TURBOPACK compile-time value", "object") !== "undefined" && window.localStorage) {
                localStorage.setItem(key, JSON.stringify(data));
            }
        }
    } catch (error) {
        console.error("Error saving to storage:", error);
    }
};
// Format number in Indian currency style - matching HTML file
const formatIndianCurrency = (num)=>{
    const n = parseFloat(num) || 0;
    return "₹" + n.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
// Clean and parse currency input - matching HTML file
const parseAmount = (value)=>{
    if (!value) return 0;
    // Remove ₹ symbol, commas, and spaces
    const cleaned = String(value).replace(/[₹,\s]/g, "");
    return parseFloat(cleaned) || 0;
};
// Customer List Component
const CustomerList = ({ onSelectCustomer })=>{
    _s();
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingCustomer, setEditingCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        phone: "",
        address: ""
    });
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerList.useEffect": ()=>{
            loadCustomers();
        }
    }["CustomerList.useEffect"], []);
    const loadCustomers = async ()=>{
        setLoading(true);
        const data = await getFromStorage(STORAGE_KEYS.customers);
        setCustomers(data);
        setLoading(false);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!formData.name.trim()) {
            alert("Customer name is required");
            return;
        }
        const updatedCustomers = editingCustomer ? customers.map((c)=>c.id === editingCustomer.id ? {
                ...formData,
                id: c.id
            } : c) : [
            ...customers,
            {
                ...formData,
                id: Date.now().toString()
            }
        ];
        setCustomers(updatedCustomers);
        await saveToStorage(STORAGE_KEYS.customers, updatedCustomers);
        resetForm();
    };
    const handleDelete = async (id)=>{
        if (confirm("Are you sure you want to delete this customer?")) {
            const updated = customers.filter((c)=>c.id !== id);
            setCustomers(updated);
            await saveToStorage(STORAGE_KEYS.customers, updated);
        }
    };
    const handleEdit = (customer)=>{
        setEditingCustomer(customer);
        setFormData({
            name: customer.name,
            phone: customer.phone,
            address: customer.address
        });
        setShowModal(true);
    };
    const resetForm = ()=>{
        setFormData({
            name: "",
            phone: "",
            address: ""
        });
        setEditingCustomer(null);
        setShowModal(false);
    };
    const filteredCustomers = customers.filter((c)=>c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone && c.phone.includes(searchTerm));
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xl text-gray-600",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/customers/page.jsx",
                lineNumber: 161,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/customers/page.jsx",
            lineNumber: 160,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-md p-6 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-[#0a1833]",
                                    children: "Customer Management"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(true),
                                    className: "flex items-center gap-2 bg-[#0a1833] text-white px-4 py-2 rounded-lg hover:bg-[#142850] transition",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Add Customer"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search customers...",
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value),
                            className: "w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 195,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Phone"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 201,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-right text-sm font-semibold text-gray-700",
                                                    children: "Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 194,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customers/page.jsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: filteredCustomers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: "4",
                                                className: "px-4 py-8 text-center text-gray-500",
                                                children: 'No customers found. Click "Add Customer" to get started.'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/customers/page.jsx",
                                                lineNumber: 212,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)) : filteredCustomers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-t hover:bg-gray-50 cursor-pointer transition",
                                                onClick: ()=>onSelectCustomer(customer),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 font-medium text-gray-900",
                                                        children: customer.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/customers/page.jsx",
                                                        lineNumber: 226,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-gray-700",
                                                        children: customer.phone || "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/customers/page.jsx",
                                                        lineNumber: 229,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-gray-700",
                                                        children: customer.address || "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/customers/page.jsx",
                                                        lineNumber: 232,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-right",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    handleEdit(customer);
                                                                },
                                                                className: "text-blue-600 hover:text-blue-800 mr-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                    size: 18
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/customers/page.jsx",
                                                                lineNumber: 236,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    handleDelete(customer.id);
                                                                },
                                                                className: "text-red-600 hover:text-red-800",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 18
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                                    lineNumber: 252,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/customers/page.jsx",
                                                                lineNumber: 245,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/customers/page.jsx",
                                                        lineNumber: 235,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, customer.id, true, {
                                                fileName: "[project]/src/app/customers/page.jsx",
                                                lineNumber: 221,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customers/page.jsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/customers/page.jsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/customers/page.jsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/customers/page.jsx",
                lineNumber: 168,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl p-6 w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-[#0a1833]",
                                    children: editingCustomer ? "Edit Customer" : "Add Customer"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: resetForm,
                                    className: "text-gray-500 hover:text-gray-700",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customers/page.jsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 272,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 268,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                            children: "Customer Name *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 282,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: formData.name,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    name: e.target.value
                                                }),
                                            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 285,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                            children: "Phone Number"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            value: formData.phone,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    phone: e.target.value
                                                }),
                                            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 300,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                            children: "Address"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 311,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: formData.address,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    address: e.target.value
                                                }),
                                            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                            rows: "3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "flex-1 bg-[#0a1833] text-white py-2 rounded-lg hover:bg-[#142850] transition",
                                            children: editingCustomer ? "Update" : "Add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 325,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: resetForm,
                                            className: "flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 331,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/customers/page.jsx",
                    lineNumber: 267,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/customers/page.jsx",
                lineNumber: 266,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/customers/page.jsx",
        lineNumber: 167,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CustomerList, "ygMJOJMGJfmCu6L5xBlXOOvNaTE=");
_c = CustomerList;
// Customer Details Component
const CustomerDetails = ({ customer, onBack })=>{
    _s1();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("enquiries");
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingItem, setEditingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        date: new Date().toISOString().split("T")[0],
        itemName: "",
        goldKarat: "18kt",
        goldWeight: "",
        goldValue: "",
        makingCharges: "",
        diamondCarats: "",
        diamondValue: "",
        designUrl: "",
        gstType: "cgst_sgst"
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerDetails.useEffect": ()=>{
            loadData();
        }
    }["CustomerDetails.useEffect"], [
        activeTab,
        customer.id
    ]);
    const loadData = async ()=>{
        setLoading(true);
        const storageKey = activeTab === "enquiries" ? STORAGE_KEYS.enquiries : STORAGE_KEYS.orders;
        const allData = await getFromStorage(storageKey);
        const customerData = allData.filter((item)=>item.customerId === customer.id);
        setItems(customerData);
        setLoading(false);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const storageKey = activeTab === "enquiries" ? STORAGE_KEYS.enquiries : STORAGE_KEYS.orders;
        const allData = await getFromStorage(storageKey);
        const itemData = {
            ...formData,
            customerId: customer.id,
            id: editingItem ? editingItem.id : Date.now().toString(),
            totalPrice: calculateTotal(formData)
        };
        const updatedData = editingItem ? allData.map((item)=>item.id === editingItem.id ? itemData : item) : [
            ...allData,
            itemData
        ];
        await saveToStorage(storageKey, updatedData);
        await loadData();
        resetForm();
    };
    const handleDelete = async (id)=>{
        if (confirm(`Are you sure you want to delete this ${activeTab === "enquiries" ? "enquiry" : "order"}?`)) {
            const storageKey = activeTab === "enquiries" ? STORAGE_KEYS.enquiries : STORAGE_KEYS.orders;
            const allData = await getFromStorage(storageKey);
            const updated = allData.filter((item)=>item.id !== id);
            await saveToStorage(storageKey, updated);
            await loadData();
        }
    };
    const handleEdit = (item)=>{
        setEditingItem(item);
        setFormData({
            date: item.date,
            itemName: item.itemName,
            goldKarat: item.goldKarat,
            goldWeight: item.goldWeight,
            goldValue: item.goldValue,
            makingCharges: item.makingCharges,
            diamondCarats: item.diamondCarats,
            diamondValue: item.diamondValue,
            designUrl: item.designUrl || "",
            gstType: item.gstType || "cgst_sgst"
        });
        setShowModal(true);
    };
    const resetForm = ()=>{
        setFormData({
            date: new Date().toISOString().split("T")[0],
            itemName: "",
            goldKarat: "18kt",
            goldWeight: "",
            goldValue: "",
            makingCharges: "",
            diamondCarats: "",
            diamondValue: "",
            designUrl: "",
            gstType: "cgst_sgst"
        });
        setEditingItem(null);
        setShowModal(false);
    };
    // Calculate total matching HTML file logic exactly
    const calculateTotal = (data)=>{
        const goldValue = parseAmount(data.goldValue);
        const makingCharges = parseAmount(data.makingCharges);
        const diamondValue = parseAmount(data.diamondValue);
        const subtotal = goldValue + makingCharges + diamondValue;
        // Add GST based on type
        const gstType = data.gstType || "cgst_sgst";
        let gstAmount = 0;
        if (gstType === "cgst_sgst") {
            gstAmount = subtotal * 0.03; // 1.5% + 1.5% = 3%
        } else {
            gstAmount = subtotal * 0.03; // 3%
        }
        const total = subtotal + gstAmount;
        return formatIndianCurrency(total);
    };
    const convertToOrder = async (enquiry)=>{
        if (confirm("Convert this enquiry to an order?")) {
            // Remove from enquiries
            const enquiries = await getFromStorage(STORAGE_KEYS.enquiries);
            const updatedEnquiries = enquiries.filter((e)=>e.id !== enquiry.id);
            await saveToStorage(STORAGE_KEYS.enquiries, updatedEnquiries);
            // Add to orders with new ID and current date
            const orders = await getFromStorage(STORAGE_KEYS.orders);
            const orderData = {
                ...enquiry,
                id: Date.now().toString(),
                date: new Date().toISOString().split("T")[0]
            };
            await saveToStorage(STORAGE_KEYS.orders, [
                ...orders,
                orderData
            ]);
            // Refresh data
            await loadData();
        }
    };
    const generateInvoice = (order)=>{
        // Calculate values matching HTML file exactly
        const goldValue = parseAmount(order.goldValue);
        const makingCharges = parseAmount(order.makingCharges);
        const diamondValue = parseAmount(order.diamondValue);
        const subtotal = goldValue + makingCharges + diamondValue;
        // GST calculation based on type matching HTML file
        const gstType = order.gstType || "cgst_sgst";
        let cgst = 0, sgst = 0, igst = 0;
        if (gstType === "cgst_sgst") {
            cgst = subtotal * 0.015;
            sgst = subtotal * 0.015;
        } else {
            igst = subtotal * 0.03;
        }
        const total = subtotal + cgst + sgst + igst;
        const invoiceWindow = window.open("", "_blank");
        invoiceWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Invoice - ${customer.name}</title>
          <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background: #f5f6f7;
    font-size: 12px;
  }

  .invoice {
    width: 780px; /* A4 friendly */
    margin: 20px auto;
    background: white;
    padding: 20px;
    border: 1px solid #ddd;
  }

  .inv-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .inv-left h2 {
    font-size: 22px;
    margin-bottom: 6px;
  }

  .inv-left p {
    margin: 2px 0;
    font-size: 11px;
  }

  .logo {
    width: 100px;
  }

  .divider {
    border-top: 1.5px solid #333;
    margin: 12px 0;
  }

  .inv-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
    font-size: 11px;
  }

  .cust-table {
    width: 100%;
    margin: 10px 0;
    font-size: 11px;
  }

  .cust-table td {
    padding: 5px;
    vertical-align: top;
  }

  .item-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 11px;
  }

  .item-table thead th {
    background: #333;
    color: white;
    padding: 6px;
    text-align: left;
    border: 1px solid #333;
  }

  .item-table td {
    padding: 6px;
    border: 1px solid #ddd;
  }

  .item-table tr:nth-child(even) {
    background: #f9f9f9;
  }

  .summary-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .gst-table {
    width: 340px;
    border-collapse: collapse;
    font-size: 11px;
  }

  .gst-table td {
    padding: 6px 10px;
    border-bottom: 1px solid #ddd;
  }

  .gst-table td:first-child {
    font-weight: 600;
  }

  .gst-table td:last-child {
    text-align: right;
  }

  .gst-table .grand-total td {
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    font-size: 13px;
    font-weight: 700;
    background: #f0f0f0;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
    font-size: 11px;
  }

  .bank-box h3 {
    font-size: 13px;
    margin-bottom: 5px;
  }

  .bank-box p {
    margin: 3px 0;
  }

  .stamp-crop {
    width: 90px;
    height: 100px;
    overflow: hidden;
    margin-left: auto;
    margin-bottom: 5px;
  }

  .stamp-img {
    width: 90px;
  }

  @media print {
    body {
      background: white;
    }

    .invoice {
      width: 100%;
      margin: 0;
      padding: 15px;
      border: none;
    }
  }
</style>

        </head>
        <body>
          <div class="invoice">
            <div class="inv-header">
              <div class="inv-left">
                <h2>ORION DIAMONDS</h2>
                <p>GAT NO 331-338, Plot No. 2,</p>
                <p>Near BJP Market, Tal Hatkanangale,</p>
                <p>Ichalkaranji, Kolhapur, Maharashtra - 416115</p>
                <p>Phone: +91-7022253092</p>
                <p>Email:  info@oriondiamonds.in</p>
                <p>GSTIN: 27BRDPJ6385G1ZJ</p>
              </div>
              <div class="inv-right">
                <img src="logo.jpg" class="logo" alt="Logo" onerror="this.style.display='none'" />
              </div>
            </div>

            <hr class="divider" />

            <div class="inv-row">
              <div>
                <p><b>Invoice No:</b> ${new Date().getMonth() + 1}-${new Date().getFullYear()}-${order.id.slice(-4)}</p>
              </div>
              <div>
                <p><b>Invoice Date:</b> ${order.date}</p>
              </div>
            </div>

            <table class="cust-table">
              <tr>
                <td width="15%"><b>Customer Name:</b></td>
                <td width="35%">${customer.name}</td>
                <td width="15%"><b>Billing Address:</b></td>
                <td width="35%">${customer.address || customer.name}</td>
              </tr>
              <tr>
                <td><b>Contact:</b></td>
                <td>${customer.phone || "-"}</td>
                <td><b>Shipping Address:</b></td>
                <td>${customer.address || customer.name}</td>
              </tr>
            </table>

            <table class="item-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Gold Purity</th>
                  <th>Gold Weight (g)</th>
                  <th>Gold Value</th>
                  <th>Making Charges</th>
                  <th>Diamond Carats</th>
                  <th>Diamond Value</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${order.itemName || "-"}</td>
                  <td>${order.goldKarat}</td>
                  <td>${parseFloat(order.goldWeight || 0).toFixed(2)}</td>
                  <td>${formatIndianCurrency(goldValue)}</td>
                  <td>${formatIndianCurrency(makingCharges)}</td>
                  <td>${parseFloat(order.diamondCarats || 0).toFixed(2)}</td>
                  <td>${formatIndianCurrency(diamondValue)}</td>
                  <td><b>${formatIndianCurrency(subtotal)}</b></td>
                </tr>
              </tbody>
            </table>

            <div class="summary-section">
              <table class="gst-table">
                <tr>
                  <td>Subtotal</td>
                  <td>${formatIndianCurrency(subtotal)}</td>
                </tr>
                ${gstType === "cgst_sgst" ? `
                <tr>
                  <td>CGST (1.5%)</td>
                  <td>${formatIndianCurrency(cgst)}</td>
                </tr>
                <tr>
                  <td>SGST (1.5%)</td>
                  <td>${formatIndianCurrency(sgst)}</td>
                </tr>
                ` : `
                <tr>
                  <td>IGST (3%)</td>
                  <td>${formatIndianCurrency(igst)}</td>
                </tr>
                `}
                <tr class="grand-total">
                  <td>Grand Total</td>
                  <td>${formatIndianCurrency(total)}</td>
                </tr>
              </table>
            </div>

            <div class="footer">
              <div class="bank-box">
                <h3>Bank Details</h3>
                <p>Ac No: 925020038972487</p>
                <p>IFSC: UTIB0000606</p>
                <p>Bank: Axis Bank</p>
                <p>Branch: Ichalkaranji</p>
              </div>
              <div class="sign-box">
                <div class="stamp-crop">
                  <img src="stamporg.png" class="stamp-img" alt="Stamp" onerror="this.style.display='none'" />
                </div>
                <p>__________________________</p>
                <p>Authorized Signatory</p>
              </div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
        invoiceWindow.document.close();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-md p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onBack,
                                    className: "text-[#0a1833] hover:text-[#142850]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customers/page.jsx",
                                        lineNumber: 840,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 836,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-bold text-[#0a1833]",
                                            children: customer.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 843,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: [
                                                customer.phone && `${customer.phone} • `,
                                                customer.address || "No address"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 846,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 842,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 835,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("enquiries"),
                                    className: `flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === "enquiries" ? "bg-[#0a1833] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 862,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Enquiries"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 854,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("orders"),
                                    className: `flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === "orders" ? "bg-[#0a1833] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 873,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Orders"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 865,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(true),
                                    className: "flex items-center gap-2 bg-[#0a1833] text-white px-4 py-2 rounded-lg hover:bg-[#142850] transition ml-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 880,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Add ",
                                        activeTab === "enquiries" ? "Enquiry" : "Order"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 876,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 853,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12 text-gray-500",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 886,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12 text-gray-500",
                            children: [
                                "No ",
                                activeTab,
                                ' found. Click "Add',
                                " ",
                                activeTab === "enquiries" ? "Enquiry" : "Order",
                                '" to create one.'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 888,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-semibold text-[#0a1833]",
                                                            children: item.itemName || "Unnamed Item"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 901,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: item.date
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 904,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 900,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        activeTab === "enquiries" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>convertToOrder(item),
                                                            className: "text-green-600 hover:text-green-800 px-3 py-1 rounded border border-green-600 hover:bg-green-50 transition text-sm",
                                                            children: "Convert to Order"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 908,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        activeTab === "orders" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>generateInvoice(item),
                                                            className: "text-blue-600 hover:text-blue-800",
                                                            title: "Generate Invoice",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/customers/page.jsx",
                                                                lineNumber: 921,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 916,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleEdit(item),
                                                            className: "text-blue-600 hover:text-blue-800",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/customers/page.jsx",
                                                                lineNumber: 928,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 924,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDelete(item.id),
                                                            className: "text-red-600 hover:text-red-800",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/customers/page.jsx",
                                                                lineNumber: 934,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 930,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 906,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 899,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Gold:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 941,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium",
                                                            children: [
                                                                item.goldKarat,
                                                                " •",
                                                                " ",
                                                                parseFloat(item.goldWeight || 0).toFixed(2),
                                                                "g"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 942,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 940,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Gold Value:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 948,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium",
                                                            children: formatIndianCurrency(parseAmount(item.goldValue))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 949,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 947,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Making:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 954,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium",
                                                            children: formatIndianCurrency(parseAmount(item.makingCharges))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 955,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 953,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "Diamond:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 960,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium",
                                                            children: [
                                                                parseFloat(item.diamondCarats || 0).toFixed(2),
                                                                "ct •",
                                                                " ",
                                                                formatIndianCurrency(parseAmount(item.diamondValue))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 961,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 959,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 939,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        item.designUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 pt-3 border-t border-gray-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: item.designUrl,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-blue-600 hover:text-blue-800 text-sm",
                                                children: "View Design →"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/customers/page.jsx",
                                                lineNumber: 970,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 969,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 pt-3 border-t border-gray-200 flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600 font-medium",
                                                    children: "Total Price:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 982,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl font-bold text-[#0a1833]",
                                                    children: item.totalPrice
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 985,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 981,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 895,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 893,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/customers/page.jsx",
                    lineNumber: 834,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/customers/page.jsx",
                lineNumber: 833,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl p-6 w-full max-w-2xl m-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-[#0a1833]",
                                    children: [
                                        editingItem ? "Edit" : "Add",
                                        " ",
                                        activeTab === "enquiries" ? "Enquiry" : "Order"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 1001,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: resetForm,
                                    className: "text-gray-500 hover:text-gray-700",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customers/page.jsx",
                                        lineNumber: 1009,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 1005,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 1000,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1016,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: formData.date,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            date: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1019,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1015,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Item Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1031,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: formData.itemName,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            itemName: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    placeholder: "Ring, Necklace, etc."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1034,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1030,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Gold Purity/Karat"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1046,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: formData.goldKarat,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            goldKarat: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "18kt",
                                                            children: "18kt"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 1056,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "22kt",
                                                            children: "22kt"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 1057,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "14kt",
                                                            children: "14kt"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 1058,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "24kt",
                                                            children: "24kt"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 1059,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1049,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1045,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Gold Weight (g)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1064,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.01",
                                                    value: formData.goldWeight,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            goldWeight: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    placeholder: "0.00",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1063,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Gold Total Value (₹)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.01",
                                                    value: formData.goldValue,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            goldValue: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    placeholder: "0.00",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1084,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1080,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Gold Making Charges (₹)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1098,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.01",
                                                    value: formData.makingCharges,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            makingCharges: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    placeholder: "0.00",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1101,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1097,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Diamond Total Carats"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1118,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.01",
                                                    value: formData.diamondCarats,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            diamondCarats: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    placeholder: "0.00",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1121,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1117,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Diamond Total Value (₹)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1138,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.01",
                                                    value: formData.diamondValue,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            diamondValue: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    placeholder: "0.00",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1141,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1137,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Design URL (Optional)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1155,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    value: formData.designUrl,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            designUrl: e.target.value
                                                        }),
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1833]",
                                                    placeholder: "https://"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1158,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1154,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "GST Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1170,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-6 p-3 bg-gray-50 rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-2 cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    name: "gstType",
                                                                    value: "cgst_sgst",
                                                                    checked: formData.gstType === "cgst_sgst",
                                                                    onChange: (e)=>setFormData({
                                                                            ...formData,
                                                                            gstType: e.target.value
                                                                        }),
                                                                    className: "w-4 h-4 text-[#0a1833] focus:ring-[#0a1833]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                                    lineNumber: 1175,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-medium text-gray-700",
                                                                    children: "CGST (1.5%) + SGST (1.5%)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                                    lineNumber: 1185,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 1174,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-2 cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    name: "gstType",
                                                                    value: "igst",
                                                                    checked: formData.gstType === "igst",
                                                                    onChange: (e)=>setFormData({
                                                                            ...formData,
                                                                            gstType: e.target.value
                                                                        }),
                                                                    className: "w-4 h-4 text-[#0a1833] focus:ring-[#0a1833]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                                    lineNumber: 1190,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-medium text-gray-700",
                                                                    children: "IGST (3%)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                                    lineNumber: 1200,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/customers/page.jsx",
                                                            lineNumber: 1189,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/customers/page.jsx",
                                                    lineNumber: 1173,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1169,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 1014,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-4 bg-gray-50 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-gray-700",
                                                children: "Total Price:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/customers/page.jsx",
                                                lineNumber: 1210,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-[#0a1833]",
                                                children: calculateTotal(formData)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/customers/page.jsx",
                                                lineNumber: 1213,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/customers/page.jsx",
                                        lineNumber: 1209,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 1208,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "flex-1 bg-[#0a1833] text-white py-2 rounded-lg hover:bg-[#142850] transition",
                                            children: editingItem ? "Update" : "Add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1220,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: resetForm,
                                            className: "flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/customers/page.jsx",
                                            lineNumber: 1226,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/customers/page.jsx",
                                    lineNumber: 1219,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/customers/page.jsx",
                            lineNumber: 1013,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/customers/page.jsx",
                    lineNumber: 999,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/customers/page.jsx",
                lineNumber: 998,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/customers/page.jsx",
        lineNumber: 832,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(CustomerDetails, "JCnxbXQuXMWHCsZrtPzBd3+6ox8=");
_c1 = CustomerDetails;
function OrionMiniERP() {
    _s2();
    const [selectedCustomer, setSelectedCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-30",
        children: selectedCustomer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomerDetails, {
            customer: selectedCustomer,
            onBack: ()=>setSelectedCustomer(null)
        }, void 0, false, {
            fileName: "[project]/src/app/customers/page.jsx",
            lineNumber: 1249,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomerList, {
            onSelectCustomer: setSelectedCustomer
        }, void 0, false, {
            fileName: "[project]/src/app/customers/page.jsx",
            lineNumber: 1254,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/customers/page.jsx",
        lineNumber: 1247,
        columnNumber: 5
    }, this);
}
_s2(OrionMiniERP, "GAF2mSrFQjmR3DDGaPq5Oc8ITjw=");
_c2 = OrionMiniERP;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "CustomerList");
__turbopack_context__.k.register(_c1, "CustomerDetails");
__turbopack_context__.k.register(_c2, "OrionMiniERP");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_customers_page_jsx_9771964d._.js.map