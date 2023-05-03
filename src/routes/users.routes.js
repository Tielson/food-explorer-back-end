const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const UsersController = require('../controllers/UserController')

const usersRouters = Router()

const usersController = new UsersController()


usersRouters.post("/", usersController.create)
usersRouters.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRouters