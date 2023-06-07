const { Recipe, Diet } = require('../db')


const createRecipeDB = async (recipe, diet) => {

    const newRecipe = await Recipe.create(recipe) // creates a recipe with only the recipe parameter - omitting diet.

    const dietDB = await Diet.findAll({where: {name: diet}}) // find the diet in the db where the name matches the one passed in the body (postRecipe.js).

    Recipe.setDiet(dietDB) // relation with the diet pa

        return newRecipe
}


module.exports = createRecipeDB