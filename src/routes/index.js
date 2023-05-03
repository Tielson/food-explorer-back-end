const {Router} = require("express")

const usersRouters = require("./users.routes")
const dishRouters = require("./dishs.routes")
const ingredients = require("./Ingredients.routes")
const sessionsRouter = require("./sessions.routes")
const orderRouter = require("./order.routes")

const routes = Router()

routes.use("/users", usersRouters)
routes.use("/dish", dishRouters)
routes.use("/ingredients", ingredients)
routes.use("/sessions", sessionsRouter)
routes.use("/order", orderRouter)

module.exports = routes