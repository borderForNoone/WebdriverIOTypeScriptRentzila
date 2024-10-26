import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import path = require('path');

const filePath = path.join(__dirname, '../../images/image.jpg');
const service = 'as';

xdescribe('id:C482 - Verify adding price for service', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();

        await profilePage.categoryField.click();
        await profilePage.firstColumnElements[0].click();
        await profilePage.secondColumnElements[0].click();
        await profilePage.thirdColumnElements[0].click();

        await profilePage.unitNameInputField.clearValue();
        await profilePage.unitNameInputField.setValue(faker.string.alpha(10));

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue('ABC');

        await profilePage.dropdownOptions[0].click();

        await profilePage.selectOnMapButton.click();
        const { width, height } = await browser.getWindowRect();

        const x = Math.floor(width / 2) - 20;
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

        await browser.pause(1000);
        await profilePage.nextButton.click();

        const input = profilePage.imageInput;
        const remoteFilePath = await browser.uploadFile(filePath);
    
        await browser.execute(() => {
            const element = document.querySelector('[data-testid="input_ImagesUnitFlow"]') as HTMLElement;
            if (element) {
                element.style.display = 'block';
                element.style.visibility = 'visible'; 
                element.style.opacity = '1'; 
            }
        });
    
        await input.setValue(remoteFilePath); 
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(service);
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