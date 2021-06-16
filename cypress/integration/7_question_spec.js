describe("Question page", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(() => {
        cy.login('student2', '123secure');
      })

    it('allows user to add new question', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.get('#Test').click();
        cy.contains('Add Question').click();
        cy.contains('Add New Question for this Quiz');

        cy.get('.form-group').find('[type="text"]').type('What shall I ask?');
        cy.get('form').submit();

        cy.contains('What shall I ask?')
    })

    it('allows user to edit question', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.get('#Test').click();

        cy.contains('What shall I ask?')
        cy.get('#1edit').click();
        cy.contains('Edit Question');

        cy.get('.form-group').find('[type="text"]').clear();
        cy.get('.form-group').find('[type="text"]').type('To be or not to be?');
        cy.get('form').submit();

        cy.contains('To be or not to be?');
    })

    it('allows user to delete question', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.get('#Test').click();

        cy.get('#1delete').click();
        cy.contains('Are you sure you want to delete this?');
        cy.contains('Yes').click();

        cy.contains('To be or not to be?').should('not.exist');
    })
})