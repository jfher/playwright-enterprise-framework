import { Page } from "@playwright/test";
import { BaseComponent } from "../core/BaseComponent";
import { Selectors } from "../constants/selectors";

/**
 * Top-level navigation mega-menu.
 * Handles category navigation with hover-to-reveal submenus.
 *
 * Categories: What's New, Women, Men, Gear, Training, Sale
 */
export class NavigationMenu extends BaseComponent {

    constructor(page: Page) {
        super(page, Selectors.NAV_MAIN);
    }

    // ── Actions ──

    /**
     * Navigate to a top-level category.
     * @param category - The visible text of the menu item (e.g., "Women", "Men")
     */
    async navigateToCategory(category: string): Promise<void> {
        await this.root
            .getByRole("menuitem", { name: category, exact: true })
            .click();
    }

    /**
     * Hover over a top-level category to reveal its submenu,
     * then click a subcategory link.
     *
     * @param category - Top-level menu text (e.g., "Women")
     * @param subcategory - Sub-menu text (e.g., "Tops")
     */
    async navigateToSubcategory(category: string, subcategory: string): Promise<void> {
        const topLevel = this.root.getByRole("menuitem", { name: category, exact: true });
        await topLevel.hover();
        await this.page.getByRole("menuitem", { name: subcategory, exact: true }).click();
    }

    /**
     * Navigate through a three-level deep menu.
     *
     * @param category - Top-level (e.g., "Women")
     * @param subcategory - Second level (e.g., "Tops")
     * @param subSubcategory - Third level (e.g., "Jackets")
     */
    async navigateDeep(
        category: string,
        subcategory: string,
        subSubcategory: string
    ): Promise<void> {
        const topLevel = this.root.getByRole("menuitem", { name: category, exact: true });
        await topLevel.hover();

        const secondLevel = this.page.getByRole("menuitem", { name: subcategory, exact: true });
        await secondLevel.hover();

        await this.page.getByRole("menuitem", { name: subSubcategory, exact: true }).click();
    }

    // ── Queries ──

    async getTopLevelItems(): Promise<string[]> {
        return this.root.locator(Selectors.NAV_ITEM).allInnerTexts();
    }
}
