import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('id:C319 - Verify vehicle location division', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check title to be visible, have valid text and "" * "" after it. Check choosed location field to be empty, have valid background text and not be clickable.', async () => {
        await expect(profilePage.vehicleLocationDivisionTitle).toBeDisplayed();
        await expect(await profilePage.vehicleLocationDivisionTitle.getText()).toMatch(/Місце розташування технічного засобу \*/);
        await expect(profilePage.vehicleLocationDivisionInput).toHaveText(/Виберіть на мапі/);
    });

    it('2. Click on [nextButton] button.', async () => {
        await profilePage.nextButton.click();

        await expect(profilePage.vehicleLocationDivisionInput).toHaveAttr('class', /labelError/);
        await expect(profilePage.vehicleLocationDivisionInputErrorMessage).toHaveText(/Виберіть коректне місце на мапі України/);
    });

    it('3. Check clicking ""Вибрати на мапі"" button opens pop-up window.', async () => {
        await profilePage.selectOnMapButton.click();

        await expect(profilePage.map).toBeDisplayed();
    });

    it('4. Check pop-up window header to have title with valid text, and close button. Pop-up body should contain line with default address and map element.', async () => {
        await expect(profilePage.mapPopupTitle).toHaveText(/Техніка на мапі/);
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.popupAddress).toHaveText(/Київ, вулиця Володимирська 21\/20 Україна, Київська область/);
        await profilePage.confirmAdressButton.click();
        await expect(profilePage.vehicleLocationDivisionInput).toHaveText(/Київ, вулиця Володимирська 21\/20 Україна, Київська область/);
    });

    it('5. Click on ""Вибрати на мапі"" button. Select another address using map panel in pop-up window and check new address to be displayed in address line.', async () => {
        await profilePage.selectOnMapButton.click();
        const { width, height } = await browser.getWindowRect();

        const x = Math.floor(width / 2) - 30;
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
        const expectedText = await profilePage.popupAddress.getText();
        
        await profilePage.confirmAdressButton.click();
        
        await expect(expectedText).toEqual(await profilePage.vehicleLocationDivisionInput.getText());
    });
});
