const { Router } = require('express')

const dishesRoutes = Router()

const uploadConfig = require('../config/upload')
const multer = require('multer')

const upload = multer(uploadConfig.MULTER)

const DishesController = require('../controllers/DishesController')
const DishesPhotoController = require('../controllers/DishesPhotoController')
const GettersController = require('../controllers/GettersController')

const dishesController = new DishesController()
const dishesPhotoController = new DishesPhotoController()

const ensureAdm = require('../middlewares/ensureAdm')
const ensureAuth = require('../middlewares/ensureAuth')

dishesRoutes.use(ensureAuth)

dishesRoutes.post('/', ensureAdm, dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', ensureAdm, dishesController.delete)
dishesRoutes.put('/:id', dishesController.put)
dishesRoutes.patch('/photo/:dish_id', ensureAdm, upload.single('photo'), dishesPhotoController.update)

module.exports = dishesRoutes