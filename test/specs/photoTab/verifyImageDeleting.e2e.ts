import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { validValues } from '../../constants/validValues';
import { createUnitFillingInSectionsWithEightPhotos } from '../../helpers/profileHelper';

describe('Verify image deleting', () => {
    before(async () => {
        await createUnitFillingInSectionsWithEightPhotos();
    });

    it('id:C595 - Verify image deleting', async () => {
        const firstFourElementsY = [];
        const lastFourElementsY = [];

        for (let i = 0; i < 4; i++) {
            const location = await profilePage.imageContainers[i].getLocation();
            firstFourElementsY.push(location.y);
        }

        for (let i = 4; i < 8; i++) {
            const location = await profilePage.imageContainers[i].getLocation();
            lastFourElementsY.push(location.y);
        }

        for (let i = 0; i < 4; i++) {
            await expect(lastFourElementsY[i]).toBeGreaterThan(firstFourElementsY[i]);
        }

        for(let i = 0; i < 8; i++) {
            await profilePage.imageContainers[i].moveTo(); 
            await expect(profilePage.deleteImageIcons[i]).toBeDisplayed();
        }

        for(let i = 0; i < 8; i++) {
            await profilePage.imageContainers[0].moveTo(); 
            await profilePage.deleteImageIcons[0].click()
        }

        await expect(profilePage.images[0]).not.toHaveAttr('src', validValues.srcImageValue);
    });
});