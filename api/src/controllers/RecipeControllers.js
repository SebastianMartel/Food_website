const { Recipe, Diet } = require('../db')
const { Sequelize } = require('sequelize')

// handle sensitive cases: diet.toLowCase()

const createRecipeDB = async (recipe, diet) => { // receive diet from parameters.

    try {
        const newRecipe = await Recipe.create(recipe) // creates a recipe with only the recipe parameter - omitting diet.

        const dietDB = await Diet.findAll({
            where: {name: diet}
        }) // find the diet in the db where the name matches the one passed in the body (postRecipe.js).
        // Do I need to create a new diet?

        if (dietDB.length > 0) { // if the diet has been found in the DB...

            await newRecipe.addDiet(dietDB[0]) // associates the new recipe with the diet in the database.

                return newRecipe

        } else return 'Diet not valid' // if the diet doesn't exist in the DB...

    } catch (error) {
        throw new Error(error.message)
    }
}



const findRecipeByDietDB = async (id) => {

    // get the diet
    const recipe = await Recipe.findByPk(id)

    const diet = await Diet.findAll({where: {Recipe}})

}



const findRecipeByIdDB = async (id) => {

    try {
        const recipe = await Recipe.findByPk(id)

        if (recipe) return recipe // if exists in the DB

        else return 'Not found'

    } catch (error) {
        throw new Error(error.message)
    }
}


const findRecipeByNameDB = async (name) => {

    try {
        // adds diets, like with the getRecipeById: const dietsDB = await recipe.getDiets()... but using a different approach:
        const recipe = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                  attributes: []
                }
            },
            where: {
                title: {
                    [Sequelize.Op.iLike]: `%${name}%`, // finds all the matches regardless of case: capitals, lowcase, and spaces.
                }, 
            }
        })

        return recipe

    } catch (error) {
        throw new Error(error.message)
    }
}
// test:
// (async () => {
//     try {
//       const result = await findRecipeByNameDB("LOMO SALTADO");
//       console.log(result);
//     } catch (error) {
//       console.error(error);
//     }
//   })();



module.exports = {
    createRecipeDB,
    findRecipeByDietDB,
    findRecipeByIdDB,
    findRecipeByNameDB
}