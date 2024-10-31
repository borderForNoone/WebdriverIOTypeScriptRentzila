import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';

describe('id:C638 - Verify the data entry in the "Вартість Ваших послуг *" price input', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify the data entry in the "Вартість Ваших послуг *" price input', async () => {
        const dataWithSpaces = ['123 456', '123456 '];
        const invalidData = [' ', 'abc', '!@#$%.,'];
        await profilePage.addPriceButton.click();
        await expect(profilePage.addPriceInputField).toBeDisplayed();

        for (let data of dataWithSpaces) {
            await profilePage.addPriceInputField.clearValue();
            await profilePage.addPriceInputField.setValue(data);

            const cleanedValue = data.replace(/\s+/g, '');
            const inputValue = await profilePage.addPriceInputField.getValue();
            await expect(inputValue).toEqual(cleanedValue);

            await profilePage.addPriceInputField.clearValue();

            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, data);

            await profilePage.addPriceInputField.click();
            await browser.keys(['Control', 'v']);

            const pastedValue = await profilePage.addPriceInputField.getValue();
            await expect(pastedValue).toEqual(cleanedValue);
        }

        for (let data of invalidData) {
            await profilePage.addPriceInputField.clearValue();
            await profilePage.addPriceInputField.setValue(data);

            const inputValue = await profilePage.addPriceInputField.getValue();
            await expect(inputValue).toEqual('');

            await profilePage.addPriceInputField.clearValue();

            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, data);

            await profilePage.addPriceInputField.click();
            await browser.keys(['Control', 'v']);

            const pastedValue = await profilePage.addPriceInputField.getValue();
            await expect(pastedValue).toEqual('');
        }

        const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
        const regexDigits = /^[0-9]+$/;
        await profilePage.addPriceInputField.setValue(randomNumber);

        await expect(await profilePage.addPriceInputField.getValue()).toMatch(regexDigits);
    });
});