const {Router} = require("express")

const usersRouters = require("./users.routes")
const customersRouters = require("./customers.routes")
const projects = require("./projects.routes")
const tasks = require("./tasks.routes")

const routes = Router()

routes.use("/users", usersRouters)
routes.use("/customers", customersRouters)
routes.use("/projects", projects)
routes.use("/tasks", tasks)


module.exports = routes