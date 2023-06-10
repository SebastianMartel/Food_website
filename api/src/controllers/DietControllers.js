const { Diet } = require('../db')
const json = require('../json.json')



const createDietDB = async (results) => {

    try {

        const allDiets = [...new Set(results.flatMap(item => item.diets))]; // iterates over the axios response passed as parameter, and creates an array with the diets found without repeating.
        const dietsDB = [] // this is going to be sent, this will be the request response.

        for (const diet of allDiets) {
            const createdDiet = await Diet.create({name: diet}); // with names obtained, creates new diets in the DB.
            dietsDB.push(createdDiet) // pushes the created records to the array.
        }

            return dietsDB // returns the future request response.

    } catch (error) {
        throw new Error(error.message)
    }
}



const findAllDietsDB = async () => {

    const allDiets = await Diet.findAll()

        return allDiets
}



module.exports = {
    createDietDB,
    findAllDietsDB
}