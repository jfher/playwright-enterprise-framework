import { Page, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { MessageComponent } from "../components/MessageComponent";
import { Routes } from "../config/routes";

interface ContactFormData {
    name: string;
    email: string;
    telephone?: string;
    comment: string;
}

/**
 * Contact Us page.
 */
export class ContactPage extends BasePage {

    readonly messages: MessageComponent;

    constructor(page: Page) {
        super(page);
        this.messages = new MessageComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.CONTACT);
    }

    // ── Locators ──

    private nameInput() {
        return this.page.getByLabel("Name");
    }

    private emailInput() {
        return this.page.getByLabel("Email", { exact: true });
    }

    private telephoneInput() {
        return this.page.getByLabel("Phone Number");
    }

    private commentTextarea() {
        return this.page.getByLabel("What's on your mind?");
    }

    private submitButton() {
        return this.page.getByRole("button", { name: "Submit" });
    }

    // ── Actions ──

    async fillForm(data: ContactFormData): Promise<void> {
        await this.nameInput().fill(data.name);
        await this.emailInput().fill(data.email);

        if (data.telephone) {
            await this.telephoneInput().fill(data.telephone);
        }

        await this.commentTextarea().fill(data.comment);
    }

    async submit(): Promise<void> {
        await this.submitButton().click();
    }

    async fillAndSubmit(data: ContactFormData): Promise<void> {
        await this.fillForm(data);
        await this.submit();
    }

    // ── Assertions ──

    async expectSuccessMessage(): Promise<void> {
        await this.messages.expectSuccess("Thanks for contacting us");
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Contact Us/i);
    }
}
