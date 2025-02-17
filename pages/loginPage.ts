//home.page.ts
import { expect, Locator, Page } from '@playwright/test';
export class LoginPage {

    readonly url = "https://apply.mykaleidoscope.com/program/sdet-test-scholarship";
    readonly page: Page;
    readonly loginToApplyButton: Locator;
    readonly productsMenu: Locator;
    readonly productmenudropdown: Locator
    readonly emailAddresstextbox: Locator
    readonly nextButton: Locator


    constructor(page: Page) {
        this.page = page;
        this.loginToApplyButton = page.getByRole('button', { name: 'Log In to Apply' })
        this.emailAddresstextbox = page.getByRole('textbox', { name: 'Email Address' })
        this.nextButton = page.getByRole('button', { name: 'Next' })
    }

    async navigateToProgram() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('domcontentloaded');
    }
    async clickOnLoginToApply() {
        await this.loginToApplyButton.waitFor({ state: "visible" });
        await this.loginToApplyButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnNextButton() {
        await this.nextButton.waitFor({ state: "visible" });
        await this.nextButton.click();
        await this.page.waitForLoadState('domcontentloaded');

    }

    async enterEmailAddress(email: string) {
        await this.emailAddresstextbox.click();
        await this.emailAddresstextbox.fill(email);
        await this.clickOnNextButton();
    }
}

