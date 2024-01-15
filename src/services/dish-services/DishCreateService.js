const AppError = require('../../utils/AppError')

class DishCreateService {
    constructor(dishRepository) {
        this.dishRepository = dishRepository
    }

    async execute({ name, description, price, type, ingredients }) {
        try {
            const dishCreated = await this.dishRepository.create({ name, description, price, type, ingredients })

            return dishCreated
        } catch {
            alert('Erro no Service')
        }            
    }
}

module.exports = DishCreateService