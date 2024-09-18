import homePage from '../pageobjects/home.page';
import advertsPage from '../pageobjects/adverts.page';
import unitPage from '../pageobjects/unit.page';

export async function repeatTestCaseForService(serviceLocator: string) { 
    await homePage.clickServiceTab(serviceLocator);

    const serviceNames = await homePage.getAllItemNames();
    
    for (let i = 0; i < serviceNames.length; i++) {
        await homePage.clickServiceTab(serviceLocator);
        await homePage.scrollToServicesSection();
        await homePage.validateServicesSection();

        const currentServiceName = serviceNames[i];
        const serviceItems = $$(homePage.serviceItems);
        await serviceItems[i].click();
        
        await advertsPage.validatePageLoad();
        await advertsPage.openAllClosedArrows();
        
        await advertsPage.clickFirstUnit();
        await unitPage.validateServiceProvided(currentServiceName);
        await unitPage.clickNavbarLogo();
    }
}