import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { endpoints } from '../../constants/endpoints';
import { validValues } from '../../constants/validValues';
import { errorMessages } from '../../constants/errorMessages';
import { invalidValues } from '../../constants/invalidValues';

const validManufacturer = 'Abc';

describe('Verify vehicle manufacturer section', () => {
    before(async () => {
        await browser.url(endpoints.createUnitPage.url);
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C298 - Verify vehicle manufacturer section', async () => {
        await expect(profilePage.vehicleManufacturerSectionTitle).toBeDisplayed();
        await expect(await profilePage.vehicleManufacturerSectionTitle.getText()).toMatch(validValues.vehicleManufacturerSectionTitle);
        await expect(profilePage.vehicleManufacturerSectionInput).toHaveAttr('placeholder', validValues.vehicleManufacturerSectionInputText);
   
        await profilePage.nextButton.click();

        await expect(profilePage.searchResultErrorField).toHaveAttr('class', endpoints.searchResultErrorField);
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toHaveText(errorMessages.searchResultFieldErrorMessage);
        await expect(profilePage.searchIcon).toBeDisplayed();

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        
        await profilePage.vehicleManufacturerSectionInput.setValue(invalidValues.oneCapital);

        await profilePage.nextButton.click();

        await expect(profilePage.searchResultErrorField).toHaveAttr('class', endpoints.searchResultErrorField);
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toHaveText(errorMessages.searchResultFieldErrorMessage); 
        await expect(profilePage.searchIcon).toBeDisplayed();

        await profilePage.vehicleManufacturerSectionInput.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.oneCapital);

        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 

        await profilePage.nextButton.click();

        await expect(profilePage.searchResultErrorField).toHaveAttr('class', endpoints.searchResultErrorField);
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toHaveText(errorMessages.searchResultFieldErrorMessage); 
        await expect(profilePage.searchIcon).toBeDisplayed();
 
        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(invalidValues.capitalCyrillic);

        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(1);

        const optionText1 = await profilePage.dropdownOptions[0].getText();

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(invalidValues.firstCapitalCyrillic);
        
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(1);

        const optionText2 = await profilePage.dropdownOptions[0].getText();

        expect(optionText1.toLowerCase()).toEqual(optionText2.toLowerCase());
 
        const optionText3 = await profilePage.dropdownOptions[0].getText();

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(' ');

        const option2Text = await profilePage.dropdownOptions[0].getText();
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(1);
        expect(optionText3.toLowerCase()).toEqual(option2Text.toLowerCase());

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(invalidValues.specialSymbols);
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(invalidValues.numbers);
        await expect(profilePage.vehicleManufacturerSectionInputMessage).toHaveText(validValues.vehicleManufacturerSectionInputMessage);
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.space); 
        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.specialSymbols); 
        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, invalidValues.numbers); 
        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 
        await expect(profilePage.vehicleManufacturerSectionInputMessage).toHaveText(validValues.vehicleManufacturerSectionInputMessage);
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);
    
        const longString = invalidValues.oneCapital.repeat(101);
    
        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(longString);
    
        const inputValue1 = await profilePage.vehicleManufacturerSectionInput.getValue();
    
        expect(inputValue1.length).toEqual(100);
    
        expect(inputValue1).toEqual(longString.slice(0, 100));
  
        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(validManufacturer);
    
        await profilePage.dropdownOptions[0].click();
    
        const inputValue2 = await profilePage.selectedSearchValue.getText();
        
        expect(inputValue2.toLowerCase()).toEqual(validManufacturer.toLowerCase());
 
        await expect(profilePage.clearSelectedVehicleManufacturerButton).toBeDisplayed();

        await profilePage.clearSelectedVehicleManufacturerButton.click();

        expect(await profilePage.vehicleManufacturerSectionInput.getValue()).toEqual('');
    });
});

