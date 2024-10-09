import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('id:C296 - Verify category (Категорія) section', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check title to be visible, have valid text and "" * "" after it. Check input field to have valid background text and to contain arrow in the right side of field.', async () => {
        await expect(profilePage.categoryTitle).toBeDisplayedInViewport();
        await expect(await profilePage.categoryTitle.getText()).toMatch(/Категорія \*/);
        await expect(profilePage.categorySelectText).toHaveText(/Виберіть категорію/);
        await expect(profilePage.categorySideArrow).toBeDisplayed();
    });

    it('2. Click on [nextButton] button.', async () => {
        await profilePage.nextButton.click();
        await expect(profilePage.categoryField).toHaveAttr('class', /CategorySelect_error/);
        await expect(profilePage.categoryFieldErrorMessage).toBeDisplayed();
    });

    it('3. Click on input field. Check that appeared pop-up header contains title with valid text and [close] button. Click on [close] button. Check that pop-up closed.', async () => {
        await profilePage.categoryField.click();
        await expect(profilePage.categoryPopupTitle).toBeDisplayed();
        await expect(profilePage.categoryPopupTitle).toHaveText(/Вибір категорії технічного засобу/);
        await expect(profilePage.closeButton).toBeDisplayed();
        await profilePage.closeButton.click();

        await expect(profilePage.categoryPopupTitle).not.toBeDisplayed();
    });

    it('4. Click on input field. Click outside of pop-up. Check that pop-up closed.', async () => {
        await profilePage.categoryField.click();

        await browser.execute(() => {
            const element = document.elementFromPoint(0, 0) as HTMLElement;
            element?.click();
        });
    
        await expect(profilePage.categoryPopupTitle).not.toBeDisplayed();
    });

    it('5. Click on input field.', async () => {
        await profilePage.categoryField.click();

        await expect(profilePage.firstColumnElements[0]).toHaveText(/Будівельна техніка/);
        await profilePage.firstColumnElements[0].click();
        await expect(profilePage.secondColumnElements[0]).toHaveText(/Бурові установки/);
        await profilePage.secondColumnElements[0].click();
        await expect(profilePage.thirdColumnElements[0]).toHaveText(/палебійні установки/);
        await profilePage.thirdColumnElements[0].click();

        await expect(profilePage.categorySelectText).toHaveText(/палебійні установки/);
        await profilePage.categorySelectText.click();
        
        for (let i = 0; i < await profilePage.firstColumnElements.length; i++) {
            const firstColumnElement = profilePage.firstColumnElements[i];
    
            await firstColumnElement.click();
        
            for (let j = 0; j < await profilePage.secondColumnElements.length; j++) {
                const secondColumnElement = profilePage.secondColumnElements[j];
        
                await secondColumnElement.click();
        
                for (let k = 0; k < await profilePage.thirdColumnElements.length; k++) {
                    const thirdColumnElement = profilePage.thirdColumnElements[k];
                    let expectedText = await thirdColumnElement.getText();
        
                    await thirdColumnElement.click();
        
                    let actualText = await profilePage.categorySelectText.getText();
                    await expect(actualText.toLowerCase()).toEqual(expectedText.toLowerCase());;
                    await profilePage.categorySelectText.click();
                }
            }
        }
    });
});