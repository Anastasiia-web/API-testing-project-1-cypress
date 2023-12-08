/// <reference types="cypress" />

// following BDD style:
// describe - Given -> Test Suite name
// context - When -> Test Inner Suite name
// it - Then -> tests

describe('Given the Users api', () => {
    context('When I send GET /usuarios', () => {
      it('Then it should return a list with all registered users', () => {       
        cy.request({
          method: 'GET',
          url: '/usuarios'
      })
          .then((response) => {
              expect(response.status).to.eq(200)
              expect(response.body).to.haveOwnProperty('quantidade')
              expect(response.body).to.haveOwnProperty('usuarios').and.not.empty
              expect(response.body.quantidade).to.eq(response.body.usuarios.length)
              // iterating via array
              Cypress._.each(response.body.usuarios, (usuario) => {
                expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
                expect(usuario.email).to.not.be.null
              })
              // setting task           
              const userId = response.body.usuarios[0]._id
              cy.task('setItem', {
                name: 'userId',
                value: userId
              })
              // recording data to json file
              cy.exec(
                `echo ${JSON.stringify(response.body.usuarios[0])} >cypress/fixtures/my.json`
              )
          });
      });
    });

    context('When I send GET /usuarios passing id', () => {
      beforeEach(() => {
        cy.task('getItem','userId').as('userId')
      })
      it('Then it should return only the filtered user', () => {
        const userIdTask = cy.get('@userId')
        cy.fixture('my.json').then((user) => {
          const userIdFile = user._id  
          cy.request(`/usuarios?_id=${userIdFile}`)
            .then((response) => {
              expect(response.status).to.eq(200)
              expect(JSON.stringify(user)).to.eq(JSON.stringify(response.body.usuarios[0]))
              expect(userIdFile).to.eq(response.body.usuarios[0]._id)  // validating using features file
              userIdTask.should('equal', userIdFile)  // validatingusing task         
            });      
        })
    });
  });

  // using qs - query string
  context('When I send GET /usuarios passing id query param', () => {
    it('Then it should return only the filtered user', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios',
        qs: {
          _id: '0uxuPY0cbmQhpEz1'
        }
      })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.usuarios[0].nome).to.eq("Fulano da Silva")
        });
    });
  });
});