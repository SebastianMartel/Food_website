const axios = require('axios');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { API_KEY } = process.env;
const { findAllRecipesDB } = require('../controllers/RecipeControllers')
const json = require('../json.json')
//__________________________________________________



const getAllRecipes = async (req, res) => {

// O: get all the 100 recipes so they can be used for the pagination, include DB recipes.
    try {
        // API recipes:
        const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`

        const response = await axios(ENDPOINT)
        const { data } = response
        const { results } = data
        // const results = json.results

        // DB recipes:

        const recipesDB = await findAllRecipesDB()

        // both:

        const allRecipes = [...results, ...recipesDB]

            return res.status(200).json(allRecipes)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


//__________________________________________________
module.exports = getAllRecipes