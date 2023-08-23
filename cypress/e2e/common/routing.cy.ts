import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('User isn`t authorized', () => {
        it('Open main page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Open profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Open non-existing route ', () => {
            cy.visit('/asdasdasfsa');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });
    describe('User is authorized', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Open profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Open article list page', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
