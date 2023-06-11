const axios = require('axios')
require('dotenv')

const { API_KEY } = process.env
const { createRecipeDB } = require('../controllers/RecipeControllers')

// it does post and the reponse is the expected, but it's not creating a new item in the db
// relation this recipe with the db diet, so they are added in recipe_diet


const postRecipe = async (req, res) => {

    try {

        const { title, image, summary, healthScore, stepByStep, diet } = req.body        
        // id not needed.
        const newRecipe = await createRecipeDB({ title, image, summary, healthScore, stepByStep }, diet)

            return res.status(200).json(newRecipe)

    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


module.exports = postRecipe