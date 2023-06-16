const axios = require('axios');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { API_KEY } = process.env;
//__________________________________________________



const getAllRecipes = async (req, res) => {

// O: get all the 100 recipes so they can be used for the pagination.
    try {

        const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`

        const response = await axios(ENDPOINT)
        const { data } = response
        const { results } = data

            return res.status(200).json(results)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


//__________________________________________________
module.exports = getAllRecipes