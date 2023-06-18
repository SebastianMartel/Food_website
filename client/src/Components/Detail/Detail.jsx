import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//__________________________________________________


export default function Detail () {


        const [details, setDetails] = useState({})


        const { id } = useParams()


    useEffect(() => {

        const getRecipeById = async () => {
            const URL = 'http://localhost:3001/recipes'
            const { data } = await axios(`${URL}/${id}`)
            const recipeFound = data
            setDetails(recipeFound)
        }
        console.log(details)
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
            <p>{typeof(details.diets)}</p>
        </div>
    )
}