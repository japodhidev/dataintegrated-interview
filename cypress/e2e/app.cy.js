describe('Navigation', function () {
    it('should navigate to the index page', function () {
        // Test the initial page visit to the /dashboard url.
        cy.visit('/')

        cy.get('h1').contains('Data Integrated Interview Test Answers')

        cy.get('a[href*="dashboard"]').click()

        cy.url().should('include', '/dashboard')

        cy.get('h3').contains('You are not signed in')
    });
});

export {}