import Page from './page';

class TendersPage extends Page {
    readonly searchInput = '[data-testid="search"]';
    readonly rentzilaLogo = '[data-testid="logo"]';
}

export default new TendersPage();
