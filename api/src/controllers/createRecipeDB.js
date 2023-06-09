const { Recipe, Diet } = require('../db')


const createRecipeDB = async (recipe) => { // re,pve diet from parameters

    const newRecipe = await Recipe.create(recipe) // creates a recipe with only the recipe parameter - omitting diet.

    // const dietDB = await Diet.findOrCreate({where: {name: diet}}) // find the diet in the db where the name matches the one passed in the body (postRecipe.js).

    // await newRecipe.addDiet(dietDB[0]) // relation with the diet in the database.

        return newRecipe
}


module.exports = createRecipeDB