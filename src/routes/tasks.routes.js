const { Router } = require('express')

const TasksController = require('../controllers/TasksController')

const tasksRouters = Router()

const tasksController = new TasksController()

tasksRouters.post("/", tasksController.create)
tasksRouters.put("/:id", tasksController.update)


module.exports = tasksRouters