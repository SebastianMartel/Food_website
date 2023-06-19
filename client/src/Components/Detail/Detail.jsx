import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './Detail.css'
//__________________________________________________


export default function Detail () {


        const [details, setDetails] = useState({})


        const { id } = useParams()


        const isValidUUID = (id) => { // checks if the id is a UUID type.
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return uuidPattern.test(id);
        };


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
        <div className = "detail">
            <div className = "detailSection1">
                <h1 className = "recipeTitle">{details?.title}</h1>{/* Screws the width of the first section when the title has a word really long */}
                <p>{details?.diets}</p>
                <p>{details?.summary}</p>
            </div>

            <div className = "detailSection2">
                <h2>Preparation</h2 >
                {
                    isValidUUID(details?.id)
                    ? (details?.stepByStep?.map((step) => {
                        if (step !== '') {
                            return (
                                <p>{step}</p>
                                )
                            }
                    }))
                    : (
                        details?.stepByStep?.map((step) => {
                            return (
                                <p>{step.step}</p>
                            )
                        })
                    )
                }
            </div>

            <div className = "detailSection3">
                <img src = {details?.image} alt = {details?.title}/>
                <p>{details?.id}</p>
                <p>{details?.healthScore}</p>
                <p>{typeof(details.diets)}</p>
            </div>
        </div>
    )
}