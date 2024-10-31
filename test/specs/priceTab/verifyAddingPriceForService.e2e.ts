import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';

describe('id:C482 - Verify adding price for service', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify adding price for service', async () => {
        await expect(profilePage.priceForServiceTitle).toHaveText(/Вартість Ваших послуг/);
        await expect(profilePage.clueLine).toHaveText(/За бажанням Ви можете додати вартість конкретних послуг, які надає технічний засіб/);

        await expect(profilePage.addPriceButton).toHaveText(/Додати вартість/);
        await expect(profilePage.addPriceButton).toHaveElementProperty('innerHTML', expect.stringContaining('<svg'));
        await profilePage.addPriceButton.click();
        await expect(profilePage.addPriceButton).not.toBeDisplayed();
        await expect(profilePage.addPriceInput).toBeDisplayed();
        await expect(profilePage.addPriceSelectField).toBeDisplayed();

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

        const dataWithSpaces = ['123 456', '123456 ']; 
        const invalidData = [' ', 'abc', '!@#$%.,'];

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

        await profilePage.addPriceInput.clearValue();
        const randomEightDigitNumber = Math.floor(10000000 + Math.random() * 90000000);
        await profilePage.addPriceInput.setValue(randomEightDigitNumber);
        const inputValue = await profilePage.addPriceInput.getValue();
        await expect(inputValue).toEqual(`${randomEightDigitNumber}`); 
        
        await profilePage.addPriceInput.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, `${randomEightDigitNumber}`);

        await profilePage.addPriceInput.click();
        await browser.keys(['Control', 'v']); 

        await expect(inputValue).toEqual(`${randomEightDigitNumber}`); 

        await expect(profilePage.addPriceDigits).toHaveAttr('value', /UAH/);

        await expect(profilePage.perUnitField).toHaveText(/година/);
        await expect(profilePage.perUnitArrow).toBeDisplayed();

        const expectedVariants = [
            "година",
            "зміна",
            "тонна",
            "гектар",
            "метр кв.",
            "метр куб.",
            "Кілометр"
        ];
        
        for(let i = 0; i < expectedVariants.length; i++) {
            await profilePage.perUnitField.click();
            await expect(expectedVariants[i]).toEqual(await profilePage.perUnitDropdownVariants[i].getText());
            await profilePage.perUnitDropdownVariants[i].click();
            await expect(profilePage.perUnitField).toHaveText(new RegExp(expectedVariants[i]));
        }

        await profilePage.perUnitField.click();
        await profilePage.perUnitDropdownVariants[1].click();
        await expect(profilePage.workingShiftField).toHaveText(/8 год/)
        await expect(profilePage.workingShiftArrow).toBeDisplayed();

        const expectedVariantsForWorkingShift = [
            "8 год",
            "4 год"
        ];
        
        for(let i = 0; i < expectedVariantsForWorkingShift.length; i++) {
            await profilePage.workingShiftField.click();
            await expect(expectedVariantsForWorkingShift[i]).toEqual(await profilePage.workingShiftDropdownVariants[i].getText());
            await profilePage.workingShiftDropdownVariants[i].click();
            await expect(profilePage.workingShiftField).toHaveText(new RegExp(expectedVariantsForWorkingShift[i]));
        }

        await profilePage.deleteButton.click();
        await expect(profilePage.deleteButton).not.toBeDisplayed();
    });
});