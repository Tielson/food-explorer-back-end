const { Router } = require('express')

const  IngredientsController = require('../controllers/IngredientsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const ingredientsRouters = Router()

const ingredientsController = new IngredientsController()

ingredientsRouters.post("/" ,ensureAuthenticated, ingredientsController.create)
ingredientsRouters.put("/:id" ,ensureAuthenticated, ingredientsController.update)
ingredientsRouters.delete("/:id" ,ensureAuthenticated, ingredientsController.delete)

module.exports = ingredientsRouters