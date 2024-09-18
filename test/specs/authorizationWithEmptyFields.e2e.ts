import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page';

describe('id:C200 - Authorization with empty fields', () => {
    it('1. Click on the "Увійти" at the bottom of the form with all fields empty.', async () => {
        await homePage.clickLoginButton();
        await homePage.submitButton.click();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.errorPopupLoginMessages[0]).toBeDisplayed();
        await expect(homePage.errorPopupLoginMessages[1]).toBeDisplayed();
        await expect(homePage.errorPopupLoginInputFields[0]).toBeDisplayed();
        await expect(homePage.errorPopupLoginInputFields[1]).toBeDisplayed();
    });

    
});

