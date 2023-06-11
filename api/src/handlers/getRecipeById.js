// FIX 38
const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env
const { findRecipeByIdDB } = require('../controllers/RecipeControllers')
// const findRecipeByDietDB = require('../controllers/findRecipeByDietDB')


// *maybe it's better to change the order of the searches, first in the db, since it's very likely to find less items and the in the API, because it holds lots of recipes.
const getRecipeById = async (req, res) => {

// O: get the full recipe info whether it's from the API or the DB.    
    try {

        const { id } = req.params

        const isValidUUID = (id) => { // checks if the id is a UUID type.
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return uuidPattern.test(id);
          };

        if (!isValidUUID(id)) {
            
            const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            // looks for the items id's that matches the one asked in params through the API.
            // response: { data: { id: ..., title: ..., ... }, ... }
            const response = await axios(ENDPOINT)
            const { data } = response

            const recipe = {
                //-/ id: data.id,
                title: data.title,
                image: data.image,
                summary: data.summary,
                healthScore: data.healthScore,
                stepByStep: data.analyzedInstructions[0].steps, // FIX: it's showing, unnecessary properties.
                diets: data.diets // addded diets.
            }

                return res.status(200).json(recipe)

        } else if (isValidUUID(id)) {
            // if the item wasn't found in the API, again looks for the items id's that matches the one asked in params, but this time in the DB.
            // FIX: it has to include the diet associated to the recipe ---------------------------------------------------------------^^
            const recipe = await findRecipeByIdDB(id)
            
            const diets = await recipe.getDiets() // get all the diets associated to the recipe.

            const newRecipe = { // adds the diets to the object.
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                stepByStep: recipe.stepByStep,
                diets: diets[0].name // and each, iterate.
            }

                return res.status(200).json(newRecipe)

        } else {
            return res.status(404).send('Not found')
        }
    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


module.exports = getRecipeById