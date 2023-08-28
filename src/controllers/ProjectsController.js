const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class ProjectsController {

  async create(req, res) {
    const { name, term } = req.body
    const { id } = req.params
    const database = await sqliteConnection()

    database.run(`
        INSERT INTO projects
        (name, term, customers_id)
        VALUES (?, ?, ?)
        `, [name, term, id])

    return res.json()
  }

  async update(req, res) {
    const { name, term } = req.body
    const { id } = req.params

    const database = await sqliteConnection()

    database.run(`
      UPDATE projects SET 
      name = ?,
      term = ?,
      updated_at = DATETIME ('now','localtime'),
      WHERE id = ?
        `, [name, term, id])

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params

    const database = await sqliteConnection()

    await database.run(`DELETE FROM projects WHERE id = ?`, [id])

    return res.json()
  }
}

module.exports = ProjectsController