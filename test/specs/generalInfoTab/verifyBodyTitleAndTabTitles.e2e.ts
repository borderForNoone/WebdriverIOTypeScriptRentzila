import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../constants/endpoints';
import { validValues } from '../../constants/validValues';

describe('Verify body title and tab titles', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C294 - Verify body title and tab titles', async () => {
        await expect(profilePage.createUnitTitle).toBeDisplayed();
        await expect(profilePage.createUnitTitle).toHaveText(validValues.createUnitTitle);
    
        for(let i = 0; i < validValues.tabNames.length; i++) {
            await expect(profilePage.tabTitles[i]).toHaveText(validValues.tabNames[i]);
            await expect(profilePage.tabNumbers[i]).toHaveText(`${++i}`);
        }

        await expect(profilePage.tabNumbers[0]).toHaveAttr('class', endpoints.lableActive);
        for(let i = 1; i < validValues.tabNames.length; i++) {
            await expect(profilePage.tabNumbers[i]).not.toHaveAttr('class', endpoints.lableActive);
        }
    });
});

