import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';

describe('id:C637 - Verify UI of the "Вартість Ваших послуг *" section', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
        await profilePage.nextButton.click();

        await profilePage.serviceInput.setValue(validValues.serviceName);
        await profilePage.servicesToChoose[0].click();
        await profilePage.nextButton.click();
    });

    it('Verify UI of the "Вартість Ваших послуг *" section', async () => {
        await expect(profilePage.priceForServiceTitle).toHaveText(/Вартість Ваших послуг \*/);
        await expect(profilePage.clueLine).toHaveText(/За бажанням Ви можете додати вартість конкретних послуг, які надає технічний засіб/);

        await expect(profilePage.addPriceButton).toHaveText(/Додати вартість/);
        await expect(profilePage.addPriceButton).toHaveElementProperty('innerHTML', expect.stringContaining('<svg'));

        await expect(profilePage.addPriceField).toHaveText(new RegExp(validValues.serviceName));

        await profilePage.addPriceButton.click();
        await expect(profilePage.addPriceButton).not.toBeDisplayed();
        await expect(profilePage.deleteButton).toBeDisplayed();
        await expect(profilePage.addPriceInput).toBeDisplayed();
        await expect(profilePage.addPriceSelectField).toBeDisplayed();
        await expect(profilePage.addPriceInputField).toHaveAttr('placeholder', /Наприклад, 1000/);
        await expect(profilePage.addPriceDigits).toHaveAttr('value', validValues.currencyFieldValue);
        await expect(profilePage.perUnitField).toHaveText(/година/);
    });
});