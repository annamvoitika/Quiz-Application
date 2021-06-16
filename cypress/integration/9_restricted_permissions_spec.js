describe("Restricted permissions", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('allows user with restricted permissions to view homepage without an option to add new quiz', function() {
        cy.visit('http://localhost:3000/quizmanager/register');
        cy.get('.form-group').find('[type="text"]').type('restricteduser');
        cy.get('.form-group').find('[type="password"]').type('123secure');
        cy.get('[class="form-select"]').select('Restricted Permission');
        cy.get('form').submit();

        cy.visit('http://localhost:3000/quizmanager/signin');
        cy.get('.form-group').find('[type="text"]').type('restricteduser');
        cy.get('.form-group').find('[type="password"]').type('123secure');
        cy.get('form').submit();
        cy.contains('Welcome!');

        cy.contains('Add new quiz').should('not.exist');
    })

    it('allows user to view all quizzes', function() {
        cy.login('restricteduser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
    })

    it('allows user to view questions but not have any options to edit or delete quiz', function() {
        cy.login('restricteduser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('View Quiz').click();
        cy.contains('Add Question').should('not.exist');
        cy.contains('Delete Quiz').should('not.exist');
    })

    it('does not allow user to view answers', function() {
        cy.login('restricteduser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('View Quiz').click();
        cy.contains('View Answers').should('not.exist');
    })
})