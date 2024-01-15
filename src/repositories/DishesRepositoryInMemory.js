class DishesRepositoryInMemory {
    dishes = []

    async create({ name, description, price, type, ingredients } ) {

        const dish = {
            id: Math.floor(Math.random() * 1000) + 1,
            name,
            description,
            price,
            type,
            ingredients,
        }

        this.dishes.push(dish)

        return dish
    }
}

module.exports = DishesRepositoryInMemory