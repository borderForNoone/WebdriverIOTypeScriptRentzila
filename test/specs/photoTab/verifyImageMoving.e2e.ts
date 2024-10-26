import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../helpers/profileHelper';
import { pullSecondImageToFirstImage } from '../../helpers/profileHelper';

describe('Verify image moving', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
    });

    it('id:C594 - Verify image moving', async () => {
        const sourceImage = profilePage.imageContainers[1]; 
        const targetImage = profilePage.imageContainers[0];  

        const sourceImageBefore = await sourceImage.getAttribute('src');
        const targetImageBefore = await targetImage.getAttribute('src');

        await pullSecondImageToFirstImage();

        const sourceImageAfter = await sourceImage.getAttribute('src');
        const targetImageAfter = await targetImage.getAttribute('src');

        await expect(sourceImageAfter).toEqual(targetImageBefore);
        await expect(targetImageAfter).toEqual(sourceImageBefore);
    });
});