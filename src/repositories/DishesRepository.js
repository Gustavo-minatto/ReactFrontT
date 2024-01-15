const knex = require('../database/knex')

class DishesRepository {

    async create({name, description, price, type, ingredients}) {

        try {
            const [newDishId] = await knex('dishes')
            .insert({
                name, 
                description, 
                price, 
                type, 
                ingredients
            })
            .returning('id')

            return newDishId
        } catch {
            alert('Erro ao Criar Prato')
        }
    }

}

module.exports = DishesRepository