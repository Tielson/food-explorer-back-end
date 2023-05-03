const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class NoteController {
  async create(req, res) {

    const { name, category, price, description, img } = req.body
    const user_id = req.user.id
    const database = await sqliteConnection()

    await database.run("INSERT INTO dishs (name, category, price, description, img, user_id) VALUES (?,?,?,?,?,?)", [name, category, price, description, img, user_id])

    return res.json()
  }

  async update(req, res) {
    const { name, category, price, description, img } = req.body
    const user_id = req.user.id
    const { id } = req.params

    const database = await sqliteConnection()



    await database.run(`
     UPDATE dishs SET 
     name = ?,
     category = ?,
     price = ?,
     description = ?,
     img = ?,
     updated_at = DATETIME ('now')
     WHERE id = ?
     AND user_id = ?
     `, [name, category, price, description, img, id, user_id])

    return res.json()
  }

  async preview(req, res) {
    const { id } = req.params
    const database = await sqliteConnection()

    const notes = await database.all(`
    SELECT  n.category,n.id, n.name as nameD, n.description, n.img, n.price, t.name
        FROM  dishs as n  JOIN  ingredients as t on  t.dish_id = n.id 
        WHERE  t.dish_id = ?
    `, [ id])

    return res.json(notes)
  }

  async delete(req, res) {
    const { id } = req.params
    const user_id = req.user.id

    const database = await sqliteConnection()

    await database.run(`DELETE FROM dishs WHERE id = ? AND user_id = ?`, [id, user_id])

    return res.json()
  }

  async showAll(req, res) {
    const database = await sqliteConnection()

    const notes = await database.all(`SELECT name, img, id from dishs `)

    return res.json(notes)
  }
  
  async showMeal(req, res) {
    const database = await sqliteConnection()

    const notes = await database.all(`SELECT n.id, n.name as nameD, n.description, n.img, n.price
    FROM  dishs as n   
    WHERE n.user_id = 1 and category = 'Refeições'`)

    return res.json(notes)
  }

  async showDessert(req, res) {
    const database = await sqliteConnection()

    const notes = await database.all(`SELECT n.id, n.name as nameD, n.description, n.img, n.price
    FROM  dishs as n   
    WHERE n.user_id =1  and category = 'Sobremesas'`)

    return res.json(notes)
  }

  async showDrink(req, res) {
    const database = await sqliteConnection()

    const notes = await database.all(`SELECT n.id, n.name as nameD, n.description, n.img, n.price
    FROM  dishs as n   
    WHERE n.user_id = 1 and category = 'Bebidas'`)

    return res.json(notes)
  }
}

module.exports = NoteController