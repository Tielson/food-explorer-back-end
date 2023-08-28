const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUser')
const createCustomers = require('./customers')
const createTasks = require('./tasks')
const createProject = require('./projects')

async function migrationsRun() {
  const schemas = [
    createCustomers,
    createProject,
    createTasks,
    createUsers,
  ].join(';');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun