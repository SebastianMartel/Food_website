const axios = require('axios');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { API_KEY } = process.env;
const { createDietDB } = require('../controllers/DietControllers');
//__________________________________________________



const getDiet = async (req, res) => {

// O: create in the DB all the diets of the recipes I'm working with.
// diets: 'gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan', 'paleolithic', 'primal', 'whole 30', 'pescatarian', 'ketogenic', 'fodmap friendly'.
    try {

        const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`

        const response = await axios(ENDPOINT)
        const { data } = response
        const { results } = data

        const dietsDB = await createDietDB(results) // creates the diets in the DB.

            return res.status(200).send(dietsDB) // send the created records.

    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


//__________________________________________________
module.exports = getDiet;