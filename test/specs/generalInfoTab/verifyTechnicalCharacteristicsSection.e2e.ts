import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import { endpoints } from '../../constants/endpoints';  
import { invalidValues } from '../../constants/invalidValues';
import { validValues } from '../../constants/validValues';

describe('Verify technical characteristics section', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C317 - Verify technical characteristics section', async () => {
        const title = profilePage.technicalCharacteristicsTitle;
        await expect(title).toBeDisplayedInViewport();
        await expect(title).toHaveText(validValues.technicalCharacteristicsTitle);

        const textArea = profilePage.customTextArea;
        await expect(textArea).toBeDisplayed();
        await expect(textArea).toBeClickable();
        await expect(textArea).toHaveText(''); 

        await profilePage.customTextArea.clearValue();
        await profilePage.customTextArea.setValue(invalidValues.specialSymbols);

        await expect(await profilePage.customTextArea.getValue()).toEqual('');

        await profilePage.customTextArea.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.specialSymbols);

        await profilePage.customTextArea.click();
        await browser.keys(['Control', 'v']); 

        await expect(await profilePage.customTextArea.getValue()).toEqual('');
  
        const longInput = faker.string.alpha({ length: 9001 });

        await profilePage.customTextArea.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, longInput);

        await profilePage.customTextArea.click();
        await browser.keys(['Control', 'v']); 

        const textAreaValue = await profilePage.customTextArea.getValue();
        expect(textAreaValue.length).toBeLessThanOrEqual(9000);
    });
});