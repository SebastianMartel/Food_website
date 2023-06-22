const axios = require('axios');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { API_KEY } = process.env;
const { findRecipeByNameDB } = require('../controllers/RecipeControllers');
//__________________________________________________


        
const getRecipeByName = async (req, res) => {

// O: validate name received by query, looks through the API and DATABASE and returns the correct recipe(s).
    try {

        const { name } = req.query

        const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`

        const response = await axios(ENDPOINT)
        const { data } = response
        const { results } = data
        // from the API:
        const filteredResults = results.filter((recipe) => recipe.title.toLowerCase().includes(name.toLowerCase()));

        const recipesAPI = filteredResults.map((recipe) => ({
            id: recipe?.id,
            title: recipe?.title,
            image: recipe?.image,
            summary: recipe?.summary,
            healthScore: recipe?.healthScore,
            stepByStep: recipe?.analyzedInstructions[0]?.steps,
            diets: recipe?.diets,
          }));

        // now from the db:
        const recipesDB = await findRecipeByNameDB(name)

        // both:
        const allRecipes = [
            ...recipesAPI, ...recipesDB
        ]

        if (allRecipes.length > 0) {
            return res.status(200).json(allRecipes);
          } else {
            return res.status(404).send('Not found');
          }

    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


//__________________________________________________
module.exports = getRecipeByName;