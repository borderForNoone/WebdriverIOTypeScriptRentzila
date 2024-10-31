import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';

describe('id:C489 - Verify ""Далі"" button', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify ""Далі"" button', async () => {
        await expect(profilePage.nextButton).toHaveText(/Далі/);

        if (await profilePage.telegramCrossButton.isDisplayed()) {
            await profilePage.telegramCrossButton.click();
        } 
        await profilePage.nextButton.click();
        await expect(profilePage.minimumOrderCostField).toHaveAttr('class', /inputWrapperError/);
        await expect(profilePage.minimumOrderCostInputErrorMessage).toHaveText(/Це поле обов’язкове/);

        const randomEightDigitNumber = Math.floor(10000000 + Math.random() * 90000000);
        await profilePage.addPriceInput.setValue(randomEightDigitNumber);
        const inputValue = await profilePage.addPriceInput.getValue();
        await expect(inputValue).toEqual(`${randomEightDigitNumber}`); 

        if (await profilePage.telegramCrossButton.isDisplayed()) {
            await profilePage.telegramCrossButton.click();
        } 
        await profilePage.nextButton.click();
        for(let i = 0; i < 5; i++) {
            if(i === 4) {
                continue;
            }
            await expect(profilePage.tabNumbers[i]).not.toHaveAttr('class', /CustomLabel_labelActive/);
        }
    });
});