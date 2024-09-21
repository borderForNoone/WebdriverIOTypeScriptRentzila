import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

describe('id:C200 - Authorization with empty fields', () => {
    it('1. Click on the "Увійти" at the bottom of the form with all fields empty.', async () => {
        await homePage.clickLoginButton();
        await homePage.submitButton.click();

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailField).toHaveAttr('class', /CustomReactHookInput_error_input/);
        await expect(homePage.passwordField).toHaveAttr('class', /CustomReactHookInput_error_input/);
        await expect(homePage.emailFieldErrorMessage).toBeDisplayed();
        await expect(homePage.passwordFieldErrorMessage).toBeDisplayed();
    });

    it('2. Enter valid email into the ""E-mail або номер телефону"", then click on the ""Увійти"" at the bottom of the form', async () => {
        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        
        await homePage.submitButton.click();

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);
        await expect(homePage.passwordField).toHaveAttr('class', /CustomReactHookInput_error_input/);
        await expect(homePage.passwordFieldErrorMessage).toBeDisplayed();
    });

    it('3. The ""E-mail або номер телефону"" clear', async () => {
        await homePage.emailField.clearValue();
        await homePage.submitButton.click();
 
        await expect(homePage.emailField).toHaveAttr('class', /CustomReactHookInput_error_input/);
        await expect(homePage.emailFieldErrorMessage).toBeDisplayed();
    });

    it('4. Enter any valid password into the ""Пароль"" Input, then click on the ""Увійти"" at the bottom of the form', async () => {
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.passwordField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);
    });
});

