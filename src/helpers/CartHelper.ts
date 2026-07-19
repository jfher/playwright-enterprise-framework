import { Page } from "@playwright/test";
import type { Product } from "../models/Product";
import { WaitHelper } from "./WaitHelper";
import { Selectors } from "../constants/selectors";

/**
 * Helper to programmatically add products to cart via the UI,
 * used for setting up test preconditions quickly.
 */
export class CartHelper {

    /**
     * Navigates to a product page and adds it to cart with the given options.
     * Assumes the product URL is known.
     */
    static async addProductToCartViaUI(
        page: Page,
        product: Product
    ): Promise<void> {
        if (!product.url) {
            throw new Error(`Product "${product.name}" requires a URL to add via UI.`);
        }

        await page.goto(product.url);
        await WaitHelper.waitForLoaderToDisappear(page);

        // Select size if provided
        if (product.size) {
            const sizeContainer = page.locator(Selectors.PDP_SWATCH_SIZE);
            await sizeContainer
                .locator(Selectors.PDP_SWATCH_OPTION, { hasText: product.size })
                .click();
        }

        // Select color if provided
        if (product.color) {
            const colorContainer = page.locator(Selectors.PDP_SWATCH_COLOR);
            await colorContainer
                .locator(`${Selectors.PDP_SWATCH_OPTION}[aria-label="${product.color}"]`)
                .click();
        }

        // Set quantity
        if (product.quantity > 1) {
            await page.locator(Selectors.PDP_QTY).fill(String(product.quantity));
        }

        // Add to cart
        await page.locator(Selectors.PDP_ADD_TO_CART).click();
        await WaitHelper.waitForLoaderToDisappear(page);
        await WaitHelper.waitForMessage(page);
    }
}
