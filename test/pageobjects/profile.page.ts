import Page from './page';

class ProfilePage extends Page {
    public get phoneNumberField() {
        return $('[data-testid="input_OwnerProfileNumber"]');
    }

    public get createUnitTitle() {
        return $('[class*="CreateEditFlowLayout_title"]');
    }

    public get tabTitles() {
        return $$('[class*="CustomLabel_labelTitle"]');
    }

    public get tabNumbers() {
        return $$('[data-testid="labelNumber"]');
    }

    public get categoryTitle() {
        return $('[class*="CategorySelect_title"]');
    }

    public get categorySelectText() {
        return $('[class*="CategorySelect_content"]');
    }

    public get categorySideArrow() {
        return $('[class*="CategorySelect_wrapper"] [alt="Arrow-down"]');
    }

    public get nextButton() {
        return $('[data-testid="nextButton"]');
    }

    public get categoryField() {
        return $('[data-testid="buttonDiv"]');
    }

    public get categoryFieldErrorMessage() {
        return $('[class*="tegorySelect_errorTextVisible"]');
    }

    public get categoryPopupTitle() {
        return $('[class*="CategoryPopup_title"]');
    }

    public get closeButton() {
        return $('[class*="CategoryPopup"] [data-testid="crossIcon"]');
    }

    public get firstColumnElements() {
        return $$('[class*=FirstCategoryList_content]');
    }

    public get secondColumnElements() {
        return $$('[class*="SecondCategory_radio_flex"]');
    }

    public get thirdColumnElements() {
        return $$('[class*="ThirdCategory_wrapper"]');
    }

    public get unitNameText() {
        return $$('[class*="CustomInput_title"]')[0];
    }

    public get unitNameInputField() {
        return $$('[data-testid="custom-input"]')[0];
    }

    public get unitNameInputFieldErrorMessage() {
        return $('[data-testid="descriptionError"]');
    }

    public get vehicleManufacturerSectionTitle() {
        return $('[class*="SelectManufacturer_title"]');
    }

    public get vehicleManufacturerSectionInput() {
        return $('[data-testid="input-customSelectWithSearch"]');
    }

    public get selectedSearchValue() {
        return $('[data-testid="div-service-customSelectWithSearch"]');
    }

    public get vehicleManufacturerSectionInputMessage() {
        return $('[class*="AddNewItem_wrapper"]');
    }

    public get searchResultErrorField() {
        return $('[class*="searchResult"]');
    }

    public get searchResultFieldErrorMessage() {
        return $('[data-testid="div-wrapper-customSelectWithSearch"] [class*=errorTextVisible]');
    }

    public get searchIcon() {
        return $('[class*="searchResult"] svg');
    }

    public get dropdownOptions() {
        return $$('[data-testid="item-customSelectWithSearch"]');
    }

    public get clearSelectedVehicleManufacturerButton() {
        return $('[data-testid="div-service-customSelectWithSearch"] [data-testid="crossIcon"]');
    }

    public get modalNameInputTitle() {
        return $$('[class*="CustomInput_title"]')[1];
    }

    public get modalNameInput() {
        return $$('[data-testid="custom-input"]')[1];
    }

    public get modalNameInputErrorMessage() {
        return $('[data-testid="descriptionError"]');
    }

    public get technicalCharacteristicsTitle() {
        return $$('[class*="CustomTextAriaDescription_title"]')[0];
    }

    get customTextArea() {
        return $$('[data-testid="textarea-customTextAriaDescription"]')[0];
    }

    get descriptionTitle() {
        return $$('[class*="CustomTextAriaDescription_title"]')[1];
    }

    get descriptionCustomTextArea() {
        return $$('[data-testid="textarea-customTextAriaDescription"]')[1];
    }

    get vehicleLocationDivisionTitle() {
        return $('[class*="AddressSelectionBlock_title"]');
    }

    get vehicleLocationDivisionInput() {
        return $('[data-testid="mapLabel"]');
    }

    get vehicleLocationDivisionInputErrorMessage() {
        return $('[class*="AddressSelectionBlock_errorTextVisible"]');
    }

    get selectOnMapButton() {
        return $('button[class*="AddressSelectionBlock_locationBtn"]');
    }

    get map() {
        return $('#map');
    }

    get mapPopup() {
        return $('[data-testid="div-mapPopup"]');
    }

    get mapPopupTitle() {
        return $('[class*="MapPopup_title"]');
    }

    get mapPopupCloseButton() {
        return $('[class*="MapPopup_header"] [data-testid="crossIcon"]');
    }

    get popupAddress() {
        return $('[data-testid="address"]');
    }

    get confirmAddressButton() {
        return $$('[class*="MapPopup_body"] [class*="ItemButtons_wrapper"]')[1];
    }

    get canceledButton() {
        return $('[data-testid="prevButton"]');
    }

    get photosTitle() {
        return $('[class*="ImagesUnitFlow_title"]');
    }

    get telegramCrossButton() {
        return $('[data-testid="completeTenderRectangle"] [data-testid="crossIcon"]');
    }

    get images() {
        return $$('[data-testid="imageBlock"] img');
    }

    get imageContainers() {
        return $$('[data-testid="imageBlock"]');
    }

    get deleteImageIcons() {
        return $$('[data-testid="deleteImage"]');
    }

    get imageInput() {
        return $('[data-testid="input_ImagesUnitFlow"]');
    }

    get addImagesDiv() {
        return $('div[data-testid="ImagesUnitFlow"]');
    }

    get popUpWarningText() {
        return $('[data-testid="errorPopup"]');
    }

    get popUpCloseIcon() {
        return $('[data-testid="closeIcon"]');
    }

    get saveBtn() {
        return $('[class*="NotValidImagePopup"] button');
    }

    get prevButton() {
        return $('[data-testid="prevButton"]');
    }

    get imageDivClueText() {
        return $('[data-testid="description"]');
    }

    get servisesBodyTabContainer() {
        return $('[class*="CreateEditFlowLayout_container"]');
    }

    get imageUploadTitle() {
        return $('[class*="ImagesUnitFlow_paragraph"]');
    }

    get serviceInput() {
        return $('input[placeholder*="Наприклад"]');
    }

    get servicesToChoose() {
        return $$('[data-testid="searchItem-servicesUnitFlow"]');
    }

    get paymentMethodTitle() {
        return $$('[class*="PricesUnitFlow_paragraph"]')[0];
    }

    get paymentMethodDropdown() {
        return $('[data-testid="div_CustomSelect"]');
    }

    get dropdownVariants() {
        return $$('[data-testid="span-customSelect"]');
    }

    get minimumOrderCostTitle() {
        return $$('[class*="PricesUnitFlow_paragraph"]')[1];
    }

    get minimumOrderCostInput() {
        return $$('[data-testid="priceInput_RowUnitPrice"]')[0];
    }

    get minimumOrderCostField() {
        return $$('[data-testid="input_wrapper_RowUnitPrice"]')[0];
    }

    get minimumOrderCostInputErrorMessage() {
        return $('[class*="PricesUnitFlow_unitPriceWrapper"]');
    }

    get minimumOrderCostFieldRequiredInputErrorMessage() {
        return $('[class*="PricesUnitFlow_unitPriceWrapper"] [data-testid="div_required_RowUnitPrice"]');
    }

    get currencyField() {
        return $$('[data-testid="priceInput_RowUnitPrice"]')[1];
    }

    get priceForServiceTitle() {
        return $('[data-testid="div_servicePrices_PricesUnitFlow"]');
    }

    get clueLine() {
        return $('[class*="PricesUnitFlow_description"]');
    }

    get addPriceButton() {
        return $('[data-testid="addPriceButton_ServicePrice"]');
    }

    get addPriceField() {
        return $('[data-testid="div_ServicePrice"]');
    }

    get addPriceInput() {
        return $$('[data-testid="priceInput_RowUnitPrice"]')[0];
    }

    get addPriceInputField() {
        return $$('[data-testid="priceInput_RowUnitPrice"]')[2];
    }

    get addPriceInputErrorMessage() {
        return $('[data-testid="input_wrapper_RowUnitPrice"] ~ [class*="error"]');
    }

    get addPriceSelectField() {
        return $$('[class*="CustomSelect_value"]')[1];
    }

    get addPriceDigits() {
        return $$('[data-testid="priceInput_RowUnitPrice"]')[3];
    }

    get perUnitField() {
        return $$('[data-testid="div_CustomSelect"]')[1];
    }

    get perUnitArrow() {
        return $$('[data-testid="div_CustomSelect"] svg')[1];
    }

    get perUnitDropdownVariants() {
        return $$('[data-testid="item-customSelect"]');
    }

    get workingShiftField() {
        return $$('[data-testid="div_CustomSelect"]')[2];
    }

    get workingShiftArrow() {
        return $$('[data-testid="div_CustomSelect"] svg')[2];
    }

    get workingShiftDropdownVariants() {
        return $$('[data-testid="span-customSelect"]');
    }

    get deleteButton() {
        return $('[data-testid="div_removePrice_RowUnitPrice"]');
    }
}

export default new ProfilePage();
