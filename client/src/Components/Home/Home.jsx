import { connect, useDispatch } from 'react-redux';
import { sortAllRecipes, filterAllRecipes } from '../../Redux/actions';

import styled from 'styled-components';
import CardBox from "../Cardbox/Cardbox";
import Pagination from '../Pagination/Pagination';
//__________________________________________________


const Headline = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10rem;

    padding: 1rem;
`
//__________________________________________________


// export function Home ( { loading, recipesPerPage, totalRecipes, paginate } ) {
export function Home ( { searching, reduxAllRecipesCopy, currentAllRecipes, searchResults, currentSearchResults, recipesPerPage, paginate } ) {


    const dispatch = useDispatch()

    const handleOrder = (event) => {
        dispatch(sortAllRecipes(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterAllRecipes(event.target.value))
    }


    return (
        <div>
            <Headline>
                <h1>HOME</h1>
                <select onChange = {(event) => {handleOrder(event)}}>
                    <option value = 'A'>Name (A-Z)</option>
                    <option value = 'B'>Name (Z-A)</option>
                </select>
                <select onChange = {(event) => {handleOrder(event)}}>
                    <option value = 'C'>More healthy</option>
                    <option value = 'D'>Less healthy</option>
                </select>
                <select onChange = {(event) => {handleFilter(event)}}>
                    <option value = 'All'>All</option>
                    <option value = 'gluten free'>gluten free</option>
                    <option value = 'dairy free'>dairy free</option>
                    <option value = 'lacto ovo vegetarian'>lacto ovo vegetarian</option>
                    <option value = 'vegan'>vegan</option>
                    <option value = 'paleolithic'>paleolithic</option>
                    <option value = 'primal'>primal</option>
                    <option value = 'whole 30'>whole 30</option>
                    <option value = 'pescatarian'>pescatarian</option>
                    <option value = 'ketogenic'>ketogenic</option>
                    <option value = 'fodmap friendly'>fodmap friendly</option>
                </select>
                <select onChange = {(event) => {handleFilter(event)}}>
                    <option value = 'DB'>Your own recipes</option>
                    <option value = 'API'>By others</option>
                </select>
            </Headline>

            <p>{reduxAllRecipesCopy?.length}</p>
            <p>{searchResults?.length}</p>

            <Pagination recipesPerPage = {recipesPerPage} totalRecipes = {reduxAllRecipesCopy.length} paginate = {paginate}/>
            <CardBox searching = {searching} reduxAllRecipesCopy = {reduxAllRecipesCopy} searchResults = {searchResults} currentAllRecipes = {currentAllRecipes} currentSearchResults = {currentSearchResults}/>

        </div>
    )
}

export default connect(
    null,
    null
)(Home)