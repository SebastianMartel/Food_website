const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env


const getRecipeById = async (req, res) => {
    
    try {
        
        const { id } =  req.params
        
        const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        
        const response = await axios(ENDPOINT)
        const { data } = response

        if (data.id) {
            const recipe = {
                id: data.id,
                title: data.title,
                image: data.image,
                summary: data.summary,
                healthScore: data.healthScore,
                instructions: data.instructions
            }
            console.log(recipe)
            return res.status(200).json(recipe)
        }

        return res.status(404).send('Not found')
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = getRecipeById