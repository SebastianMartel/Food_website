const axios = require('axios')
require('dotenv')

const { API_KEY } = process.env


const getRecipeByName = (req, res) => {

    try {
        
        const { string } = req.query

        if (string) {
            // validate name recived by query, look in the api and database and return the correct recipe.

            return res.status(200).json('recipe')
        }
            
        return res.status(404).send('Not found')

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getRecipeByName