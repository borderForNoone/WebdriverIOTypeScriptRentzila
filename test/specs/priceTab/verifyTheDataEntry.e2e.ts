import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';
import { invalidValues } from '../../../constants/invalidValues';

describe('id:C636 - Verify the data entry in the "Вартість мінімального замовлення *" input', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify adding an invalid price in the "Вартість мінімального замовлення *" input', async () => {
        const dataWithSpaces = invalidValues.dataWithSpaces; 
        const invalidData = invalidValues.invalidData;

        for (let data of dataWithSpaces) {
            await profilePage.addPriceInput.clearValue();
            await profilePage.addPriceInput.setValue(data);

            const cleanedValue = data.replace(/\s+/g, '');
            const inputValue = await profilePage.addPriceInput.getValue();
            await expect(inputValue).toEqual(cleanedValue);

            await profilePage.addPriceInput.clearValue();

            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, data);

            await profilePage.addPriceInput.click();
            await browser.keys(['Control', 'v']);

            const pastedValue = await profilePage.addPriceInput.getValue();
            await expect(pastedValue).toEqual(cleanedValue);
        }

        for (let data of invalidData) {
            await profilePage.addPriceInput.clearValue();
            await profilePage.addPriceInput.setValue(data);

            const inputValue = await profilePage.addPriceInput.getValue();
            await expect(inputValue).toEqual('');

            await profilePage.addPriceInput.clearValue();

            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, data);

            await profilePage.addPriceInput.click();
            await browser.keys(['Control', 'v']);

            const pastedValue = await profilePage.addPriceInput.getValue();
            await expect(pastedValue).toEqual('');
        }

        const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
        const regexDigits = /^[0-9]+$/;
        await profilePage.addPriceInput.setValue(randomNumber);

        await expect(await profilePage.addPriceInput.getValue()).toMatch(regexDigits);

        await profilePage.addPriceInput.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, `${randomNumber}`);

        await profilePage.addPriceInput.click();
        await browser.keys(['Control', 'v']);
        
        await expect(await profilePage.addPriceInput.getValue()).toMatch(regexDigits);
    });
});