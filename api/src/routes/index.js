const { Router } = require('express');
// Import routers;
// E.g.: const authRouter = require('./auth.js');
const getRecipeById = require('../controllers/getRecipeById')
const getRecipeByName = require('../controllers/getRecipeByName')
const postRecipe = require('../controllers/postRecipe')
const getDiet = require('../controllers/getDiet')


const router = Router();

// Set routers
// E.g.: router.use('/auth', authRouter);

router.get('/recipes/:id', getRecipeById)

router.get('/recipes', getRecipeByName)

router.post('/recipes', postRecipe)

router.get('/diets', getDiet)


module.exports = router;