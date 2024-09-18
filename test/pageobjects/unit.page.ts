import Page from './page';

class UnitPage extends Page {
    readonly servicesProvided = 'div.UnitCharacteristics_service__aTyk2';
    readonly servicesContainer = 'div.UnitCharacteristics_services_container__hSEbl';

    async validateServiceProvided(expectedService: string) {
        await $(this.servicesContainer).waitForDisplayed({ timeout: 30000 });

        const displayedServices = await this.getAllServices();

        await expect(displayedServices).toContain(expectedService);
    }

    async getAllServices(): Promise<string[]> {
        const servicesElements = $$(this.servicesProvided);
        const servicesTextPromises = await servicesElements.map(async (serviceElement) => {
            return serviceElement.getText();
        });

        const services = await Promise.all(servicesTextPromises);
        return services;
    }

    async validatePageLoad() {
        await $(this.servicesContainer).waitForDisplayed({
            timeout: 3000, 
            timeoutMsg: 'Unit page did not load within the expected time',
        });
        
        console.log('Unit page has loaded successfully.');
    }
}

export default new UnitPage();
