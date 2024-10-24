import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import advertsPage from '../../pageobjects/adverts.page';
import unitPage from '../../pageobjects/unit.page';
import { validateSpecialEquipment } from '../../helpers/serviceHelper';
import { validValues } from '../../constants/validValues';

let specialEquipmentItemsNames: string[];

xdescribe('Checking the Спецтехніка section and related functionality', () => {
    it('id:C213 - Checking the Спецтехніка section and related functionality', async () => {
        await homePage.validateSpecialEquipmentSection();
        
        specialEquipmentItemsNames = await homePage.getAllSpecialEquipmentItemsNames();

        await homePage.clickFirstSpecialEquipmentItem();
        await advertsPage.validatePageLoad();

        await advertsPage.validateFiltersAndUnitOneSpecialEquipment(validValues.specialEquipmentName);
   
        await advertsPage.clickFirstUnit();

        await unitPage.validateServiceProvided(validValues.serviceName);
    
        await unitPage.nabarLogo.click();

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
    
        const specialEquipmentCategories = [
            homePage.specialEquipmentPopularTab,     
            homePage.specialEquipmentAgriculturalTab, 
            homePage.specialEquipmentBuildingTab,        
            homePage.specialEquipmentTabOther          
        ];

        for (const specialEquipmentLocator of specialEquipmentCategories) {
            await validateSpecialEquipment(specialEquipmentLocator);
        }
    });
});
