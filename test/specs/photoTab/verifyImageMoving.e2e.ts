import { expect } from '@wdio/globals'
import profilePage from '../../pageobjects/profile.page';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { pullSecondImageToFirstImage } from '../../../helpers/profileHelper';

describe('Verify image moving', () => {
    before(async () => {
        await createUnitFillingInSectionsWithTwoPhotos();
    });

    it('id:C594 - Verify image moving', async () => {
        const sourceImageBefore = await profilePage.imageContainers[1].getAttribute('src');
        const targetImageBefore = await profilePage.imageContainers[1].getAttribute('src');

        await pullSecondImageToFirstImage();

        const sourceImageAfter = await profilePage.imageContainers[1].getAttribute('src');
        const targetImageAfter = await profilePage.imageContainers[0].getAttribute('src');

        await expect(sourceImageAfter).toEqual(targetImageBefore);
        await expect(targetImageAfter).toEqual(sourceImageBefore);
    });
});