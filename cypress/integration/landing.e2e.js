describe('Landing Page e2e test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the photos', () => {
    cy.get('[data-testid="photo-0"]').should('exist');
  });

  it('should redirect to details page when click the photo', () => {
    cy.get('[data-testid="photo-0"]').click();
    cy.url().should('include', '/photos/1127174');
  });
});
