import { useDispatch, connect} from 'react-redux';
import { getAllRecipes, sortAllRecipes, resetSearchError } from '../../Redux/actions';

import './Home.css'
import CardBox from "../Cardbox/Cardbox";
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
// INCLUDE SEARCHRECIPES REDUX STATE IN THE USEEFFECT FUNCTION.
//__________________________________________________


export function Home ( { searching, setSearching, allRecipes, searchResults, currentAllRecipes, currentSearchResults, recipesPerPage, paginate, successfullDelete, apiError, searchError } ) {


    const dispatch = useDispatch()


    const handleOrder = (value) => {
        dispatch(sortAllRecipes(value)) // uses the imported action to dispatch it with the respective value, making it possible to order the recipes.
    }


    useEffect(() => {
        dispatch(getAllRecipes()) // everytime home renders, the recipes will update to the latest modification. For example, after creating a new recipe or deleting a recipe, it will navigate to /home where the recipes will be up to date with the last allRecipes state version.
    }, [])


    return (
        <div>
            <div className = 'headline'>
                <h1 className = 'sortTitle'>SORT BY</h1>

                {/*BY NAME */}
                <div className = 'selectWrapperSort'>
                    <div className = 'selectLabelSort'>
                        N A M E
                    </div>
                    <div className = 'selectListSort'>
                        <li onClick = {() => {handleOrder('A')}}>Ascending (A-Z)</li>
                        <li onClick = {() => {handleOrder('B')}}>Descending (Z-A)</li>
                    </div>
                </div>

                {/*BY HEALTH SCORE */}
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
                successfullDelete && (
                    <div className = 'successfullDeleteMessage'>
                        {/* If the recipe has been successfully deleted, this will render. The state will be set to false (to hide the message) within the duration specified in the form. */}
                        <svg style = {{fill: '#008000'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        You have successfully deleted your recipe
                    </div>
                )
            }
            {
                apiError && (
                    <>
                        {/* In case there is a problem with the api key... */}
                        <p>{apiError}</p>
                        <button onClick = {() => dispatch(getAllRecipes())}>RELOAD</button>
                        {/* onClick dispatch the action again, updating the redux state. */}
                    </>
                )
            }
            {
                !apiError && searchError && (
                    <> {/* In case there are no problems with the api key, but there's a problem with the search... */}
                        <p>{searchError}</p>
                        <button onClick = {() => {setSearching(false); dispatch(resetSearchError())}}>Back to home</button>
                        {/* the button -setSearching- to false making it possible to display allRecipes (this logic is stated in CarBox.jsx). And, to hide the message and button dispatch the imported action, which cleans the searchError redux state setting it to false. */}
                    </>
                )
            }
            <CardBox searching = {searching} allRecipes = {allRecipes} searchResults = {searchResults} currentAllRecipes = {currentAllRecipes} currentSearchResults = {currentSearchResults}/>
            <Pagination searching = {searching} recipesPerPage = {recipesPerPage} totalAllRecipes = {allRecipes.length} totalSearchResults = {searchResults.length} paginate = {paginate}/>

        </div>
    )
}


//__________________________________________________
const mapStateToProps = (state) => {
    return {
        // to control when the error messages should be displayed.
        apiError: state.apiError,
        searchError: state.searchError
    }
}

export default connect(
    mapStateToProps,
    null
)(Home)