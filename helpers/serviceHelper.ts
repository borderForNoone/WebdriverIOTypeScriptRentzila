import homePage from '../test/pageobjects/home.page';
import advertsPage from '../test/pageobjects/adverts.page';
import unitPage from '../test/pageobjects/unit.page';

export async function validateServices(serviceLocator: string) { 
    if (await homePage.telegramCrossButton.isDisplayed()) {
        await homePage.telegramCrossButton.click();
    } 
    await homePage.clickServiceTab(serviceLocator);

    const serviceNames = await homePage.getAllItemNames();
    
    for (let i = 0; i < serviceNames.length; i++) {
        await homePage.clickServiceTab(serviceLocator);
        await homePage.validateServicesSection();

        const currentServiceName = serviceNames[i];
        await homePage.secviceItemClickByIndex(i);
        
        await advertsPage.validatePageLoad();
        await advertsPage.openAllClosedArrows();
        
        await advertsPage.clickFirstUnit();
        await unitPage.validateServiceProvided(currentServiceName);
        await unitPage.nabarLogo.click();
    }
}

export async function validateSpecialEquipment(serviceLocator: string) { 
    await homePage.clickServiceTab(serviceLocator);

    const serviceNames = await homePage.getAllSpecialEquipmentItemsNames();
    
    for (let i = 0; i < serviceNames.length; i++) {
        await homePage.clickServiceTab(serviceLocator);

        const currentServiceName = serviceNames[i];
        await homePage.specialEquipmentItemClickByIndex(i);
        
        await advertsPage.validatePageLoad();
        await advertsPage.openAllClosedArrows();
        
        await advertsPage.clickFirstUnit();
        await unitPage.validateServiceProvided(currentServiceName);
        await unitPage.nabarLogo.click();
    }
}