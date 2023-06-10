const { Sequelize } = require('sequelize')
const { Recipe } = require('../db')


const findRecipeByNameDB = async (name) => {
    
    const recipe = await Recipe.findAll({
        where: {
            title: {
                [Sequelize.Op.iLike]: `%${name}%`,
              }, 
        }
    })
    
    return recipe
}

// test:
// (async () => {
//     try {
//       const result = await findRecipeByNameDB("LOMO SALTADO");
//       console.log(result);
//     } catch (error) {
//       console.error(error);
//     }
//   })();

module.exports = findRecipeByNameDB