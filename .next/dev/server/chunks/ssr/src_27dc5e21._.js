module.exports = [
"[project]/src/components/Navbar.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*#__PURE__*/ __turbopack_context__.s([]);
const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
_jsxDEV("div", {
    className: `fixed w-full z-40 top-0 left-0 transition-colors duration-300 ${pathname === "/" ? isHero ? hovering ? "bg-[#0a1833]" : "bg-transparent" : "bg-[#0a1833]" : "bg-[#0a1833]"}`,
    onMouseEnter: ()=>setHovering(true),
    onMouseLeave: ()=>setHovering(false),
    ref: searchRef,
    children: [
        /*#__PURE__*/ _jsxDEV("div", {
            className: "p-4 flex items-center justify-between relative",
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    onClick: ()=>goToSection("hero"),
                    className: "cursor-pointer",
                    children: /*#__PURE__*/ _jsxDEV("img", {
                        src: "/nobglogo.png",
                        alt: "Logo",
                        className: "h-12 w-auto object-contain"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.jsx",
                        lineNumber: 19,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 18,
                    columnNumber: 5
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex items-center gap-2 sm:gap-3 relative",
                    children: [
                        isMounted && !isMobile && /*#__PURE__*/ _jsxDEV("div", {
                            className: "relative flex items-center",
                            children: [
                                /*#__PURE__*/ _jsxDEV(FiSearch, {
                                    size: 20,
                                    className: "text-white cursor-pointer shrink-0 hover:text-yellow-400 transition",
                                    onClick: ()=>setDesktopSearchOpen(!desktopSearchOpen)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 31,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                desktopSearchOpen && /*#__PURE__*/ _jsxDEV("form", {
                                    onSubmit: handleSearchSubmit,
                                    className: "relative ml-2 flex items-center",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("input", {
                                            type: "text",
                                            ref: desktopSearchRef,
                                            placeholder: "Search...",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            onFocus: ()=>searchResults.length > 0 && setShowResults(true),
                                            className: "px-3 py-1 outline-none text-white bg-transparent border-b border-gray-400 placeholder-gray-300 w-56"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.jsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        searchQuery && /*#__PURE__*/ _jsxDEV("button", {
                                            type: "button",
                                            onClick: handleClearSearch,
                                            className: "absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white",
                                            children: /*#__PURE__*/ _jsxDEV(X, {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 56,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.jsx",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isSearching && /*#__PURE__*/ _jsxDEV(Loader, {
                                            className: "absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.jsx",
                                            lineNumber: 60,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 30,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV("a", {
                            href: "tel:+917022253092",
                            className: "hidden md:flex items-center justify-center text-white hover:text-yellow-400 transition",
                            children: /*#__PURE__*/ _jsxDEV(FiPhone, {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.jsx",
                                lineNumber: 72,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 68,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "hidden md:block relative",
                            children: [
                                /*#__PURE__*/ _jsxDEV(FiShoppingCart, {
                                    size: 20,
                                    className: "text-white cursor-pointer hover:text-yellow-400 transition",
                                    onClick: ()=>router.push("/my-cart")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 77,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0)),
                                cartCount > 0 && /*#__PURE__*/ _jsxDEV("span", {
                                    className: "absolute -top-2 -right-2 bg-yellow-500 text-[#0a1833] text-[10px] font-bold rounded-full px-1.5 py-0.5",
                                    children: cartCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 83,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 76,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "hidden md:block relative",
                            children: [
                                /*#__PURE__*/ _jsxDEV(FiHeart, {
                                    size: 20,
                                    className: "text-white cursor-pointer hover:text-red-500 transition",
                                    onClick: ()=>router.push("/my-list")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 91,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0)),
                                wishlistCount > 0 && /*#__PURE__*/ _jsxDEV("span", {
                                    className: "absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5",
                                    children: wishlistCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 97,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 90,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV(FiUser, {
                            size: 20,
                            className: "hidden md:block text-white cursor-pointer hover:text-green-400 transition",
                            onClick: ()=>router.push("/account")
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 104,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "md:hidden flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ _jsxDEV("a", {
                                    href: "tel:+917022253092",
                                    className: "flex items-center justify-center text-white hover:text-yellow-400 transition",
                                    children: /*#__PURE__*/ _jsxDEV(FiPhone, {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 117,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 113,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0)),
                                mobileMenuOpen ? /*#__PURE__*/ _jsxDEV(FiX, {
                                    size: 24,
                                    className: "text-white cursor-pointer",
                                    onClick: ()=>setMobileMenuOpen(false)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 122,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ _jsxDEV(FiMenu, {
                                    size: 24,
                                    className: "text-white cursor-pointer",
                                    onClick: ()=>setMobileMenuOpen(true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 128,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 111,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 27,
                    columnNumber: 5
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.jsx",
            lineNumber: 16,
            columnNumber: 3
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ _jsxDEV("div", {
            className: "hidden md:flex justify-center gap-6 md:gap-12 py-2 text-white font-medium text-sm md:text-base",
            children: [
                {
                    label: "Home",
                    id: "hero"
                },
                {
                    label: "Collection",
                    id: "collections"
                },
                {
                    label: "About Us",
                    id: "about"
                },
                {
                    label: "Customizations",
                    id: "customizations"
                },
                {
                    label: "FAQs",
                    id: "faqs"
                },
                {
                    label: "Contact Us",
                    id: "contact"
                }
            ].map((link)=>/*#__PURE__*/ _jsxDEV("button", {
                    onClick: ()=>goToSection(link.id),
                    className: "no-underline hover:underline transition cursor-pointer",
                    children: link.label
                }, link.id, false, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 148,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/src/components/Navbar.jsx",
            lineNumber: 139,
            columnNumber: 3
        }, ("TURBOPACK compile-time value", void 0)),
        showResults && searchResults.length > 0 && /*#__PURE__*/ _jsxDEV("div", {
            className: "absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50",
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "p-2",
                    children: searchResults.map(({ node: product })=>/*#__PURE__*/ _jsxDEV(Link, {
                            href: `/product/${product.handle}`,
                            onClick: handleResultClick,
                            className: "flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors",
                            children: [
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "w-16 h-16 bg-gray-100 rounded overflow-hidden",
                                    children: /*#__PURE__*/ _jsxDEV("img", {
                                        src: product.featuredImage?.url || "/placeholder.jpg",
                                        alt: product.title,
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "flex-1 min-w-0",
                                    children: /*#__PURE__*/ _jsxDEV("h4", {
                                        className: "font-semibold text-gray-900 truncate",
                                        children: product.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, product.id, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 161,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "border-t p-3 bg-gray-50 text-center",
                    children: /*#__PURE__*/ _jsxDEV("button", {
                        onClick: handleSearchSubmit,
                        className: "text-sm text-black font-medium hover:underline",
                        children: [
                            'View all results for "',
                            searchQuery,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.jsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 184,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.jsx",
            lineNumber: 160,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        showResults && !isSearching && searchQuery.length > 2 && searchResults.length === 0 && /*#__PURE__*/ _jsxDEV("div", {
            className: "absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-xl p-6 text-center z-50",
            children: [
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "text-gray-600",
                    children: [
                        'No products found for "',
                        searchQuery,
                        '"'
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "text-sm text-gray-500 mt-2",
                    children: "Try different keywords or browse our collections"
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.jsx",
            lineNumber: 200,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)),
        mobileMenuOpen && /*#__PURE__*/ _jsxDEV("div", {
            className: "md:hidden flex flex-col bg-[#0a1833] text-white",
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex items-center justify-around py-4 px-4 border-b border-gray-700",
                    children: [
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "flex flex-col items-center gap-1",
                            children: [
                                /*#__PURE__*/ _jsxDEV(FiSearch, {
                                    size: 22,
                                    className: "text-white cursor-pointer hover:text-yellow-400 transition",
                                    onClick: ()=>setMobileSearchOpen(!mobileSearchOpen)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 215,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ _jsxDEV("span", {
                                    className: "text-xs",
                                    children: "Search"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 220,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 214,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "flex flex-col items-center gap-1 relative cursor-pointer",
                            onClick: ()=>{
                                router.push("/my-cart");
                                setMobileMenuOpen(false);
                            },
                            children: [
                                /*#__PURE__*/ _jsxDEV(FiShoppingCart, {
                                    size: 22,
                                    className: "text-white hover:text-yellow-400 transition"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 231,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                cartCount > 0 && /*#__PURE__*/ _jsxDEV("span", {
                                    className: "absolute -top-1 -right-2 bg-yellow-500 text-[#0a1833] text-[10px] font-bold rounded-full px-1.5 py-0.5",
                                    children: cartCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ _jsxDEV("span", {
                                    className: "text-xs",
                                    children: "Cart"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 240,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 224,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "flex flex-col items-center gap-1 relative cursor-pointer",
                            onClick: ()=>{
                                router.push("/my-list");
                                setMobileMenuOpen(false);
                            },
                            children: [
                                /*#__PURE__*/ _jsxDEV(FiHeart, {
                                    size: 22,
                                    className: "text-white hover:text-red-500 transition"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 251,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                wishlistCount > 0 && /*#__PURE__*/ _jsxDEV("span", {
                                    className: "absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5",
                                    children: wishlistCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ _jsxDEV("span", {
                                    className: "text-xs",
                                    children: "Wishlist"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 260,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 244,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "flex flex-col items-center gap-1 cursor-pointer",
                            onClick: ()=>{
                                router.push("/account");
                                setMobileMenuOpen(false);
                            },
                            children: [
                                /*#__PURE__*/ _jsxDEV(FiUser, {
                                    size: 22,
                                    className: "text-white hover:text-green-400 transition"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 271,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ _jsxDEV("span", {
                                    className: "text-xs",
                                    children: "Account"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 275,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 264,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 212,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                mobileSearchOpen && /*#__PURE__*/ _jsxDEV("div", {
                    className: "px-4 py-3 border-b border-gray-700",
                    children: /*#__PURE__*/ _jsxDEV("form", {
                        onSubmit: handleSearchSubmit,
                        children: /*#__PURE__*/ _jsxDEV("input", {
                            type: "text",
                            ref: mobileSearchRef,
                            placeholder: "Search...",
                            value: searchQuery,
                            onChange: (e)=>setSearchQuery(e.target.value),
                            onFocus: ()=>searchResults.length > 0 && setShowResults(true),
                            className: "w-full px-3 py-2 outline-none text-white rounded-lg bg-[#0a1833] border border-gray-500"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.jsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 281,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex flex-col items-center font-medium text-base py-4 gap-4",
                    children: [
                        {
                            label: "Home",
                            id: "hero"
                        },
                        {
                            label: "Collection",
                            id: "collections"
                        },
                        {
                            label: "About Us",
                            id: "about"
                        },
                        {
                            label: "Customizations",
                            id: "customizations"
                        },
                        {
                            label: "FAQs",
                            id: "faqs"
                        },
                        {
                            label: "Contact Us",
                            id: "contact"
                        }
                    ].map((link)=>/*#__PURE__*/ _jsxDEV("button", {
                            onClick: ()=>goToSection(link.id),
                            className: "no-underline hover:underline transition cursor-pointer",
                            children: link.label
                        }, link.id, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 306,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 297,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.jsx",
            lineNumber: 210,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true, {
    fileName: "[project]/src/components/Navbar.jsx",
    lineNumber: 1,
    columnNumber: 1
}, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/components/Footer.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-rsc] (ecmascript)");
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-gradient-to-t from-gray-50 via-white to-gray-100 text-[#0a1833]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "contact",
                className: "py-20 px-6 border-b border-gray-300/50 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl font-serif font-semibold text-[#0a1833]",
                            children: "Contact Us"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.jsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-gray-700 text-sm md:text-base",
                            children: "Have questions or want to know more? Reach out to us anytime."
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.jsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "mailto:info@oriondiamonds.in",
                                    className: "flex items-center gap-2 hover:text-[#0a1833] transition font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiMail"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.jsx",
                                            lineNumber: 25,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "info@oriondiamonds.in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.jsx",
                                            lineNumber: 26,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.jsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "tel:+917022253092",
                                    className: "flex items-center gap-2 hover:text-[#0a1833] transition font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiPhone"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.jsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "+91 7022253092"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.jsx",
                                            lineNumber: 34,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.jsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.instagram.com/oriondiamonds.in?igsh=MWdqZW00ODczZ2tqNA%3D%3D&utm_source=qr",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "flex items-center gap-2 hover:text-pink-600 transition font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiInstagram"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.jsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "@oriondiamonds.in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.jsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.jsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.jsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Footer.jsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-300/50 py-6 px-4 text-center text-gray-600 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-[#0a1833]",
                                children: "Orion Diamonds"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.jsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            " — All rights reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.jsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 flex items-center justify-center gap-1 text-gray-500",
                        children: [
                            "Powered by",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-[#0a1833]",
                                children: "Neural Pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.jsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.jsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.jsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/scrolltop.jsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/scrolltop.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/scrolltop.jsx <module evaluation>", "default");
}),
"[project]/src/components/scrolltop.jsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/scrolltop.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/scrolltop.jsx", "default");
}),
"[project]/src/components/scrolltop.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scrolltop$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/scrolltop.jsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scrolltop$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/scrolltop.jsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scrolltop$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/providers.jsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/providers.jsx <module evaluation>", "Providers");
}),
"[project]/src/app/providers.jsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/providers.jsx", "Providers");
}),
"[project]/src/app/providers.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/providers.jsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/providers.jsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/layout.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scrolltop$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/scrolltop.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/providers.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa6/index.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const metadata = {
    title: "Orion Diamonds",
    icons: {
        icon: "/icon.jpeg"
    }
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scrolltop$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/layout.jsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                    fileName: "[project]/src/app/layout.jsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Toaster"], {
                    position: "bottom-center"
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.jsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Providers"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.jsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://wa.me/917022253092?text=Hi%20there!%20I%20need%20some%20help%20with%20a%20product%20on%20your%20website.",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "fixed bottom-4 md:bottom-6 right-4 flex items-center justify-center gap-1 bg-[#064f46] text-white px-4 py-2 md:px-5 md:py-3 lg:px-5 lg:py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                            className: " w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5"
                        }, void 0, false, {
                            fileName: "[project]/src/app/layout.jsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-base md:text-lg lg:text-lg",
                            children: "Let us help you out"
                        }, void 0, false, {
                            fileName: "[project]/src/app/layout.jsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/layout.jsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/src/app/layout.jsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/layout.jsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.jsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_27dc5e21._.js.map