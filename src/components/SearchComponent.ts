import { Page, expect } from "@playwright/test";
import { BaseComponent } from "../core/BaseComponent";
import { Selectors } from "../constants/selectors";

/**
 * Search component — input field with autocomplete suggestions.
 */
export class SearchComponent extends BaseComponent {

    constructor(page: Page) {
        super(page, "#search_mini_form");
    }

    // ── Locators ──

    private searchInput() {
        return this.page.locator(Selectors.SEARCH_INPUT);
    }

    private suggestions() {
        return this.page.locator("#search_autocomplete li");
    }

    private suggestionsContainer() {
        return this.page.locator("#search_autocomplete");
    }

    // ── Actions ──

    /**
     * Type a search term and press Enter to submit.
     */
    async search(term: string): Promise<void> {
        await this.searchInput().fill(term);
        await this.searchInput().press("Enter");
    }

    /**
     * Type a search term and wait for autocomplete suggestions.
     */
    async typeAndWaitForSuggestions(term: string): Promise<void> {
        await this.searchInput().fill(term);
        await this.suggestionsContainer().waitFor({ state: "visible" });
    }

    /**
     * Select an autocomplete suggestion by its visible text.
     */
    async selectSuggestion(text: string): Promise<void> {
        await this.suggestions().filter({ hasText: text }).first().click();
    }

    async clearSearch(): Promise<void> {
        await this.searchInput().clear();
    }

    // ── Queries ──

    async getSuggestionTexts(): Promise<string[]> {
        return this.suggestions().allInnerTexts();
    }

    async getSuggestionCount(): Promise<number> {
        return this.suggestions().count();
    }

    // ── Assertions ──

    async expectSuggestionsVisible(): Promise<void> {
        await expect(this.suggestionsContainer()).toBeVisible();
    }

    async expectSuggestionsHidden(): Promise<void> {
        await expect(this.suggestionsContainer()).toBeHidden();
    }
}
