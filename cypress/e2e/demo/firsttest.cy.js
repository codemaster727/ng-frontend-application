//firsttest.js

describe('My First Test', () => {
	it('Launch Browser and Navigate', () => {
		cy.visit('http://localhost:3000');

		cy.title().should('eq', 'Node Guardians');
	});
});
