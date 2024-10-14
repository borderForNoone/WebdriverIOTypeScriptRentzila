import Page from './page';

class ProfilePage extends Page {
    public get phoneNumberField() {
        return $('[data-testid="input_OwnerProfileNumber"]');
    }

    public get createUnitTitle() {
        return $('[class*=CreateEditFlowLayout_title]');
    }
}

export default new ProfilePage();
