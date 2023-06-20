import { useState, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';

import { getRecipesByName } from '../../Redux/actions';

import './SearchBar.css'
//__________________________________________________


export function SearchBar ( { setSearching, searchResults } ) {


        const [input, setInput] = useState('')

        const dispatch = useDispatch()


    const syncInput = (event) => {
        const actualValue = event.target.value
        setInput(actualValue)
    }


    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])


    return (
        <div className = 'searchSection'>
            <input className = 'searchInput' onChange = {syncInput} value = {input}/>
            <button className = 'searchButtonContainer' onClick = { () => {dispatch(getRecipesByName(input)); setSearching(true)} }>
                <svg className = 'searchButton' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            </button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        searchResults: state.searchResults
    }
}

export default connect (
    mapStateToProps,
    null
)(SearchBar)