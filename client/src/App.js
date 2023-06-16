import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
//__________________________________________________


function App () {

    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);

    const [recipes, setRecipes] = useState([]);
    const [onlyRecipes, setOnlyRecipes] = useState(false)

    const { pathname } = useLocation();


    useEffect(() => {
        console.log(recipes);
        console.log(allRecipes);
    }, [recipes, allRecipes])

    useEffect(() => {

        const fetchRecipes = async () => {
            setLoading(true);

            const URL = 'http://localhost:3001/recipes/all';
            const { data } = await axios(URL);

            setAllRecipes(data);
            setLoading(false);
        }

        fetchRecipes();

    }, [])


        // get current posts:
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
        // changes the page:
        const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
        }

        // asks for the recipes that matches the name:
        const getRecipeByName = async (name) => {

            try {

                const URL = 'http://localhost:3001/recipes';
                const { data } = await axios(`${URL}?name=${name}`);
                const recipesFound = data; // recipesFound is an array
                setOnlyRecipes(true)
                setRecipes(recipesFound);

            } catch (error) {
                throw new Error(error.message);
            }
        }


    return (
        <div className="App">
            {
                pathname !== '/' && <NavBar getRecipeByName = {getRecipeByName} setOnlyRecipes = {setOnlyRecipes}/>
            }
            <Routes>
                <Route path = '/' element = { <Landing/> }/>
                <Route path = '/home' element = { <Home recipes = {recipes} onlyRecipes = {onlyRecipes} allRecipes = {currentRecipes} loading = {loading} recipesPerPage = {recipesPerPage} totalRecipes = {allRecipes.length} paginate = {paginate}/>}/>
                <Route path = '/detail/:id' element={ <Detail /> } />
                <Route path = '/form' element = { <Form/> }/>
            </Routes>
        </div>
    );
}


//__________________________________________________
export default App;