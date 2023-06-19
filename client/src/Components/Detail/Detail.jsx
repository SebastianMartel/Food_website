import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './Detail.css'
//__________________________________________________


export default function Detail ( { setDeleteSuccess } ) {


        const [details, setDetails] = useState({})

        const [hasSteps, setHasSteps] = useState(false)

        const [showConfirm, setShowConfirm] = useState(false)

        const [updatedDiets, setUpdatedDiets] = useState({})


        const { id } = useParams()

        const navigate = useNavigate()


        const isValidUUID = (id) => { // checks if the id is a UUID type.
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return uuidPattern.test(id);
        };

        const deleteRecipe = async () => {
            const URL = 'http://localhost:3001/recipes'
            await axios.delete(`${URL}/${id}`)
            setDeleteSuccess(true)
            setTimeout(() => {
                setDeleteSuccess(false)
            }, 8000)
            navigate('/home')
        }

        const confirmDelete = () => {
            setShowConfirm(!showConfirm)
        }


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

    useEffect(() => {
        if (details?.stepByStep?.length > 0) {
            setHasSteps(true)
        }
    }, [details])


    return (
        <div className = "detail">
            <div className = "detailSection1">
                <h1 className = "recipeTitle">{details?.title}</h1>{/* Screws the width of the first section when the title has a word really long */}
                <p>{details?.summary}</p>
                <div className = 'detailDietsList'>
                    {
                        details?.diets && Object.keys(details?.diets).map((dietKey) => {
                            return (
                                <p>{details?.diets[dietKey]}</p>
                            )
                        })
                    }
                    <p>{details?.diets?.length}</p>
                </div>
            </div>

            <div className = "detailSectionSteps">
                <h2 className = 'preparationTitle'>P R E P A R A T I O N</h2>
                {
                    isValidUUID(details?.id)
                    ? (
                        hasSteps === true
                        ? (details?.stepByStep?.map((step) => {
                            if (step !== '') {
                                return (
                                    <p>{step}</p>
                                )
                            }
                        })) : (
                            <p>we are working on it</p>
                        )
                    ) : (
                        hasSteps === true
                        ? (
                            details?.stepByStep?.map((step) => {
                                return (
                                    <p>{step.step}</p>
                                )
                            })
                        ) : (
                            <p>we are working on it</p>
                        )
                    )
                }
            </div>

            <div className = "detailSection3">
                <img src = {details?.image} alt = {details?.title}/>
                <div className = 'healthScore'>
                    <div className = 'healthScoreCircle'>
                        <span className = 'healthScoreValue'>
                            {details?.healthScore}
                        </span>
                        <span class="diagonalLine"></span>

                        <span class="healthScoreLabel">Health Score</span>
                    </div>
                </div>
                <p>{details?.id}</p>
                {
                    isValidUUID(details?.id) && (
                        <button className = 'confirmDelete' onClick = {confirmDelete}>DELETE RECIPE</button>
                    )
                }
            </div>
            {
                showConfirm && (
                    <div className = 'confirmBox'>
                        <div className = 'confirmBoxContent'>
                            <p className = 'confirmQuestion'>Are you sure you want to delete your recipe? This action is irreversible</p>
                            <div className = 'confirmDeleteButtons'>
                                <button className = 'deleteRecipe' onClick = {deleteRecipe}>YES, I'M SURE</button>
                                <button className = 'dontDeleteRecipe' onClick = {confirmDelete}>NO</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}