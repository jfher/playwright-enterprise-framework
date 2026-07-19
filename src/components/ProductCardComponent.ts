import { Locator, Page, expect } from "@playwright/test";
import { BaseComponent } from "../core/BaseComponent";
import { Selectors } from "../constants/selectors";
import { parsePrice } from "../utils/string.utils";

/**
 * Represents a single product card in a product grid/list.
 * Constructed with a specific item locator for isolation.
 */
export class ProductCardComponent extends BaseComponent {

    constructor(page: Page, private readonly item: Locator) {
        super(page, Selectors.PRODUCT_ITEM);
    }

    // ── Queries ──

    async getName(): Promise<string> {
        return this.item.locator(Selectors.PRODUCT_NAME).innerText();
    }

    async getPrice(): Promise<number> {
        const priceText = await this.item.locator(Selectors.PRODUCT_PRICE).first().innerText();
        return parsePrice(priceText);
    }

    async getPriceText(): Promise<string> {
        return this.item.locator(Selectors.PRODUCT_PRICE).first().innerText();
    }

    async getImageSrc(): Promise<string | null> {
        return this.item.locator(Selectors.PRODUCT_IMAGE).getAttribute("src");
    }

    // ── Actions ──

    async click(): Promise<void> {
        await this.item.locator(Selectors.PRODUCT_NAME).locator("a").click();
    }

    async addToCart(): Promise<void> {
        await this.item.hover();
        await this.item
            .locator(Selectors.PRODUCT_ACTIONS)
            .getByRole("button", { name: "Add to Cart" })
            .click();
    }

    async addToWishlist(): Promise<void> {
        await this.item.hover();
        await this.item
            .locator('a[data-action="add-to-wishlist"]')
            .click();
    }

    async addToCompare(): Promise<void> {
        await this.item.hover();
        await this.item
            .locator('a[data-action="add-to-compare"]')
            .click();
    }

    // ── Assertions ──

    async expectName(name: string): Promise<void> {
        await expect(this.item.locator(Selectors.PRODUCT_NAME)).toHaveText(name);
    }
}
