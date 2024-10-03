import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';
import path = require('path');
import fs = require('fs');

const imageDir = path.join(__dirname, '../../images/validImages'); 
let files: string[] = [];

describe('id:C593 - Verify image uploading', () => {
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
    });

    it('1. Check image upload title to be visible, have valid text and "*" after it. Check image upload clue line to be visible and have valid text.', async () => {
        await expect(profilePage.imageUploadTitle).toBeDisplayed();
        await expect(profilePage.imageUploadTitle).toHaveText(/Фото технічного засобу \*/)
        await expect(profilePage.imageDivClueText).toHaveText(/Додайте в оголошення від 1 до 12 фото технічного засобу розміром до 20 МВ у форматі .jpg, .jpeg, .png. Перше фото буде основним./)
    });

    it('2. Click on element of image uploading panel and check reaction. Repeat with all elements.', async () => {
        for(let i = 0; i < 4; i++) {
            await expect(profilePage.imageContainers[i]).toBeClickable();
        }
    });

    it('3. Click on element of image uploading panel and upload up to 16 valid format images(.jpg, .png, .jpeg less than 20Mb).', async () => {
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

        for (const remoteFilePath of remoteFilePaths) {
            await input.setValue(remoteFilePath); 
        }

        await expect(profilePage.imageContainers[0]).toHaveText(/Головне/);
    });
});