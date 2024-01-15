const knex = require('../database/knex')

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class IngredientsController {
    async create(request, response) {
        const { status, details } = request.body
        const user_id = request.user.id;

        await knex('orders').insert({
            status,
            details,
            user_id
        })

        return response.status(201).json()
    }

    async delete(request, response) {
        const { id } = request.params

        await knex('orders').where({ id }).delete()

        return response.json()
    }

    async update(request, response) {
        const { status, details } = request.body
        const { id } = request.params

        const database = await sqliteConnection()
        const order = await database.get('SELECT * FROM orders WHERE id = (?)', [id])

        if (!order) {
            throw new AppError('Pedido não encontrado')
        }

        order.status = status ?? order.status
        order.details = details ?? order.details

        await database.run(`
            UPDATE orders SET 
            status = ?,
            details = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, [order.status, order.details, id])

        return response.json()
    }

    async show(request, response) {

        const { id } = request.params

        const order = await knex('orders').where({ id }).first()

        return response.json(order)

    }

    async index(request, response) {
        const { user_id } = request.query

        const allOrders = await knex('orders').where({ user_id }).orderBy('status')

        return response.json(allOrders)
    }
}

module.exports = IngredientsController