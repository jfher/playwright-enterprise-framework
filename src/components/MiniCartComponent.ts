import { Page, expect } from "@playwright/test";
import { BaseComponent } from "../core/BaseComponent";
import { Selectors } from "../constants/selectors";

/**
 * Mini cart dropdown that appears when clicking the cart icon in the header.
 * Shows cart items, subtotal, and checkout link.
 */
export class MiniCartComponent extends BaseComponent {

    constructor(page: Page) {
        super(page, Selectors.MINICART_WRAPPER);
    }

    // ── Locators ──

    private cartItems() {
        return this.root.locator(".minicart-items .product-item");
    }

    private subtotal() {
        return this.root.locator(".subtotal .price");
    }

    private checkoutButton() {
        return this.root.getByRole("button", { name: "Proceed to Checkout" });
    }

    private viewCartLink() {
        return this.root.getByRole("link", { name: "View and Edit Cart" });
    }

    private emptyMessage() {
        return this.root.locator(".subtitle.empty");
    }

    // ── Actions ──

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton().click();
    }

    async viewAndEditCart(): Promise<void> {
        await this.viewCartLink().click();
    }

    async removeItem(productName: string): Promise<void> {
        const item = this.cartItems().filter({ hasText: productName });
        await item.locator(".action.delete").click();

        // Confirm removal dialog
        await this.page.getByRole("button", { name: "OK" }).click();
    }

    // ── Queries ──

    async getItemCount(): Promise<number> {
        return this.cartItems().count();
    }

    async getSubtotalText(): Promise<string> {
        return this.subtotal().innerText();
    }

    async getItemNames(): Promise<string[]> {
        return this.cartItems().locator(".product-item-name a").allInnerTexts();
    }

    // ── Assertions ──

    async expectEmpty(): Promise<void> {
        await expect(this.emptyMessage()).toBeVisible();
    }

    async expectItemCount(count: number): Promise<void> {
        await expect(this.cartItems()).toHaveCount(count);
    }

    async expectContainsProduct(productName: string): Promise<void> {
        await expect(
            this.cartItems().filter({ hasText: productName })
        ).toBeVisible();
    }
}
