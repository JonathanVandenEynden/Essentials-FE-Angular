describe('Form validation with wrong input shows error message', function () {


  it('Touch required fields show error', function () {
    cy.visit('/add');
    cy.get('[data-cy=submitButton]').should('be.disabled');

    cy.get('[data-cy=titleInput]').click();
    cy.get('[data-cy=descriptionInput]').click();
    cy.get('[data-cy=startDateInput]').click();
    cy.get('[data-cy=endDateInput]').click();
    cy.get('[data-cy=startDateInput]').click();
    cy.get('[data-cy=changeTypeSelect]').click().get('mat-option').contains('Economical').click();
    cy.get('[data-cy="changeSponsorSelect"]').click();
    cy.get('[data-cy="changeSponsorSelect"').click();
    cy.get('[data-cy="changeGroupNameInput"]').click();
    cy.get('[data-cy="employeesSelectList"]').click();
    cy.get('[data-cy="notificationSelectBox"]').click();

    cy.get('[data-cy=titleError]').should('be.visible');
    cy.get('[data-cy=descriptionError]').should('be.visible');
    cy.get('[data-cy=startDateError]').should('be.visible');
    cy.get('[data-cy=endDateError]').should('be.visible');
    cy.get('[data-cy="changeGroupName"]').should('be.visible');

    cy.get('[data-cy=submitButton]').should('be.disabled');
  })
});
