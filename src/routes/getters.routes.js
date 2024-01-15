const { Router } = require('express')

const getterRoutes = Router()

const uploadConfig = require('../config/upload')
const multer = require('multer')

const upload = multer(uploadConfig.MULTER)

const GettersController = require('../controllers/GettersController')

const gettersController = new GettersController()

getterRoutes.get('/:type', gettersController.getMain)

module.exports = getterRoutes