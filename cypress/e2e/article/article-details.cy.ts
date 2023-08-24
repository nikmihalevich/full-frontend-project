let currentArticleId: string = '';

describe('User entry on article page', () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            cy.visit(`articles/${article.id}`);
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });

    it('And see content of article', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('And see recommendation list', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('And leave a comment', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });

    it('And rate article', () => {
        const rate: number = 5;
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(rate, 'feedback');
        cy.get('[data-selected="true"]').should('have.length', rate);
    });

    it('And rate article (with stubs on fixtures)', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });

        const rate: number = 5;
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(rate, 'feedback');
        cy.get('[data-selected="true"]').should('have.length', rate);
    });
});
