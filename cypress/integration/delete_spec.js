describe("Delete quiz", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('allows user with edit permissions to delete quiz', function() {
        cy.login('student2', '123secure')

        cy.contains('View all quizzes').click();
        cy.get('#Test').click();
        cy.contains('Delete Quiz').click();
        cy.contains('Yes').click();

        cy.get('#Test').should('not.exist');
    })
})