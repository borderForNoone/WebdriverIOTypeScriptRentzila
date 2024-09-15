import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page';
import advertsPage from '../pageobjects/adverts.page';
import unitPage from '../pageobjects/unit.page';
import { repeatTestCaseForService } from '../helpers/serviceHelper';

let serviceNames: string[];
let firstItemName: string;

xdescribe('id:C212 - Checking "Послуги" section on the main page', () => {
    it('1. Scroll to the ""Послуги"" section and check if the ""Популярні"" tab and 7 services below the ""Послуги"" label are displayed.', async () => {
        await homePage.scrollToServicesSection();
        await homePage.validateServicesSection();
        console.log(await homePage.getAllItemNames());
        serviceNames = await homePage.getAllItemNames();

        firstItemName = await homePage.getFirstItemName();
        await homePage.clickFirstServiceItem();
    });

    it('2. Click on the first service below the ""Послуги"" label.', async () => {
        await advertsPage.validatePageLoad();
        console.log(await advertsPage.getAllUnitsNames());
        await advertsPage.validateFiltersAndUnits(serviceNames, firstItemName);
    });

    it('3. Click on the first relevant unit', async () => {
        await advertsPage.validatePageLoad();
        await advertsPage.clickFirstUnit();
        await unitPage.validatePageLoad();
        await unitPage.validateServiceProvided(firstItemName);
    });

    it('4. Click on the logo in the left corner of the page', async () => {
        await unitPage.clickNavbarLogo();
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');
    });

    it('5. Repeat test case for all other services on all tabs below the ""Послуги"" label', async () => {
        const serviceCategories = [
            homePage.popularTab,     
            homePage.serviceAgriculturalTab, 
            homePage.serviceBuildingTab,        
            homePage.serviceTabOther          
        ];

        for (const serviceLocator of serviceCategories) {
            await repeatTestCaseForService(serviceLocator);
        }
    });
    
});

