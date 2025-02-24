
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SignUpPage } from '../pages/signUpPage';
import { LetsGetPage } from '../pages/letsgetPage';
import { ExtraCurricularPage } from '../pages/extraCurricularPage';
import { HighSchoolInfo } from '../pages/highschoolInfoPage';
import { EssayPage } from '../pages/essayPage';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';
import { ActivityFactory } from '../factories/activityFactory';
import { Activity } from '../types/activity';
import { registrationData as data } from '../data/registrationData';


test.describe('navigation', () => {

  test('Verify Error message when only one entry is added', async ({ page }) => {
    test.slow();
    let loginPage = new LoginPage(page);
    let signupPage = new SignUpPage(page);
    let letsgoPage = new LetsGetPage(page);
    let extraCurricularPage = new ExtraCurricularPage(page);

    await loginPage.navigateToProgram();
    await loginPage.clickOnLoginToApply();
    expect(page.url()).toBe('https://apply.mykaleidoscope.com/login');

    await loginPage.enterEmailAddress(data.email);
    await signupPage.fillFirstName(data.firstName);
    await signupPage.fillLastName(data.lastName);
    await signupPage.selectCountry(data.country);
    await signupPage.fillPhoneNumber(data.phoneNumber);
    await signupPage.fillPassword(data.password);
    await signupPage.acceptTerms();
    await signupPage.submitForm();

    await letsgoPage.fillStreetAddress(data.streetAddress);
    await letsgoPage.fillAdditionalStreetAddress(data.additionalStreetAddress);
    await letsgoPage.selectStateAlabama();
    await letsgoPage.fillCity(data.city);
    await letsgoPage.fillZipCode(data.zipCode);
    await letsgoPage.selectCountryUSA();
    await letsgoPage.clickOnNextButton();
    await extraCurricularPage.addEntry('activity one', '1', 'test test', 'test test');
    await extraCurricularPage.clickOnNextButton();

    await expect(page.locator('.mantine-InputWrapper-error')).toContainText('Please add at least 2 entries');
  });
  test('Verify Successful Submission added', async ({ page }) => {
    test.slow();
    const loginPage = new LoginPage(page);
    const signupPage = new SignUpPage(page);
    const letsgoPage = new LetsGetPage(page);
    const extraCurricularPage = new ExtraCurricularPage(page);
    const highschoolInfoPage = new HighSchoolInfo(page);
    const essayPage = new EssayPage(page);

    await loginPage.navigateToProgram();
    await loginPage.clickOnLoginToApply();
    expect(page.url()).toBe('https://apply.mykaleidoscope.com/login');

    await loginPage.enterEmailAddress(data.email);
    await signupPage.fillFirstName(data.firstName);
    await signupPage.fillLastName(data.lastName);
    await signupPage.selectCountry(data.country);
    await signupPage.fillPhoneNumber(data.phoneNumber);
    await signupPage.fillPassword(data.password);
    await signupPage.acceptTerms();
    await signupPage.submitForm();

    await letsgoPage.fillStreetAddress(data.streetAddress);
    await letsgoPage.fillAdditionalStreetAddress(data.additionalStreetAddress);
    await letsgoPage.selectStateAlabama();
    await letsgoPage.fillCity(data.city);
    await letsgoPage.fillZipCode(data.zipCode);
    await letsgoPage.selectCountryUSA();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(6000);
    await letsgoPage.clickOnNextButton();

    const activities = Array.from({ length: 4 }, (_, i) =>
      ActivityFactory.createActivity(faker.lorem.word(), (i + 1).toString(), faker.lorem.sentence(), faker.lorem.sentence())
    );

    for (const activity of activities) {
      await extraCurricularPage.addEntry(activity.name, activity.level, activity.description, activity.details);
      data.activities.push(activity);
    }

    await extraCurricularPage.clickOnNextButton();
    await highschoolInfoPage.fillHighSchoolInfo();
    await highschoolInfoPage.uploadTranscript('files/My School Transcript.pdf');
    await page.waitForTimeout(6000);
    await highschoolInfoPage.clickOnNextButton();

    await page.waitForLoadState('domcontentloaded');

    await essayPage.checkAnimalsCheckbox();
    await essayPage.fillEssayAboutAnimals(data.essays.animals);

    await essayPage.checkSchoolCheckbox();
    await essayPage.fillEssayAboutSchool(data.essays.school);

    const filePath = path.join(__dirname, 'submittedData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    await highschoolInfoPage.clickOnNextButton();
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForURL('https://apply.mykaleidoscope.com/applicant/applications', { timeout: 60000 });

    await page.getByRole('button', { name: 'View Application' }).click();

    const submittedData = {
      firstName: await page.locator('text=First Name').evaluate(el => el.nextSibling?.textContent),
      lastName: await page.locator('text=Last Name').evaluate(el => el.nextSibling?.textContent),
      email: await page.locator('text=Email Address').evaluate(el => el.nextSibling?.textContent),
      streetAddress: await page.locator("//p[text()='Street Address']").evaluate(el => el.nextSibling?.textContent),
      additionalStreetAddress: await page.locator("//p[text()='Additional Street Address']").evaluate(el => el.nextSibling?.textContent),
      state: await page.locator("//p[text()='State (Full)']").evaluate(el => el.nextSibling?.textContent),
      city: await page.locator("//p[text()='City']").evaluate(el => el.nextSibling?.textContent),
      zipCode: await page.locator("//p[text()='Zip Code']").evaluate(el => el.nextSibling?.textContent),
      country: await page.locator("//p[text()='Country']").evaluate(el => el.nextSibling?.textContent),
    };

    expect(submittedData.firstName?.toLowerCase()).toBe(data.firstName.toLowerCase());
    expect(submittedData.lastName?.toLowerCase()).toBe(data.lastName.toLowerCase());
    expect(submittedData.email?.toLowerCase()).toBe(data.email.toLowerCase());
    expect(submittedData.streetAddress?.toLowerCase()).toBe(data.streetAddress.toLowerCase());
    expect(submittedData.additionalStreetAddress?.toLowerCase()).toBe(data.additionalStreetAddress.toLowerCase());
    expect(submittedData.state?.toLowerCase()).toBe(data.state.toLowerCase());
    expect(submittedData.city?.toLowerCase()).toBe(data.city.toLowerCase());
    expect(submittedData.zipCode?.toLowerCase()).toBe(data.zipCode.toLowerCase());
    expect(submittedData.country?.toLowerCase()).toBe('United States of America'.toLowerCase());
  });
});


