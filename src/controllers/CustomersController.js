const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class CustoersController {
  async create(req, res) {

    const { name_company, representative, cnpj, social_reason, img, whatsapp} = req.body
    const database = await sqliteConnection()

    await database.run("INSERT INTO customers (name_company, representative, cnpj, social_reason, img, whatsapp) VALUES (?,?,?,?,?,?)", [name_company, representative, cnpj, social_reason, img, whatsapp])

    return res.json()
  }

  async update(req, res) {
    const {name_company, representative, cnpj, social_reason, img, whatsapp} = req.body
    const { id } = req.params

    const database = await sqliteConnection()

    await database.run(`
     UPDATE customers SET 
     name_company = ?,
     representative = ?,
     cnpj = ?,
     social_reason = ?,
     img = ?,
     whatsapp = ?,
     updated_at = DATETIME ('now','localtime')
     WHERE id = ?
     `, [name_company, representative, cnpj, social_reason, img, whatsapp, id])

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params

    const database = await sqliteConnection()

    await database.run(`DELETE FROM customers WHERE id = ?`, [id])

    return res.json()
  }
}

module.exports = CustoersController