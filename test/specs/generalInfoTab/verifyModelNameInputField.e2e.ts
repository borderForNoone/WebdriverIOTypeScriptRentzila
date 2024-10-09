import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('id:C299 - Verify model name input field', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check title to be visible, have valid text. Check input field to have valid background text.', async () => {
        await expect(profilePage.modalNameInputTitle).toBeDisplayedInViewport();
        await expect(profilePage.modalNameInputTitle).toHaveText(/Назва моделі/);
        await expect(profilePage.modalNameInput).toHaveAttr('placeholder', /Введіть назву моделі/);
        await expect(profilePage.modalNameInput).toBeDisplayed();
    });

    it('2. Type data and check field reaction. Repeat actions with copy-paste instead of typing.', async () => {
        const longInput = '1234567890123456'; 
        const spaceInsideInput = '1234567890 12345'; 
        const spaceAfterInput = '123456789012345 '; 
    
        const testInputs = [longInput, spaceInsideInput, spaceAfterInput];
    
        for (const input of testInputs) {
            await profilePage.modalNameInput.clearValue();
            await profilePage.modalNameInput.setValue(input);
    
            await expect(profilePage.modalNameInput).toHaveAttr('class', /inputError/);
            await expect(profilePage.modalNameInputErrorMessage).toHaveText(/У назві моделі може бути не більше 15 символів/);
    
            await profilePage.modalNameInput.clearValue();
    
            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, input);
    
            await profilePage.modalNameInput.click();
            await browser.keys(['Control', 'v']); 
    
            await expect(profilePage.modalNameInput).toHaveAttr('class', /inputError/);
            await expect(profilePage.modalNameInputErrorMessage).toHaveText(/У назві моделі може бути не більше 15 символів/);
        }
    });

    it('3. Type data with space and special symbols, check field reaction, repeat actions with copy-paste instead of typing.', async () => {
        await profilePage.modalNameInput.clearValue();

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');
    
        await profilePage.modalNameInput.clearValue();
        await profilePage.modalNameInput.setValue('<>{};^');

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');
        
        await profilePage.modalNameInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, '<>{};^');

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
    });

    it('4. Type data: 012345678901234 (15 symbols) and check field reaction.', async () => {
        const validInput = '012345678901234'; 

        await profilePage.modalNameInput.clearValue();
        await profilePage.modalNameInput.setValue(validInput);

        await expect(profilePage.modalNameInput).not.toHaveAttr('class', /inputError/); 
        await expect(profilePage.modalNameInputErrorMessage).not.toBeDisplayed(); 

        const inputValue = await profilePage.modalNameInput.getValue();
        expect(inputValue).toEqual(validInput);
    });
});