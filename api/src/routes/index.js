const { Router } = require('express');
// Import routers;
// E.g.: const authRouter = require('./auth.js');
const getRecipeById = require('../handlers/getRecipeById')
const getRecipeByName = require('../handlers/getRecipeByName')
const postRecipe = require('../handlers/postRecipe')
const getDiet = require('../handlers/getDiet')
//__________________________________________________


const router = Router();

// Set routers
// E.g.: router.use('/auth', authRouter);

router.get('/recipes/:id', getRecipeById)

router.get('/recipes', getRecipeByName)

router.post('/recipes', postRecipe)

router.get('/diets', getDiet)


//__________________________________________________
module.exports = router;