import { Page, Locator } from "@playwright/test";

/**
 * Base class for reusable UI components.
 * Each component is scoped to a root container locator for isolation.
 */
export abstract class BaseComponent {

    protected readonly root: Locator;

    constructor(
        protected readonly page: Page,
        rootSelector: string
    ) {
        this.root = page.locator(rootSelector);
    }

    /** Check if this component is currently visible on the page. */
    async isVisible(): Promise<boolean> {
        return this.root.isVisible();
    }

    /** Wait for this component to appear. */
    async waitForVisible(timeout?: number): Promise<void> {
        await this.root.waitFor({ state: "visible", timeout });
    }

    /** Wait for this component to disappear. */
    async waitForHidden(timeout?: number): Promise<void> {
        await this.root.waitFor({ state: "hidden", timeout });
    }
}