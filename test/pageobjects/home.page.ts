import Page from './page';

class HomePage extends Page {
    readonly header = "h1.HeroSection_title__QIzpM";

    readonly serviceItemsNames = '[data-testid="services"] .RentzilaProposes_proposes_list__X8dRW > * .RentzilaProposes_name__DTnwr';
    readonly serviceItems = '[data-testid="services"] .RentzilaProposes_proposes_list__X8dRW > *';
    readonly servicesSection = '[data-testid="services"]';
    readonly popularTab = '[data-testid="services__populyarni"';
    readonly serviceAgriculturalTab = '[data-testid="services__silskogospodarski"]';
    readonly serviceBuildingTab = '[data-testid="services__budivelni"]';
    readonly serviceTabOther = '[data-testid="services__inshi"]';

    readonly specialEquipmentSection = '[data-testid="specialEquipment"]';
    readonly specialEquipmentPopularTab = '[data-testid="specialEquipment__populyarna"]';
    readonly specialEquipmentAgriculturalTab = '[data-testid="specialEquipment__silskogospodarska"]';
    readonly specialEquipmentBuildingTab = '[data-testid="specialEquipment__budivelna"]';
    readonly specialEquipmentTabOther = '[data-testid="specialEquipment__insha"]';
    readonly specialEquipmentItems = '[data-testid="specialEquipment"] .RentzilaProposes_proposes_list__X8dRW > *';
    readonly specialEquipmentItemsNames = '[data-testid="specialEquipment"] .RentzilaProposes_proposes_list__X8dRW > * .RentzilaProposes_name__DTnwr';

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
    readonly infoEmail = '[href="mailto:info@rentzila.com.ua"]';

    readonly consultationSection = 'section.Layouts_consultation__JUU1R';
    readonly oderConsultation = 'section.Layouts_consultation__JUU1R [type="submit"]';
    readonly consultationSectionNameField = '[placeholder="Ім\'я"]';
    readonly consultationSectionPhoneNumberField = '[placeholder="Номер телефону"]';
    readonly consultationErrorMessages = 'div [role="alert"]';

    async scrollToServicesSection(): Promise<void> {
        const servicesSectionElement = $(this.servicesSection);
        await servicesSectionElement.scrollIntoView();
    }

    async scrollToSpecialEquipmentSection(): Promise<void> {
        const specialEquipmentSectionElement = $(this.specialEquipmentSection);
        await specialEquipmentSectionElement.scrollIntoView();
    }

    async getAllItemNames(): Promise<string[]> {
        const products = $$(this.serviceItems);
        const namesPromises = await products.map(async (product) => {
            const nameElement = product.$(this.serviceItemsNames);
            return nameElement.getText();
        });

        const names = await Promise.all(namesPromises);
        return names;
    }

    async getAllISpecialEquipmentItemsNames(): Promise<string[]> {
        const products = $$(this.specialEquipmentItems);
        const namesPromises = await products.map(async (product) => {
            const nameElement = product.$(this.specialEquipmentItemsNames);
            return nameElement.getText();
        });

        const names = await Promise.all(namesPromises);
        return names;
    }

    async validateServicesSection() {
        await expect($(this.servicesSection)).toBeDisplayed();
        await expect($(this.popularTab)).toBeDisplayed();
        await expect($$(this.serviceItems)).toBeElementsArrayOfSize(7);
    }

    async validateSpecialEquipmentSection() {
        await expect($(this.specialEquipmentSection)).toBeDisplayed();
        await expect($(this.specialEquipmentPopularTab)).toBeDisplayed();
        await expect($$(this.specialEquipmentItems)).toBeElementsArrayOfSize(7);
    }

    async clickFirstServiceItem() {
        const products = $$(this.serviceItems);
        await products[0].click();
    }

    async clickFirstSpecialEquipmentItem() {
        const products = $$(this.specialEquipmentItems);
        await products[0].click();
    }

    async getFirstItemName() {
        const products = $$(this.serviceItems);
        const firstProduct = products[0];
        return await firstProduct.$(this.serviceItemsNames).getText();
    }

    async getFirstSpecialEquipmentItemName() {
        const products = $$(this.specialEquipmentItems);
        const firstProduct = products[0];
        return await firstProduct.$(this.specialEquipmentItemsNames).getText();
    }

    async scrollToFooter(): Promise<void> {
        await $(this.footer).scrollIntoView();
    }

    async scrollToConsultationSection(): Promise<void> {
        await $(this.consultationSection).scrollIntoView();
    }

    async isFooterDisplayed(): Promise<boolean> {
        return await $(this.footer).isDisplayed();
    }

    async clickServiceTab(serviceTabLocator: string) {
        await $(serviceTabLocator).click();
    }
}

export default new HomePage();