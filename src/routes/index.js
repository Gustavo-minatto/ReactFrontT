const { Router } = require('express')

const usersRouter = require('./users.routes')
const ingredientsRoutes = require('./ingredients.routes')
const dishRoutes = require('./dishes.routes')
const searchRoutes = require('./search.routes')
const ordersRoutes = require('./orders.routes')
const sessionRoutes = require('./sessions.routes')
const gettersRoutes = require('./getters.routes')

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/ingredients", ingredientsRoutes)
routes.use("/dishes", dishRoutes)
routes.use("/search", searchRoutes)
routes.use("/orders", ordersRoutes)
routes.use('/sessions', sessionRoutes)
routes.use('/getters', gettersRoutes)

module.exports = routes