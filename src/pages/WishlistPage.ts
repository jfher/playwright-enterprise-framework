import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { MessageComponent } from "../components/MessageComponent";
import { Routes } from "../config/routes";

/**
 * Wishlist page — displays saved products for logged-in customers.
 */
export class WishlistPage extends BasePage {

    readonly header: HeaderComponent;
    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.WISHLIST);
    }

    // ── Locators ──

    private wishlistItems() {
        return this.page.locator(".product-item");
    }

    private emptyMessage() {
        return this.page.getByText("You have no items in your wish list.");
    }

    // ── Actions ──

    async addAllToCart(): Promise<void> {
        await this.page.getByRole("button", { name: "Add All to Cart" }).click();
        await this.waitForPageLoad();
    }

    async removeItem(productName: string): Promise<void> {
        const item = this.wishlistItems().filter({ hasText: productName });
        await item.locator('a[data-role="remove"]').click();
        await this.waitForPageLoad();
    }

    async addItemToCart(productName: string): Promise<void> {
        const item = this.wishlistItems().filter({ hasText: productName });
        await item.getByRole("button", { name: "Add to Cart" }).click();
        await this.waitForPageLoad();
    }

    // ── Queries ──

    async getItems(): Promise<string[]> {
        return this.wishlistItems()
            .locator(".product-item-name a")
            .allInnerTexts();
    }

    async getItemCount(): Promise<number> {
        return this.wishlistItems().count();
    }

    // ── Assertions ──

    async expectEmpty(): Promise<void> {
        await expect(this.emptyMessage()).toBeVisible();
    }

    async expectContains(productName: string): Promise<void> {
        await expect(
            this.wishlistItems().filter({ hasText: productName })
        ).toBeVisible();
    }

    async expectItemCount(count: number): Promise<void> {
        await expect(this.wishlistItems()).toHaveCount(count);
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Wish List/i);
    }
}
