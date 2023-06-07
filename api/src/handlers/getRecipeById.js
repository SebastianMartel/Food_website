// FIX 38
const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env
const findRecipeByIdDB = require('../controllers/findRecipeByIdDB')

// *maybe it's better to change the order of the searches, first in the db, since it's very likely to find less items and the in the API, because it holds lots of recipes.

const getRecipeById = async (req, res) => {
// whether it's from the API or the DB.    
    try {
        
        const { id } =  req.params
        // looks for the items id's that matches the one asked in params through the API.
        const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`

        const response = await axios(ENDPOINT)
        const { data } = response
        // response: { data: { id: ..., title: ..., ... }, ... }

        if (data.id) {
            const recipe = {
                //-/ id: data.id,
                title: data.title,
                image: data.image,
                summary: data.summary,
                healthScore: data.healthScore,
                diets: data.diets, // addded diets
                stepByStep: data.analyzedInstructions[0].steps
            }
            console.log(recipe)
            
                return res.status(200).json(recipe)

        } else if (!data.id) {
            // if the item wasn't found in the API, again looks for the items id's that matches the one asked in params, but this time in the DB.
            // FIX: it has to include the diet associated to the recipe.
            const recipe = findRecipeByIdDB(id)

                return res.status(200).json(recipe)

        }

            return res.status(404).send('Not found')

    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


module.exports = getRecipeById