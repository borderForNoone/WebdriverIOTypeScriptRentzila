import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('id:C317 - Verify technical characteristics section', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check title is visible, has valid text. Textarea is clickable and clear.', async () => {
        const title = profilePage.technicalCharacteristicsTitle;
        await expect(title).toBeDisplayedInViewport();
        await expect(title).toHaveText('Технічні характеристики');

        const textArea = profilePage.customTextArea;
        await expect(textArea).toBeDisplayed();
        await expect(textArea).toBeClickable();
        await expect(textArea).toHaveText(''); 
    });

    it('2. Type data: <>{};^ (special symbols) and check field content. Repeat actions with copy-paste.', async () => {
        const specialSymbolsInput = '<>{};^';
        const textArea = profilePage.customTextArea;

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
        const textArea = profilePage.customTextArea;

        await textArea.clearValue();
        await textArea.setValue(longInput);

        const textAreaValue = await textArea.getValue();
        expect(textAreaValue.length).toBeLessThanOrEqual(9000);
    });
});