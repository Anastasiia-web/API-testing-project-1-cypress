const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      supportFile: false,
      setupNodeEvents (on, config) {
        const items = {}
        on('task', {
          setItem ({ name, value }) {
            items[name] = value
            return null
          },
          getItem (name) {
            if (name in items) {
              return items[name]
            }
          },
        })
      },
    baseUrl: 'https://serverest.dev'
  },
});
// baseUrl: 'https://jsonplaceholder.cypress.io'

//0000000

// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     baseUrl: 'https://serverest.dev'
//   },
// });
// baseUrl: 'https://jsonplaceholder.cypress.io'


//0000000000