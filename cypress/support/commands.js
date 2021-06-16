Cypress.Commands.add("login", (username, password) => {
    cy.visit('http://localhost:3000/quizmanager/signin');
    cy.get('.form-group').find('[type="text"]').type(username);
    cy.get('.form-group').find('[type="password"]').type(password);
    cy.get('form').submit();
    cy.contains('Welcome!');
})
