const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env



const getRecipeById =  (req, res) => {
    
    try {
        
        const { id } =  req.params
        
        let ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        
        axios(ENDPOINT)
        .then(response => response.data)
        .then(({id, title, image, summary, healthScore, instructions}) => {
            if(id) {
                const recipe = {
                    id,
                    title,
                    image,
                    summary,
                    healthScore,
                    instructions
                }
                console.log(recipe)
                return res.status(200).json(recipe)
            }
            return res.status(404).send('Not found')
        })

        // const { data } = response
        
        // if (data.id) {
            
        //     const recipe = {
        //         id: data.id,
        //         name: data.title,
        //         image: data.image,
        //         summary: data.summary,
        //         healthScore: data.healthScore,
        //         instructions: data.instructions
        //     }
        
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = getRecipeById