const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require('../utils/AppError')

describe("UserCreateService", () => {

    let userRepositoryInMemory = null
    let userCreateService = null

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })

    it('user should be created', async () => {
        const user = {
            name: 'test user',
            email: 'test@test.com',
            password: '1234',
            isAdm: 0
        }

        const userCreated = await userCreateService.execute(user)

        expect(userCreated).toHaveProperty('id')
    })

    it('user should not be created if email is already in use', async () => {
        const user1 = {
            name: 'UserTest1',
            email: 'test@example.com',
            password: '123',
            isAdm: 0
        }

        const user2 = {
            name: 'UserTest2',
            email: 'test@example.com',
            password: '456',
            isAdm: 0
        }

        await userCreateService.execute(user1)

        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError('Esse email já está em uso!'))
    })

})
