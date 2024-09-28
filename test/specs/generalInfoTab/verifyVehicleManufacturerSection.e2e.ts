import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

const validManufacturer = 'Abc';

describe('id:C298 - Verify vehicle manufacturer section', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('1. Check title to be visible, have valid text and "" * "" after it. Check input field to contain loupe icon and to have valid background text.', async () => {
        await expect(profilePage.vehicleManufacturerSectionTitle).toBeDisplayed();
        await expect(await profilePage.vehicleManufacturerSectionTitle.getText()).toMatch(/Виробник транспортного засобу \*/);
        await expect(profilePage.vehicleManufacturerSectionInput).toHaveAttr('placeholder', /Введіть виробника транспортного засобу/);
    });

    it('2. Click on [nextButton] button. Check reaction on empty field.', async () => {
        await profilePage.nextButton.click();

        await expect(profilePage.searchResultErrorField).toHaveAttr('class', /searchResultError/);
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toHaveText(/Це поле обов’язкове/);
        await expect(profilePage.searchIcon).toBeDisplayed();
    });

    it('3. Type data: A (1 symbol). Check reaction of search function.', async () => {
        await profilePage.vehicleManufacturerSectionInput.clearValue();
        
        await profilePage.vehicleManufacturerSectionInput.setValue('A');

        await profilePage.nextButton.click();

        await expect(profilePage.searchResultErrorField).toHaveAttr('class', /searchResultError/);
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toHaveText(/Це поле обов’язкове/); 
        await expect(profilePage.searchIcon).toBeDisplayed();

        await profilePage.vehicleManufacturerSectionInput.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, 'A');

        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 

        await profilePage.nextButton.click();

        await expect(profilePage.searchResultErrorField).toHaveAttr('class', /searchResultError/);
        await expect(profilePage.searchResultFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.searchResultFieldErrorMessage).toHaveText(/Це поле обов’язкове/); 
        await expect(profilePage.searchIcon).toBeDisplayed();
    });

    it('4. Type АТЭК, validate option in dropdown. Type Атэк, validate option in dropdown. Check that both finded options are same.', async () => {
        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue('АТЭК');

        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(1);

        const option1Text = await profilePage.dropdownOptions[0].getText();

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue('Атэк');
        
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(1);

        const option2Text = await profilePage.dropdownOptions[0].getText();

        expect(option1Text.toLowerCase()).toEqual(option2Text.toLowerCase());
    });

    it('5. Type invalid data variants into input field and check dropdown behavior.', async () => {
        const option1Text = await profilePage.dropdownOptions[0].getText();

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(' ');

        const option2Text = await profilePage.dropdownOptions[0].getText();
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(1);
        expect(option1Text.toLowerCase()).toEqual(option2Text.toLowerCase());

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue('<>{};^');
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue('123456789');
        await expect(profilePage.vehicleManufacturerSectionInputMessage).toHaveText(/На жаль, виробника “123456789“ не знайдено в нашій базі./);
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, ' '); 
        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, '<>{};^'); 
        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);

        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, '123456789'); 
        await profilePage.vehicleManufacturerSectionInput.click();
        await browser.keys(['Control', 'v']); 
        await expect(profilePage.vehicleManufacturerSectionInputMessage).toHaveText(/На жаль, виробника “123456789“ не знайдено в нашій базі./);
        await expect(profilePage.dropdownOptions).toBeElementsArrayOfSize(0);
    });
    
    it('6. Type 101 symbols into the input field and check that more than 100 symbols cannot be inputted.', async () => {
        const longString = 'A'.repeat(101);
    
        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(longString);
    
        const inputValue = await profilePage.vehicleManufacturerSectionInput.getValue();
    
        expect(inputValue.length).toEqual(100);
    
        expect(inputValue).toEqual(longString.slice(0, 100));
    });

    it('7. Type valid text into the input field and then click on an option in the dropdown. Check that the chosen option is selected.', async () => {
        await profilePage.vehicleManufacturerSectionInput.clearValue();
        await profilePage.vehicleManufacturerSectionInput.setValue(validManufacturer);
    
        await profilePage.dropdownOptions[0].click();
    
        const inputValue = await profilePage.selectedSearchValue.getText();
        
        expect(inputValue.toLowerCase()).toEqual(validManufacturer.toLowerCase());
    });

    it('8. Type valid text into input field and then click on option in dropdown. Click on [clear input] and check that input field is clear.', async () => {
        await expect(profilePage.clearSelectedVehicleManufacturerButton).toBeDisplayed();

        await profilePage.clearSelectedVehicleManufacturerButton.click();

        expect(await profilePage.vehicleManufacturerSectionInput.getValue()).toEqual('');
    });
});

