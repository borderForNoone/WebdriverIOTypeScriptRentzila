import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../../constants/endpoints';
import { validValues } from '../../../constants/validValues';
import { createUnitFillingInFirstSection } from '../../../helpers/profileHelper';

describe('Verify "Назад" button', () => {
    before(async () => {
        await createUnitFillingInFirstSection();
    });

    it('id:C390 - Verify "Назад" button', async () => {
        await expect(profilePage.prevButton).toHaveText(validValues.profilePagePrevButtonText);

        await profilePage.prevButton.click();

        await expect(profilePage.tabNumbers[0]).toHaveAttr('class', endpoints.lableActive);
        for (let i = 1; i < 5; i++) {
            await expect(profilePage.tabNumbers[i]).not.toHaveAttr('class', endpoints.lableActive);
        }
    });
});