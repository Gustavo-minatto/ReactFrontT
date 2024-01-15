const { Router } = require('express')

const ordersRoutes = Router()

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController()

const ensureAdm = require('../middlewares/ensureAdm')
const ensureAuth = require('../middlewares/ensureAuth')

ordersRoutes.use(ensureAuth)

ordersRoutes.post('/', ensureAuth, ordersController.create)
ordersRoutes.put('/:id', ensureAdm, ordersController.update)
ordersRoutes.delete('/:id', ordersController.delete)
ordersRoutes.get('/:id', ordersController.show)
ordersRoutes.get('/', ordersController.index)

module.exports = ordersRoutes