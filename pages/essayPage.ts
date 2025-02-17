//home.page.ts
import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from './basePage';
export class EssayPage extends BasePage {

    readonly url = "https://apply.mykaleidoscope.com/program/sdet-test-scholarship";
    readonly page: Page;

    readonly carsCheckbox: Locator;
    readonly animalsCheckbox: Locator;
    readonly schoolCheckbox: Locator;
    readonly otherCheckbox: Locator;
    readonly essayAboutCarsTextbox: Locator;
    readonly essayAboutAnimalsTextbox: Locator;
    readonly essayAboutSchoolTextbox: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.carsCheckbox = page.getByRole('checkbox', { name: 'Cars' });
        this.animalsCheckbox = page.getByRole('checkbox', { name: 'Animals' });
        this.schoolCheckbox = page.getByRole('checkbox', { name: 'School' });
        this.otherCheckbox = page.getByRole('checkbox', { name: 'Other' });
        this.essayAboutCarsTextbox = page.getByRole('textbox', { name: 'Essay about Cars' });
        this.essayAboutAnimalsTextbox = page.getByRole('textbox', { name: 'Essay about Animals' });
        this.essayAboutSchoolTextbox = page.getByRole('textbox', { name: 'Essay about School' });
    }

    async getLabelText(){
        return await this.page.locator('.mantine-Textarea-label').textContent();
    }

    async checkCarsCheckbox() {
        await this.carsCheckbox.check();
        await this.page.waitForLoadState('domcontentloaded')
    }

    async checkAnimalsCheckbox() {
        await this.animalsCheckbox.check();
        await this.page.waitForLoadState('domcontentloaded')
    }

    async checkSchoolCheckbox() {
        await this.schoolCheckbox.check();
        await this.page.waitForLoadState('domcontentloaded')
    }

    async checkOtherCheckbox() {
        await this.otherCheckbox.check();
        await this.page.waitForLoadState('domcontentloaded')
    }

    async fillEssayAboutCars(text: string) {
        await this.essayAboutCarsTextbox.click();
        await this.essayAboutCarsTextbox.fill(text);
    }

    async fillEssayAboutAnimals(text: string) {
        await this.essayAboutAnimalsTextbox.click();
        await this.essayAboutAnimalsTextbox.fill(text);
    }

    async fillEssayAboutSchool(text: string) {
        await this.essayAboutSchoolTextbox.click();
        await this.essayAboutSchoolTextbox.fill(text);
    }




}
