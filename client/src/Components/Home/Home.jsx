import { connect, useDispatch } from 'react-redux';
import { sortByName } from '../../Redux/actions';

import styled from 'styled-components';
import CardBox from "../Cardbox/Cardbox";
import Pagination from '../Pagination/Pagination';
//__________________________________________________


const Headline = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20rem;

    padding: 1rem;
`
//__________________________________________________


export function Home ( { recipes, onlyRecipes, allRecipes, loading, recipesPerPage, totalRecipes, paginate } ) {


    const dispatch = useDispatch()

    const handleOrder = (event) => {
        dispatch(sortByName(event.target.value))
    }

    return (
        <div>
            <Headline>
                <h1>HOME</h1>
                <select onChange = {handleOrder}>
                    <option value = 'A'>Name (A-Z)</option>
                    <option value = 'D'>Name (Z-A)</option>
                </select>
            </Headline>

            <CardBox recipes = {recipes} onlyRecipes = {onlyRecipes} allRecipes = {allRecipes} loading = {loading}/>
            <Pagination recipesPerPage = {recipesPerPage} totalRecipes = {totalRecipes} paginate = {paginate}/>
        </div>
    )
}

export default connect(
    null,
    null
)(Home)