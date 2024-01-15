const knex = require('../database/knex')

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class IngredientsController {
    async create (request, response) {
        const { name } = request.body

        const database = await sqliteConnection()
        const verifyIngredientExistence = await database.get('SELECT * FROM ingredients WHERE name = (?)', [name])

        if(verifyIngredientExistence){
            throw new AppError('Esse ingrediente já existe')
        }

        await database.run('INSERT INTO ingredients (name) VALUES (?)', [name])

        return response.status(201).json()
    }

    async delete(request, response){
        const { id } = request.params

        await knex('ingredients').where({ id }).delete()

        return response.json()
    }

    async show(request, response){
        const { name } = request.params

        const ingredient = await knex('ingredients').where({ name }).first()

        return response.json(ingredient)
    }

    async index(request, response){
        
            const { user_id } = request.params
    
            const orders = await knex('orders').where({ user_id }).orderBy('name')
    
            return response.json(orders)
        
    }
}

module.exports = IngredientsController