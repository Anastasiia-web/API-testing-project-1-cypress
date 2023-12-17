/// <reference types="cypress" />

let fakeUser;

describe('Given the Users api', () => {
  beforeEach(() => {
    cy.task('freshUser').then((user) => {
      fakeUser = user;
    });
  });

  context('When I send POST /usuarios', () => {
    it('Then it should create a new user', () => {
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: fakeUser
      })
        .should((response) => {
          expect(response.status).eq(201)
          expect(response.body.message).eq("Cadastro realizado com sucesso")    
        });
    });
  });

  context('When I send POST /usuarios without email', () => {
    it('Then the error meassage should be displayed', () => {
      // filter out email by JSON.stringify()
      const userWithoutEmail = JSON.stringify(fakeUser, function (key, value) {
        if(key == 'email') return undefined;
        else return value;
      })
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: userWithoutEmail,
        failOnStatusCode: false
      })
        .should((response) => {
          expect(response.status).eq(400)
          expect(response.body.email).eq("email é obrigatório")    
        });
    });
  });

  // commented for github run
  // negative test case
//   context('When I send POST /usuarios with already registered email', () => {
//     it('Then the error message should be returned', () => {
//       cy.fixture('user.json').then((registeredUser) => {
//       cy.request({
//         method: 'POST',
//         url: '/usuarios',
//         body: JSON.stringify(registeredUser),
//         failOnStatusCode: false
//       })
//         .should((response) => {
//           expect(response.status).eq(400)
//         });
//     });
//   });
// });
// });

// without plugin faker
// describe('Given the Users api', () => {
//     context('When I send POST /usuarios', () => {
//       it('Then it should create a new user', () => {
//         cy.request({
//           method: 'POST',
//           url: '/usuarios',
//           body: {
//             nome: "Dumb Joe",
//             email: "dumb.joe@qa.com.br",
//             password: "test",
//             administrador: "true"
//           }
//         })
//           .should((response) => {
//             expect(response.status).eq(201)
//             expect(response.body.message).eq("Cadastro realizado com sucesso")
//           });
//       });
//     });
