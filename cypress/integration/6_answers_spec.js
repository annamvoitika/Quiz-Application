describe("Answers page", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(() => {
        cy.login('student2', '123secure');
      })

    it('has a clickable link to add new answer', function() {
        cy.contains('View all quizzes').click();
        cy.contains('Add new quiz').click();
        cy.contains('Add new quiz');
        cy.get('.form-group').find('[name="title"]').type('Test');
        cy.get('.form-group').find('[name="question"]').type('Test Question?');
        cy.get('.form-group').find('[name="answer"]').type('Test Answer 1');
        cy.get('form').submit();

        cy.get('#Test').click();
        cy.contains('View Answers').click();
        cy.contains('Add New Answer').click();
        cy.contains('Add another answer option for this question');
    })

    it('allows user to add a new answer option', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.get('#Test').click();
        cy.contains('View Answers').click();

        cy.contains('Add New Answer').click();
        cy.get('.form-group').find('[type="text"]').type('My new answer option');
        cy.get('form').submit();
        cy.contains('View Answers').click();
        cy.contains('My new answer option');
    })

    it('allows user to delete answer', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.get('#Test').click();
        cy.contains('View Answers').click();

        cy.get('#0delete').click();
        cy.contains('Are you sure you want to delete this?')
        cy.contains('Yes').click();
        cy.contains('All Quizzes');
    })

    it('allows user to edit answer', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.get('#Test').click();
        cy.contains('View Answers').click();

        cy.get('#0edit').click();
        cy.get('.form-group').find('[type="text"]').clear();
        cy.get('.form-group').find('[type="text"]').type('Updated answer');
        cy.get('form').submit();
        cy.contains('Test');
    })
})