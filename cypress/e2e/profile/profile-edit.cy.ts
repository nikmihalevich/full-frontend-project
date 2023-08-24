let profileId: string = '';

describe('User entry on profile page', () => {
	beforeEach(() => {
		cy.visit('');
		cy.login().then((data) => {
			profileId = data.id;
			cy.visit(`profile/${data.id}`);
		});
	});
	afterEach(() => {
		cy.resetProfile(profileId);
	});
	it('And profile successfully loaded', () => {
		cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
	});
	it('And edit it', () => {
		const firstname: string = 'new firstname';
		const lastname: string = 'new lastname';
		cy.updateProfile(firstname, lastname);
		cy.getByTestId('ProfileCard.firstname').should('have.value', firstname);
		cy.getByTestId('ProfileCard.lastname').should('have.value', lastname);
	});
});
