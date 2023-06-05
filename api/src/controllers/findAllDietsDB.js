const Diets = require('../db')


const findAllDietsDB = () => {

    const allDiets = Diets.findAll()

    return allDiets
}


module.exports = findAllDietsDB