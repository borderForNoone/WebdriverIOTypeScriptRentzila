import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../constants/endpoints';
import { validValues } from '../../constants/validValues';
import { invalidValues } from '../../constants/invalidValues';
import { errorMessages } from '../../constants/errorMessages';

describe('Verify unit name section', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C297 - Verify unit name section', async () => {
        await expect(profilePage.unitNameText).toBeDisplayedInViewport();
        await expect(await profilePage.unitNameText.getText()).toMatch(validValues.unitNameText);
        await expect(profilePage.unitNameInputField).toHaveAttr('placeholder', validValues.unitNameInputFieldText);

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttr('class', endpoints.modalNameInputError);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
   
        await profilePage.unitNameInputField.setValue(`${Math.floor(Math.random() * 1000000000)}`);

        await expect(profilePage.unitNameInputField).toHaveAttr('class', endpoints.modalNameInputError);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(errorMessages.unitNameInputFieldErrorMessageForTenLetters);
   
        const longString = 'a'.repeat(101);

        await profilePage.unitNameInputField.clearValue();
        await profilePage.unitNameInputField.setValue(longString);

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttribute('class', endpoints.modalNameInputError);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(errorMessages.unitNameInputFieldErrorMessage);

        await profilePage.unitNameInputField.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, longString);

        await profilePage.unitNameInputField.click();
        await browser.keys(['Control', 'v']); 

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttribute('class', endpoints.modalNameInputError);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(errorMessages.unitNameInputFieldErrorMessage);
    
        await profilePage.unitNameInputField.clearValue();
    
        await profilePage.unitNameInputField.setValue(invalidValues.specialSymbols);
    
        const fieldValueAfterTyping = await profilePage.unitNameInputField.getValue();
        expect(fieldValueAfterTyping).not.toContain(invalidValues.specialSymbols); 
    
        await profilePage.unitNameInputField.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.specialSymbols);

        await profilePage.unitNameInputField.click(); 
        await browser.keys(['Control', 'v']); 
    
        const fieldValueAfterPasting = await profilePage.unitNameInputField.getValue();
        expect(fieldValueAfterPasting).not.toContain(invalidValues.specialSymbols); 
    
        await profilePage.unitNameInputField.clearValue();
    
        await profilePage.unitNameInputField.setValue(validValues.unitNameInputFieldValue);
    
        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).not.toHaveAttr('class', endpoints.modalNameInputError);
        await expect(profilePage.unitNameInputFieldErrorMessage).not.toBeDisplayed();
    
        await profilePage.unitNameInputField.clearValue();
    
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, validValues.unitNameInputFieldValue);
    
        await profilePage.unitNameInputField.click(); 
        await browser.keys(['Control', 'v']); 
    
        await profilePage.nextButton.click();
    
        await expect(profilePage.unitNameInputField).not.toHaveAttr('class', endpoints.modalNameInputError);
        await expect(profilePage.unitNameInputFieldErrorMessage).not.toBeDisplayed();
    });    
});