import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './Detail.css'
//__________________________________________________


export default function Detail ( { setSuccessfullDelete } ) { // takes the function to control the success alert.


    const [details, setDetails] = useState({}) // stores the recipe properties from the request.

    const [hasSteps, setHasSteps] = useState(false) // in case a recipe doesn't have steps, it shows something else...

    const [showConfirm, setShowConfirm] = useState(false) // controls the confirm delete box.

    const [idRequestError, setIdRequestError] = useState(false) // to handle the axios error.

    const [idRequestErrorMessage, setIdRequestErrorMessage] = useState('')


        const { id } = useParams() // this is used to check the id type of the current recipe.

        const navigate = useNavigate()


        const isValidUUID = (id) => { // checks if the id is a UUID type.
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return uuidPattern.test(id);
        };

        const deleteRecipe = async () => { // makes a request to the server and then, the server deletes the recipe from the DB.

            try {
                const URL = 'http://localhost:3001/recipes';
                await axios.delete(`${URL}/${id}`);
                setSuccessfullDelete(true) // shows the alert.
                setTimeout(() => {
                    setSuccessfullDelete(false); // hides the alert after 13 seconds.
                }, 13000);
                navigate('/home'); // redirects to the home page.

            } catch (error) {
                throw new Error(error.message); // is it even possible for this to display??
            }
        }

        const confirmDelete = () => {
            setShowConfirm(!showConfirm) // this will toggle the display. If click on DELETE RECIPE, it will show the box, if click on NO (from the box), it will hide the box.
        }


    useEffect(() => {
        // makes a request to get the recipe data.
        const getRecipeById = async () => {

            try {
                const URL = 'http://localhost:3001/recipes';
                const { data } = await axios(`${URL}/${id}`);
                const recipeFound = data;
                // save the data in the local state.
                setDetails(recipeFound);
                setIdRequestError(false) // in case all goes well, the error won't be displayed.

            } catch (error) {
                console.log(error)
                error.response && error.response.status === 404
                ? (
                    setIdRequestErrorMessage(error.response.data)
                ) : (
                    setIdRequestErrorMessage("There was a problem with the server, try using another api-key or search 'https://spoonacular.com/food-api/' for more information.")
                )

                setIdRequestError(true); // in case things go wrong, the error will be displayed.
            }
        }
        getRecipeById()

    },[id]) // in '/detail:id', everytime the ID in the URL changes, the function will run again due to the id in the array of dependecies.

    useEffect(() => {
        if (details?.stepByStep?.length > 0) {
            setHasSteps(true)
        }
    }, [details])


    return (
        <div className = "detail">

            { idRequestError ?
            // In case there's a problem, the next element will be displayed...
                (
                    <p className = "idRequestError">{idRequestErrorMessage}</p>
                )
            : ( // Else, the detail section will be displayed.
                <>
                    <div className = "detailSection1">
                        <h1 className = "recipeTitle">{details?.title}</h1>
                        <p>{details?.summary}</p>
                        <div className = 'detailDietsList'>
                            <h2 style = {{margin: '0 0 20px'}}>Diets</h2>
                            {
                                details?.diets && Object.keys(details?.diets).map((dietKey) => {
                                    return (
                                        <p style = {{margin: '5px'}}>{details?.diets[dietKey]}</p>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* SECTION 2 */}
                        <div className = "detailSection2">
                            <h2 className = 'detailPreparationTitle'>P R E P A R A T I O N</h2>
                            <div className = 'detailPreparationSteps'>
                                {
                                    hasSteps === true
                                    ? (
                                        details?.stepByStep?.map((step) => {
                                        if (step !== '') { // in case the step is an empty string, the <p> element won't render.
                                            return (
                                                <p>{step}</p>
                                            )
                                        }
                                    })) : (
                                        <p>Sorry, we are currently working on it...</p> // this is the text for the recipes which don't have steps defined.
                                    )
                                }
                            </div>
                        </div>

                    {/* SECTION 3 */}
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
                            <p>ID: {details?.id}</p>
                            {/* The DELETE button will only display if the recipes comes from the DB. */}
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
                </>
            )}
        </div>
    )
}