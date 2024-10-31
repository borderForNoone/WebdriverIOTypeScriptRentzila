import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../../constants/endpoints';
import { validValues } from '../../../constants/validValues';
import { errorMessages } from '../../../constants/errorMessages';
import { selectLocationOnMap } from '../../../helpers/profileHelper';

describe('Verify vehicle location division', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C319 - Verify vehicle location division', async () => {
        await expect(profilePage.vehicleLocationDivisionTitle).toBeDisplayed();
        await expect(await profilePage.vehicleLocationDivisionTitle.getText()).toMatch(validValues.vehicleLocationDivisionTitle);
        await expect(profilePage.vehicleLocationDivisionInput).toHaveText(validValues.vehicleLocationDivisionInputText);

        await profilePage.nextButton.click();

        await expect(profilePage.vehicleLocationDivisionInput).toHaveAttr('class', endpoints.vehicleLocationDivisionInputError);
        await expect(profilePage.vehicleLocationDivisionInputErrorMessage).toHaveText(errorMessages.vehicleLocationDivisionInputErrorMessage);

        await profilePage.selectOnMapButton.click();

        await profilePage.map.waitForDisplayed({ timeout: 5000 });

        await expect(profilePage.mapPopupTitle).toHaveText(validValues.mapPopupTitle);
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.popupAddress).toHaveText(validValues.popupAddress);
        await profilePage.confirmAdressButton.click();
        await expect(profilePage.vehicleLocationDivisionInput).toHaveText(validValues.popupAddress);

        await selectLocationOnMap();
        const expectedText = await profilePage.popupAddress.getText();

        await profilePage.confirmAdressButton.click();
        
        await browser.waitUntil(async () => {
            const actualText = await profilePage.vehicleLocationDivisionInput.getText();
            return actualText === expectedText;
        }, {
            timeout: 30000, 
            timeoutMsg: 'The text did not become expected in 30 seconds ', 
        });
    });
});
