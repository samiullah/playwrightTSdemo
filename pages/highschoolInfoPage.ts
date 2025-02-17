import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from './basePage';

export class HighSchoolInfo extends BasePage {

    private highSchoolName: Locator;
    private highSchoolStreetAddress: Locator;
    private additionalHighSchoolStreet: Locator;
    private highSchoolCity: Locator;
    private highSchoolState: Locator;
    private highSchoolZipCode: Locator;
    private gpa: Locator;
    private yearOfGraduation: Locator;
    private uploadFileButton: Locator;

    constructor(page: Page) {
        super(page);
        this.highSchoolName = page.getByRole('textbox', { name: 'High School Name' });
        this.highSchoolStreetAddress = page.getByRole('textbox', { name: 'High School Street Address', exact: true });
        this.additionalHighSchoolStreet = page.getByRole('textbox', { name: 'Additional High School Street' });
        this.highSchoolCity = page.getByRole('textbox', { name: 'High School City' });
        this.highSchoolState = page.getByRole('textbox', { name: 'High School State (Full)' });
        this.highSchoolZipCode = page.getByRole('textbox', { name: 'High School Zip Code' });
        this.gpa = page.getByRole('textbox', { name: 'GPA' });
        this.yearOfGraduation = page.getByRole('textbox', { name: 'Year of High School Graduation' });
        this.uploadFileButton = page.getByRole('button', { name: 'Upload File' });
    }

    async fillHighSchoolInfo() {
        await this.highSchoolName.click();
        await this.highSchoolName.fill('tiny harts');
        await this.highSchoolStreetAddress.click();
        await this.highSchoolStreetAddress.fill('abc sdbh fsf');
        await this.additionalHighSchoolStreet.click();
        await this.additionalHighSchoolStreet.fill('additional');
        await this.highSchoolCity.click();
        await this.highSchoolCity.fill('alabama');
        await this.highSchoolState.click();
        await this.page.getByRole('option', { name: 'Alabama' }).click();
        await this.highSchoolZipCode.click();
        await this.highSchoolZipCode.fill('55413');
        await this.gpa.click();
        await this.gpa.fill('3');
        await this.yearOfGraduation.click();
        await this.page.getByRole('button', { name: 'February 2025', exact: true }).click();
        await this.page.getByRole('button').filter({ hasText: /^$/ }).first().click();
        await this.page.getByRole('button', { name: 'Jan' }).click();
        await this.page.getByRole('button', { name: '6 January 2024', exact: true }).click();
    }

    async uploadTranscript(filePath: string) {
      

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.uploadFileButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);

    
    }







}

