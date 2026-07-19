import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { MessageComponent } from "../components/MessageComponent";
import { Routes } from "../config/routes";

/**
 * My Account / Account Dashboard page.
 * Provides sidebar navigation and account overview.
 */
export class MyAccountPage extends BasePage {

    readonly header: HeaderComponent;
    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.ACCOUNT_DASHBOARD);
    }

    // ── Sidebar Navigation ──

    async navigateToSection(sectionName: string): Promise<void> {
        await this.page
            .locator(".account-nav")
            .getByRole("link", { name: sectionName })
            .click();
    }

    async goToOrders(): Promise<void> {
        await this.navigateToSection("My Orders");
    }

    async goToAddressBook(): Promise<void> {
        await this.navigateToSection("Address Book");
    }

    async goToAccountInfo(): Promise<void> {
        await this.navigateToSection("Account Information");
    }

    async goToWishlist(): Promise<void> {
        await this.navigateToSection("My Wish List");
    }

    // ── Queries ──

    async getWelcomeMessage(): Promise<string> {
        return this.page.locator(".box-information .box-content p").first().innerText();
    }

    async getContactInfo(): Promise<string> {
        return this.page.locator(".box-information .box-content").first().innerText();
    }

    // ── Assertions ──

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/My Account/i);
    }

    async expectDashboardVisible(): Promise<void> {
        await expect(
            this.page.getByRole("heading", { name: "My Account" })
        ).toBeVisible();
    }

    async expectLoggedInAs(name: string): Promise<void> {
        await expect(
            this.page.locator(".box-information .box-content")
        ).toContainText(name);
    }
}
