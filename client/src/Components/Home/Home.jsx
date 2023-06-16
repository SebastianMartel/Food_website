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


// export function Home ( { recipes, onlyRecipes, allRecipes, loading, recipesPerPage, totalRecipes, paginate } ) {
export function Home ( { reduxAllRecipesCopy } ) {


    const dispatch = useDispatch()

    const handleOrder = (event) => {
        dispatch(sortAllRecipes(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterAllRecipes(event.target.value))
    }
// diets working with: 'gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan', 'paleolithic', 'primal', 'whole 30', 'pescatarian', 'ketogenic', 'fodmap friendly'.

    return (
        <div>
            <Headline>
                <h1>HOME</h1>
                <select onChange = {handleOrder}>
                    <option value = 'A'>Name (A-Z)</option>
                    <option value = 'B'>Name (Z-A)</option>
                </select>
                <select onChange = {handleOrder}>
                    <option value = 'C'>More healthy</option>
                    <option value = 'D'>Less healthy</option>
                </select>
                <select onChange = {handleFilter}>
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
                <select onChange = {handleFilter}>
                    <option value = 'DB'>Your own recipes</option>
                    <option value = 'API'>By others</option>
                </select>
            </Headline>

            <p>{reduxAllRecipesCopy.length}</p>

            {/* <CardBox recipes = {recipes} onlyRecipes = {onlyRecipes} allRecipes = {allRecipes} loading = {loading}/>
            <Pagination recipesPerPage = {recipesPerPage} totalRecipes = {totalRecipes} paginate = {paginate}/> */}
            <CardBox reduxAllRecipesCopy = {reduxAllRecipesCopy}/>

        </div>
    )
}

export default connect(
    null,
    null
)(Home)