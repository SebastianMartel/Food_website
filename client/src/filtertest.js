const json = require('./json.json')

const reduxAllRecipesCopyFilter = json.results.filter((recipe) => recipe.diets.includes('gluten free'))


console.log(reduxAllRecipesCopyFilter)