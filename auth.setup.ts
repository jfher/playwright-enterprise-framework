import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "./src/pages/LoginPage";
import dotenv from 'dotenv'
dotenv.config();


setup("Authenticate", async ({ page }) => {

    const login = new LoginPage(page);

    await login.goto();

    await login.login({
        username: process.env.USERNAME!,
        password: process.env.PASSWORD!
    });

    await expect(page).toHaveURL(/dashboard/);

    await page.context().storageState({

        path: "playwright/.auth/user.json"

    });

});