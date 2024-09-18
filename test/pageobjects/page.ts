export default class Page {
    readonly advertsLink = 'a[class*="Navbar_link"][href="/products/"]';
    readonly nabarLogo = 'a[class*="Navbar_logo"]';
    readonly loginButton = 'div[class*="NavbarAuthBlock_buttonEnter"]';
    readonly emailField = '#email';
    readonly passwordField = '#password';

    get popupWindow() {
        return $('[data-testid="authorizationContainer"]');
    }

    get submitButton() {
        return $('[data-testid="loginPopup"] button[type="submit"]');
    }

    get errorPopupLoginMessages() {
        return $$('[class*=CustomReactHookInput_error_message]');
    }

    get errorPopupLoginInputFields() {
        return $$('[class*="CustomReactHookInput_error_input"]');
    }

    readonly footer = 'div[class*="Footer_footer"]';
    readonly rentzilaFooterLogo = 'div[class*="Footer_footer"] [data-testid="logo"]';
    readonly aboutUsLable = '[data-testid="content"]';
    readonly privacyPolicy = '[href="/privacy-policy/"]';
    readonly cookiePolicy = '[href="/cookie-policy/"]';
    readonly termsConditions = '[href="/terms-conditions/"]';
    readonly forBuyers = 'div[class*="Footer_footer"] [class*="RentzilaForBuyers_title"]';
    readonly productsLink = 'div[class*="Footer_footer"] [href="/products/"]';
    readonly tendersMap = '[href="/tenders-map/"]';
    readonly contacts = 'div[class*="Footer_footer"] [class*="RentzilaContacts_title"]';
    readonly copyright = '[data-testid="copyright"]';
    readonly infoEmail = '[href="mailto:info@rentzila.com.ua"]';

    readonly consultationSection = 'section[class*=Layouts_consultation]';
    readonly oderConsultation = 'section[class*=Layouts_consultation] [type="submit"]';
    readonly consultationSectionNameField = '[placeholder="Ім\'я"]';
    readonly consultationSectionPhoneNumberField = '[placeholder="Номер телефону"]';
    readonly consultationErrorMessages = 'div [role="alert"]';

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

        await this.submitButton.click();
    }

    async waitForSubmitButtonToDisappear(timeout: number = 10000) {
        await browser.waitUntil(
            async () => !(await this.submitButton.isDisplayed()),
            {
                timeout,
                timeoutMsg: 'Submit button did not disappear in time'
            }
        );
    }
}