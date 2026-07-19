import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { MessageComponent } from "../components/MessageComponent";
import { Selectors } from "../constants/selectors";
import { parsePrice } from "../utils/string.utils";
import type { Product } from "../models/Product";

/**
 * Product Detail Page (PDP) — individual product view.
 * Handles configurable products with size/color swatches.
 */
export class ProductDetailPage extends BasePage {

    readonly header: HeaderComponent;
    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        // Default PDP — override with gotoProduct() for specific products
        await this.page.goto("/radiant-tee.html");
    }

    async gotoProduct(urlKey: string): Promise<void> {
        await this.page.goto(`/${urlKey}.html`);
    }

    // ── Locators ──

    private productTitle() {
        return this.page.locator(Selectors.PDP_TITLE);
    }

    private productPrice() {
        return this.page.locator(Selectors.PDP_PRICE);
    }

    private quantityInput() {
        return this.page.locator(Selectors.PDP_QTY);
    }

    private addToCartButton() {
        return this.page.locator(Selectors.PDP_ADD_TO_CART);
    }

    private sizeOptions() {
        return this.page.locator(`${Selectors.PDP_SWATCH_SIZE} ${Selectors.PDP_SWATCH_OPTION}`);
    }

    private colorOptions() {
        return this.page.locator(`${Selectors.PDP_SWATCH_COLOR} ${Selectors.PDP_SWATCH_OPTION}`);
    }

    // ── Actions ──

    async selectSize(size: string): Promise<void> {
        await this.page
            .locator(Selectors.PDP_SWATCH_SIZE)
            .locator(Selectors.PDP_SWATCH_OPTION, { hasText: size })
            .click();
    }

    async selectColor(color: string): Promise<void> {
        await this.page
            .locator(Selectors.PDP_SWATCH_COLOR)
            .locator(`${Selectors.PDP_SWATCH_OPTION}[aria-label="${color}"]`)
            .click();
    }

    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput().fill(String(quantity));
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton().click();
        await this.waitForPageLoad();
    }

    async addToCartWithOptions(product: Product): Promise<void> {
        if (product.size) {
            await this.selectSize(product.size);
        }
        if (product.color) {
            await this.selectColor(product.color);
        }
        if (product.quantity > 1) {
            await this.setQuantity(product.quantity);
        }
        await this.addToCart();
    }

    async addToWishlist(): Promise<void> {
        await this.page.getByRole("link", { name: "Add to Wish List" }).click();
    }

    async addToCompare(): Promise<void> {
        await this.page.getByRole("link", { name: "Add to Compare" }).click();
    }

    async clickReviewsTab(): Promise<void> {
        await this.page.locator(Selectors.PDP_REVIEWS_TAB).click();
    }

    // ── Queries ──

    async getProductName(): Promise<string> {
        return this.productTitle().innerText();
    }

    async getProductPrice(): Promise<number> {
        const priceText = await this.productPrice().first().innerText();
        return parsePrice(priceText);
    }

    async getProductPriceText(): Promise<string> {
        return this.productPrice().first().innerText();
    }

    async getAvailableSizes(): Promise<string[]> {
        return this.sizeOptions().allInnerTexts();
    }

    async getAvailableColorLabels(): Promise<string[]> {
        const options = this.colorOptions();
        const count = await options.count();
        const labels: string[] = [];

        for (let i = 0; i < count; i++) {
            const label = await options.nth(i).getAttribute("aria-label");
            if (label) labels.push(label);
        }

        return labels;
    }

    async getDescription(): Promise<string> {
        return this.page.locator(Selectors.PDP_DESCRIPTION).innerText();
    }

    async getSku(): Promise<string> {
        return this.page.locator(".product.attribute.sku .value").innerText();
    }

    // ── Assertions ──

    async expectProductName(name: string): Promise<void> {
        await expect(this.productTitle()).toHaveText(name);
    }

    async expectAddToCartSuccess(productName: string): Promise<void> {
        await this.messages.expectSuccess(productName);
    }

    async expectRequiredOptionError(): Promise<void> {
        await expect(this.page.locator(".mage-error")).toBeVisible();
    }

    async expectLoaded(): Promise<void> {
        await expect(this.productTitle()).toBeVisible();
        await expect(this.addToCartButton()).toBeVisible();
    }
}
