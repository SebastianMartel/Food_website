import axios from 'axios'
import { useState } from "react"


export default function SearchBar ( { getRecipeByName } ) {


    const [input, setInput] = useState('')


        const syncInput = (event) => {
            const actualValue = event.target.value
            setInput(actualValue)
        }


    return (
        <div>
            <input onChange = {syncInput} value = {input}/>
            <button onClick = { () => getRecipeByName(input) }>Search</button>
        </div>
    )
}