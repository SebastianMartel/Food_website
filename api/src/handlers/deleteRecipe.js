const { deleteRecipeDB } = require('../controllers/RecipeControllers')
//__________________________________________________



const deleteRecipe = async (req, res) => {

    try {
        const { id } = req.params
        
        const removed = await deleteRecipeDB(id)

            return res.status(200).json(removed)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


//__________________________________________________
module.exports = deleteRecipe