const DishCreateService = require('./DishCreateService')
const DishesRepositoryInMemory = require('../../repositories/DishesRepositoryInMemory')

describe('DishCreateService', () => {
    it('dish should be created', async () => {

        const dish = {
            name: "a test",
            description: "test description",
            price: "11,11",
            type: "test",
            ingredients: ["a", "b", "c"]
        }

        const dishesRepositoryInMemory = new DishesRepositoryInMemory()
        const dishCreateService = new DishCreateService(dishesRepositoryInMemory)

        const dishCreated = await dishCreateService.execute(dish)


        expect(dishCreated).toHaveProperty('id')
    })
})