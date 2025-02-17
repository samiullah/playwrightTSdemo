
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

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {

  });

  test('Verify Error message when only one entry is added', async ({ page }) => {
    test.slow()
    let loginPage = new LoginPage(page);
    let signupPage = new SignUpPage(page);
    let letsgoPage = new LetsGetPage(page);
    let extraCurricularPage = new ExtraCurricularPage(page);
    await loginPage.navigateToProgram();
    await loginPage.clickOnLoginToApply();
    expect(page.url()).toBe('https://apply.mykaleidoscope.com/login');
    await loginPage.enterEmailAddress('demo911@demo.com')
    await signupPage.fillFirstName('sami');
    await signupPage.fillLastName('reshi');
    await signupPage.selectCountry('India+');
    await signupPage.fillPhoneNumber('+91 88266-95606');
    await signupPage.fillPassword('Passc0de@123');
    await signupPage.acceptTerms();
    await signupPage.submitForm();
    // await signupPage.verifyRegistrationSuccess();
    await letsgoPage.fillStreetAddress('18 lane 2');
    await letsgoPage.fillAdditionalStreetAddress('additional');
    await letsgoPage.selectStateAlabama();
    await letsgoPage.fillCity('Srinagar');
    await letsgoPage.fillZipCode('10009');
    await letsgoPage.selectCountryUSA();
    await letsgoPage.clickOnNextButton();
    await extraCurricularPage.addEntry('activity one', '1', 'test test', 'test test');
    await extraCurricularPage.clickOnNextButton();
    await expect(page.locator('.mantine-InputWrapper-error')).toContainText('Please add at least 2 entries');
  });

  test('Verify Successfull Submission added', async ({ page }) => {
    test.slow()
    let loginPage = new LoginPage(page);
    let signupPage = new SignUpPage(page);
    let letsgoPage = new LetsGetPage(page);
    let extraCurricularPage = new ExtraCurricularPage(page);
    let highschoolInfoPage = new HighSchoolInfo(page);
    let essayPage = new EssayPage(page);
    const data = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      country: 'India+',
      phoneNumber: faker.phone.number(),
      password: faker.internet.password() + '@',
      streetAddress: faker.location.streetAddress(),
      additionalStreetAddress: faker.location.secondaryAddress(),
      state: 'Alabama',
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      countryUSA: 'USA',
      activities: [] as Activity[],
      essays: {
        animals: faker.lorem.sentence(),
        school: faker.lorem.sentence()
      }
    };

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
    // await signupPage.verifyRegistrationSuccess();
    await letsgoPage.fillStreetAddress(data.streetAddress);
    await letsgoPage.fillAdditionalStreetAddress(data.additionalStreetAddress);
    await letsgoPage.selectStateAlabama();
    await letsgoPage.fillCity(data.city);
    await letsgoPage.fillZipCode(data.zipCode);
    await letsgoPage.selectCountryUSA();
    await letsgoPage.clickOnNextButton();

    type Activity = {
      name: string;
      level: string;
      description: string;
      details: string;
    };

    class ActivityFactory {
      static createActivity(name: string, level: string, description: string, details: string): Activity {
        return { name, level, description, details };
      }
    }

    const activities = [
      ActivityFactory.createActivity(faker.lorem.word(), '1', faker.lorem.sentence(), faker.lorem.sentence()),
      ActivityFactory.createActivity(faker.lorem.word(), '2', faker.lorem.sentence(), faker.lorem.sentence()),
      ActivityFactory.createActivity(faker.lorem.word(), '3', faker.lorem.sentence(), faker.lorem.sentence()),
      ActivityFactory.createActivity(faker.lorem.word(), '4', faker.lorem.sentence(), faker.lorem.sentence()),
    ];

    for (let activity of activities) {
      await extraCurricularPage.addEntry(activity.name, activity.level, activity.description, activity.details);
      data.activities.push(activity);
    }

    await extraCurricularPage.clickOnNextButton();
    await extraCurricularPage.clickOnNextButton();
    await highschoolInfoPage.fillHighSchoolInfo();
    await highschoolInfoPage.uploadTranscript('files/My School Transcript.pdf');
    await highschoolInfoPage.clickOnNextButton();
    await highschoolInfoPage.clickOnNextButton();
    await highschoolInfoPage.clickOnNextButton();

    // await essayPage.checkCarsCheckbox();
    // let carsLabel = await essayPage.getLabelText();
    // expect(carsLabel).toBe('Essay about Cars *');

    await page.waitForLoadState('domcontentloaded')

    await essayPage.checkAnimalsCheckbox();
    await essayPage.fillEssayAboutAnimals(data.essays.animals);

    await essayPage.checkSchoolCheckbox();
    await essayPage.fillEssayAboutSchool(data.essays.school);


    const filePath = path.join(__dirname, 'submittedData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); await highschoolInfoPage.clickOnNextButton();
    await page.getByRole('button', { name: 'Submit' }).click();


    await page.getByRole('button', { name: 'View Submitted Data' }).click();

    const submittedData = {
      firstName: await page.locator('text=First Name').evaluate(el => el.nextSibling?.textContent),
      lastName: await page.locator('text=Last Name').evaluate(el => el.nextSibling?.textContent),
      email: await page.locator('text=Email Address').evaluate(el => el.nextSibling?.textContent),
      streetAddress: await page.locator('text=Street Address').evaluate(el => el.nextSibling?.textContent),
      additionalStreetAddress: await page.locator('text=Additional Street Address').evaluate(el => el.nextSibling?.textContent),
      state: await page.locator('text=State (Full)').evaluate(el => el.nextSibling?.textContent),
      city: await page.locator('text=City').evaluate(el => el.nextSibling?.textContent),
      zipCode: await page.locator('text=Zip Code').evaluate(el => el.nextSibling?.textContent),
      country: await page.locator('text=Country').evaluate(el => el.nextSibling?.textContent),
      activities: await page.locator('text=Extracurricular Activities').evaluateAll(nodes => nodes.map(node => ({
        name: node.querySelector('text=Extracurricular Activity Name')?.nextSibling?.textContent || '',
        years: node.querySelector('text=Total Number of Years Involved')?.nextSibling?.textContent || '',
        leadership: node.querySelector('text=List any leadership roles, offices, honors and recognitions related to this activity')?.nextSibling?.textContent || '',
        description: node.querySelector('text=Description of Involvement')?.nextSibling?.textContent || ''
      }))),
      essays: {
        animals: await page.locator('text=Essay about Animals').evaluate(el => el.nextSibling?.textContent),
        school: await page.locator('text=Essay about School').evaluate(el => el.nextSibling?.textContent)
      }
    };


    expect(submittedData.firstName).toBe(data.firstName);
    expect(submittedData.lastName).toBe(data.lastName);
    expect(submittedData.email).toBe(data.email);
    expect(submittedData.streetAddress).toBe(data.streetAddress);
    expect(submittedData.additionalStreetAddress).toBe(data.additionalStreetAddress);
    expect(submittedData.state).toBe(data.state);
    expect(submittedData.city).toBe(data.city);
    expect(submittedData.zipCode).toBe(data.zipCode);
    expect(submittedData.country).toBe('United States of America');

    for (let i = 0; i < data.activities.length; i++) {
      expect(submittedData.activities[i].name).toBe(data.activities[i].name);
      expect(submittedData.activities[i].years).toBe(data.activities[i].level);
      expect(submittedData.activities[i].leadership).toBe(data.activities[i].description);
      expect(submittedData.activities[i].description).toBe(data.activities[i].details);
    }

    expect(submittedData.essays.animals).toBe(data.essays.animals);
    expect(submittedData.essays.school).toBe(data.essays.school);

  });

});


