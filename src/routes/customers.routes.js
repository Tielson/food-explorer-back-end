const { Router } = require('express')

const multer = require("multer")
const CustomersController = require('../controllers/CustomersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const uploadConfig = require('../configs/upload')
const CustomersImgController = require('../controllers/CustomersImgController')

const customersRouters = Router()
const upload = multer(uploadConfig.MULTER)

const customersController = new CustomersController()
const customersImgController = new CustomersImgController()

customersRouters.post("/",  customersController.create)
customersRouters.put("/:id",  customersController.update)
customersRouters.delete("/:id",  customersController.delete)

customersRouters.patch("/img", ensureAuthenticated, upload.single("img"), customersImgController.create)
customersRouters.patch("/img", ensureAuthenticated, upload.single("img"), customersImgController.updated)


module.exports = customersRouters