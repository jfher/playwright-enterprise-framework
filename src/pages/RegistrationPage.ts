import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { MessageComponent } from "../components/MessageComponent";
import { Routes } from "../config/routes";
import type { User } from "../models/User";

/**
 * Registration / Create Account page.
 */
export class RegistrationPage extends BasePage {

    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.REGISTER);
    }

    // ── Locators ──

    private firstNameInput() {
        return this.page.getByLabel("First Name");
    }

    private lastNameInput() {
        return this.page.getByLabel("Last Name");
    }

    private emailInput() {
        return this.page.getByLabel("Email", { exact: true });
    }

    private passwordInput() {
        return this.page.getByLabel("Password", { exact: true });
    }

    private confirmPasswordInput() {
        return this.page.getByLabel("Confirm Password");
    }

    private createAccountButton() {
        return this.page.getByRole("button", { name: "Create an Account" });
    }

    // ── Actions ──

    async register(user: User): Promise<void> {
        await this.firstNameInput().fill(user.firstName);
        await this.lastNameInput().fill(user.lastName);
        await this.emailInput().fill(user.email);
        await this.passwordInput().fill(user.password);
        await this.confirmPasswordInput().fill(user.password);
        await this.createAccountButton().click();
    }

    async registerWithMismatchedPassword(user: User, confirmPassword: string): Promise<void> {
        await this.firstNameInput().fill(user.firstName);
        await this.lastNameInput().fill(user.lastName);
        await this.emailInput().fill(user.email);
        await this.passwordInput().fill(user.password);
        await this.confirmPasswordInput().fill(confirmPassword);
        await this.createAccountButton().click();
    }

    // ── Assertions ──

    async expectSuccessfulRegistration(): Promise<void> {
        await this.messages.expectSuccess("Thank you for registering");
    }

    async expectEmailExistsError(): Promise<void> {
        await this.messages.expectError("There is already an account with this email address");
    }

    async expectPasswordMismatchError(): Promise<void> {
        await expect(
            this.page.locator("#password-confirmation-error")
        ).toContainText("Please enter the same value again");
    }

    async expectWeakPasswordError(): Promise<void> {
        await expect(
            this.page.locator("#password-error")
        ).toBeVisible();
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Create New Customer Account/i);
    }
}
