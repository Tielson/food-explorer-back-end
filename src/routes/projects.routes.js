const { Router } = require('express')

const ProjectsController = require('../controllers/ProjectsController')

const projectsRouters = Router()

const projectsController = new ProjectsController()

projectsRouters.post("/:id", projectsController.create)
projectsRouters.put("/:id", projectsController.update)
projectsRouters.delete("/:id", projectsController.delete)

module.exports = projectsRouters