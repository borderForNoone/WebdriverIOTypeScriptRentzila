import Page from './page';

class TendersPage extends Page {
    get searchInput() {
        return $('[data-testid="search"]');
    }

    get rentzilaLogo() {
        return $('[data-testid="logo"]');
    }
}

export default new TendersPage();
