import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { MessageComponent } from "../components/MessageComponent";
import { Selectors } from "../constants/selectors";
import { Routes } from "../config/routes";
import { parsePrice } from "../utils/string.utils";
import type { CartItem } from "../models/CartItem";

/**
 * Shopping Cart page.
 */
export class CartPage extends BasePage {

    readonly header: HeaderComponent;
    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.CART);
    }

    // ── Locators ──

    private cartTable() {
        return this.page.locator(Selectors.CART_TABLE);
    }

    private cartItemRows() {
        return this.page.locator(Selectors.CART_ITEM_ROW);
    }

    private emptyCartMessage() {
        return this.page.locator(Selectors.CART_EMPTY);
    }

    private proceedToCheckoutButton() {
        return this.page.getByRole("button", { name: "Proceed to Checkout" });
    }

    private updateCartButton() {
        return this.page.getByRole("button", { name: "Update Shopping Cart" });
    }

    // ── Actions ──

    async updateQuantity(productName: string, quantity: number): Promise<void> {
        const row = this.cartItemRows().filter({ hasText: productName });
        await row.locator(Selectors.CART_ITEM_QTY).fill(String(quantity));
        await this.updateCartButton().click();
        await this.waitForPageLoad();
    }

    async removeItem(productName: string): Promise<void> {
        const row = this.cartItemRows().filter({ hasText: productName });
        await row.locator(Selectors.CART_ITEM_REMOVE).click();
        await this.waitForPageLoad();
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutButton().click();
    }

    async applyCoupon(couponCode: string): Promise<void> {
        await this.page.getByRole("tab", { name: "Apply Discount Code" }).click();
        await this.page.getByLabel("Enter discount code").fill(couponCode);
        await this.page.getByRole("button", { name: "Apply Discount" }).click();
        await this.waitForPageLoad();
    }

    // ── Queries ──

    async getCartItems(): Promise<CartItem[]> {
        const rows = this.cartItemRows();
        const count = await rows.count();
        const items: CartItem[] = [];

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const name = await row.locator(Selectors.CART_ITEM_NAME).innerText();
            const priceText = await row.locator(Selectors.CART_ITEM_PRICE).innerText();
            const qtyValue = await row.locator(Selectors.CART_ITEM_QTY).inputValue();
            const subtotalText = await row.locator(Selectors.CART_ITEM_SUBTOTAL).innerText();

            items.push({
                name: name.trim(),
                price: parsePrice(priceText),
                quantity: parseInt(qtyValue, 10),
                subtotal: parsePrice(subtotalText)
            });
        }

        return items;
    }

    async getItemCount(): Promise<number> {
        return this.cartItemRows().count();
    }

    async getSubtotal(): Promise<number> {
        const text = await this.page.locator(Selectors.CART_SUBTOTAL).innerText();
        return parsePrice(text);
    }

    async getGrandTotal(): Promise<number> {
        const text = await this.page.locator(Selectors.CART_GRAND_TOTAL).innerText();
        return parsePrice(text);
    }

    // ── Assertions ──

    async expectEmpty(): Promise<void> {
        await expect(this.emptyCartMessage()).toBeVisible();
    }

    async expectNotEmpty(): Promise<void> {
        await expect(this.cartTable()).toBeVisible();
    }

    async expectItemCount(count: number): Promise<void> {
        await expect(this.cartItemRows()).toHaveCount(count);
    }

    async expectContainsProduct(productName: string): Promise<void> {
        await expect(
            this.cartItemRows().filter({ hasText: productName })
        ).toBeVisible();
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Shopping Cart/i);
    }
}
