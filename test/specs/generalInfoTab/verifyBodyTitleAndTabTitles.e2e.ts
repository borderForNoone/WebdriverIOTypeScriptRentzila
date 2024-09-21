import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

require('dotenv').config();

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
        await expect(await profilePage.createUnitTitle.getText()).toEqual('Створити оголошення');
    });

    xit('2. Check tab titles to be visible, have valid label number and text. ""1 Основна інформація"" tab should be active, all others should be faded.', async () => {
        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        
        await homePage.submitButton.click();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);
        await expect(homePage.passwordField).toHaveAttr('class', /CustomReactHookInput_error_input/);
        await expect(homePage.passwordFieldErrorMessage).toBeDisplayed();
    });
});

