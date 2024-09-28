import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('id:C297 - Verify unit name section', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check title to be visible, have valid text and "" * "" after it. Check input field have valid background text.', async () => {
        await expect(profilePage.unitNameText).toBeDisplayedInViewport();
        await expect(await profilePage.unitNameText.getText()).toMatch(/Назва оголошення \*/);
        await expect(profilePage.unitNameInputField).toHaveAttr('placeholder', /Введіть назву оголошення/);
    });

    it('2. Click [nextButton] button. Check reaction on empty field.', async () => {
        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
    });

    it('3. Type invalid data', async () => {
        await profilePage.unitNameInputField.setValue(`${Math.floor(Math.random() * 1000000000)}`);

        await expect(profilePage.unitNameInputField).toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(/У назві оголошення повинно бути не менше 10 символів/);
    });

    it('4. Clear input field. Type 101 symbols into field and click ""Далі"" button. After verifying results repeat actions with copy-paste instead of typing.', async () => {
        const longString = 'a'.repeat(101);

        await profilePage.unitNameInputField.clearValue();
        await profilePage.unitNameInputField.setValue(longString);

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttribute('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(/У назві оголошення може бути не більше 100 символів/);

        await profilePage.unitNameInputField.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, longString);

        await profilePage.unitNameInputField.click();
        await browser.keys(['Control', 'v']); 

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttribute('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(/У назві оголошення може бути не більше 100 символів/);
    });

    it('5. Clear field. Type invalid data: <>{};^ (special symbols) and check field content. Copy-paste data instead of typing and check again.', async () => {
        const specialSymbols = '<>{};^';
    
        await profilePage.unitNameInputField.clearValue();
    
        await profilePage.unitNameInputField.setValue(specialSymbols);
    
        const fieldValueAfterTyping = await profilePage.unitNameInputField.getValue();
        expect(fieldValueAfterTyping).not.toContain(specialSymbols); 
    
        await profilePage.unitNameInputField.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, specialSymbols);

        await profilePage.unitNameInputField.click(); 
        await browser.keys(['Control', 'v']); 
    
        const fieldValueAfterPasting = await profilePage.unitNameInputField.getValue();
        expect(fieldValueAfterPasting).not.toContain(specialSymbols); 
    });

    it('6. Clear field. Type valid data: abcdefghij (10 letters). Click [nextButton] button after inputting data. Repeat actions with copy-paste instead of typing.', async () => {
        const validInput = 'abcdefghij';
    
        await profilePage.unitNameInputField.clearValue();
    
        await profilePage.unitNameInputField.setValue(validInput);
    
        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).not.toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).not.toBeDisplayed();
    
        await profilePage.unitNameInputField.clearValue();
    
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, validInput);
    
        await profilePage.unitNameInputField.click(); 
        await browser.keys(['Control', 'v']); 
    
        await profilePage.nextButton.click();
    
        await expect(profilePage.unitNameInputField).not.toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).not.toBeDisplayed();
    });    
});