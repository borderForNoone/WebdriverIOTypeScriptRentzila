import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import { faker } from '@faker-js/faker';
import apiService from '../../../api/rentzilla.api';
import { endpoints } from '../../../constants/endpoints';
import { errorMessages } from "../../../constants/errorMessages";
import { invalidPhoneNumbers } from "../../../constants/invalidPhoneNumbers";
import { validValues } from '../../../constants/validValues';

let createdBackcallId: number;
let randomName = faker.person.firstName();

describe('Verify "У Вас залишилися питання?" form', () => {
    after(async () => {
        if (createdBackcallId) {
            await apiService.deleteBackcalle(createdBackcallId); 
        }
    });

    it('id:C226 - Verify "У Вас залишилися питання?" form', async () => {
        await expect(homePage.consultationSection).toBeDisplayed();
    
        await homePage.oderConsultation.click();

        expect(await homePage.consultationSectionNameField.getAttribute('class')).toHaveAttr('class', endpoints.consultationFormError);
        expect(await homePage.consultationSectionPhoneNumberField.getAttribute('class')).toHaveAttr('class', endpoints.consultationFormError);

        expect(homePage.consultationErrorMessagesList[0]).toHaveText(errorMessages.emptyFieldMessage);
        expect(homePage.consultationErrorMessagesList[1]).toHaveText(errorMessages.emptyFieldMessage);
    
        await homePage.consultationSectionNameField.setValue(invalidPhoneNumbers.latinText);
        
        await homePage.oderConsultation.click();

        expect(await homePage.consultationSectionNameField.getAttribute('class')).not.toHaveAttr('class', endpoints.consultationFormError);
        expect(await homePage.consultationSectionPhoneNumberField.getAttribute('class')).toHaveAttr('class', endpoints.consultationFormError);

        await homePage.consultationSectionPhoneNumberField.click();
    
        expect(await homePage.consultationSectionPhoneNumberField.getValue()).toContain(invalidPhoneNumbers.countryNumber);
    
        await homePage.consultationSectionNameField.clearValue();

        await homePage.consultationSectionPhoneNumberField.clearValue();
        
        await homePage.consultationSectionPhoneNumberField.setValue(validValues.phoneNumber);

        await homePage.oderConsultation.click();

        expect(await homePage.consultationSectionNameField.getAttribute('class')).toHaveAttr('class', endpoints.consultationFormError);

        await homePage.consultationSectionNameField.clearValue();
        await homePage.consultationSectionNameField.setValue(randomName);

        await homePage.consultationSectionPhoneNumberField.clearValue();
        await homePage.consultationSectionPhoneNumberField.setValue(invalidPhoneNumbers.phoneWithSpaces);

        await homePage.oderConsultation.click();

        await homePage.verifyContactUsForm();

        await homePage.consultationSectionPhoneNumberField.clearValue();
        await homePage.consultationSectionPhoneNumberField.setValue(invalidPhoneNumbers.phoneWithExtraNumbers);

        await homePage.oderConsultation.click();

        await homePage.verifyContactUsForm();

        await homePage.consultationSectionPhoneNumberField.clearValue();
        await homePage.consultationSectionPhoneNumberField.setValue(validValues.phoneNumber);

        await homePage.oderConsultation.click();

        browser.on('dialog', (dialog) => {
            expect(dialog.message()).toEqual(validValues.dialogText);
            dialog.accept();
        })
   
        const backcallList = await apiService.getListOfBackcalles();
        const lastBackcall = backcallList[backcallList.length - 1]; 

        createdBackcallId = lastBackcall.id;
    });    
});
