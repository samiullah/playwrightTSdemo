//home.page.ts
import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from './basePage';
export class LetsGetPage extends BasePage {

    readonly url = "https://apply.mykaleidoscope.com/program/sdet-test-scholarship";
    readonly page: Page;
    readonly streetAddress: Locator;
    readonly additionalStreetAddress: Locator;
    readonly stateFull: Locator;
    readonly stateOptionAlabama: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly country: Locator;
    readonly countryOptionUSA: Locator;



    constructor(page: Page) {
        super(page);
        this.page = page;
        this.streetAddress = page.getByRole('textbox', { name: 'Street Address', exact: true });
        this.additionalStreetAddress = page.getByRole('textbox', { name: 'Additional Street Address' });
        this.stateFull = page.getByRole('textbox', { name: 'State (Full)' });
        this.stateOptionAlabama = page.getByRole('option', { name: 'Alabama' });
        this.city = page.getByRole('textbox', { name: 'City' });
        this.zipCode = page.getByRole('textbox', { name: 'Zip Code' });
        this.country = page.getByRole('textbox', { name: 'Country' });
        this.countryOptionUSA = page.getByText('United States of America');


    }


    async fillStreetAddress(address: string) {
        await this.streetAddress.click();
        await this.streetAddress.fill(address);
    }

    async fillAdditionalStreetAddress(address: string) {
        await this.additionalStreetAddress.click();
        await this.additionalStreetAddress.fill(address);
    }

    async selectStateAlabama() {
        await this.stateFull.click();
        await this.stateOptionAlabama.click();
    }

    async fillCity(city: string) {
        await this.city.click();
        await this.city.fill(city);
    }

    async fillZipCode(zip: string) {
        await this.zipCode.click();
        await this.zipCode.fill(zip);
    }

    async selectCountryUSA() {
        await this.country.click();
        await this.country.fill('uni');
        await this.countryOptionUSA.click();
    }

}







// await page.getByRole('textbox', { name: 'Street Address', exact: true }).click();
//   await page.getByRole('textbox', { name: 'Street Address', exact: true }).fill('street address');
//   await page.getByRole('textbox', { name: 'Additional Street Address' }).click();
//   await page.getByRole('textbox', { name: 'State (Full)' }).click();
//   await page.getByRole('option', { name: 'Alabama' }).click();
//   await page.getByRole('textbox', { name: 'City' }).click();
//   await page.getByRole('textbox', { name: 'City' }).fill('alabama');
//   await page.getByRole('textbox', { name: 'Zip Code' }).click();
//   await page.getByRole('textbox', { name: 'Zip Code' }).fill('10009');
//   await page.getByRole('textbox', { name: 'Country' }).click();
//   await page.getByRole('textbox', { name: 'Country' }).fill('uni');
//   await page.getByText('United States of America').click();