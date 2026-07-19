/**
 * String utility functions for test data manipulation.
 */

/**
 * Parses a price string like "$45.00" into a number (45.00).
 * Handles various currency formats: "$1,234.56", "€ 99.99", "1.234,56 €".
 */
export function parsePrice(priceText: string): number {
    // Remove currency symbols and whitespace
    const cleaned = priceText.replace(/[^0-9.,]/g, "").trim();

    // Handle European format (1.234,56)
    if (cleaned.includes(",") && cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
        return parseFloat(cleaned.replace(/\./g, "").replace(",", "."));
    }

    // Handle US format (1,234.56) or plain (45.00)
    return parseFloat(cleaned.replace(/,/g, ""));
}

/**
 * Normalizes whitespace: trims and collapses multiple spaces into one.
 */
export function normalizeWhitespace(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

/**
 * Extracts a number from text, e.g., "3 Items" → 3.
 * Returns 0 if no number is found.
 */
export function extractNumber(text: string): number {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
}

/**
 * Generates a unique string suffix using the current timestamp.
 * Useful for creating unique test data (e.g., email addresses).
 */
export function uniqueSuffix(): string {
    return Date.now().toString(36);
}
