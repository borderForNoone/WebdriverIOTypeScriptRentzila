import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import advertsPage from '../../pageobjects/adverts.page';
import unitPage from '../../pageobjects/unit.page';
import { validateServices } from '../../../helpers/serviceHelper';

let serviceNames: string[];
let firstItemName: string;

describe('Checking "Послуги" section on the main page', () => {
    it('id:C212 - Checking "Послуги" section on the main page', async () => {
        await homePage.validateServicesSection();
        serviceNames = await homePage.getAllItemNames();

        firstItemName = await homePage.getFirstItemName();
        await homePage.clickFirstServiceItem();
    
        await advertsPage.validatePageLoad();
        await advertsPage.getAllUnitsNames();
        await advertsPage.validateFiltersAndUnits(serviceNames, firstItemName);
    
        await advertsPage.validatePageLoad();
        await advertsPage.clickFirstUnit();
        await unitPage.validatePageLoad();
        await unitPage.validateServiceProvided(firstItemName);
    
        await unitPage.nabarLogo.click();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
    
        const serviceCategories = [
            homePage.popularTab,     
            homePage.serviceAgriculturalTab, 
            homePage.serviceBuildingTab,        
            homePage.serviceTabOther          
        ];

        for (const serviceLocator of serviceCategories) {
            await validateServices(serviceLocator);
        }
    });
    
});

