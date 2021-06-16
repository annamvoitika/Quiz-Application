describe("All quizzes page", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(() => {
        cy.login('student2', '123secure');
      })

    it('has a clickable link to add new quiz', function() {
        cy.contains('View all quizzes').click();
        cy.contains('Add new quiz');
    })

    it('has a clickable link to view each quiz', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.contains('View Quiz').click();
        cy.contains('Quiz Questions')
    })

    it('allows user to navigate from individual quiz page to all quizzes page using breadcrumb element', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.contains('View Quiz').click();
        cy.contains('Quiz Questions')
        cy.contains('All Quizzes').click();
        cy.contains('All Quizzes');
    })
})