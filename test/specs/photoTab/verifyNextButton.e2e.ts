import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../../constants/endpoints';
import { validValues } from '../../../constants/validValues';
import { errorMessages } from '../../../constants/errorMessages';
import { createUnitFillingInFirstSection } from '../../../helpers/profileHelper';
import { makeInputForImagesVisible } from '../../../helpers/profileHelper';
import path = require('path');

const filePath = path.join(__dirname, '../../../images/image.jpg');

describe('Verify "Далі" button', () => {
    before(async () => {
        await createUnitFillingInFirstSection();
    });

    it('id:C393 - Verify "Далі" button', async () => {
        await expect(profilePage.nextButton).toHaveText(validValues.photoTabNextButtonText);

        await profilePage.nextButton.click();

        await expect(profilePage.addImagesDiv).toBeDisplayed();
        await expect(profilePage.imageDivClueText).toHaveAttr('class', errorMessages.profilePageImageDivClueText);
    
        const remoteFilePath = await browser.uploadFile(filePath);
    
        await makeInputForImagesVisible();
        
        await profilePage.addImagesDiv.waitForDisplayed({ timeout: 5000 });
        await profilePage.imageInput.waitForEnabled({ timeout: 5000 });
    
        await profilePage.imageInput.setValue(remoteFilePath); 

        await profilePage.nextButton.click();

        await expect(profilePage.servisesBodyTabContainer).toHaveText(validValues.firstServisesBodyTabContainerText);
        await expect(profilePage.servisesBodyTabContainer).toHaveText(validValues.secondServisesBodyTabContainerText);
        await expect(profilePage.servisesBodyTabContainer).toHaveText(validValues.thirdServisesBodyTabContainerText);
        await expect(profilePage.servisesBodyTabContainer).toHaveText(validValues.fourthServisesBodyTabContainerText);
        await expect(profilePage.servisesBodyTabContainer).toHaveText(validValues.fifthServisesBodyTabContainerText);
        await expect(profilePage.servisesBodyTabContainer).toHaveText(validValues.sixthServisesBodyTabContainerText);
        
        await expect(profilePage.tabNumbers[2]).toHaveAttr('class', endpoints.lableActive);
        for(let i = 0; i < 5; i++) {
            if(i === 2) {
                continue;
            }
            await expect(profilePage.tabNumbers[i]).not.toHaveAttr('class', endpoints.lableActive);
        }
    });
});