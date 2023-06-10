const { Recipe, Diet } = require('../db')
const { Sequelize } = require('sequelize')



const createRecipeDB = async (recipe, diet) => { // receive diet from parameters.

    try {

        const newRecipe = await Recipe.create(recipe) // creates a recipe with only the recipe parameter - omitting diet.

        const dietDB = await Diet.findOrCreate({where: {name: diet}}) // find the diet in the db where the name matches the one passed in the body (postRecipe.js).
        // Do I need to create a new diet?
        await newRecipe.addDiet(dietDB[0]) // relation with the diet in the database.

            return newRecipe

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

    const recipe = await Recipe.findByPk(id)

        return recipe
}



const findRecipeByNameDB = async (name) => {

    const recipe = await Recipe.findAll({
        where: {
            title: {
                [Sequelize.Op.iLike]: `%${name}%`, // finds all the matches regardless of case: capitals, lowcase, and spaces.
              }, 
        }
    })

        return recipe
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