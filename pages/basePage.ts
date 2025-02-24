import { Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nextButton = page.getByRole('button', { name: 'Next' });
    }

    async clickOnNextButton() {
        // await this.nextButton.waitFor({ state: "visible" });
        await this.page.waitForTimeout(5000)
        await this.nextButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}