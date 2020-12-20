describe('Form validation test for new CI w/ valid params', function () {
  it('valid form enables submit button', function () {
    cy.visit('/adminlogin');
    cy.get('[data-cy=usernameField]').type("simon.dewilde@essentials.com");
    cy.get('[data-cy=passwordField]').type("P@ssword1");
    cy.get('[data-cy=loginButton]').click();

    cy.get('[data-cy="predefinedAssessmentsButton"]').click();

    cy.get('[data-cy=createNewAssessmentButton]').click();

    cy.get('[data-cy="themeInputField"]').click();
    cy.get('[data-cy="submitButton"]').should('be.disabled');

    cy.get('[data-cy="typeSelector"]').click().get('mat-option').contains('Yes').click();

    cy.get('[data-cy="questionStringInputField"').click();

    cy.get('[data-cy="submitButton"]').should('be.disabled');
  });
})
