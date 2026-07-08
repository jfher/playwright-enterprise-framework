import { Page, expect } from "@playwright/test";

export abstract class BasePage {

    protected constructor(
        protected readonly page: Page
    ) { }

    abstract goto(): Promise<void>;

    async reload(): Promise<void> {
        await this.page.reload();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async goForward(): Promise<void> {
        await this.page.goForward();
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    getUrl(): string {
        return this.page.url();
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `artifacts/screenshots/${name}.png`
        });
    }

    protected async expectLoaded(locator: ReturnType<Page["locator"]>) {
        await expect(locator).toBeVisible();
    }

}