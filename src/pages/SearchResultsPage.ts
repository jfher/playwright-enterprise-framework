import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { MessageComponent } from "../components/MessageComponent";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { Selectors } from "../constants/selectors";
import { Routes } from "../config/routes";
import { extractNumber } from "../utils/string.utils";

/**
 * Search Results page — displays products matching a search query.
 */
export class SearchResultsPage extends BasePage {

    readonly header: HeaderComponent;
    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.SEARCH);
    }

    async gotoWithQuery(query: string): Promise<void> {
        await this.page.goto(`${Routes.SEARCH}?q=${encodeURIComponent(query)}`);
    }

    // ── Locators ──

    private productItems() {
        return this.page.locator(Selectors.PRODUCT_ITEM);
    }

    private noResultsMessage() {
        return this.page.getByText("Your search returned no results");
    }

    private searchResultsHeading() {
        return this.page.locator(Selectors.PAGE_TITLE);
    }

    // ── Queries ──

    async getProducts(): Promise<ProductCardComponent[]> {
        const items = this.productItems();
        const count = await items.count();
        const cards: ProductCardComponent[] = [];

        for (let i = 0; i < count; i++) {
            cards.push(new ProductCardComponent(this.page, items.nth(i)));
        }

        return cards;
    }

    async getProductNames(): Promise<string[]> {
        return this.page.locator(Selectors.PRODUCT_NAME + " a").allInnerTexts();
    }

    async getResultCount(): Promise<number> {
        return this.productItems().count();
    }

    async getDisplayedResultCount(): Promise<number> {
        const text = await this.page.locator(Selectors.TOOLBAR_AMOUNT).first().innerText();
        return extractNumber(text);
    }

    async getSearchHeadingText(): Promise<string> {
        return this.searchResultsHeading().innerText();
    }

    // ── Actions ──

    async sortBy(option: string): Promise<void> {
        await this.page.locator(Selectors.TOOLBAR_SORTER).first().selectOption({ label: option });
    }

    // ── Assertions ──

    async expectNoResults(): Promise<void> {
        await expect(this.noResultsMessage()).toBeVisible();
    }

    async expectResults(): Promise<void> {
        await expect(this.productItems().first()).toBeVisible();
    }

    async expectSearchHeading(query: string): Promise<void> {
        await expect(this.searchResultsHeading()).toContainText(query);
    }

    async expectMinimumResults(minCount: number): Promise<void> {
        const count = await this.getResultCount();
        expect(count).toBeGreaterThanOrEqual(minCount);
    }
}
