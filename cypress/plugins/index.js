// /// <reference types="cypress" />

// const faker = require('faker');

// /**
//  * @type {Cypress.PluginConfig}
//  */

// module.exports = (on, config) => {
//   on("task", {
//     freshUser() {
//       user = {
//         nome: faker.name.firstName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         administrador: "true"
//       };
//       return user;
//     },
//     setItem ({ name, value }) {
//         items[name] = value
//         return null
//     },
//       getItem (name) {
//         if (name in items) {
//           return items[name]
//         }
//     },
//   })
//   return config
// }

// const items = {}
// on('task', {
//   setItem ({ name, value }) {
//     items[name] = value
//     return null
//   },
//   getItem (name) {
//     if (name in items) {
//       return items[name]
//     }
//   },