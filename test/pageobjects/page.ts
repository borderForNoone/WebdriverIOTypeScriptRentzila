export default class Page {
    readonly advertsLink = 'a.Navbar_link__UhyJF[href="/products/"]';
    readonly nabarLogo = 'a.Navbar_logo__RsJHS';
    readonly loginButton = 'div.NavbarAuthBlock_buttonEnter__c9siH';
    readonly emailField = '#email';
    readonly passwordField = '#password';
    readonly submitButton = '[data-testid="loginPopup" ]  button[type="submit"]';

    public open (path: string) {
        return browser.url(`${path}`)
    }

    async clickNavbarLogo() {
        await $(this.nabarLogo).click();
    }

    async clickAvertsLink() {
        await $(this.advertsLink).click();
    }

    async clickLoginButton() {
        await $(this.loginButton).click();
    }

    async login(email: string, password: string) {
        await this.clickLoginButton();

        await $(this.emailField).waitForDisplayed({ timeout: 5000 });
        await $(this.passwordField).waitForDisplayed({ timeout: 5000 });

        await $(this.emailField).setValue(email);
        await $(this.passwordField).setValue(password);

        await $(this.submitButton).click();
    }

    async waitForSubmitButtonToDisappear(timeout: number = 10000) {
        await browser.waitUntil(
            async () => !(await $(this.submitButton).isDisplayed()),
            {
                timeout,
                timeoutMsg: 'Submit button did not disappear in time'
            }
        );
    }
}