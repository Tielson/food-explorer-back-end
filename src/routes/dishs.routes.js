const { Router } = require('express')

const multer = require("multer")
const DishsController = require('../controllers/DishController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const uploadConfig = require('../configs/upload')
const DishImgController = require('../controllers/DishImgController')

const dishRouters = Router()
const upload = multer(uploadConfig.MULTER)

const dishController = new DishsController()
const dishImgController = new DishImgController()

dishRouters.post("/", ensureAuthenticated, dishController.create)
dishRouters.put("/:id", ensureAuthenticated, dishController.update)

dishRouters.patch("/img/:id", ensureAuthenticated, upload.single("img"), dishImgController.updated)
dishRouters.patch("/img", ensureAuthenticated, upload.single("img"), dishImgController.update)


dishRouters.get("/preview/:id", ensureAuthenticated, dishController.preview)
dishRouters.delete("/:id", ensureAuthenticated, dishController.delete)


dishRouters.get("/all", ensureAuthenticated, dishController.showAll)
dishRouters.get("/meal", ensureAuthenticated, dishController.showMeal)
dishRouters.get("/dessert", ensureAuthenticated, dishController.showDessert)
dishRouters.get("/drink", ensureAuthenticated, dishController.showDrink)

module.exports = dishRouters