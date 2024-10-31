import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';

describe('id:C417 - Verify ""Спосіб оплати"" section', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify ""Спосіб оплати"" section', async () => {
        await expect(profilePage.paymentMethodTitle).toBeDisplayed();
        await expect(profilePage.paymentMethodTitle).toHaveText(/Спосіб оплати \*/);
        await expect(profilePage.paymentMethodDropdown).toHaveText(/Готівкою \/ на картку/);

        await profilePage.paymentMethodDropdown.click();
        await expect(profilePage.dropdownVariants[0]).toHaveText(/Готівкою \/ на картку/);
        await expect(profilePage.dropdownVariants[1]).toHaveText("Безготівковий розрахунок (без ПДВ)");
        await expect(profilePage.dropdownVariants[2]).toHaveText("Безготівковий розрахунок (з ПДВ)");

        await profilePage.dropdownVariants[2].click();
        await expect(profilePage.paymentMethodDropdown).toHaveText(/Безготівковий розрахунок \(з ПДВ\)/);

        await profilePage.paymentMethodDropdown.click();
        await profilePage.dropdownVariants[1].click();
        await expect(profilePage.paymentMethodDropdown).toHaveText(/Безготівковий розрахунок \(без ПДВ\)/);

        await profilePage.paymentMethodDropdown.click();
        await profilePage.dropdownVariants[0].click();
        await expect(profilePage.paymentMethodDropdown).toHaveText(/Готівкою \/ на картку/);
    });
});

