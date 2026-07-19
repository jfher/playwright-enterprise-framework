import { Page, expect } from "@playwright/test";
import { BaseComponent } from "../core/BaseComponent";
import { Selectors } from "../constants/selectors";

/**
 * Header component — logo, search, cart icon, account dropdown, welcome message.
 * Present on every page of the storefront.
 */
export class HeaderComponent extends BaseComponent {

    constructor(page: Page) {
        super(page, Selectors.HEADER);
    }

    // ── Locators ──

    private logo() {
        return this.root.locator(Selectors.LOGO);
    }

    private searchInput() {
        return this.page.locator(Selectors.SEARCH_INPUT);
    }

    private cartIcon() {
        return this.root.locator(Selectors.MINICART_WRAPPER);
    }

    private cartCounter() {
        return this.root.locator(Selectors.MINICART_COUNTER);
    }

    private welcomeMessage() {
        return this.root.locator(Selectors.WELCOME_MESSAGE);
    }

    private accountDropdown() {
        return this.root.locator(Selectors.ACCOUNT_LINK);
    }

    // ── Actions ──

    async clickLogo(): Promise<void> {
        await this.logo().click();
    }

    async searchFor(term: string): Promise<void> {
        await this.searchInput().fill(term);
        await this.searchInput().press("Enter");
    }

    async openMiniCart(): Promise<void> {
        await this.cartIcon().click();
    }

    async openAccountDropdown(): Promise<void> {
        await this.accountDropdown().click();
    }

    async clickMyAccount(): Promise<void> {
        await this.openAccountDropdown();
        await this.page.getByRole("link", { name: "My Account" }).click();
    }

    async clickSignOut(): Promise<void> {
        await this.openAccountDropdown();
        await this.page.getByRole("link", { name: "Sign Out" }).click();
    }

    async clickSignIn(): Promise<void> {
        await this.page.getByRole("link", { name: "Sign In" }).click();
    }

    async clickCreateAccount(): Promise<void> {
        await this.page.getByRole("link", { name: "Create an Account" }).click();
    }

    // ── Assertions ──

    async getCartCount(): Promise<number> {
        try {
            const text = await this.cartCounter().innerText();
            return parseInt(text, 10);
        } catch {
            return 0;
        }
    }

    async getWelcomeText(): Promise<string> {
        return this.welcomeMessage().innerText();
    }

    async expectWelcomeMessage(name: string): Promise<void> {
        await expect(this.welcomeMessage()).toContainText(name);
    }

    async expectCartCount(count: number): Promise<void> {
        await expect(this.cartCounter()).toHaveText(String(count));
    }
}