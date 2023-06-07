const { Diet } = require('../db')


const findAllDietsDB = () => {

    const allDiets = Diet.findAll()

        return allDiets
}


module.exports = findAllDietsDB