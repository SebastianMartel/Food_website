const axios = require('axios')
require('dotenv')

const { API_KEY } = process.env
const findAllDietsDB = require('../controllers/findAllDietsDB')


const getDiet = (req, res) => {
    // diets: Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, Low FODMAP, Whole30

    // check diets in the db
    try {
        
        const allDiets = findAllDietsDB()

        if (!allDiets) return false
        console.log('success')

            return res.status(200).send(allDiets)
        
    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


module.exports = getDiet