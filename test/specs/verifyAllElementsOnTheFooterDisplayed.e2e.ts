import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page';
import privacyPolicyPage from '../pageobjects/privacyPolicy.page';
import cookiePolicyPage from '../pageobjects/cookiePolicy.page';
import termsConditionsPage from '../pageobjects/termsConditions.page';
import advertsPage from '../pageobjects/adverts.page';
import tendersPage from '../pageobjects/tenders.page';

xdescribe('id:C214 - Verify that all elements on the footer are displayed and all links are clickable', () => {
    it('1. Scroll down to the footer', async () => {
        await homePage.scrollToFooter();
        await expect(await homePage.isFooterDisplayed()).toBe(true);
        await expect(await $(homePage.rentzilaFooterLogo).isClickable()).toBe(false);
    });

    it('2. Check that ""Про нас"" label is displayed on the footer.', async () => {
        await expect(await $(homePage.aboutUsLable).isDisplayed()).toBe(true);
    });

    it('3. Check that ""Політика конфіденційності"" link is displayed on the footer.', async () => {
        await expect(await $(homePage.privacyPolicy).isDisplayed()).toBe(true);
    });

    it('4. Check that ""Правила використання файлів cookie"" link is displayed on the footer', async () => {
        await expect(await $(homePage.cookiePolicy).isDisplayed()).toBe(true);
    });

    it('5. Check that ""Умови доступу та користування"" link is displayed on the footer.', async () => {
        await expect(await $(homePage.termsConditions).isDisplayed()).toBe(true);
    });

    it('6. Check that ""Користувачам"" label is displayed on the footer.', async () => {
        await expect(await $(homePage.forBuyers).isDisplayed()).toBe(true);
    });

    it('7. Check that ""Оголошення"" link is displayed on the footer.', async () => {
        await expect(await $(homePage.productsLink).isDisplayed()).toBe(true);
    });

    it('8. Check that ""Тендери"" link is displayed on the footer.', async () => {
        await expect(await $(homePage.tendersMap).isDisplayed()).toBe(true);
    });

    it('9. Check that the ""Контакти"" label and email are displayed on the footer.', async () => {
        await expect(await $(homePage.contacts).isDisplayed()).toBe(true);
    });

    it('10. Check that the Rentzila logo is displayed on the footer.', async () => {
        await expect(await $(homePage.rentzilaFooterLogo).isDisplayed()).toBe(true);
    });

    it('11. Check that the ""Усі права захищені"" label is displayed on the footer.', async () => {
        await expect(await $(homePage.copyright).isDisplayed()).toBe(true);
    });

    it('12. Click the ""Політика конфіденційності"" link on the footer.', async () => {
        await $(homePage.privacyPolicy).click();
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/privacy-policy/');

        await expect($(privacyPolicyPage.title)).toBeDisplayedInViewport();
        await expect($(privacyPolicyPage.title)).toHaveText('Політика конфіденційності');
    });

    it('13. Scroll down to the footer and click the ""Правила використання файлів cookie"" link on the footer.', async () => {
        await privacyPolicyPage.scrollToFooter();
        await $(privacyPolicyPage.cookiePolicy).click();
        
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/cookie-policy/');

        await expect($(cookiePolicyPage.title)).toBeDisplayedInViewport();
        await expect($(cookiePolicyPage.title)).toHaveText('Політика використання файлів cookie');
    });

    it('14. Scroll down to the footer and click the ""Умови доступу та користування"" link on the footer.', async () => {
        await cookiePolicyPage.scrollToFooter();
        await $(cookiePolicyPage.termsConditions).click();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/terms-conditions/');

        await expect($(termsConditionsPage.title)).toBeDisplayedInViewport();
        await expect($(termsConditionsPage.title)).toHaveText('Угода користувача');
    });

    it('15. Scroll down to the footer and click on the ""Оголошення"" link.', async () => {
        await termsConditionsPage.scrollToFooter();
        await $(termsConditionsPage.productsLink).click();
        
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/products/');

        await expect($(advertsPage.searchInput)).toBeDisplayedInViewport();
        await expect($(advertsPage.searchInput)).toHaveAttribute('placeholder', 'Пошук оголошень або послуг');
    });

    it('16. Click the Rentzila logo on the header.', async () => {
        await advertsPage.clickNavbarLogo();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');

        await expect($(homePage.header)).toBeDisplayedInViewport();
        await expect($(homePage.header)).toHaveText('Сервіс пошуку послуг спецтехніки');
    });

    it('17. Scroll down to the footer and click the ""Тендери"" link.', async () => {
        await homePage.scrollToFooter();
        await $(homePage.tendersMap).click();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/tenders-map/');

        await expect($(tendersPage.searchInput)).toBeDisplayedInViewport();
        await expect($(tendersPage.searchInput)).toHaveAttribute('placeholder', 'Пошук тендера за ключовими словами');
    });

    it('18. Click the Rentzila logo on the header.', async () => {
        await $(tendersPage.rentzilaLogo).click();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');
    });

    it('19. Click on the ""info@rentzila.com.ua"" email on the footer.', async () => {
        expect(await $(homePage.infoEmail).getAttribute('href')).toBe('mailto:info@rentzila.com.ua');
    });
});