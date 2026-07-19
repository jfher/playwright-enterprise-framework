import { Page, expect } from "@playwright/test";
import { BaseComponent } from "../core/BaseComponent";
import { Selectors } from "../constants/selectors";

/**
 * Message component — handles success, error, warning, and info messages.
 * Magento displays these in a `.messages` container at the top of the page content.
 */
export class MessageComponent extends BaseComponent {

    constructor(page: Page) {
        super(page, Selectors.MESSAGES_CONTAINER);
    }

    // ── Locators ──

    private successMessage() {
        return this.page.locator(Selectors.MESSAGE_SUCCESS);
    }

    private errorMessage() {
        return this.page.locator(Selectors.MESSAGE_ERROR);
    }

    private warningMessage() {
        return this.page.locator(Selectors.MESSAGE_WARNING);
    }

    private noticeMessage() {
        return this.page.locator(Selectors.MESSAGE_NOTICE);
    }

    // ── Queries ──

    async getSuccessText(): Promise<string> {
        return this.successMessage().innerText();
    }

    async getErrorText(): Promise<string> {
        return this.errorMessage().innerText();
    }

    // ── Assertions ──

    async expectSuccess(text: string | RegExp): Promise<void> {
        if (typeof text === "string") {
            await expect(this.successMessage()).toContainText(text);
        } else {
            await expect(this.successMessage()).toHaveText(text);
        }
    }

    async expectError(text: string | RegExp): Promise<void> {
        if (typeof text === "string") {
            await expect(this.errorMessage()).toContainText(text);
        } else {
            await expect(this.errorMessage()).toHaveText(text);
        }
    }

    async expectWarning(text: string | RegExp): Promise<void> {
        if (typeof text === "string") {
            await expect(this.warningMessage()).toContainText(text);
        } else {
            await expect(this.warningMessage()).toHaveText(text);
        }
    }

    async expectNotice(text: string | RegExp): Promise<void> {
        if (typeof text === "string") {
            await expect(this.noticeMessage()).toContainText(text);
        } else {
            await expect(this.noticeMessage()).toHaveText(text);
        }
    }

    async expectNoErrors(): Promise<void> {
        await expect(this.errorMessage()).toHaveCount(0);
    }
}
