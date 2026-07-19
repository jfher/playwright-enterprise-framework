import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { MessageComponent } from "../components/MessageComponent";
import { Selectors } from "../constants/selectors";
import { Routes } from "../config/routes";
import type { Address } from "../models/Address";

/**
 * Checkout page — Magento 2 two-step checkout:
 * Step 1: Shipping address & shipping method
 * Step 2: Review & payment
 */
export class CheckoutPage extends BasePage {

    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.CHECKOUT);
    }

    // ── Step 1: Shipping ──

    async fillShippingAddress(address: Address): Promise<void> {
        // Fill email for guest checkout
        const emailField = this.page.getByRole("textbox", { name: "Email Address" });
        if (await emailField.isVisible()) {
            await emailField.fill(`guest_${Date.now()}@test.com`);
        }

        await this.page.getByLabel("First Name").fill("Test");
        await this.page.getByLabel("Last Name").fill("User");
        await this.page.getByLabel("Street Address: Line 1").fill(address.street);
        await this.page.getByLabel("City").fill(address.city);

        // State/Province — may be a dropdown or text field
        const stateSelect = this.page.locator('select[name="region_id"]');
        if (await stateSelect.isVisible()) {
            await stateSelect.selectOption({ label: address.state });
        } else {
            await this.page.getByLabel("State/Province").fill(address.state);
        }

        await this.page.getByLabel("Zip/Postal Code").fill(address.postalCode);

        // Country
        await this.page.locator('select[name="country_id"]').selectOption({ label: address.country });

        await this.page.getByLabel("Phone Number").fill(address.phone);
    }

    async selectShippingMethod(methodName?: string): Promise<void> {
        if (methodName) {
            await this.page
                .locator(Selectors.CHECKOUT_SHIPPING_METHODS)
                .getByText(methodName)
                .click();
        } else {
            // Select the first available shipping method
            await this.page
                .locator(Selectors.CHECKOUT_SHIPPING_METHODS)
                .locator('input[type="radio"]')
                .first()
                .click();
        }
    }

    async clickNextToPayment(): Promise<void> {
        await this.page.getByRole("button", { name: "Next" }).click();
        await this.waitForPageLoad();
    }

    // ── Step 2: Payment ──

    async placeOrder(): Promise<void> {
        await this.page.getByRole("button", { name: "Place Order" }).click();
        await this.waitForPageLoad();
    }

    // ── Queries ──

    async getOrderNumber(): Promise<string> {
        const orderLink = this.page.locator(".checkout-success .order-number strong");
        return orderLink.innerText();
    }

    async getShippingMethods(): Promise<string[]> {
        return this.page
            .locator(Selectors.CHECKOUT_SHIPPING_METHODS)
            .locator(".row")
            .allInnerTexts();
    }

    // ── Assertions ──

    async expectShippingStepVisible(): Promise<void> {
        await expect(
            this.page.getByRole("heading", { name: "Shipping Address" })
        ).toBeVisible();
    }

    async expectPaymentStepVisible(): Promise<void> {
        await expect(
            this.page.getByRole("heading", { name: "Payment Method" })
        ).toBeVisible();
    }

    async expectOrderSuccess(): Promise<void> {
        await expect(this.page).toHaveTitle(/Success/i);
        await expect(
            this.page.getByText("Thank you for your purchase!")
        ).toBeVisible();
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Checkout/i);
    }
}
