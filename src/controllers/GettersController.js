const knex = require('../database/knex')

class GettersController {

    async getMain(request, response) {
        const { type } = request.params

        const dishes = await knex('dishes').where({ type }).orderBy('name')

        return response.json(dishes)
    }
}

module.exports = GettersController