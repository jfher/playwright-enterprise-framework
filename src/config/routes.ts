/**
 * Centralized URL routes for the Magento 2 demo storefront.
 * All page objects reference Routes instead of hardcoded strings.
 */
export const Routes = {

    // ── Authentication ──
    LOGIN: "/customer/account/login",
    REGISTER: "/customer/account/create",
    FORGOT_PASSWORD: "/customer/account/forgotpassword",
    LOGOUT: "/customer/account/logout",

    // ── Account ──
    ACCOUNT_DASHBOARD: "/customer/account",
    ACCOUNT_EDIT: "/customer/account/edit",
    ACCOUNT_ORDERS: "/sales/order/history",
    ACCOUNT_ADDRESSES: "/customer/address",

    // ── Catalog ──
    HOME: "/",
    SEARCH: "/catalogsearch/result",

    // Women
    WOMEN: "/women.html",
    WOMEN_TOPS: "/women/tops-women.html",
    WOMEN_TOPS_JACKETS: "/women/tops-women/jackets-women.html",
    WOMEN_TOPS_HOODIES: "/women/tops-women/hoodies-and-sweatshirts-women.html",
    WOMEN_TOPS_TEES: "/women/tops-women/tees-women.html",
    WOMEN_TOPS_TANKS: "/women/tops-women/tanks-women.html",
    WOMEN_BOTTOMS: "/women/bottoms-women.html",
    WOMEN_BOTTOMS_PANTS: "/women/bottoms-women/pants-women.html",
    WOMEN_BOTTOMS_SHORTS: "/women/bottoms-women/shorts-women.html",

    // Men
    MEN: "/men.html",
    MEN_TOPS: "/men/tops-men.html",
    MEN_TOPS_JACKETS: "/men/tops-men/jackets-men.html",
    MEN_TOPS_HOODIES: "/men/tops-men/hoodies-and-sweatshirts-men.html",
    MEN_TOPS_TEES: "/men/tops-men/tees-men.html",
    MEN_TOPS_TANKS: "/men/tops-men/tanks-men.html",
    MEN_BOTTOMS: "/men/bottoms-men.html",
    MEN_BOTTOMS_PANTS: "/men/bottoms-men/pants-men.html",
    MEN_BOTTOMS_SHORTS: "/men/bottoms-men/shorts-men.html",

    // Gear
    GEAR: "/gear.html",
    GEAR_BAGS: "/gear/bags.html",
    GEAR_FITNESS: "/gear/fitness-equipment.html",
    GEAR_WATCHES: "/gear/watches.html",

    // Other
    WHATS_NEW: "/what-is-new.html",
    TRAINING: "/training.html",
    SALE: "/sale.html",

    // ── Cart & Checkout ──
    CART: "/checkout/cart",
    CHECKOUT: "/checkout",

    // ── Contact ──
    CONTACT: "/contact",

    // ── Wishlist ──
    WISHLIST: "/wishlist",

    // ── Compare ──
    COMPARE: "/catalog/product_compare"

} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
