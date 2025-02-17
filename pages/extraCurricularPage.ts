import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from './basePage';

export class ExtraCurricularPage extends BasePage {

    readonly addEntryButton: Locator;
    readonly activityNameTextbox: Locator;
    readonly yearsInvolvedTextbox: Locator;
    readonly leadershipRolesTextbox: Locator;
    readonly involvementDescriptionTextbox: Locator;
    readonly addButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addEntryButton = page.getByRole('button', { name: 'Add Entry' });
        this.activityNameTextbox = page.getByRole('textbox', { name: 'Extracurricular Activity Name' });
        this.yearsInvolvedTextbox = page.getByRole('textbox', { name: 'Total Number of Years Involved' });
        this.leadershipRolesTextbox = page.getByRole('textbox', { name: 'List any leadership roles,' });
        this.involvementDescriptionTextbox = page.getByRole('textbox', { name: 'Description of Involvement' });
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
    }




    async addEntry(activityName: string, yearsInvolved: string, leadershipRoles: string, involvementDescription: string) {
        await this.addEntryButton.first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.activityNameTextbox.click();
        await this.activityNameTextbox.fill(activityName);
        await this.yearsInvolvedTextbox.click();
        await this.yearsInvolvedTextbox.fill(yearsInvolved);
        await this.leadershipRolesTextbox.click();
        await this.leadershipRolesTextbox.fill(leadershipRoles);
        await this.involvementDescriptionTextbox.click();
        await this.involvementDescriptionTextbox.fill(involvementDescription);
        await this.addButton.first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }


}

