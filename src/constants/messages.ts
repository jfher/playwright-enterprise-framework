/**
 * Expected UI messages from the Magento 2 demo storefront.
 * Used for assertion text matching in tests.
 */
export const Messages = {

    // ── Authentication ──
    LOGIN_INVALID: "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.",
    LOGIN_REQUIRED_EMAIL: "This is a required field.",
    LOGIN_REQUIRED_PASSWORD: "This is a required field.",
    LOGIN_INVALID_EMAIL_FORMAT: "Please enter a valid email address (Ex: johndoe@domain.com).",

    // ── Registration ──
    REGISTRATION_SUCCESS: "Thank you for registering with Main Website Store.",
    REGISTRATION_EMAIL_EXISTS: "There is already an account with this email address.",
    REGISTRATION_PASSWORD_MISMATCH: "Please enter the same value again.",
    REGISTRATION_WEAK_PASSWORD: "Minimum of different classes of characters in password is",

    // ── Cart ──
    CART_ADD_SUCCESS: (productName: string) =>
        `You added ${productName} to your shopping cart.`,
    CART_EMPTY: "You have no items in your shopping cart.",
    CART_UPDATED: "shopping cart has been updated",

    // ── Wishlist ──
    WISHLIST_ADD_SUCCESS: (productName: string) =>
        `${productName} has been added to your Wish List.`,
    WISHLIST_LOGIN_REQUIRED: "You must login or register to add items to your wishlist.",

    // ── Compare ──
    COMPARE_ADD_SUCCESS: (productName: string) =>
        `You added product ${productName} to the comparison list.`,

    // ── Checkout ──
    CHECKOUT_ORDER_SUCCESS: "Thank you for your purchase!",
    CHECKOUT_ORDER_NUMBER_PREFIX: "Your order # is:",

    // ── Contact ──
    CONTACT_SUCCESS: "Thanks for contacting us with your comments and questions. We'll respond to you very soon.",

    // ── Newsletter ──
    NEWSLETTER_SUCCESS: "Thank you for your subscription.",
    NEWSLETTER_ALREADY_SUBSCRIBED: "This email address is already subscribed.",

    // ── Search ──
    SEARCH_NO_RESULTS: "Your search returned no results.",
    SEARCH_MINIMUM_LENGTH: "Minimum Search query length is 3",

    // ── Validation ──
    REQUIRED_FIELD: "This is a required field.",

} as const;
