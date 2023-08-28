// const sqliteConnection = require('../database/sqlite')
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")

class UsersController {

  async create(req, res) {
    const { name, email, password, isAdmin } = req.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password, isAdmin })

    return res.json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const user_id = req.user.id

    const database = await sqliteConnection()
    const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [user_id])

    if (!user) {
      throw new AppError("Usuario não encontrado")
    }

    const userWithUpdatedEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email])

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError(" Este e-mail já está em uso")
    }

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
    }

    if (old_password && password) {
      const checkedOldPassword = await compare(old_password, user.password)

      if (!checkedOldPassword) {
        throw new AppError("Senha antiga não confere.")
      }

      user.password = await hash(password, 8)
    }

    user.name = name || user.name
    user.email = email || user.email

    await database.run(`
    UPDATE users set
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME ('now','localtime')
    WHERE id = ?` ,
      [user.name, user.email, user.password, user_id])

    return res.json()
  }

  
}
module.exports = UsersController