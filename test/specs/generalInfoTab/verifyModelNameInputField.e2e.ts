import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../../constants/endpoints';
import { invalidValues } from '../../../constants/invalidValues';
import { validValues } from '../../../constants/validValues';
import { invalidModalNameInput } from '../../../constants/invalidModalNameInput';
import { errorMessages } from '../../../constants/errorMessages';

describe('Verify model name input field', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C299 - Verify model name input field', async () => {
        await expect(profilePage.modalNameInputTitle).toBeDisplayedInViewport();
        await expect(profilePage.modalNameInputTitle).toHaveText(validValues.modalNameInputTitle);
        await expect(profilePage.modalNameInput).toHaveAttr('placeholder', validValues.modalNameInputText);
        await expect(profilePage.modalNameInput).toBeDisplayed();
    
        const testInputs = [invalidModalNameInput.longInput, invalidModalNameInput.spaceInsideInput, invalidModalNameInput.spaceAfterInput];
    
        for (const input of testInputs) {
            await profilePage.modalNameInput.clearValue();
            await profilePage.modalNameInput.setValue(input);
    
            await expect(profilePage.modalNameInput).toHaveAttr('class', endpoints.modalNameInputError);
            await expect(profilePage.modalNameInputErrorMessage).toHaveText(errorMessages.modalNameInputErrorMessage);
    
            await profilePage.modalNameInput.clearValue();
    
            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, input);
    
            await profilePage.modalNameInput.click();
            await browser.keys(['Control', 'v']); 
    
            await expect(profilePage.modalNameInput).toHaveAttr('class', endpoints.modalNameInputError);
            await expect(profilePage.modalNameInputErrorMessage).toHaveText(errorMessages.modalNameInputErrorMessage);
        }
    
        await profilePage.modalNameInput.clearValue();

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');
    
        await profilePage.modalNameInput.clearValue();
        await profilePage.modalNameInput.setValue(invalidValues.specialSymbols);

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');
        
        await profilePage.modalNameInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.specialSymbols);

        await profilePage.modalNameInput.click();
        await browser.keys(['Control', 'v']); 

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');

        await profilePage.modalNameInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, '');

        await profilePage.modalNameInput.click();
        await browser.keys(['Control', 'v']); 

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');

        await profilePage.modalNameInput.clearValue();
        await profilePage.modalNameInput.setValue(validValues.modalNameInputValue);

        await expect(profilePage.modalNameInput).not.toHaveAttr('class', endpoints.modalNameInputError); 
        await expect(profilePage.modalNameInputErrorMessage).not.toBeDisplayed(); 

        const inputValue = await profilePage.modalNameInput.getValue();
        expect(inputValue).toEqual(validValues.modalNameInputValue);
    });
});