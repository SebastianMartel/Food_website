import axios from 'axios'
import { useState, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';

import { getRecipesByName } from '../../Redux/actions';

//__________________________________________________


export function SearchBar ( { setSearching, searchResults } ) {


    const [input, setInput] = useState('')

    const dispatch = useDispatch()

    
    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])


        const syncInput = (event) => {
            const actualValue = event.target.value
            setInput(actualValue)
        }


    return (
        <div>
            <input onChange = {syncInput} value = {input}/>
            <button onClick = { () => {dispatch(getRecipesByName(input)); setSearching(true)} }>Search</button>
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