/// <reference types="cypress" />

describe('Mocha’s interface', () => {
    context('it provides a way to keep tests easier to read and organized.', () => {
      it('This is your test case', () => {
        // tag:smoke
        expect(true).to.eq(true)
      });
    });
  });
//short test description
  describe('produtos API', () => {
    it('returns JSON', () => {
      cy.request('/produtos')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
    })
  
    it('loads 17 items', () => {
      cy.request('/produtos')
        .its('body.produtos')
        .should('have.length', 2)
    })
  })

describe('Given api GET /produtos', () => {
  context('When I intercept the response', () => {
    it('should return a product from my-product.json file', () => {
      cy.intercept('GET', '/produtos', { fixture: 'my-product.json' }).as('h')
      cy.visit('https://serverest.dev')
      cy.get('#operations-Produtos-get_produtos > .opblock-summary > .opblock-summary-control > .opblock-summary-method').click()
      cy.get('.try-out > .btn').click()
      cy.get('.execute-wrapper > .btn').click()
      cy.wait('@h').its('response')
      .then(response => {
        cy.wrap(response).its('statusCode').should('eq', 200)     
        cy.wrap(response).its('body._id').should('eq', 'My-BeeJh5lz3k6kSIzA')
      })
    })
  });
});