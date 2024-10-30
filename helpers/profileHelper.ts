import homePage from '../test/pageobjects/home.page';
import profilePage from '../test/pageobjects/profile.page';
import { endpoints } from '../constants/endpoints';
import { validValues } from '../constants/validValues';
import { faker } from '@faker-js/faker';
import path = require('path');
import fs = require('fs');

const imageDir = path.join(__dirname, '../../images/validImages'); 
let files: string[] = [];

export async function createUnitFillingInSectionsWithEightPhotos() {
    files = fs.readdirSync(imageDir)
        .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()))
        .map(file => path.join(imageDir, file));

    await createUnitFillingInFirstSection();

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
    await input.waitForEnabled({ timeout: 5000 });

    const remoteFilePaths = [];
    for (const file of files) {
        const remoteFilePath = await browser.uploadFile(file);
        remoteFilePaths.push(remoteFilePath);
    }

    for (let i = 0; i < 8; i++) {
        await input.setValue(remoteFilePaths[i]);
    }
}

export async function createUnitFillingInSectionsWithTwoPhotos() {
    files = fs.readdirSync(imageDir)
        .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()))
        .map(file => path.join(imageDir, file));

    await createUnitFillingInFirstSection();

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
    await input.waitForEnabled({ timeout: 5000 });

    const remoteFilePaths = [];
    for (const file of files) {
        const remoteFilePath = await browser.uploadFile(file);
        remoteFilePaths.push(remoteFilePath);
    }

    for (let i = 0; i < 2; i++) {
        await input.setValue(remoteFilePaths[i]);
    }
}

export async function createUnitFillingInFirstSection() {
    await browser.url(endpoints.createUnitPage.url);
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
    await profilePage.vehicleManufacturerSectionInput.setValue(validValues.vehicleManufacturerSectionInputValue);

    await profilePage.dropdownOptions[0].click();

    await selectLocationOnMap();
    const expectedText = await profilePage.popupAddress.getText();

    await profilePage.confirmAdressButton.click();

    await expect(expectedText).toEqual(await profilePage.vehicleLocationDivisionInput.getText());

    await profilePage.nextButton.click();
}

export async function selectLocationOnMap() {
    await profilePage.selectOnMapButton.click();
    await expect(profilePage.popupAddress).toHaveText(validValues.popupAddress);

    const { x, y } = await profilePage.mapPopup.getLocation();
    const { width, height } = await profilePage.mapPopup.getSize();

    const centerX = Math.floor(x + width / 2);
    const centerY = Math.floor(y + height / 2 - 10);

    await browser.performActions([
        {
            type: 'pointer',
            id: 'mouse',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 500, x: centerX, y: centerY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 },
                { type: 'pause', duration: 2000 },
            ],
        },
    ]);
}

export async function clickOutsideOfPopUp() {
    await browser.performActions([{
        type: 'pointer',
        id: 'pointer1',
        parameters: { pointerType: 'mouse' },
        actions: [
            { type: 'pointerMove', duration: 500, x: 0, y: 0 },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerUp', button: 0 },
            { type: 'pause', duration: 2000 },
        ]
    }]);
}

export async function pullSecondImageToFirstImage() {
    const sourceImage = profilePage.imageContainers[1]; 
    const targetImage = profilePage.imageContainers[0];  

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
            { type: 'pointerMove', duration: 0, x: targetCenterX, y: targetCenterY },  
            { type: 'pointerUp', button: 0 },
            { type: 'pause', duration: 1000 }, 
        ]
    }]);
}

export async function makeInputForImagesVisible() {
    await browser.execute(() => {
        const element = document.querySelector('[data-testid="input_ImagesUnitFlow"]') as HTMLElement;
        if (element) {
            element.style.display = 'block';
            element.style.visibility = 'visible'; 
            element.style.opacity = '1'; 
        }
    });
}