const { Router } = require('express')

const uploadConfig = require('../config/upload')
const multer = require('multer')

const ingredientsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const IngredientsController = require('../controllers/IngredientsController')
const IngredientsPhotoController = require('../controllers/IngredientsPhotoController')

const ingredientsController = new IngredientsController()
const ingredientsPhotoController = new IngredientsPhotoController()

const ensureAdm = require('../middlewares/ensureAdm')
const ensureAuth = require('../middlewares/ensureAuth')

ingredientsRoutes.use(ensureAuth)

ingredientsRoutes.post('/', ensureAdm, ingredientsController.create)
ingredientsRoutes.delete('/:id', ingredientsController.delete)
ingredientsRoutes.get('/:name', ingredientsController.show)
ingredientsRoutes.patch('/photo/:ingredient_id', ensureAdm, upload.single('photo'), ingredientsPhotoController.update)

module.exports = ingredientsRoutes