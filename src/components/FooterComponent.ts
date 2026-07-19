import { Page, expect } from "@playwright/test";
import { BaseComponent } from "../core/BaseComponent";
import { Selectors } from "../constants/selectors";

/**
 * Footer component — footer links, newsletter subscription.
 */
export class FooterComponent extends BaseComponent {

    constructor(page: Page) {
        super(page, Selectors.FOOTER);
    }

    // ── Locators ──

    private newsletterInput() {
        return this.page.locator(Selectors.NEWSLETTER_INPUT);
    }

    private subscribeButton() {
        return this.page.locator(Selectors.NEWSLETTER_BUTTON);
    }

    // ── Actions ──

    async subscribeNewsletter(email: string): Promise<void> {
        await this.newsletterInput().fill(email);
        await this.subscribeButton().click();
    }

    async clickLink(linkText: string): Promise<void> {
        await this.root.getByRole("link", { name: linkText }).click();
    }

    // ── Queries ──

    async getFooterLinks(): Promise<string[]> {
        return this.root.getByRole("link").allInnerTexts();
    }

    // ── Assertions ──

    async expectVisible(): Promise<void> {
        await expect(this.root).toBeVisible();
    }
}
