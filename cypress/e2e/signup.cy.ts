describe('SignUp', () => {
  it('should verify validation and signUp', () => {
    cy.visit('/');
    cy.get('[data-cy="firstName"]').clear();
    cy.get('[data-cy="firstName"]').type('FirstName test');
    cy.get('[data-cy="lastName"]').clear();
    cy.get('[data-cy="lastName"]').type('LastNameTest');
    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="email"]').type('Test.com');
    cy.get('.my-2 > .d-flex').should('have.text', 'Invalid email');
    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="email"]').type('test@mail');
    cy.get('.my-2 > .d-flex').should('have.text', 'Invalid email');
    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="email"]').type('test@mail.com');
    cy.get('[data-cy="password"]').clear();
    cy.get('[data-cy="password"]').type('@Test');
    cy.get('.my-2 > .d-flex').should('have.text', 'Invalid password');
    cy.get('[data-cy="password"]').clear();
    cy.get('[data-cy="password"]').type('@Test123');
    cy.get('[data-cy="submitSignup"').click();
    // should be a data ui no ps-2
    cy.get('.ps-2').should('have.text', 'You have successfully signed up');
    cy.get('[data-cy="backToSignUpPage"]').should('be.visible');
    cy.get('[data-cy="backToSignUpPage"]').click();
  });
});
