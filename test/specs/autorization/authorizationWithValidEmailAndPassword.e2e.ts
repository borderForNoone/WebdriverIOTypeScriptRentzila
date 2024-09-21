import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

require('dotenv').config();

describe('id:C201 - Authorization with valid email and password', () => {
    it('1. Enter your email into the ""E-mail або номер телефону"" field', async () => {
        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await expect(await homePage.emailField.getValue()).toEqual(`${process.env.ADMIN_USERNAME}`);
    });
    
    it('2. Enter your valid password into the ""Пароль"" field', async () => {
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(await homePage.passwordField.getAttribute('type')).toEqual('password');
    });

    it('3. Click on the ""Hidden password"" icon', async () => {
        await homePage.hiddenPasswordIcon.click();
        await expect(await homePage.passwordField.getValue()).toEqual(`${process.env.ADMIN_PASSWORD}`);
    });

    it('4. Click on the ""Hidden password"" icon again.', async () => {
        await homePage.hiddenPasswordIcon.click();
        await expect(await homePage.passwordField.getAttribute('type')).toEqual('password');
    });

    it('5. Click on the ""Увійти"" at the bottom of the form or press Enter key (check different variants in each test run).', async () => {
        const randomAction = Math.random() < 0.5;

        if (randomAction) {
            await homePage.submitButton.click();
        } else {
            await homePage.passwordField.click();
            await browser.keys('Enter');
        }

        await expect(homePage.popupWindow).not.toBeDisplayed();
    });

    it('6. Click on the user icon in the right corner of the page.', async () => {
        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();
        await expect(await homePage.userDropdownMenuEmail.getText()).toEqual(`${process.env.ADMIN_USERNAME}`);
    });

    it('7. Log out and repeat test case with valid email.', async () => {
        await homePage.logoutDropdownMenu.click();

        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await expect(await homePage.emailField.getValue()).toEqual(`${process.env.ADMIN_USERNAME}`);

        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(await homePage.passwordField.getAttribute('type')).toEqual('password');

        await homePage.hiddenPasswordIcon.click();
        await expect(await homePage.passwordField.getValue()).toEqual(`${process.env.ADMIN_PASSWORD}`);

        const randomAction = Math.random() < 0.5;

        if (randomAction) {
            await homePage.submitButton.click();
        } else {
            await homePage.passwordField.click();
            await browser.keys('Enter');
        }

        await expect(homePage.popupWindow).not.toBeDisplayed();

        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();
        await expect(await homePage.userDropdownMenuEmail.getText()).toEqual(`${process.env.ADMIN_USERNAME}`);
    });
});