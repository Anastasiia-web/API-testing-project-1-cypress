

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