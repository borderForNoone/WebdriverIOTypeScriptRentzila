import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../constants/endpoints';
import { validValues } from '../../constants/validValues';
import { errorMessages } from '../../constants/errorMessages';

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

        await expect(profilePage.map).toBeDisplayed();

        await expect(profilePage.mapPopupTitle).toHaveText(validValues.mapPopupTitle);
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.popupAddress).toHaveText(validValues.popupAddress);
        await profilePage.confirmAdressButton.click();
        await expect(profilePage.vehicleLocationDivisionInput).toHaveText(validValues.popupAddress);

        await profilePage.selectOnMapButton.click();
        await expect(profilePage.popupAddress).toHaveText(validValues.popupAddress);

        const { x, y } = await profilePage.mapPopup.getLocation();
        const { width, height } = await profilePage.mapPopup.getSize();

        const centerX = Math.floor(x + width / 2);
        const centerY = Math.floor(y + height / 2 - 10);

        await browser.performActions([
            {
                type: 'pointer',
                id: 'mouse',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerUp', button: 0 },
                    { type: 'pause', duration: 1000 },
                ],
            },
        ]);
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
