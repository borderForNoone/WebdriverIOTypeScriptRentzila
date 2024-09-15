import Page from './page';

class TermsConditionsPage extends Page {
    readonly title = 'div h1.TermsConditions_title__haW1D';

    readonly footer = '.Footer_footer__Dhw_9';
    readonly rentzilaLogo = '.Footer_footer__Dhw_9 [data-testid="logo"]';
    readonly eboutUsLable = '[data-testid="content"]';
    readonly privacyPolicy = '[href="/privacy-policy/"]';
    readonly cookiePolicy = '[href="/cookie-policy/"]';
    readonly termsConditions = '[href="/terms-conditions/"]';
    readonly forBuyers = '.Footer_footer__Dhw_9 .RentzilaForBuyers_title__k3tHn';
    readonly products = '.Footer_footer__Dhw_9 [href="/products/"]';
    readonly tendersMap = '[href="/tenders-map/"]';
    readonly contacts = '.Footer_footer__Dhw_9 .RentzilaContacts_title__SxcO7';
    readonly copyright = '[data-testid="copyright"]';

    async scrollToFooter(): Promise<void> {
        await $(this.footer).scrollIntoView();
    }

    async isFooterDisplayed(): Promise<boolean> {
        return await $(this.footer).isDisplayed();
    }
}

export default new TermsConditionsPage();