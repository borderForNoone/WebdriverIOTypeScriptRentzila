import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

require('dotenv').config();

describe('id:C576 - Authorization with invalid email', () => {
    it('1. Enter invalid email with spaces', async () => {
        await homePage.clickLoginButton();

        await homePage.emailField.setValue('testuser  rentzila@gmail.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });
    
    it('2. Enter invalid email written in Cyrillic', async () => {
        await homePage.emailField.setValue('еуіегіуккутеяшдф');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });

    it('3. Enter invalid email written without "@"', async () => {
        await homePage.emailField.setValue('testuserrentzilagmail.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });

    it('4. Enter invalid email written written without "."', async () => {
        await homePage.emailField.setValue('testuserrentzila@gmailcom');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });

    it('5. Enter invalid email written without ".com"', async () => {
        await homePage.emailField.setValue('testuserrentzila@gmail');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });

    it('6. Enter invalid email written without "gmail"', async () => {
        await homePage.emailField.setValue('testuserrentzila@.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });

    it('7. Enter invalid email written without "@gmail.com"', async () => {
        await homePage.emailField.setValue('testuserrentzila');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });

    it('8. Enter invalid email written with 2 "@"', async () => {
        await homePage.emailField.setValue('testuserrentzila@@gmail.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText('Неправильний формат email або номера телефону')
    });
});