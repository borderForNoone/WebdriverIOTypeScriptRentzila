import Page from './page';
import { errorMessages } from '../constants/errorMessages';

class HomePage extends Page {
    get header() {
        return $('h1[class*=HeroSection_title]');
    }

    readonly serviceItemsNames = '[data-testid="services"] [class*=RentzilaProposes_proposes_list] > * [class*=RentzilaProposes_name]';
    readonly serviceItems = '[data-testid="services"] [class*=RentzilaProposes_proposes_list] > *';
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
    readonly specialEquipmentItems = '[data-testid="specialEquipment"] [class*=RentzilaProposes_proposes_list] > *';
    readonly specialEquipmentItemsNames = '[data-testid="specialEquipment"] [class*=RentzilaProposes_proposes_list] > * [class*=RentzilaProposes_name]';

    async scrollToServicesSection(): Promise<void> {
        await $(this.servicesSection).scrollIntoView();
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

    async getAllSpecialEquipmentItemsNames(): Promise<string[]> {
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
        await this.consultationSection.scrollIntoView();
    }

    async isFooterDisplayed(): Promise<boolean> {
        return await $(this.footer).isDisplayed();
    }

    async clickServiceTab(serviceTabLocator: string) {
        await $(serviceTabLocator).click();
    }

    async clickOkInDialogPopUp() {
        await browser.waitUntil(async () => await browser.isAlertOpen(), {});
        let alertText = await browser.getAlertText();
        await expect(alertText).toEqual("Ви успішно відправили заявку");
        await browser.acceptAlert();
    }

    async verifyContactUsForm() {
        expect($(this.consultationSectionNameField)).not.toHaveAttr('class', /ConsultationForm_error/);
        expect($(this.consultationSectionPhoneNumberField)).toHaveAttr('class', /ConsultationForm_error/);
    
        expect(this.consultationErrorMessagesList[1]).toHaveText(errorMessages.phoneValidationError);
    }
}

export default new HomePage();