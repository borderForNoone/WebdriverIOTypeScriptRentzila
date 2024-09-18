import Page from './page';

class PrivacyPolicyPage extends Page {
    readonly title = 'div h1[class*=PrivacyPolicy_title]';

    async scrollToFooter(): Promise<void> {
        await $(this.footer).scrollIntoView();
    }

    async isFooterDisplayed(): Promise<boolean> {
        return await $(this.footer).isDisplayed();
    }
}

export default new PrivacyPolicyPage();