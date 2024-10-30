import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import { invalidValues } from '../../../constants/invalidValues';
import { errorMessages } from '../../../constants/errorMessages';

describe('Authorization with invalid email', () => {
    it('id:C576 - Authorization with invalid email', async () => {
        await homePage.loginButton.click();

        await homePage.emailField.waitForDisplayed({ timeout: 20000 });
        await expect(homePage.emailField).toBeDisplayed();
        await homePage.emailField.setValue(invalidValues.emailWithSpace);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
    
        await homePage.emailField.setValue(invalidValues.cyrillicAlphabet);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
   
        await homePage.emailField.setValue(invalidValues.emailWrongGmailFormat);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
   
        await homePage.emailField.setValue(invalidValues.gmailWithoutDot);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
    
        await homePage.emailField.setValue(invalidValues.gmailWithoutCom);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
    
        await homePage.emailField.setValue(invalidValues.gmailWithoutGmail);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
    
        await homePage.emailField.setValue(invalidValues.latinText);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
    
        await homePage.emailField.setValue(invalidValues.gmailWithExtraSymbol);

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(errorMessages.loginErrorMessage)
    });
});