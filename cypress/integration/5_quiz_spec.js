describe("Quiz page", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    beforeEach(() => {
        cy.login('student2', '123secure');
      })

    it('has a clickable link to add new question', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.contains('View Quiz').click();
        cy.contains('Add Question').click();
        cy.contains('Add New Question for this Quiz');
    })

    it('has a clickable link to delete quiz', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.contains('View Quiz').click();
        cy.contains('Delete Quiz').click();
        cy.contains('Are you sure you want to delete this?');
    })

    it('has a clickable link to edit question', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.contains('View Quiz').click();
        cy.contains('Edit Question').click();
        cy.contains('Edit Question');
    })

    it('has a clickable link to delete question', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.contains('View Quiz').click();
        cy.contains('Delete Question').click();
        cy.contains('Are you sure you want to delete this?');
    })

    it('has a clickable link to view answers', function() {
        cy.contains('View all quizzes').click();
        cy.contains('All Quizzes');
        cy.contains('View Quiz').click();
        cy.contains('View Answers').click();
        cy.contains('Answers for this question');
    })
})