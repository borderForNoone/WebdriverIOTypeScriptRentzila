import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import { errorMessages } from '../../../constants/errorMessages';
import { invalidPasswords } from '../../../constants/invalidPasswords';

describe('Authorization with invalid password', () => {
    it('id:C577 - Authorization with invalid password', async () => {
        await homePage.loginButton.click();

        await homePage.passwordField.waitForDisplayed({ timeout: 20000 });
        await homePage.passwordField.setValue(invalidPasswords.withSpacesInTheEnd);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(errorMessages.passwordErrorMessage);
    
        await homePage.passwordField.setValue(invalidPasswords.withSpaceInTheBeginning);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(errorMessages.passwordErrorMessage);
    
        await homePage.passwordField.setValue(invalidPasswords.nonExisingWithValidFormat);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.passwordFieldErrorMessage).not.toBeDisplayed();
    
        await homePage.passwordField.setValue(invalidPasswords.nonExistingWithInvalidFormat);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(errorMessages.passwordErrorMessage);
    
        await homePage.passwordField.setValue(invalidPasswords.withCapitalLetters);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(errorMessages.passwordErrorMessage);
    
        await homePage.passwordField.setValue(invalidPasswords.withCyrillicAndNumvbers);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(errorMessages.passwordErrorMessage);
    });
});