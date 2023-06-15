import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";


export default function Detail () {


    const [details, setDetails] = useState({})


    const { id } = useParams()
    const { pathname } = useLocation()

    useEffect(() => {

        const getRecipeById = async () => {
            const URL = 'http://localhost:3001/recipes'
            const { data } = await axios(`${URL}/${id}`)
            const recipeFound = data
            setDetails(recipeFound)
        }
        
        getRecipeById()

    },[id])


    return (
        <div>
            <img src = {details?.image}/>
            <p>{details?.title}</p>
            <p>{details?.id}</p>
            <p>{details?.summary}</p>
            <p>{details?.healthScore}</p>
            {
                details?.stepByStep?.map((step) => {
                    return (
                        <p>{step.step}</p>
                    )
                })
            }
            <p>{details?.diets}</p>
        </div>
    )
}