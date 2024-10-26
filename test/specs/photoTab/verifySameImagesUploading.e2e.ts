import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { validValues } from '../../constants/validValues';
import { errorMessages } from '../../constants/errorMessages';
import { createUnitFillingInFirstSection } from '../../helpers/profileHelper';
import { makeInputForImagesVisible } from '../../helpers/profileHelper';
import { clickOutsideOfPopUp } from '../../helpers/profileHelper';
import path = require('path');

const filePath = path.join(__dirname, '../../../images/image.jpg');

describe('Verify same images uploading', () => {
    before(async () => {
        await createUnitFillingInFirstSection();
    });

    it('id:C384 - Verify same images uploading', async () => {
        const remoteFilePath = await browser.uploadFile(filePath);
    
        await makeInputForImagesVisible();
        
        await profilePage.addImagesDiv.waitForDisplayed({ timeout: 5000 });
        await profilePage.imageInput.waitForEnabled({ timeout: 5000 });
    
        await profilePage.imageInput.setValue(remoteFilePath); 
        await profilePage.imageInput.setValue(remoteFilePath); 
    
        await expect(profilePage.popUpWarningText).toBeDisplayed();
        await expect(profilePage.popUpWarningText).toHaveText(errorMessages.profilePagePopUpWarningText);

        await profilePage.popUpCloseIcon.click();
        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.images[0]).toHaveAttr('src', validValues.srcImageValue);
        await expect(profilePage.images[1]).not.toHaveAttr('src', validValues.srcImageValue);

        await profilePage.imageInput.setValue(remoteFilePath); 

        await expect(profilePage.saveBtn).toHaveText(validValues.profilePageSaveBtnText);
        await profilePage.saveBtn.click();
        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.images[0]).toHaveAttr('src', validValues.srcImageValue);
        await expect(profilePage.images[1]).not.toHaveAttr('src', validValues.srcImageValue);

        await profilePage.imageInput.setValue(remoteFilePath); 

        await clickOutsideOfPopUp();

        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.images[0]).toHaveAttr('src', validValues.srcImageValue);
        await expect(profilePage.images[1]).not.toHaveAttr('src', validValues.srcImageValue);
    });
});