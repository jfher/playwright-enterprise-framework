import { Page } from "@playwright/test";
import { BasePage } from "@core/BasePage";
import { HeaderComponent } from "@components/HeaderComponent";

export class HomePage extends BasePage {

    readonly header: HeaderComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);

    }

    async goto() {

        await this.page.goto("/");

    }

}