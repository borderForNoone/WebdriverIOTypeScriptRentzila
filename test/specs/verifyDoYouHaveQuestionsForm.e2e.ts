import { expect } from '@wdio/globals';
import homePage from '../pageobjects/home.page';
import { verifyContactUsForm } from '../helpers/contactUsHelper';
import { getListOfBackcalles } from '../helpers/apiHelper';
import { deleteBackcalle } from '../helpers/apiHelper';
import { faker } from '@faker-js/faker';

let createdBackcallId: number;
let randomName = faker.person.firstName();
let phoneNumber = '+380506743060';

describe('id:C226 - Verify ""У Вас залишилися питання?"" form', () => {
    after(async () => {
        if (createdBackcallId) {
            await deleteBackcalle(createdBackcallId); 
        }
    });

    it('1. Scroll down to the ""У Вас залишилися питання?"" form.', async () => {
        await homePage.scrollToConsultationSection();
        await expect($(homePage.consultationSection)).toBeDisplayed();
    });

    it('2. Click on the "Замовити консультацію" button.', async () => {
        await $(homePage.oderConsultation).click();
        const consultationSectionNameFieldHasErrorClass = await $(homePage.consultationSectionNameField).getAttribute('class');
        const consultationSectionPhoneNumberFieldHasErrorClass = await $(homePage.consultationSectionNameField).getAttribute('class');
        
        expect(consultationSectionNameFieldHasErrorClass).toContain('ConsultationForm_error__F1NM0');
        expect(consultationSectionPhoneNumberFieldHasErrorClass).toContain('ConsultationForm_error__F1NM0');

        expect($$(homePage.consultationErrorMessages)[0]).toHaveText('Поле не може бути порожнім');
        expect($$(homePage.consultationErrorMessages)[1]).toHaveText('Поле не може бути порожнім');
    });
    
    it("3. Input the ''Test'' into the ''Ім'я'' field and click on the ''Замовити консультацію'' button.", async () => {
        await $(homePage.consultationSectionNameField).setValue('Test');
        
        await $(homePage.oderConsultation).click();

        const consultationSectionNameFieldHasErrorClass = await $(homePage.consultationSectionNameField).getAttribute('class');
        const consultationSectionPhoneNumberFieldHasErrorClass = await $(homePage.consultationSectionPhoneNumberField).getAttribute('class');

        expect(consultationSectionNameFieldHasErrorClass).not.toContain('ConsultationForm_error__F1NM0');
        expect(consultationSectionPhoneNumberFieldHasErrorClass).toContain('ConsultationForm_error__F1NM0');
    });

    it('4. Click on the ""Номер телефону"" field.', async () => {
        const phoneNumberField = $(homePage.consultationSectionPhoneNumberField);

        await phoneNumberField.click();

        const phoneNumberValue = await phoneNumberField.getValue();
    
        expect(phoneNumberValue).toContain('+380');
    });

    it('5. Input the valid phone number into the ""Номер"" field: +380506743060', async () => {
        const phoneNumberField = $(homePage.consultationSectionPhoneNumberField);
    
        await $(homePage.consultationSectionNameField).clearValue();

        await phoneNumberField.clearValue();
        
        await phoneNumberField.setValue(phoneNumber);

        await $(homePage.oderConsultation).click();

        const consultationSectionNameFieldHasErrorClass = await $(homePage.consultationSectionNameField).getAttribute('class');

        expect(consultationSectionNameFieldHasErrorClass).toContain('ConsultationForm_error__F1NM0');
        await browser.waitUntil(
            async () => {
                const consultationSectionPhoneNumberFieldHasErrorClass = await $(homePage.consultationSectionPhoneNumberField).getAttribute('class');
                return !consultationSectionPhoneNumberFieldHasErrorClass.includes('ConsultationForm_error__F1NM0');
            },
            {
                timeout: 5000, 
                timeoutMsg: 'Expected phone number field to not contain error class within 5 seconds'
            }
        );
    });

    it("6. Input the ''Test'' into the ''Ім'я'' field_ put random name, Enter the invalid phone number: +38063 111 111, +1 1111111111111", async () => {
        const nameField = $(homePage.consultationSectionNameField);
        const phoneNumberField = $(homePage.consultationSectionPhoneNumberField);

        await nameField.clearValue();
        await nameField.setValue(randomName);

        await phoneNumberField.clearValue();
        await phoneNumberField.setValue('+38063 111 111');

        await $(homePage.oderConsultation).click();

        await verifyContactUsForm();

        await phoneNumberField.clearValue();
        await phoneNumberField.setValue('+1 1111111111111');

        await $(homePage.oderConsultation).click();

        await verifyContactUsForm();
    });

    it('7. Input the valid phone number into the ""Номер"" field: +380506743060', async () => {
        const phoneNumberField = $(homePage.consultationSectionPhoneNumberField);
        await phoneNumberField.clearValue();
        await phoneNumberField.setValue(phoneNumber);

        await $(homePage.oderConsultation).click();
    });

    it('8. Click on the ""Ok"" button on the modal.', async () => {
        
    });

    it('9. Log in as the Admin to the Admin panel and check that this feedback is present.', async () => {
        const backcallList = await getListOfBackcalles();
        const lastBackcall = backcallList[backcallList.length - 1]; 

        expect(lastBackcall.name).toEqual(randomName);
        expect(lastBackcall.phone).toEqual(phoneNumber);

        createdBackcallId = lastBackcall.id;
    });    
});
