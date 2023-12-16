/// <reference types="cypress" />

describe('Given Products api', () => {
    context('When I send GET /produtos', () => {
        it('Then it should return a list with all products', () => {
            cy.request({
                method: 'GET',
                url: '/produtos'
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.quantidade).to.eq(4) 
                    expect(response.body).to.haveOwnProperty('produtos').and.not.empty
                    expect(response.body.produtos.length).to.be.eq(4);
                    expect(response.body.produtos[0]).to.have.all.keys(
                        'nome', 'preco', 'descricao', 'quantidade', '_id'
                      )

                    cy.writeFile('cypress/fixtures/product.json', response.body.produtos[0])
                });
        });

    context('When I send GET /produtos passing id query param', () => {
        it('Then it should return only the filtered product', () => {
            cy.fixture('product.json').then((product) => {
                const productId = product._id
                cy.request(`/produtos?_id=${productId}`)
                  .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.haveOwnProperty("produtos")
                    expect(response.body.produtos).have.length(1)
                    expect(response.body.produtos).to.be.an('array')
                    expect(JSON.stringify(product)).to.eq(JSON.stringify(response.body.produtos[0]))
                    expect(productId).to.eq(response.body.produtos[0]._id)  // validating using features file     
                  });      
              })
            })
        });
    });

    context('When I do not pass id param into GET /produtos', () => {
        it('Then it should return an empty array', () => {
                cy.request(`/produtos?_id=null`)
                  .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.haveOwnProperty("produtos")
                    expect(response.body.produtos).to.be.empty
                });
        })
    })
});
