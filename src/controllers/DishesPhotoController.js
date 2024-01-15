const knex = require('../database/knex')

const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/diskStorage')

class DishesPhotoController {
    async update(request, response) {
        const { dish_id } = request.params
        const photoFilename = request.file.filename 

        const diskStorage = new DiskStorage()
        const dish = await knex('dishes').where({ id: dish_id }).first()
        
        if(!dish){
            throw new AppError('Prato não existe')
        }
        
        if(dish.photo){
            await diskStorage.deleteFile(dish[0].photo)
        }
        
        const filename = await diskStorage.saveFile(photoFilename)

        dish.photo = filename

        await knex('dishes').update(dish).where({ id: dish_id })

        return response.json(dish)
    }
}

module.exports = DishesPhotoController