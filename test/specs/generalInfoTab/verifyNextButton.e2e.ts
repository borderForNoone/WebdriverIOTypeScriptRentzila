import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';  
import { endpoints } from '../../../constants/endpoints';  
import { validValues } from '../../../constants/validValues';
import { selectLocationOnMap } from '../../../helpers/profileHelper';

describe('Verify "Далі" button', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C329 - Verify "Далі" button', async () => {
        const nextButtonText = await profilePage.nextButton.getText();
        expect(nextButtonText).toBe(validValues.nextButtonText);

        await profilePage.nextButton.click();
        
        await expect(profilePage.categoryFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.vehicleLocationDivisionInputErrorMessage).toBeDisplayed();
    
        await profilePage.categoryField.click();
        await profilePage.firstColumnElements[0].waitForDisplayed({ timeout: 5000 });
        await profilePage.firstColumnElements[0].click();
        await profilePage.secondColumnElements[0].click();
        await profilePage.thirdColumnElements[0].click();

        await profilePage.unitNameInputField.clearValue();
        await profilePage.unitNameInputField.setValue(faker.string.alpha(10));

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(validValues.vehicleManufacturerSectionInputValue);
    
        await profilePage.dropdownOptions[0].click();

        await selectLocationOnMap();
        const expectedText = await profilePage.popupAddress.getText();

        await profilePage.confirmAddressButton.click();
        await browser.waitUntil(async () => {
            const actualText = await profilePage.vehicleLocationDivisionInput.getText();
            return actualText === expectedText;
        }, {
            timeout: 30000, 
            timeoutMsg: 'The text did not become expected in 30 seconds ', 
        });

        if (await profilePage.telegramCrossButton.isDisplayed()) {
            await profilePage.telegramCrossButton.click();
        } 
        await profilePage.nextButton.click();
        await profilePage.nextButton.click();

        await expect(profilePage.photosTitle).toBeDisplayed();
    });
});

