import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { validValues } from '../../../constants/validValues';
import { createUnitFillingInFirstSection } from '../../../helpers/profileHelper';
import { makeInputForImagesVisible } from '../../../helpers/profileHelper';
import path = require('path');
import fs = require('fs');

const imageDir = path.join(__dirname, '../../../images/validImages'); 
let files: string[] = [];

describe('Verify image uploading', () => {
    before(async () => {
        files = fs.readdirSync(imageDir)
            .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) 
            .map(file => path.join(imageDir, file)); 

        await createUnitFillingInFirstSection();
    });

    it('id:C593 - Verify image uploading', async () => {
        await expect(profilePage.imageUploadTitle).toBeDisplayed();
        await expect(profilePage.imageUploadTitle).toHaveText(validValues.imageUploadTitle);
        await expect(profilePage.imageDivClueText).toHaveText(validValues.imageDivClueText);
  
        for(let i = 0; i < 4; i++) {
            await expect(profilePage.imageContainers[i]).toBeClickable();
        }

        await makeInputForImagesVisible();
        
        await profilePage.addImagesDiv.waitForDisplayed({ timeout: 5000 });
        await profilePage.imageInput.waitForEnabled({ timeout: 5000 });

        const remoteFilePaths = [];
        for (const file of files) {
            const remoteFilePath = await browser.uploadFile(file);
            remoteFilePaths.push(remoteFilePath);
        }

        for (const remoteFilePath of remoteFilePaths) {
            await profilePage.imageInput.setValue(remoteFilePath); 
        }

        await expect(profilePage.imageContainers[0]).toHaveText(validValues.imageFirstContainerText);
    });
});