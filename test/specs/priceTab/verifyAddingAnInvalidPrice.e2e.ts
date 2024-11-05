import { expect } from '@wdio/globals';
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';
import { errorMessages } from '../../../constants/errorMessages';
import { Key } from 'webdriverio';

describe('id:C596 - Verify adding an invalid price in the "Вартість мінімального замовлення *" input', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify adding an invalid price in the "Вартість мінімального замовлення *" input', async () => {
        await profilePage.minimumOrderCostInput.setValue(0);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toEqual('');

        await profilePage.minimumOrderCostInput.setValue(1);
        await expect(await profilePage.minimumOrderCostInput.getValue()).toEqual('1');

        if (await profilePage.telegramCrossButton.isDisplayed()) {
            await profilePage.telegramCrossButton.click();
        }
        await profilePage.nextButton.click();
        await expect(profilePage.minimumOrderCostInputErrorMessage).toHaveText(errorMessages.minimumOrderCostInputErrorMessage);
        await expect(profilePage.minimumOrderCostField).toHaveAttr('class', errorMessages.minimumOrderCostField);

        await profilePage.minimumOrderCostInput.click();
        await browser.keys([Key.Ctrl, 'a', Key.Backspace]);
        await expect(profilePage.minimumOrderCostInputErrorMessage).toHaveText(errorMessages.minimumOrderCostInputWarnMessage);
        await expect(profilePage.minimumOrderCostField).toHaveAttr('class', errorMessages.minimumOrderCostField);

        await profilePage.minimumOrderCostInput.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, `1000`);

        await profilePage.minimumOrderCostInput.click();
        await browser.keys(['Control', 'v']);

        await expect(profilePage.minimumOrderCostField).not.toHaveAttr('class', errorMessages.minimumOrderCostField);
    });
});

