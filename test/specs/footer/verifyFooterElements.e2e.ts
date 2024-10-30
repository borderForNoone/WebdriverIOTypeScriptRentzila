import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import privacyPolicyPage from '../../pageobjects/privacyPolicy.page';
import cookiePolicyPage from '../../pageobjects/cookiePolicy.page';
import termsConditionsPage from '../../pageobjects/termsConditions.page';
import advertsPage from '../../pageobjects/adverts.page';
import tendersPage from '../../pageobjects/tenders.page';
import { endpoints } from '../../../constants/endpoints';
import { validValues } from '../../../constants/validValues';

describe('Verify that all elements on the footer are displayed and all links are clickable', () => {
    it('id:C214 - Verify that all elements on the footer are displayed and all links are clickable', async () => {
        await homePage.scrollToFooter();
        await expect(await homePage.isFooterDisplayed()).toBe(true);
        await expect(await homePage.rentzilaFooterLogo.isClickable()).toBe(false);
   
        await expect(await homePage.aboutUsLable.isDisplayed()).toBe(true);
   
        await expect(await homePage.privacyPolicy.isDisplayed()).toBe(true);
    
        await expect(await homePage.cookiePolicy.isDisplayed()).toBe(true);
    
        await expect(await homePage.termsConditions.isDisplayed()).toBe(true);
   
        await expect(await homePage.forBuyers.isDisplayed()).toBe(true);
    
        await expect(await homePage.productsLink.isDisplayed()).toBe(true);
    
        await expect(await homePage.tendersMap.isDisplayed()).toBe(true);
    
        await expect(await homePage.contacts.isDisplayed()).toBe(true);
    
        await expect(await homePage.rentzilaFooterLogo.isDisplayed()).toBe(true);
   
        await expect(await homePage.copyright.isDisplayed()).toBe(true);
    
        await homePage.privacyPolicy.click();
        await expect(browser).toHaveUrl(endpoints.privacyPolicy.url);

        await expect(privacyPolicyPage.title).toBeDisplayedInViewport();
        await expect(privacyPolicyPage.title).toHaveText(endpoints.privacyPolicy.pageTitle);
    
        await privacyPolicyPage.scrollToFooter();
        await privacyPolicyPage.cookiePolicy.click();
        
        await expect(browser).toHaveUrl(endpoints.cookiePolicy.url);

        await expect(cookiePolicyPage.title).toBeDisplayedInViewport();
        await expect(cookiePolicyPage.title).toHaveText(endpoints.cookiePolicy.pageTitle);
    
        await cookiePolicyPage.scrollToFooter();
        await cookiePolicyPage.termsConditions.click();

        await expect(browser).toHaveUrl(endpoints.termsConditions.url);

        await expect(termsConditionsPage.title).toBeDisplayedInViewport();
        await expect(termsConditionsPage.title).toHaveText(endpoints.termsConditions.pageTitle);
   
        await termsConditionsPage.scrollToFooter();
        await termsConditionsPage.productsLink.click();
        
        await expect(browser).toHaveUrl(endpoints.products.url);

        await expect(advertsPage.searchInput).toBeDisplayedInViewport();
        await expect(advertsPage.searchInput).toHaveAttribute('placeholder', endpoints.products.inputFieldText);
    
        await advertsPage.nabarLogo.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()) === `${process.env.BASE_URL}`,
            {
                timeout: 20000, 
                timeoutMsg: 'Expected URL to be' + `${process.env.BASE_URL}` + ' after 20 seconds',
            }
        );
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);

        await expect(homePage.header).toBeDisplayedInViewport();
        await expect(homePage.header).toHaveText(endpoints.homePage.pageTitle);
    
        await homePage.scrollToFooter();
        await homePage.tendersMap.click();

        await expect(browser).toHaveUrl(endpoints.tendersMap.url);

        await expect(tendersPage.searchInput).toBeDisplayedInViewport();
        await expect(tendersPage.searchInput).toHaveAttribute('placeholder', endpoints.tendersMap.inputFieldText);
    
        await tendersPage.rentzilaLogo.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()) === `${process.env.BASE_URL}`,
            {
                timeout: 20000, 
                timeoutMsg: 'Expected URL to be' + `${process.env.BASE_URL}` + ' after 20 seconds',
            }
        );
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
    
        expect(await homePage.infoEmail.getAttribute('href')).toBe(validValues.emailForInfo);
    });
});