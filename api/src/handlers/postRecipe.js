const axios = require('axios')
require('dotenv')

const { API_KEY } = process.env
const createRecipeDB = require('../controllers/createRecipeDB')

// it does post and the reponse is the expected, but it's not creating a new item in the db

const postRecipe = async (req, res) => {

    try {
        
        const { id, title, image, summary, healthScore, stepByStep } = req.body
        
        const newRecipe = await createRecipeDB({ id, title, image, summary, healthScore, stepByStep })
        
        return res.status(200).json(newRecipe)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}   


module.exports = postRecipe