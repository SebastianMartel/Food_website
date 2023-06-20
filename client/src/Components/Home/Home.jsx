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


    const handleOrder = (value) => {
        dispatch(sortAllRecipes(value))
    }


    return (
        <div>
            <div className = 'headline'>
                <h1 className = 'sortTitle'>SORT BY</h1>
                <div className = 'selectWrapperSort'>
                    <div className = 'selectLabelSort'>
                        N A M E
                    </div>
                    <div className = 'selectListSort'>
                        <li onClick = {() => {handleOrder('A')}}>Ascending (A-Z)</li>
                        <li onClick = {() => {handleOrder('B')}}>Descending (Z-A)</li>
                    </div>
                </div>
                <div className = 'selectWrapperSort'>
                    <div className = 'selectLabelSort'>
                        H E A L T H . S C O R E
                    </div>
                    <div className = 'selectListSort'>
                            <li onClick = {() => {handleOrder('C')}}>More healthy</li>
                            <li onClick = {() => {handleOrder('D')}}>Less healthy</li>
                    </div>
                </div>
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