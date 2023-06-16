const { createRecipeDB } = require('../controllers/RecipeControllers');
//__________________________________________________



const postRecipe = async (req, res) => {

// O: creates a new recipe in the DB and associates it with a diet.
    try {

        const { title, image, summary, healthScore, stepByStep, diet } = req.body        
        // id not needed.
        const newRecipe = await createRecipeDB({ title, image, summary, healthScore, stepByStep }, diet)

        if (typeof(newRecipe) !== 'string') return res.status(200).json(newRecipe)

        else if (typeof(newRecipe) === 'string') return res.status(404).send(newRecipe)

    } catch (error) {
            return res.status(500).json({error: error.message})
    }
}


//__________________________________________________
module.exports = postRecipe;