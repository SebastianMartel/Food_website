const { Recipe, Diet } = require('../db')
const { findRecipeByIdDB } = require('../controllers/findRecipeByIdDB')


const findRecipeByDietDB = async (id) => {

    // get the diet
    const recipe = await Recipe.findByPk(id)

    const diet = await Diet.findAll({where: {Recipe}})

}


module.exports = findRecipeByDietDB