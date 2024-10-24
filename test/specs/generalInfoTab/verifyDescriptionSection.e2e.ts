import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import { invalidValues } from '../../constants/invalidValues';
import { validValues } from '../../constants/validValues';
import { endpoints } from '../../constants/endpoints';

describe('Verify description section', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C318 - Verify description section', async () => {
        const title = profilePage.descriptionTitle; 
        await expect(title).toBeDisplayedInViewport();
        await expect(title).toHaveText(validValues.descriptionTitle);

        await expect(profilePage.descriptionCustomTextArea).toBeDisplayed();
        await expect(profilePage.descriptionCustomTextArea).toBeClickable();
        await expect(profilePage.descriptionCustomTextArea).toHaveText(''); 
   
        const textArea = profilePage.descriptionCustomTextArea;

        await textArea.clearValue();
        await textArea.setValue(invalidValues.specialSymbols);

        await expect(await textArea.getValue()).toEqual('');

        await textArea.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.specialSymbols);

        await textArea.click();
        await browser.keys(['Control', 'v']); 

        await expect(await textArea.getValue()).toEqual('');
    
        const longInput = faker.string.alpha({ length: 9001 });

        await profilePage.descriptionCustomTextArea.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, longInput);

        await profilePage.descriptionCustomTextArea.click();
        await browser.keys(['Control', 'v']); 

        const textAreaValue = await profilePage.descriptionCustomTextArea.getValue();
        expect(textAreaValue.length).toBeLessThanOrEqual(9000);
    });
});