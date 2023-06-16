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


export default function Home ( { recipes, allRecipes, loading, recipesPerPage, totalRecipes, paginate } ) {

    return (
        <div>
            <Headline>
                <h1>HOME</h1>
                <button>FILTER</button>
            </Headline>

            <CardBox recipes = {recipes} allRecipes = {allRecipes} loading = {loading}/>
            <Pagination recipesPerPage = {recipesPerPage} totalRecipes = {totalRecipes} paginate = {paginate}/>
        </div>
    )
}