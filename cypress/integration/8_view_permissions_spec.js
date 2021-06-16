describe("View permissions", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('allows user with view homepage without an option to add new quiz', function() {
        cy.visit('http://localhost:3000/quizmanager/register');
        cy.get('.form-group').find('[type="text"]').type('viewuser');
        cy.get('.form-group').find('[type="password"]').type('123secure');
        cy.get('[class="form-select"]').select('View Permission');
        cy.get('form').submit();

        cy.visit('http://localhost:3000/quizmanager/signin');
        cy.get('.form-group').find('[type="text"]').type('viewuser');
        cy.get('.form-group').find('[type="password"]').type('123secure');
        cy.get('form').submit();
        cy.contains('Welcome!');

        cy.contains('Add new quiz').should('not.exist');
    })

    it('allows user to view all quizzes', function() {
        cy.login('viewuser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
    })

    it('allows user to view questions but not have any options to edit or delete quiz', function() {
        cy.login('viewuser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('View Quiz').click();
        cy.contains('Add Question').should('not.exist');
        cy.contains('Delete Quiz').should('not.exist');
    })

    it('allows user to view questions but not have any options to edit or delete questions', function() {
        cy.login('viewuser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('View Quiz').click();
        cy.contains('Edit Question').should('not.exist');
        cy.contains('Delete Question').should('not.exist');
    })

    it('allows user to view answers', function() {
        cy.login('viewuser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('View Quiz').click();
        cy.contains('View Answers').click();
        cy.contains('Answers for this question');
    })

    it('allows user to view answers but not delete or edit answer', function() {
        cy.login('viewuser', '123secure')

        cy.contains('View all quizzes').click();
        cy.contains('View Quiz').click();
        cy.contains('View Answers').click();
        cy.contains('Edit Answer').should('not.exist');
        cy.contains('Delete Answer').should('not.exist');
    })
})