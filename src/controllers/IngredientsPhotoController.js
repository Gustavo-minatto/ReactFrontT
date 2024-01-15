const knex = require('../database/knex')

const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/diskStorage')

class IngredientsPhotoController {
    async update(request, response) {

        const diskStorage = new DiskStorage()

        const { ingredient_id } = request.params
        const photoFilename = request.file.filename 
        
        const ingredient = await knex('ingredients').where({ id: ingredient_id })
        
        if(!ingredient){
            throw new AppError('Ingrediente não existe')
        }
        
        if(ingredient[0].photo){
            await diskStorage.deleteFile(ingredient.photo)
        }
        
        await diskStorage.saveFile(photoFilename)

        ingredient[0].photo = photoFilename

        await knex('ingredients').update(ingredient[0]).where({ id: ingredient_id })

        return response.json(ingredient)
    }
}

module.exports = IngredientsPhotoController