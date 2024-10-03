import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';    
import path = require('path');

const filePath = path.join(__dirname, '../../images/image.jpg');

describe('id:C384 - Verify same images uploading', () => {
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
        
    });

    it('1. Upload two same images.', async () => {
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
        
        await profilePage.addImagesDiv.waitForDisplayed({ timeout: 5000 });
        await input.waitForDisplayed({ timeout: 5000 });
        await input.waitForEnabled({ timeout: 5000 });
    
        await input.setValue(remoteFilePath); 
        await input.setValue(remoteFilePath); 
    
        await expect(profilePage.popUpWarningText).toBeDisplayed();
        await expect(profilePage.popUpWarningText).toHaveText(/Ви не можете завантажити двічі один файл/);
    });

    it('2. Click [cross] button.', async () => {
        await profilePage.popUpCloseIcon.click();
        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.imageContainers[0]).toHaveAttr('src', /data:image/);
        await expect(profilePage.imageContainers[1]).not.toHaveAttr('src', /data:image/);
    });

    it('3. Upload two same pictures. Click on [saveBtn] button.', async () => {
        const input = profilePage.imageInput;
        const remoteFilePath = await browser.uploadFile(filePath);

        await input.setValue(remoteFilePath); 

        await expect(profilePage.saveBtn).toHaveText(/Зрозуміло/);
        await profilePage.saveBtn.click();
        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.imageContainers[0]).toHaveAttr('src', /data:image/);
        await expect(profilePage.imageContainers[1]).not.toHaveAttr('src', /data:image/);
    });

    it('4. Upload two same pictures. Click outside of pop-up.', async () => {
        const input = profilePage.imageInput;
        const remoteFilePath = await browser.uploadFile(filePath);

        await input.setValue(remoteFilePath); 

        await browser.performActions([{
            type: 'pointer',
            id: 'pointer1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: 0, y: 0 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.imageContainers[0]).toHaveAttr('src', /data:image/);
        await expect(profilePage.imageContainers[1]).not.toHaveAttr('src', /data:image/);
    });
});