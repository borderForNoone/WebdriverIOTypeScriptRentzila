import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import { Key } from 'webdriverio'
import path = require('path');

const filePath = path.join(__dirname, '../../images/image.jpg');
const service = 'as';

describe('id:C596 - Verify adding an invalid price in the "Вартість мінімального замовлення *" input', () => {
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

    it('Verify adding an invalid price in the "Вартість мінімального замовлення *" input', async () => {
        await profilePage.minimumOrderCostInput.setValue(0);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toEqual('');

        await profilePage.minimumOrderCostInput.setValue(1);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toEqual('1');

        await profilePage.nextButton.click();
        await expect(profilePage.minimumOrderCostInputErrorMessage).toHaveText(/Мінімальна вартiсть має бути не менше 1000 грн/);
        await expect(profilePage.minimumOrderCostField).toHaveAttr('class', /inputWrapperError/);

        await profilePage.minimumOrderCostInput.click();
        await browser.keys([Key.Ctrl, 'a', Key.Backspace]);
        await expect(profilePage.minimumOrderCostInputErrorMessage).toHaveText(/Це поле обов’язкове/);
        await expect(profilePage.minimumOrderCostField).toHaveAttr('class', /inputWrapperError/);
        
        await profilePage.minimumOrderCostInput.addValue(1000);
        await expect(profilePage.minimumOrderCostInputErrorMessage).not.toBeDisplayed();
        await expect(profilePage.minimumOrderCostField).not.toHaveAttr('class', /inputWrapperError/);
    });
});

