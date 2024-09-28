import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('id:C318 - Verify description section', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check title to be visible, have valid text. Check that textarea to be clickable and clear.', async () => {
        const title = profilePage.descriptionTitle; 
        await expect(title).toBeDisplayedInViewport();
        await expect(title).toHaveText('Детальний опис');

        await expect(profilePage.descriptionCustomTextArea).toBeDisplayed();
        await expect(profilePage.descriptionCustomTextArea).toBeClickable();
        await expect(profilePage.descriptionCustomTextArea).toHaveText(''); 
    });

    it('2. Type data: <>{};^ (special symbols) and check field content. Repeat actions with copy-paste.', async () => {
        const specialSymbolsInput = '<>{};^';
        const textArea = profilePage.descriptionCustomTextArea;

        await textArea.clearValue();
        await textArea.setValue(specialSymbolsInput);

        await expect(await textArea.getValue()).toEqual('');

        await textArea.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, specialSymbolsInput);

        await textArea.click();
        await browser.keys(['Control', 'v']); 

        await expect(await textArea.getValue()).toEqual('');
    });

    it('3. Type 9001 symbols into textarea and check limit.', async () => {
        const longInput = 'a'.repeat(9001); 
        const textArea = profilePage.descriptionCustomTextArea;

        await textArea.clearValue();
        await textArea.setValue(longInput);

        const textAreaValue = await textArea.getValue();
        expect(textAreaValue.length).toBeLessThanOrEqual(9000);
    });
});