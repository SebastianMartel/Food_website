const { Recipe } = require('../db')


const findRecipeByIdDB = (id) => {

    const recipe = Recipe.findByPk(id)

        return recipe
}


module.exports = findRecipeByIdDB