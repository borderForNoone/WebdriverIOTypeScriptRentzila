import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';

describe('id:C488 - Verify ""Назад"" button', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify ""Назад"" button', async () => {
        await expect(profilePage.prevButton).toHaveText(/Назад/);
        
        if (await profilePage.telegramCrossButton.isDisplayed()) {
            await profilePage.telegramCrossButton.click();
        } 
        await profilePage.prevButton.click();
        for(let i = 0; i < 5; i++) {
            if(i === 2) {
                continue;
            }
            await expect(profilePage.tabNumbers[i]).not.toHaveAttr('class', /CustomLabel_labelActive/);
        }
    });
});