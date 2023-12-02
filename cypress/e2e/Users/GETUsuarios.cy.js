/// <reference types="cypress" />

// following BDD style:
// describe - Given -> Test Suite name
// context - When -> Test Inner Suite name
// it - Then -> tests

describe('Given the Users api', () => {
    context('When I send GET /usuarios', () => {
      it('Then it should return a list with all registered users', () => {       
        // tests
      });
    });
  
    context('When I send GET /usuarios passing id query param', () => {
      it('Then it should return only the filtered user', () => {
        // tests
      });
    });
  });