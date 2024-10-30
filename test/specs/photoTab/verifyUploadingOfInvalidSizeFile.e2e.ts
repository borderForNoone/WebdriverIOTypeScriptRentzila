import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { validValues } from '../../../constants/validValues';
import { errorMessages } from '../../../constants/errorMessages';
import { createUnitFillingInFirstSection } from '../../../helpers/profileHelper';   
import { makeInputForImagesVisible } from '../../../helpers/profileHelper'; 
import { clickOutsideOfPopUp } from '../../../helpers/profileHelper';
import path = require('path');

const filePath = path.join(__dirname, '../../../images/SamplePNGImage30mbmb.png');

describe('Verify uploading of invalid size file', () => {
    before(async () => {
        await createUnitFillingInFirstSection();
    });

    it('id:C405 - Verify uploading of invalid size file', async () => {
        const remoteFilePath = await browser.uploadFile(filePath);
    
        await makeInputForImagesVisible();
        
        await profilePage.addImagesDiv.waitForDisplayed({ timeout: 5000 });
        await profilePage.imageInput.waitForEnabled({ timeout: 5000 });
    
        await profilePage.imageInput.setValue(remoteFilePath); 
    
        await expect(profilePage.popUpWarningText).toBeDisplayed();
        await expect(profilePage.popUpWarningText).toHaveText(errorMessages.profilePagePopUpFileSizeErrorText);

        await profilePage.popUpCloseIcon.click();
        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.imageContainers[0]).not.toHaveAttr('src', validValues.srcImageValue);

        await profilePage.imageInput.setValue(remoteFilePath); 
        
        await expect(profilePage.saveBtn).toHaveText(validValues.profilePageSaveBtnText);
        await profilePage.saveBtn.click();
        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.imageContainers[0]).not.toHaveAttr('src', validValues.srcImageValue);
  
        await profilePage.imageInput.setValue(remoteFilePath); 

        await clickOutsideOfPopUp();

        await expect(profilePage.popUpWarningText).not.toBeDisplayed();
        await expect(profilePage.imageContainers[0]).not.toHaveAttr('src', validValues.srcImageValue);
    });
});