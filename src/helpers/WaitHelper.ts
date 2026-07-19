import { Page } from "@playwright/test";
import { Selectors } from "../constants/selectors";

/**
 * Smart wait helpers for Magento 2's AJAX loading patterns.
 */
export class WaitHelper {

    /**
     * Waits for the Magento loading mask / AJAX spinner to disappear.
     * Magento shows `.loading-mask` during AJAX requests.
     */
    static async waitForLoaderToDisappear(page: Page, timeout?: number): Promise<void> {
        const loader = page.locator(Selectors.LOADING_MASK);

        // Only wait if the loader is actually visible
        try {
            await loader.waitFor({ state: "visible", timeout: 2_000 });
            await loader.waitFor({ state: "hidden", timeout: timeout ?? 30_000 });
        } catch {
            // Loader never appeared — nothing to wait for
        }
    }

    /**
     * Waits until no network requests are in-flight and the DOM is settled.
     */
    static async waitForPageFullyLoaded(page: Page): Promise<void> {
        await page.waitForLoadState("domcontentloaded");
        await page.waitForLoadState("networkidle");
        await WaitHelper.waitForLoaderToDisappear(page);
    }

    /**
     * Waits for a success or error message to appear on the page.
     */
    static async waitForMessage(page: Page, timeout?: number): Promise<void> {
        await page.locator(Selectors.MESSAGES_CONTAINER).waitFor({
            state: "visible",
            timeout: timeout ?? 10_000
        });
    }
}
