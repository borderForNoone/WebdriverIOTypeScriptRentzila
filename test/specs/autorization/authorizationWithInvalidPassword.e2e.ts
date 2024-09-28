import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

require('dotenv').config();

describe('id:C577 - Authorization with invalid password', () => {
    it('1. Enter invalid password written with Space at the end', async () => {
        await homePage.clickLoginButton();

        await homePage.passwordField.setValue('Testuser10  ');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли');
    });
    
    it('2. Enter invalid password written with Space at the beginning', async () => {
        await homePage.passwordField.setValue(' Testuser10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли');
    });

    it('3. Enter invalid password written with non-existent password', async () => {
        await homePage.passwordField.setValue('Testuser13');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.passwordFieldErrorMessage).not.toBeDisplayed();
    });

    it('4. Enter invalid password written without 1 uppercase letter', async () => {
        await homePage.passwordField.setValue('testuser10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли');
    });

    it('5. Enter invalid password written without 1 lowercase letter', async () => {
        await homePage.passwordField.setValue('TESTUSER10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли');
    });

    it('6. written in Cyrillic', async () => {
        await homePage.passwordField.setValue('Еуіегіук10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли');
    });
});