const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUser')
const createDishs = require('./createDishs')
const createIngredients = require('./createIngredients')

async function migrationsRun() {
  const schemas = [
    createDishs,
    createIngredients,
    createUsers,
  ].join(';');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun