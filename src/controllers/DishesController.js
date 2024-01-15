const knex = require('../database/knex')
const AppError = require('../utils/AppError')

const DishRepository = require('../repositories/DishesRepository')
const DishCreateService = require('../services/dish-services/DishCreateService')

class DishesController{
    async create (request, response){
        const { name, description, price, type, ingredients } = request.body

        const dishRepository = new DishRepository()
        const dishCreateService = new DishCreateService(dishRepository)

        const newDishId = await dishCreateService.execute({ name, description, price, type, ingredients })

        return response.status(201).json({ id: newDishId });
    }

    async put (request, response){
        const { name, description, price, type, ingredients } = request.body
        const { id } = request.params

        const updatedDish = await knex('dishes')
                                  .where({ id })
                                  .update({
                                     name,
                                     description,
                                     price,
                                     type,
                                     ingredients,
                                     updated_at: knex.fn.now()
                                   })

        return response.status(201).json({ updatedDish });
    }

    async show (request, response) {
        const { id } = request.params

        const dish = await knex('dishes').where({ id })

        return response.json(dish)
    }

    async delete(request, response){
        const { id } = request.params

        await knex('dishes').where({ id }).delete()

        return response.json()
    }  
}

module.exports = DishesController