const { Recipe } = require('../db')


const createRecipeDB = async (recipe) => {

    const newRecipe = await Recipe.create(recipe)

    return newRecipe
}


module.exports = createRecipeDB