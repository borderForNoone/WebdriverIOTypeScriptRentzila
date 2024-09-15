import { expect } from '@wdio/globals';
import homePage from '../pageobjects/home.page';
import advertsPage from '../pageobjects/adverts.page';
import unitPage from '../pageobjects/unit.page';
import { repeatTestCaseForService } from '../helpers/serviceHelper';

let specialEquipmentItemsNames: string[];
let firstSpecialEquipmentItemName: string;

xdescribe('id:C213 - Checking the Спецтехніка section and related functionality', () => {
    it('1. The "Спецтехніка" section and "Популярна" tab should be displayed, and 7 services should be listed under "Послуги"', async () => {
        await homePage.scrollToSpecialEquipmentSection();
        await homePage.validateSpecialEquipmentSection();
        
        specialEquipmentItemsNames = await homePage.getAllISpecialEquipmentItemsNames();
        console.log(specialEquipmentItemsNames);

        firstSpecialEquipmentItemName = await homePage.getFirstSpecialEquipmentItemName();
    });

    it('2. Click on the first element in the ""Спецтехніка"" list', async () => {
        await homePage.clickFirstSpecialEquipmentItem();
        await advertsPage.validatePageLoad();

        await advertsPage.validateFiltersAndUnitOneSpecialEquipment("посівна та садильна техніка");
    });

    it('3. Click on the first relevant unit', async () => {
        await advertsPage.clickFirstUnit();

        await unitPage.validateServiceProvided("Посів технічних та зернових культур");
    });

    it('4. Click on the logo in the left corner of the page.', async () => {
        await unitPage.clickNavbarLogo();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');
    });

    it('5. Repeat test case for all other elements on all tabs below the ""Спецтехніка"" label.', async () => {
        const specialEquipmentCategories = [
            homePage.specialEquipmentPopularTab,     
            homePage.specialEquipmentAgriculturalTab, 
            homePage.specialEquipmentBuildingTab,        
            homePage.specialEquipmentTabOther          
        ];

        for (const specialEquipmentLocator of specialEquipmentCategories) {
            await repeatTestCaseForService(specialEquipmentLocator);
        }
    });
});
