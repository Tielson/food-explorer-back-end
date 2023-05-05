const { Router } = require('express')

const  OrderController = require('../controllers/OrderController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const ingredientsRouters = Router()

const orderController = new OrderController()

ingredientsRouters.post("/" ,ensureAuthenticated, orderController.create)
ingredientsRouters.put("/pedido/:id" ,ensureAuthenticated, orderController.update)
ingredientsRouters.get("/" ,ensureAuthenticated, orderController.viewAll)
ingredientsRouters.get("/ordernew" ,ensureAuthenticated, orderController.orderNew)
ingredientsRouters.get("/toview" ,ensureAuthenticated, orderController.toview)

module.exports = ingredientsRouters