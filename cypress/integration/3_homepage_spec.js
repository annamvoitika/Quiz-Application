describe("Home page", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(() => {
        cy.login('student2', '123secure');
      })

    it('has a clickable link to view all quizzes', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
    })

    it('has a clickable link to log out', function() {
        cy.contains('Log Out').click();
        cy.contains('Sign in');
    })
})