const axios = require('axios')
require('dotenv').config()
// just in case:
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { API_KEY } = process.env
const { findRecipeByNameDB } = require('../controllers/RecipeControllers')

// add diets associated.

const getRecipeByName = async (req, res) => {

// O: validate name received by query, looks through the API and DATABASE and returns the correct recipe(s).
    try {

        const { name } = req.query

    // API "QUERY" OPTION:

        // const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}` // this is an endpoint provided by the api that search trough the whole api the name that matches the value of 'query'.

        // const response = await axios(ENDPOINT)
        // const { data } = response
        // const { results } = data

        // if (results.length > 0) {

        //     const recipesId = results.map((recipe) => recipe.id) // creates a new array with the id's that matches the name.
        //     const recipes = [] // array to store the needed information of the id's that mathes the name.

        //     for (const id of recipesId) { // search for every id in the api and pushes the info to the recipes array.

        //         try {

        //             const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        //             const response = await axios(ENDPOINT)
        //             const { data } = response

        //             const recipe = {
        //                 // id: data.id,
        //                 title: data.title,
        //                 image: data.image,
        //                 summary: data.summary,
        //                 healthScore: data.healthScore,
        //                 stepByStep: data.analyzedInstructions[0].steps   
        //             }
                    
        //             recipes.push(recipe)

        //         } catch (error) {
        //                 return res.status(500).json({error: error.message})
        //         }
        //     }

        //         return res.status(200).json(recipes) // returns an array with the recipes that matches the name with their info.
        // }

        const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`

        const response = await axios(ENDPOINT)
        const { data } = response
        const { results } = data
        // from the API:
        const filteredResults = results.filter((recipe) => recipe.title.toLowerCase().includes(name.toLowerCase()));

        const recipesAPI = filteredResults.map((recipe) => ({
            id: recipe.id,
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


module.exports = getRecipeByName