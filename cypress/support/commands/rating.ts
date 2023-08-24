export const setRate = (
	starsCount: number = 5,
	feedback: string = 'feedback',
) => {
	cy.getByTestId(`StarRating.${starsCount}`).click();
	cy.getByTestId('RatingCard.Input').type(feedback);
	cy.getByTestId('RatingCard.Send').click();
};

declare global {
	namespace Cypress {
		interface Chainable {
			setRate(starNumber: number, feedback: string): Chainable<void>;
		}
	}
}
