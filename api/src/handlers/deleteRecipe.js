const { deleteRecipeDB } = require('../controllers/RecipeControllers')
//__________________________________________________



const deleteRecipe = async (req, res) => {

    try {
        const { id } = req.params
        
        const removed = await deleteRecipeDB(id)

            res.status(200).json(removed)

    } catch (error) {
        throw new Error(error.message)
    }
}


//__________________________________________________
module.exports = deleteRecipe