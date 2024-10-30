import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import { endpoints } from '../../../constants/endpoints';

describe('Authorization with empty fields', () => {
    it('id:C200 - Authorization with empty fields', async () => {
        await homePage.loginButton.click();

        await expect(homePage.submitButton).toBeDisplayed();
        await homePage.submitButton.click();

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailField).toHaveAttr('class', endpoints.erroInputField);
        await expect(homePage.passwordField).toHaveAttr('class', endpoints.erroInputField);
        await expect(homePage.emailFieldErrorMessage).toBeDisplayed();
        await expect(homePage.passwordFieldErrorMessage).toBeDisplayed();
 
        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        
        await homePage.submitButton.click();

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailField).not.toHaveAttr('class', endpoints.erroInputField);
        await expect(homePage.passwordField).toHaveAttr('class', endpoints.erroInputField);
        await expect(homePage.passwordFieldErrorMessage).toBeDisplayed();
        await homePage.emailField.clearValue();
        await homePage.submitButton.click();
 
        await expect(homePage.emailField).toHaveAttr('class', endpoints.erroInputField);
        await expect(homePage.emailFieldErrorMessage).toBeDisplayed();
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.passwordField).not.toHaveAttr('class', endpoints.erroInputField);
    });
});

