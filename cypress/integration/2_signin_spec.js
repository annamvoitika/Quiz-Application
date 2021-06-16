describe("Sign in page", function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('has a form that can be filled in and submitted successfully', function() {
        cy.visit('http://localhost:3000/quizmanager/signin');
        cy.get('.form-group').find('[type="text"]').type('student2');
        cy.get('.form-group').find('[type="password"]').type('123secure');
        cy.get('form').submit();
        cy.contains('Welcome!');
    })

    it('does not let a user log in if the password is incorrect', function() {
        cy.visit('http://localhost:3000/quizmanager/register');
        cy.get('.form-group').find('[type="text"]').type('student3');
        cy.get('.form-group').find('[type="password"]').type('123secure');
        cy.get('[class="form-select"]').select('Edit Permission');
        cy.get('form').submit();

        cy.visit('http://localhost:3000/quizmanager/signin');
        cy.get('.form-group').find('[type="text"]').type('student3');
        cy.get('.form-group').find('[type="password"]').type('123');
        cy.get('form').submit();
        cy.contains('Sign in');
    })
})