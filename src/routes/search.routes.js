const { Router } = require('express')

const searchRoutes = Router()

const uploadConfig = require('../config/upload')
const multer = require('multer')

const upload = multer(uploadConfig.MULTER)

const SearchController = require('../controllers/searchController')

const searchController = new SearchController()

const ensureAuth = require('../middlewares/ensureAuth')

searchRoutes.get('/', searchController.show)

module.exports = searchRoutes