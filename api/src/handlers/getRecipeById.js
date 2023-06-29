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

            const validDBID = (id) => { // checks if the id is a UUID type.
                const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                return uuidPattern.test(id);
            };

        if (validDBID(id)) {
            // in case the id is a UUID type, it will look for the recipe's id that matches the one asked by params through the DB.

            const recipe = await findRecipeByIdDB(id) // returns a string ('Not found') in case it wasn't found.

            if (typeof(recipe) === 'object') { // this checks if the recipe exists in the DB or not.

                const dietsDB = await recipe.getDiets() // sequelize method, gets all the diets associated to the recipe.

                // or... I can use this option to avoid any possible error:
                // {include: {
                //     model: Diet,
                //     attributes: ["name"],
                //     through: {
                //       attributes: []
                //     }
                // }}

                if (dietsDB.length > 0) {

                    const associatedDiets = [] // creates a new array to store ONLY the name of the associated diets.
                    for (const diet of dietsDB) {
                        associatedDiets.push(diet.name)
                    }

                    const newRecipe = { // adds the diets to the object.
                        id: recipe?.id,
                        title: recipe?.title,
                        image: recipe?.image,
                        summary: recipe?.summary,
                        healthScore: recipe?.healthScore,
                        stepByStep: recipe?.stepByStep,
                        diets: associatedDiets // array with ONLY the name of the diets.
                    }

                    // the whole point of this if statement is to add the associated diets...

                    return res.status(200).json(newRecipe)

                } else return res.status(200).json(recipe) // ...in case there are no associated diets. MAYBE JUST REMOVE THIS BECAUSE IN CASE THERE ARE NO ASSOCIATED DIETS, IT WON'T ADD ANYTHING.

            } else return res.status(404).send('Unable to find the recipe with the specified ID') // in case it's a UUID type, but doesn't exist in the DB.

        } else if (!validDBID(id)) {
            // now, in case the id is NOT a UUID type, it will look through the API for the desired recipe.

            const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
            const response = await axios(ENDPOINT);
            const { data } = response;

            const recipe = {
                id: data?.id,
                title: data?.title,
                image: data?.image,
                summary: data?.summary.replace(/<[^>]+>/g, ''),
                healthScore: data?.healthScore,
                stepByStep: data?.analyzedInstructions[0]?.steps.map((step) => step.step),
                diets: data?.diets
            };

            if (recipe) {
                return res.status(200).json(recipe); // in case exists in the API.
            } else {
                return res.status(404).send('Unable to find the recipe with the specified ID'); // in case it's any type of ID, but doesn't exists in the API. Check catch statement for more details.
            }
        }

    } catch (error) {

        // since the API throws a 404 error, this if statement handles that case.
        if (error.response && error.response.status === 404) {
            return res.status(404).send('Unable to find the recipe with the specified ID');
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
}


//__________________________________________________
module.exports = getRecipeById;