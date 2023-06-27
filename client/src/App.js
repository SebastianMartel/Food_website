import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getAllRecipes } from './Redux/actions';

import './App.css';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import Error404 from './Components/Error404/Error404';

//CHECK THE ARRAY OF DEPENDENCIES IN useEffect(line: 47)
//__________________________________________________


export function App ( { allRecipes, searchResults } ) {


        // for the pagination:
        const [currentPage, setCurrentPage] = useState(1);
        const [recipesPerPage] = useState(9);

        const [searching, setSearching] = useState(false) // use then in NavBarc.jsx, Home.jsx, Cardbox,jsx and Pagination.jsx

        const [successfullDelete,setSuccessfullDelete] = useState(false) // the alert is set to false until the card is deleted. Used in Home.jsx and Detail.jsx.


    const { pathname } = useLocation();

    const dispatch = useDispatch();


    // get current posts:
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentAllRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); // at first, a total of 12 pages.
    const currentSearchResults = searchResults.slice(indexOfFirstRecipe, indexOfLastRecipe) // since it's about the search results, this will shorten the pages bar. 
    // changes the page:
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    // dispatch all the cards everytime the component renders, if searching state changes, it will run again.
    useEffect(() => {
        dispatch(getAllRecipes());
    }, [searching])


    return (
        <div className="App">
            {
                pathname !== '/' && <NavBar setSearching = {setSearching}/>
            }
            <Routes>
                <Route path = '/' element = { <Landing/> }/>
                <Route path = '/home' element = { 
                    <Home 
                        searching = {searching} 
                        setSearching = {setSearching}
                        allRecipes = {allRecipes}
                        currentAllRecipes = {currentAllRecipes} 
                        searchResults = {searchResults} 
                        currentSearchResults = {currentSearchResults} 
                        recipesPerPage = {recipesPerPage} 
                        paginate = {paginate} 
                        successfullDelete = {successfullDelete}
                    />
                }/>
                <Route path = '/detail/:id' element={ <Detail setSuccessfullDelete = {setSuccessfullDelete}/> } />
                <Route path = '/form' element = { <Form/> }/>
                <Route path = '*' element = { <Error404/> }></Route>
            </Routes>
        </div>
    );
}


//__________________________________________________
const mapStateToProps = (state) => {
    return {
        allRecipes : state.allRecipes,
        searchResults: state.searchResults
    }
}

export default connect (
    mapStateToProps,
    null
)(App)