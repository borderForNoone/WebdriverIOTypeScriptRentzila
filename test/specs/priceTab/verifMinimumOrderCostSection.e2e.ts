import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import path = require('path');

const filePath = path.join(__dirname, '../../images/image.jpg');
const service = 'as';

xdescribe('id:C418 - Verify ""Вартість мінімального замовлення"" section', () => {
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

    it('Verify ""Вартість мінімального замовлення"" section', async () => {
        const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
        const regexDigits = /^[0-9]+$/;
        const dataWithSpaces = ['123 456', '123456 ']; 
        const invalidData = [' ', 'abc', '!@#$%.,'];

        await expect(profilePage.minimumOrderCostTitle).toBeDisplayed();
        await expect(profilePage.minimumOrderCostTitle).toHaveText(/Вартість мінімального замовлення \*/);
        await expect(profilePage.minimumOrderCostInput).toHaveAttr('placeholder', /Наприклад, 1000/);

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

        await expect(profilePage.currencyField).toHaveAttr('value', /UAH/);
    });
});

