import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavigationMenu } from "../components/NavigationMenu";
import { MessageComponent } from "../components/MessageComponent";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { Selectors } from "../constants/selectors";
import { extractNumber } from "../utils/string.utils";

/**
 * Product List / Category page — shows a grid/list of products.
 * Includes sorting, filtering, view mode toggle, and pagination.
 */
export class ProductListPage extends BasePage {

    readonly header: HeaderComponent;
    readonly nav: NavigationMenu;
    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.nav = new NavigationMenu(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        // Navigate to Women's Tops as the default category
        await this.page.goto("/women/tops-women.html");
    }

    async gotoCategory(path: string): Promise<void> {
        await this.page.goto(path);
    }

    // ── Product Grid ──

    private productItems() {
        return this.page.locator(Selectors.PRODUCT_ITEM);
    }

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

    async getProductCount(): Promise<number> {
        return this.productItems().count();
    }

    async goToProduct(productName: string): Promise<void> {
        await this.page
            .locator(Selectors.PRODUCT_NAME)
            .getByRole("link", { name: productName })
            .click();
    }

    // ── Sorting ──

    async sortBy(option: string): Promise<void> {
        await this.page.locator(Selectors.TOOLBAR_SORTER).first().selectOption({ label: option });
        await this.waitForPageLoad();
    }

    // ── Filtering ──

    async filterByOption(filterName: string, optionText: string): Promise<void> {
        const filterBlock = this.page
            .locator(Selectors.FILTER_OPTION)
            .filter({ hasText: filterName });

        await filterBlock.click();
        await filterBlock.getByRole("link", { name: optionText }).click();
        await this.waitForPageLoad();
    }

    // ── View Mode ──

    async switchToGridView(): Promise<void> {
        await this.page.locator(Selectors.GRID_MODE).click();
    }

    async switchToListView(): Promise<void> {
        await this.page.locator(Selectors.LIST_MODE).click();
    }

    // ── Pagination ──

    async goToPage(pageNumber: number): Promise<void> {
        await this.page
            .locator(Selectors.PAGES)
            .getByRole("link", { name: String(pageNumber) })
            .click();
        await this.waitForPageLoad();
    }

    // ── Toolbar ──

    async getDisplayedItemCount(): Promise<number> {
        const text = await this.page.locator(Selectors.TOOLBAR_AMOUNT).first().innerText();
        return extractNumber(text);
    }

    // ── Assertions ──

    async expectCategoryTitle(title: string): Promise<void> {
        await expect(this.page.locator(Selectors.PAGE_TITLE)).toContainText(title);
    }

    async expectProductsVisible(): Promise<void> {
        await expect(this.productItems().first()).toBeVisible();
    }

    async expectMinimumProducts(minCount: number): Promise<void> {
        const count = await this.getProductCount();
        expect(count).toBeGreaterThanOrEqual(minCount);
    }
}
