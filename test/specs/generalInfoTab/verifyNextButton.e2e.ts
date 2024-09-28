import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';    

describe('id:C329 - Verify ""Далі"" button', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check button to have valid text.', async () => {
        const nextButtonText = await profilePage.nextButton.getText();
        expect(nextButtonText).toBe('Далі');
    });

    it('2. Click on [nextButton] button when no field filled.', async () => {
        await profilePage.nextButton.click();
        
        await expect(profilePage.categoryFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.vehicleLocationDivisionInputErrorMessage).toBeDisplayed();
    });

    it('3. Fill all required fields. Сlick on [nextButton] button.', async () => {
        await profilePage.categoryField.click();
        await profilePage.firstColumnElements[0].click();
        await profilePage.secondColumnElements[0].click();
        await profilePage.thirdColumnElements[0].click();

        await profilePage.unitNameInputField.clearValue();
        await profilePage.unitNameInputField.setValue(faker.string.alpha(10));

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue('ABC');
    
        await profilePage.dropdownOptions[0].click();

        await profilePage.selectOnMapButton.click();
        const { width, height } = await browser.getWindowRect();

        const x = Math.floor(width / 2) - 20;
        const y = Math.floor(height / 2);

        await browser.performActions([{
            type: 'pointer',
            id: 'pointer1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: x, y: y },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await profilePage.confirmAdressButton.scrollIntoView();
        await profilePage.confirmAdressButton.click();

        if (await profilePage.telegramCrossButton.isDisplayed()) {
            await profilePage.telegramCrossButton.click();
        } 
        await profilePage.nextButton.click();
        await profilePage.nextButton.click();

        await expect(profilePage.photosTitle).toBeDisplayedInViewport();
    });
});

