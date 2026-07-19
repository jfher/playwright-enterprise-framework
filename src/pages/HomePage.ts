import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavigationMenu } from "../components/NavigationMenu";
import { FooterComponent } from "../components/FooterComponent";
import { MessageComponent } from "../components/MessageComponent";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { Selectors } from "../constants/selectors";
import { Routes } from "../config/routes";

/**
 * Home page — the storefront landing page.
 * Contains promo banners, featured products, and hot sellers.
 */
export class HomePage extends BasePage {

    readonly header: HeaderComponent;
    readonly nav: NavigationMenu;
    readonly footer: FooterComponent;
    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.nav = new NavigationMenu(page);
        this.footer = new FooterComponent(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.HOME);
    }

    // ── Queries ──

    async getHotSellers(): Promise<ProductCardComponent[]> {
        const items = this.page.locator(".block-products-list " + Selectors.PRODUCT_ITEM);
        const count = await items.count();
        const cards: ProductCardComponent[] = [];

        for (let i = 0; i < count; i++) {
            cards.push(new ProductCardComponent(this.page, items.nth(i)));
        }

        return cards;
    }

    async getPromoBannerCount(): Promise<number> {
        return this.page.locator(".blocks-promo .block-promo").count();
    }

    // ── Assertions ──

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Home page/i);
    }

    async expectHotSellersVisible(): Promise<void> {
        await expect(
            this.page.locator(".block-products-list")
        ).toBeVisible();
    }
}