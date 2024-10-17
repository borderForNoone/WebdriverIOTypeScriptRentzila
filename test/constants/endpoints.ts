require('dotenv').config();

export const endpoints = {
    erroInputField: /CustomReactHookInput_error_input/,
    privacyPolicy: { url: `${process.env.BASE_URL}` + 'privacy-policy/', pageTitle: 'Політика конфіденційності' }, 
    cookiePolicy: { url: `${process.env.BASE_URL}` + 'cookie-policy/', pageTitle: 'Політика використання файлів cookie' },
    termsConditions: { url: `${process.env.BASE_URL}` + 'terms-conditions/', pageTitle: 'Угода користувача' }, 
    products: { url: `${process.env.BASE_URL}` + 'products/', inputFieldText: 'Пошук оголошень або послуг' },
    homePage: { url: `${process.env.BASE_URL}`, pageTitle: 'Сервіс пошуку послуг спецтехніки' },
    tendersMap: { url: `${process.env.BASE_URL}` + 'tenders-map/', inputFieldText: 'Пошук тендера за ключовими словами' },
};