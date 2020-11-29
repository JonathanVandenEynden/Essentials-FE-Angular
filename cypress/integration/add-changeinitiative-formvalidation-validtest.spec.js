describe('Form validation test for new CI w/ valid params', function () {
  it('valid form enables submit button', function () {
    cy.visit('/add')
    cy.get('[data-cy=submitButton]').should('be.disabled');

    cy.get('[data-cy=titleInput]').type("testCI");
    cy.get('[data-cy=descriptionInput]').type("This is a description for a new change initiative that is long enough.")


    const tomorrow = Cypress.moment()
      .add(1, 'day')
      .format('yyyy-MM-DD')
    const nextWeek = Cypress.moment()
      .add(7, 'day')
      .format('yyyy-MM-DD')
    cy.get('[data-cy=startDateInput]').type(`${tomorrow}`)
    cy.get('[data-cy=endDateInput]').type(`${nextWeek}`)

    cy.get('mat-select[data-cy=changeTypeSelect]').click().get('mat-option').contains('Economical').click();
    cy.get('mat-select[data-cy=changeManagerSelect]').click().get('mat-option').contains('Sponser').click();

    cy.get('[data-cy=submitButton]').should('be.enabled');

  })
})
