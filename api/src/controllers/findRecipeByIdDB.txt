const { Recipe } = require('../db')


const findRecipeByIdDB = async (id) => {

    const recipe = await Recipe.findByPk(id)

        return recipe
}


module.exports = findRecipeByIdDB