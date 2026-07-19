import { test as base } from "@playwright/test";
import { HomePage, LoginPage } from "@pages"

type Pages = {
    loginPage: LoginPage;
    homePage: HomePage;
};

export const test = base.extend<Pages>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    }
});

export { expect } from "@playwright/test";