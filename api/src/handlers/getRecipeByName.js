const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env


const getRecipeByName = async (req, res) => {

    // validate name recived by query, look in the API and DATABASE and return the correct recipe.
    try {
        
        const { name } = req.query

        const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}`

        const response = await axios(ENDPOINT)
        const { data } = response
        const { results } = data

        if (results && results.length > 0) {

            const recipesId = results.map((recipe) => recipe.id)
            const recipes = []

            for (const id of recipesId) {

                try {

                    const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                    const response = await axios(ENDPOINT)
                    const { data } = response

                    const recipe = {
                        id: data.id,
                        title: data.title,
                        image: data.image,
                        summary: data.summary,
                        healthScore: data.healthScore,
                        stepByStep: data.analyzedInstructions[0].steps   
                    }
                    
                    recipes.push(recipe)

                } catch (error) {
                    return res.status(500).json({error: error.message})
                }
            }

            return res.status(200).json(recipes)
        }
            
        return res.status(404).send('Not found')

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getRecipeByName