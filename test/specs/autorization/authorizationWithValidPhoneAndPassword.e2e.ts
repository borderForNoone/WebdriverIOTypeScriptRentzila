import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

require('dotenv').config();

describe('id:C202 - Authorization with valid phone and password', () => {
    it('1. Enter your phone number in the field ""E-mail або номер телефону""', async () => {
        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(homePage.emailField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);
    });

    it('2. Enter your password in the ""Пароль"" entry field', async () => {
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(homePage.passwordField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);
    });

    it('3. Click on the ""Увійти"" at the bottom of the form', async () => {
        await homePage.submitButton.click();
        await expect(homePage.popupWindow).not.toBeDisplayed();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
    });

    it('4. Click on the user icon in the right corner of the page', async () => {
        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();
    });

    it('5. Click on the ""Мій профіль"" button in the profile dropdown list', async () => {
        await homePage.goToProfileDropdownMenu.click();
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/owner-cabinet/');

        await expect((await profilePage.phoneNumberField.getValue()).replace(/\s/g, '')).toEqual(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(profilePage.phoneNumberField).toHaveAttr('class', /OwnerProfileNumber_inputVerification/);
    });

    it('6. Log out and repeat test case with valid phone', async () => {
        await homePage.userIcon.click();
        await profilePage.logoutDropdownMenu.click();
        
        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(homePage.emailField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);

        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(homePage.passwordField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);

        await homePage.submitButton.click();
        await expect(homePage.popupWindow).not.toBeDisplayed();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);

        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();

        await homePage.goToProfileDropdownMenu.click();
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/owner-cabinet/');

        await expect((await profilePage.phoneNumberField.getValue()).replace(/\s/g, '')).toEqual(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(profilePage.phoneNumberField).toHaveAttr('class', /OwnerProfileNumber_inputVerification/);
    });
});