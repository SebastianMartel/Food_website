const { Diet } = require('../db')


const findAllDietsDB = async () => {

    const allDiets = await Diet.findAll()

        return allDiets
}


module.exports = findAllDietsDB