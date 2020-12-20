describe('Form validation test for new CI w/ valid params', function () {
  it('valid form enables submit button', function () {
    cy.visit('/');
    cy.get('[data-cy=usernameField]').type("Sukrit.bhattacharya@hogent.com");
    cy.get('[data-cy=passwordField]').type("P@ssword1");
    cy.get('[data-cy=loginButton]').click();

    cy.get('[data-cy="navigateToAddCIbutton"]').click();

    cy.get('[data-cy=submitButton]').should('be.disabled');

    cy.get('[data-cy=titleInput]').type("testCI");
    cy.get('[data-cy=descriptionInput]').type("This is a description for a new change initiative that is long enough.")

    const tomorrow = Cypress.moment()
      .add(1, 'day')
      .format('yyyy-MM-DD')
    const nextWeek = Cypress.moment()
      .add(7, 'day')
      .format('yyyy-MM-DD')
    cy.get('[data-cy=startDateInput]').type(`${tomorrow}`, {force: true})
    cy.get('[data-cy=endDateInput]').type(`${nextWeek}`,{force: true})

    cy.get('mat-select[data-cy=changeTypeSelect]').click().get('mat-option').contains('Economical').click({force: true});
    cy.get('mat-select[data-cy=changeSponsorSelect]').click().get('mat-option').contains('Sponser').click({force: true});
    // cy.get('[data-cy="employeesSelectList"]').click().get('mat-option')
    //   .contains("Sponser").click({force: true}).rightclick();

    cy.get('[data-cy="changeGroupNameInput"]').type("Cypress testchange", {force: true});
    cy.get('[data-cy=notificationSelectBox]').click({force: true});


    cy.get('[data-cy=submitButton]').should('be.disabled');

  })
})
