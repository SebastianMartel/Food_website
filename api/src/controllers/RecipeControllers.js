const { Recipe, Diet } = require('../db')
const { Sequelize } = require('sequelize')
//__________________________________________________

// add diets:
const findAllRecipesDB = async () => {

    try {

        const recipes = await Recipe.findAll()

        if (recipes) { 

            const recipesDB = []

            for (const recipe of recipes) {
                const dietsDB = await recipe.getDiets() // retrieves all the diets of each recipe found...
                
                const associatedDiets = []

                for (const diet of dietsDB) {
                    associatedDiets.push(diet.dataValues.name) // all the 'diets found' is actually a series of arrays with and object 'Diet'
                }

                recipeAndDiet = {
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    stepByStep: recipe.stepByStep,
                    diets: associatedDiets
                }
                recipesDB.push(recipeAndDiet)
            }

            return recipesDB
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

// handle sensitive cases; use for instance: diet.toLowCase()...
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


// Do I need this one?
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
        // const recipe = await Recipe.findAll({
        //     include: {
        //         model: Diet,
        //         attributes: ["name"],
        //         through: {
        //           attributes: []
        //         }
        //     },
        //     where: {
        //         title: {
        //             [Sequelize.Op.iLike]: `%${name}%`, // finds all the matches regardless of case: capitals, lowcase, and spaces.
        //         }, 
        //     }
        // })

        // return recipe

        // OPTION 2, like the one I use in getRecipesById:

        const recipes = await Recipe.findAll({
            where: {
                title: {
                    [Sequelize.Op.iLike]: `%${name}%`, // finds all the matches regardless of case: capitals, lowcase, and spaces.
                }, 
            }
        })

        if (recipes) {

            const recipesDB = []

            for (const recipe of recipes) {
                const dietsDB = await recipe.getDiets()
                
                const associatedDiets = [] // creates a new array to store ONLY the name of the associated diets.
                
                for (const diet of dietsDB) {
                    associatedDiets.push(diet.name)
                }
                
                const recipeAndDiet = { // adds the diets to the object.
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    stepByStep: recipe.stepByStep,
                    diets: associatedDiets // array with ONLY the name of the diets.
                }
                recipesDB.push(recipeAndDiet)
            }

            return recipesDB
        }


    } catch (error) {
        throw new Error(error.message)
    }
}
// test:
// (async () => {
//     try {
//       const result = await findRecipeByNameDB("LOMO");
//       console.log(result);
//     } catch (error) {
//       console.error(error);
//     }
//   })();



//__________________________________________________
module.exports = {
    findAllRecipesDB,
    createRecipeDB,
    findRecipeByDietDB,
    findRecipeByIdDB,
    findRecipeByNameDB
}