const { Recipe } = require('../db')

const findRecipeByNameDB = async (name) => {
    
    const recipe = await Recipe.findOne({
        where: {
            title: name
        }
    })

    // console.log(recipe)
    return recipe
}

// console.log(findRecipeByNameDB("Asado"))

module.exports = findRecipeByNameDB