import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../constants/selectors";

/**
 * Base class for all Page Objects.
 * Provides common navigation, waiting, screenshot, and accessibility helpers.
 */
export abstract class BasePage {

    constructor(
        protected readonly page: Page
    ) { }

    /** Navigate to this page's primary URL. */
    abstract goto(): Promise<void>;

    // ── Navigation ──

    async reload(): Promise<void> {
        await this.page.reload();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async goForward(): Promise<void> {
        await this.page.goForward();
    }

    // ── Page Info ──

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    getUrl(): string {
        return this.page.url();
    }

    async getPageHeading(): Promise<string> {
        return this.page.locator(Selectors.PAGE_TITLE).innerText();
    }

    // ── Assertions ──

    async expectUrl(pattern: string | RegExp): Promise<void> {
        if (typeof pattern === "string") {
            await expect(this.page).toHaveURL(new RegExp(pattern));
        } else {
            await expect(this.page).toHaveURL(pattern);
        }
    }

    async expectTitle(title: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    // ── Waiting ──

    async waitForPageLoad(): Promise<void> {
        const loader = this.page.locator(Selectors.LOADING_MASK);
        try {
            await loader.waitFor({ state: "visible", timeout: 2_000 });
            await loader.waitFor({ state: "hidden", timeout: 30_000 });
        } catch {
            // Loader never appeared — page already loaded
        }
    }

    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState("networkidle");
    }

    // ── Scrolling ──

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight)
        );
    }

    async scrollToTop(): Promise<void> {
        await this.page.evaluate(() =>
            window.scrollTo(0, 0)
        );
    }

    async scrollToElement(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    // ── Screenshots ──

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `artifacts/screenshots/${name}.png`
        });
    }

    async takeFullPageScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `artifacts/screenshots/${name}.png`,
            fullPage: true
        });
    }

    // ── Breadcrumbs ──

    async getBreadcrumbs(): Promise<string[]> {
        const breadcrumb = this.page.locator(Selectors.BREADCRUMB);
        const items = breadcrumb.locator("li");
        return items.allInnerTexts();
    }
}