import { useDispatch } from 'react-redux';
import { sortAllRecipes } from '../../Redux/actions';

import './Home.css'
import styled from 'styled-components';
import CardBox from "../Cardbox/Cardbox";
import Pagination from '../Pagination/Pagination';
//__________________________________________________

//__________________________________________________


export default function Home ( { searching, allRecipes, searchResults, currentAllRecipes, currentSearchResults, recipesPerPage, paginate, deleteSuccess } ) {


    const dispatch = useDispatch()


    const handleOrder = (event) => {
        dispatch(sortAllRecipes(event.target.value))
    }


    return (
        <div>
            <div className = 'headline'>
                <h1 className = 'sortTitle'>SORT BY</h1>
                <select onChange = {(event) => {handleOrder(event)}}>
                    <option disabled hidden>Sort by name</option>
                    <option value = 'A'>Name (A-Z)</option>
                    <option value = 'B'>Name (Z-A)</option>
                </select>
                <select onChange = {(event) => {handleOrder(event)}}>
                    <option value = '' disabled hidden>Sort by health score</option>
                    <option value = 'C'>More healthy</option>
                    <option value = 'D'>Less healthy</option>
                </select>
                {/* <p>ALL {allRecipes?.length}</p>
                <p>SEARCH {searchResults?.length}</p> */}
            </div>
            {
                deleteSuccess && (
                    <div className = 'deleteSuccessMessage'>you have successfully deleted your recipe</div>
                )
            }
            <CardBox searching = {searching} allRecipes = {allRecipes} searchResults = {searchResults} currentAllRecipes = {currentAllRecipes} currentSearchResults = {currentSearchResults}/>
            <Pagination searching = {searching} recipesPerPage = {recipesPerPage} totalAllRecipes = {allRecipes.length} totalSearchResults = {searchResults.length} paginate = {paginate}/>

        </div>
    )
}