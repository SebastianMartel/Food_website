import axios from 'axios'
import { useState } from "react"
//__________________________________________________


export default function SearchBar ( { setSearching, getRecipeByName } ) {


    const [input, setInput] = useState('')


        const syncInput = (event) => {
            const actualValue = event.target.value
            setInput(actualValue)
        }


    return (
        <div>
            <input onChange = {syncInput} value = {input}/>
            <button onClick = { () => {getRecipeByName(input); setSearching(true)} }>Search</button>
        </div>
    )
}