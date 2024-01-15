const { Router } = require('express')

const usersRoutes = Router()

const ensureAdm = require('../middlewares/ensureAdm')
const ensureAuth = require('../middlewares/ensureAuth')


const UserController = require('../controllers/UserController')
const userController = new UserController()

usersRoutes.post('/', userController.create)
usersRoutes.put('/', ensureAuth, userController.update)
usersRoutes.delete('/', ensureAuth, userController.delete)

module.exports = usersRoutes