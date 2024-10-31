import { expect } from '@wdio/globals';
import profilePage from '../../pageobjects/profile.page';
import { validValues } from '../../../constants/validValues';
import { invalidValues } from '../../../constants/invalidValues';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';

describe('id:C418 - Verify ""Вартість мінімального замовлення"" section', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();

        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify ""Вартість мінімального замовлення"" section', async () => {
        const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
        const regexDigits = /^[0-9]+$/;
        const dataWithSpaces = invalidValues.dataWithSpaces; 
        const invalidData = invalidValues.invalidData;

        await expect(profilePage.minimumOrderCostTitle).toBeDisplayed();
        await expect(profilePage.minimumOrderCostTitle).toHaveText(validValues.minimumOrderCostTitle);
        await expect(profilePage.minimumOrderCostInput).toHaveAttr('placeholder', validValues.minimumOrderCostInputText);

        await profilePage.minimumOrderCostInput.setValue(randomNumber);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toMatch(regexDigits);

        await profilePage.minimumOrderCostInput.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, `${randomNumber}`);

        await profilePage.minimumOrderCostInput.click();
        await browser.keys(['Control', 'v']); 

        await expect(await profilePage.minimumOrderCostInput.getValue()).toMatch(regexDigits);

        for (let data of dataWithSpaces) {
            await profilePage.minimumOrderCostInput.clearValue();
            await profilePage.minimumOrderCostInput.setValue(data);
    
            const cleanedValue = data.replace(/\s+/g, '');
            const inputValue = await profilePage.minimumOrderCostInput.getValue();
            await expect(inputValue).toEqual(cleanedValue);
    
            await profilePage.minimumOrderCostInput.clearValue();
        
            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, data);
    
            await profilePage.minimumOrderCostInput.click();
            await browser.keys(['Control', 'v']); 

            const pastedValue = await profilePage.minimumOrderCostInput.getValue();
            await expect(pastedValue).toEqual(cleanedValue); 
        }
    
        for (let data of invalidData) {
            await profilePage.minimumOrderCostInput.clearValue();
            await profilePage.minimumOrderCostInput.setValue(data);
    
            const inputValue = await profilePage.minimumOrderCostInput.getValue();
            await expect(inputValue).toEqual(''); 
    
            await profilePage.minimumOrderCostInput.clearValue();

            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, data);
    
            await profilePage.minimumOrderCostInput.click();
            await browser.keys(['Control', 'v']); 

            const pastedValue = await profilePage.minimumOrderCostInput.getValue();
            await expect(pastedValue).toEqual(''); 
        }

        await profilePage.minimumOrderCostInput.clearValue();
        await profilePage.minimumOrderCostInput.setValue(randomNumber);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toMatch(regexDigits);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toEqual(`${randomNumber}`);

        await profilePage.minimumOrderCostInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, `${randomNumber}`);

        await profilePage.minimumOrderCostInput.click();
        await browser.keys(['Control', 'v']); 

        await expect(await profilePage.minimumOrderCostInput.getValue()).toMatch(regexDigits);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toEqual(`${randomNumber}`);

        await expect(profilePage.currencyField).toHaveAttr('value', validValues.currencyFieldValue);
    });
});

