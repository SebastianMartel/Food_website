const axios = require('axios');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { API_KEY } = process.env;
const { findRecipeByIdDB } = require('../controllers/RecipeControllers');
//__________________________________________________



const getRecipeById = async (req, res) => {

// O: get the full recipe info whether it's from the API or the DB.    
    try {

        const { id } = req.params

            const isValidUUID = (id) => { // checks if the id is a UUID type.
                const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                return uuidPattern.test(id);
            };

        if (isValidUUID(id)) {
            // in case the id is a UUID type, it will look for the recipe's id that matches the one asked by params through the DB.
            // FIXED // FIX: it has to include the diet associated to the recipe -----------------------------------------------^^

            const recipe = await findRecipeByIdDB(id)

            if (recipe) { /* this is to check if the recipe exists in the DB or not, but DOESN'T work. I get this error: 

                {
                    "error": "recipe.getDiets is not a function"
                }
            */

                const dietsDB = await recipe.getDiets() // sequelize method, gets all the diets associated to the recipe.

            // or... I can use this option to avoid any possible error like he one above:
                // {include: {
                //     model: Diet,
                //     attributes: ["name"],
                //     through: {
                //       attributes: []
                //     }}}

                const associatedDiets = [] // creates a new array to store ONLY the name of the associated diets.
                for (const diet of dietsDB) {
                    associatedDiets.push(diet.name)
                }

                const newRecipe = { // adds the diets to the object.
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    stepByStep: recipe.stepByStep,
                    diets: associatedDiets // array with ONLY the name of the diets.
                }

                return res.status(200).json(newRecipe)

            } else return recipe

        } else if (!isValidUUID(id)) {

            const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            // now, in case the id is NOT a UUID type, it will look through the API for the desired recipe.
            // response: { data: { id: ..., title: ..., ... }, ... }
            const response = await axios(ENDPOINT)
            const { data } = response

            const recipe = {
                id: data.id,
                title: data?.title,
                image: data?.image,
                summary: data?.summary.replace(/<[^>]+>/g, ''),
                healthScore: data?.healthScore,
                stepByStep: data?.analyzedInstructions[0]?.steps, //FIXED // FIX (later, working in the front): it's showing, unnecessary properties.
                diets: data?.diets
            }

                return res.status(200).json(recipe)

        } else {
            return res.status(404).send('Not found')
        }
    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


//__________________________________________________
module.exports = getRecipeById;