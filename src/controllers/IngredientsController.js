const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class IngredientsController {

  async create(req, res) {
    const { names } = req.body
    const user_id = req.user.id
    const database = await sqliteConnection()

    const dish_id = await database.get(`SELECT id FROM  dishs WHERE id = (SELECT max(id)  FROM dishs)`)

    const nameJoin = names.join()
      database.run(`
        INSERT INTO ingredients 
        (dish_id, user_id, name)
        VALUES (?, ?, ?)
        `, [dish_id.id, user_id, nameJoin])

    return res.json()

  }
  async update(req, res) {
    const { ingredients } = req.body
    const user_id = req.user.id
    const { id } = req.params
    const database = await sqliteConnection()

    const nameJoin = ingredients.join()

      database.run(`
      UPDATE ingredients SET 
      name = ?
      WHERE dish_id = ?
      AND user_id = ?
        `, [nameJoin, id, user_id])

    return res.json()

  }

  async delete(req, res) {
    const { id } = req.params
    const user_id = req.user.id

    const database = await sqliteConnection()

    await database.run(`DELETE FROM ingredients WHERE dish_id = ?  AND user_id = ?`, [id, user_id])

    return res.json()
  }
}

module.exports = IngredientsController