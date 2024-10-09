import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import path = require('path');
import fs = require('fs');

const imageDir = path.join(__dirname, '../../images/validImages'); 
let files: string[] = [];

describe('id:C595 - Verify image deleting', () => {
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

        for(let i = 0; i < 8; i++) {
            await input.setValue(remoteFilePaths[i]); 
        }
    });

    it('2. Click on evry image delete button and check that they deleting', async () => {
        const firstFourElementsY = [];
        const lastFourElementsY = [];

        for (let i = 0; i < 4; i++) {
            const location = await profilePage.imageContainers[i].getLocation();
            firstFourElementsY.push(location.y);
        }

        for (let i = 4; i < 8; i++) {
            const location = await profilePage.imageContainers[i].getLocation();
            lastFourElementsY.push(location.y);
        }

        for (let i = 0; i < 4; i++) {
            await expect(lastFourElementsY[i]).toBeGreaterThan(firstFourElementsY[i]);
        }

        for(let i = 0; i < 8; i++) {
            await profilePage.imageContainers[i].moveTo(); 
            await expect(profilePage.deleteImageIcons[i]).toBeDisplayed();
        }

        for(let i = 0; i < 8; i++) {
            await profilePage.imageContainers[0].moveTo(); 
            await profilePage.deleteImageIcons[0].click()
        }

        await expect(profilePage.imageContainers[0]).not.toHaveAttr('src', /data:image/);
    });
});