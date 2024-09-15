import homePage from '../pageobjects/home.page';

export async function verifyContactUsForm() {
    const consultationSectionNameFieldHasErrorClass = await $(homePage.consultationSectionNameField).getAttribute('class');
    const consultationSectionPhoneNumberFieldHasErrorClass = await $(homePage.consultationSectionPhoneNumberField).getAttribute('class');

    expect(consultationSectionNameFieldHasErrorClass).not.toContain('ConsultationForm_error__F1NM0');
    expect(consultationSectionPhoneNumberFieldHasErrorClass).toContain('ConsultationForm_error__F1NM0');

    expect($$(homePage.consultationErrorMessages)[1]).toHaveText('Телефон не пройшов валідацію');
}

export async function clickOkInDialogPopUp() {
    await browser.waitUntil(async () => await browser.isAlertOpen(), {});
    let alertText = await browser.getAlertText();
    await expect(alertText).toEqual("Ви успішно відправили заявку");
    await browser.acceptAlert();
}