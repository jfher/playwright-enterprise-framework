/**
 * Shared selectors for Magento 2 UI elements used across multiple pages.
 * Prefer getByRole/getByLabel in page objects; use these for structural elements
 * that lack semantic labels.
 */
export const Selectors = {

    // ── Global ──
    LOADING_MASK: ".loading-mask",
    LOADER_SPINNER: '[data-role="loader"]',
    PAGE_TITLE: ".page-title",
    BREADCRUMB: ".breadcrumbs",

    // ── Messages ──
    MESSAGE_SUCCESS: '[data-ui-id="message-success"]',
    MESSAGE_ERROR: '[data-ui-id="message-error"]',
    MESSAGE_WARNING: '[data-ui-id="message-warning"]',
    MESSAGE_NOTICE: '[data-ui-id="message-notice"]',
    MESSAGES_CONTAINER: ".messages",

    // ── Header ──
    HEADER: ".page-header",
    LOGO: ".logo",
    MINICART_WRAPPER: '[data-block="minicart"]',
    MINICART_COUNTER: ".counter-number",
    SEARCH_INPUT: "#search",
    ACCOUNT_LINK: ".customer-welcome",
    WELCOME_MESSAGE: ".greet.welcome",

    // ── Navigation ──
    NAV_MAIN: "#store\\.menu",
    NAV_ITEM: ".level-top",
    NAV_SUBMENU: ".level0 .submenu",

    // ── Product Grid ──
    PRODUCT_ITEM: ".product-item",
    PRODUCT_NAME: ".product-item-name",
    PRODUCT_PRICE: ".price",
    PRODUCT_IMAGE: ".product-image-photo",
    PRODUCT_ACTIONS: ".product-item-actions",
    TOOLBAR_SORTER: "#sorter",
    TOOLBAR_AMOUNT: ".toolbar-amount",
    GRID_MODE: '[data-value="grid"]',
    LIST_MODE: '[data-value="list"]',
    PAGES: ".pages",

    // ── Product Detail Page ──
    PDP_TITLE: ".page-title span",
    PDP_PRICE: ".product-info-price .price",
    PDP_QTY: "#qty",
    PDP_ADD_TO_CART: "#product-addtocart-button",
    PDP_SWATCH_SIZE: ".swatch-attribute.size",
    PDP_SWATCH_COLOR: ".swatch-attribute.color",
    PDP_SWATCH_OPTION: ".swatch-option",
    PDP_MEDIA: ".product.media",
    PDP_DESCRIPTION: ".product.attribute.description",
    PDP_REVIEWS_TAB: "#tab-label-reviews",

    // ── Cart ──
    CART_TABLE: "#shopping-cart-table",
    CART_ITEM_ROW: ".cart.item",
    CART_ITEM_NAME: ".product-item-name a",
    CART_ITEM_QTY: 'input[data-role="cart-item-qty"]',
    CART_ITEM_PRICE: ".cart-price .price",
    CART_ITEM_SUBTOTAL: ".subtotal .price",
    CART_ITEM_REMOVE: ".action-delete",
    CART_SUMMARY: "#cart-totals",
    CART_SUBTOTAL: '[data-th="Subtotal"] .price',
    CART_GRAND_TOTAL: '[data-th="Order Total"] .price',
    CART_EMPTY: ".cart-empty",
    CART_UPDATE_BUTTON: "#form-validate .update",

    // ── Checkout ──
    CHECKOUT_SHIPPING_FORM: "#shipping",
    CHECKOUT_SHIPPING_METHODS: "#checkout-shipping-method-load",
    CHECKOUT_PAYMENT_METHODS: ".payment-methods",
    CHECKOUT_PLACE_ORDER: ".action.primary.checkout",
    CHECKOUT_ORDER_NUMBER: ".checkout-success .order-number",

    // ── Footer ──
    FOOTER: ".page-footer",
    NEWSLETTER_INPUT: "#newsletter",
    NEWSLETTER_BUTTON: '[title="Subscribe"]',

    // ── Sidebar Filters ──
    FILTER_SIDEBAR: "#layered-filter-block",
    FILTER_OPTION: ".filter-options-item",
    FILTER_CONTENT: ".filter-options-content",

} as const;
