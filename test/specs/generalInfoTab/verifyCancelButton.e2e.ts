import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('id:C326 - Verify ""Скасувати"" button', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check button to have valid text.', async () => {
        await expect(profilePage.canceledButton).toHaveText(/Скасувати/);

    });

    it('2. Click on ""Скасувати"" button.', async () => {
        await profilePage.canceledButton.click();

        browser.on('dialog', (dialog) => {
            expect(dialog.message()).toEqual('Внесені зміни, можливо, не буде збережено.');
            dialog.accept();
        });

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
    });
});

