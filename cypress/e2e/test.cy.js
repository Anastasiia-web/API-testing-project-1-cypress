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
  
    it('loads 2 items', () => {
      cy.request('/produtos')
        .its('body')
        .should('have.length', 2)
    })
  })

  // we set the response to be the activites.json fixture
// cy.intercept('GET', '/activities/*', { fixture: 'activities.json' })

describe('intercepting request', () => {
  context('GET /produtos', () => {
    it('should return a product from my-pr.json file', () => {
      cy.intercept('GET', '/produtos', { fixture: 'my-pr.json' })
        .its('body')
        .should('have.length', 1)
    })
  });
});