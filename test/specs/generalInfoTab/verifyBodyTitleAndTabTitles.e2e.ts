import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

const tabNames = ['основна інформація', 'фотографії', 'послуги', 'вартість', 'контакти'];

describe('id:C294 - Verify body title and tab titles', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check that body title is visible and have valid text.', async () => {
        await expect(profilePage.createUnitTitle).toBeDisplayed();
        await expect(profilePage.createUnitTitle).toHaveText('Створити оголошення');
    });

    it('2. Check tab titles to be visible, have valid label number and text. ""1 Основна інформація"" tab should be active, all others should be faded.', async () => {
        for(let i = 0; i < tabNames.length; i++) {
            await expect(profilePage.tabTitles[i]).toHaveText(tabNames[i]);
            await expect(profilePage.tabNumbers[i]).toHaveText(`${++i}`);
        }

        await expect(profilePage.tabNumbers[0]).toHaveAttr('class', /CustomLabel_labelActive/);
        for(let i = 1; i < tabNames.length; i++) {
            await expect(profilePage.tabNumbers[i]).not.toHaveAttr('class', /CustomLabel_labelActive/);
        }
    });
});

