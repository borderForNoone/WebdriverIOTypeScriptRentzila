import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../../constants/endpoints';

describe('Authorization with valid phone and password', () => {
    it('id:C202 - Authorization with valid phone and password', async () => {
        await homePage.loginButton.click();
        await homePage.emailField.setValue(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(homePage.emailField).not.toHaveAttr('class', endpoints.erroInputField);
    
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(homePage.passwordField).not.toHaveAttr('class', endpoints.erroInputField);
    
        await homePage.submitButton.click();
        await expect(homePage.popupWindow).not.toBeDisplayed();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
   
        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();
   
        await homePage.goToProfileDropdownMenu.click();
        await expect(browser).toHaveUrl(endpoints.profilePage.url);

        await expect((await profilePage.phoneNumberField.getValue()).replace(/\s/g, '')).toEqual(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(profilePage.phoneNumberField).toHaveAttr('class', endpoints.phoneNumberInputVerification);
    
        await homePage.userIcon.click();
        await profilePage.logoutDropdownMenu.click();
        
        await homePage.loginButton.waitForDisplayed({ timeout: 20000 });
        await homePage.loginButton.click();
        await homePage.emailField.setValue(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(homePage.emailField).not.toHaveAttr('class', endpoints.erroInputField);

        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(homePage.passwordField).not.toHaveAttr('class', endpoints.erroInputField);

        await homePage.submitButton.click();
        await expect(homePage.popupWindow).not.toBeDisplayed();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);

        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();

        await homePage.goToProfileDropdownMenu.click();
        await expect(browser).toHaveUrl(endpoints.profilePage.url);

        await expect((await profilePage.phoneNumberField.getValue()).replace(/\s/g, '')).toEqual(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(profilePage.phoneNumberField).toHaveAttr('class', endpoints.phoneNumberInputVerification);
    });
});