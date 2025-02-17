//home.page.ts
import { expect, Locator, Page } from '@playwright/test';
export class SignUpPage {

    readonly url = "https://apply.mykaleidoscope.com/program/sdet-test-scholarship";
    readonly page: Page;
    readonly loginToApplyButton: Locator;
    readonly productsMenu: Locator;
    readonly productmenudropdown: Locator
    readonly emailAddresstextbox: Locator
    readonly nextButton: Locator


    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly countryDropdown: Locator;
    readonly countryOption: Locator;
    readonly phoneNumberTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly termsCheckbox: Locator;
    readonly submitButton: Locator;
    readonly registrationSuccessMessage: Locator;
    readonly startApplicationLink: Locator;
    readonly scholarshipText: Locator;


    constructor(page: Page) {
        this.page = page;
        this.loginToApplyButton = page.getByRole('button', { name: 'Log In to Apply' })
        this.emailAddresstextbox = page.getByRole('textbox', { name: 'Email Address' })
        this.nextButton = page.getByRole('button', { name: 'Next' })

        this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' });
        this.countryDropdown = page.getByRole('button', { name: 'United States: +' });
        this.countryOption = page.getByRole('option', { name: 'India+' });
        this.phoneNumberTextbox = page.getByRole('textbox', { name: '1 (702) 123-' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Create a Password' });
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I confirm that I am at least' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.registrationSuccessMessage = page.locator('.toast-success');
        this.startApplicationLink = page.getByRole('link', { name: 'Start Application' });
        this.scholarshipText = page.getByText('SDET ScholarshipSubmit by:N/');

    }

    async fillFirstName(firstName: string) {
        await this.firstNameTextbox.click();
        await this.firstNameTextbox.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameTextbox.click();
        await this.lastNameTextbox.fill(lastName);
    }

    async selectCountry(country: string) {
        await this.countryDropdown.click();
        await this.page.getByRole('option', { name: country }).click();
    }

    async fillPhoneNumber(phoneNumber: string) {
        await this.phoneNumberTextbox.click();
        await this.phoneNumberTextbox.fill(phoneNumber);
    }

    async fillPassword(password: string) {
        await this.passwordTextbox.click();
        await this.passwordTextbox.fill(password);
    }

    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async verifyRegistrationSuccess() {
        await expect(this.registrationSuccessMessage).toBeVisible();
    }

    async startApplication() {
        await this.startApplicationLink.click();
    }

    async verifyScholarshipText() {
        await expect(this.scholarshipText).toBeVisible();
    }


}

