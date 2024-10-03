import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import path = require('path');
import fs = require('fs');

const imageDir = path.join(__dirname, '../../images/validImages'); 
let files: string[] = [];

describe('id:C594 - Verify image moving', () => {
    before(async () => {
        files = fs.readdirSync(imageDir)
            .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) 
            .map(file => path.join(imageDir, file)); 

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

        const remoteFilePaths = [];
        for (const file of files) {
            const remoteFilePath = await browser.uploadFile(file);
            remoteFilePaths.push(remoteFilePath);
        }

        for(let i = 0; i < 2; i++) {
            await input.setValue(remoteFilePaths[i]); 
        }
    });

    it('1. Pull not first image into "ГОЛОВНЕ" socket and check that those images switched places', async () => {
        const sourceImage = profilePage.imageContainers[1]; 
        const targetImage = profilePage.imageContainers[0];  

        const sourceImageBefore = await sourceImage.getAttribute('src');
        const targetImageBefore = await targetImage.getAttribute('src');

        const sourceLocation = await sourceImage.getLocation();
        const targetLocation = await targetImage.getLocation();

        const sourceSize = await sourceImage.getSize();
        const targetSize = await targetImage.getSize();

        const sourceCenterX = Math.round(sourceLocation.x + sourceSize.width / 2);
        const sourceCenterY = Math.round(sourceLocation.y + sourceSize.height / 2);
        const targetCenterX = Math.round(targetLocation.x + targetSize.width / 2);
        const targetCenterY = Math.round(targetLocation.y + targetSize.height / 2);

        await browser.performActions([{
            type: 'pointer',
            id: 'dragPointer',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: sourceCenterX, y: sourceCenterY }, 
                { type: 'pointerDown', button: 0 },  
                { type: 'pointerMove', duration: 500, x: targetCenterX, y: targetCenterY },  
                { type: 'pointerUp', button: 0 }  
            ]
        }]);

        const sourceImageAfter = await sourceImage.getAttribute('src');
        const targetImageAfter = await targetImage.getAttribute('src');

        await expect(sourceImageAfter).toEqual(targetImageBefore);
        await expect(targetImageAfter).toEqual(sourceImageBefore);
    });
});