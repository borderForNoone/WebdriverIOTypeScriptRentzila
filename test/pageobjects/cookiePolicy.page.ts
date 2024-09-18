import Page from './page';

class CookiePolicyPage extends Page {
    readonly title = '[class*=Cookies_container] h1[class*=Cookies_title]';

    async scrollToFooter(): Promise<void> {
        await $(this.footer).scrollIntoView();
    }

    async isFooterDisplayed(): Promise<boolean> {
        return await $(this.footer).isDisplayed();
    }
}

export default new CookiePolicyPage();
