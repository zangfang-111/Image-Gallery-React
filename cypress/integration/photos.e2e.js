describe('Details Page e2e test', () => {
  it('should show details page', () => {
    cy.visit('/');
    cy.get('[data-testid="photo-0"]').should('exist');

    cy.get('[data-testid="photo-0"]').click();
    cy.url().should('include', '/photos/1127174');
  });

  it('should show the details data', () => {
    cy.get('[data-testid="image-1127174"]').should('exist');
    cy.get('.category__details')
      .should('contain', 'mploscar')
      .and('contain', 'sunflower')
      .and('contain', 'photo')
      .and('contain', '4976')
      .and('contain', '123')
      .and('contain', '912')
      .and('contain', '340156')
      .and('contain', '3168')
      .and('contain', '4752')
      .and('contain', '3922163')
  });

  it('should visible "go back" button, and should redirect to landing page when click it', () => {
    cy.get('.category__go-back').should('exist');
    cy.get('.category__go-back').click();

    cy.url().should('include', '/');
    cy.get('[data-testid="photo-0"]').should('exist');
  });
});
