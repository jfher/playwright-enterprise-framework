import { BasePage } from "@core/BasePage";
import type { User } from "@models";
import { expect, Page } from "@playwright/test";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private emailInput() {
        return this.page.getByLabel("Email");
    }

    private passwordInput() {
        return this.page.getByLabel("Password");
    }

    private signInButton() {
        return this.page.getByRole("button", {
            name: "Sign In"
        });
    }


    async goto() {
        await this.page.goto(
            "/customer/account/login"
        );
    }

    async login(user: User) {
        await this.emailInput().fill(user.email);
        await this.passwordInput().fill(user.password);
        await this.signInButton().click();
    }

    async expectInvalidCredentials() {
        await expect(this.page.getByText("The account sign-in was incorrect")).toBeVisible();
    }
}