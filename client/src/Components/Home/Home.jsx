import { useDispatch } from 'react-redux';
import { sortAllRecipes } from '../../Redux/actions';

import './Home.css'
import CardBox from "../Cardbox/Cardbox";
import Pagination from '../Pagination/Pagination';
//__________________________________________________


export default function Home ( { searching, allRecipes, searchResults, currentAllRecipes, currentSearchResults, recipesPerPage, paginate, successfullDelete } ) {


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
                <p>ALL {allRecipes?.length}</p>
                <p>SEARCH {searchResults?.length}</p>
            </div>
            {
                successfullDelete && (
                    <div className = 'successfullDeleteMessage'>
                        <svg style = {{fill: '#008000'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        you have successfully deleted your recipe
                    </div>
                )
            }
            <CardBox searching = {searching} allRecipes = {allRecipes} searchResults = {searchResults} currentAllRecipes = {currentAllRecipes} currentSearchResults = {currentSearchResults}/>
            <Pagination searching = {searching} recipesPerPage = {recipesPerPage} totalAllRecipes = {allRecipes.length} totalSearchResults = {searchResults.length} paginate = {paginate}/>

        </div>
    )
}