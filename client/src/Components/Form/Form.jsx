import { useState, useEffect } from 'react';

import { axiosGetDiet, axiosPostRecipe } from '../../axiosRequests';
import validation from '../Validation/validation';

import './Form.css'
import formImage from '../../Media/formImage.png'
//__________________________________________________

// add button to bring all the diets from the DB
export default function Form () {


        const [recipe, setRecipe] = useState({
            title: '',
            image: '',
            summary: '',
            healthScore: '',
            stepByStep: [],
            diets: []
        })

        //DIET:
        const [mode, setMode] = useState({
            glutenFree: false,
            dairyFree: false,
            lactoOvoVegetarian: false,
            vegan: false,
            paleolithic: false,
            primal: false,
            whole30: false,
            pescatarian: false,
            ketogenic: false,
            fodmapFriendly: false
        })
        //STEPS:
        const [steps, setSteps] = useState([1]);
        //ERRORS:
        const [errors, setErrors] = useState({});
        //ALERT MESSAGE:
        const [successfullPost, setSuccessfullPost] = useState(false)
        //DIET REQUEST ERROR:
        const [dietRequestError, setDietRequestError] = useState(false)


        const syncSteps = (event, index) => {
            if (event.target.name.includes('stepByStep')) {
                const updatedSteps = [...recipe.stepByStep];
                updatedSteps[index] = event.target.value;

                setRecipe({
                    ...recipe,
                    stepByStep: updatedSteps,
                });}
            else {
                setRecipe({
                    ...recipe,
                    [event.target.name]: event.target.value,
                });
            }
        }

        const toggleCheckbox = (event) => {
            setMode({
                ...mode,
                [event.target.name]: !mode[event.target.name]
            })
        }

        const syncChange = (event) => {
            if (event.target.type === 'checkbox') {
                const updatedDiets = [...recipe.diets]
                const isChecked = event.target.checked // whether it has been ticked or not.

                if (isChecked) {
                    setRecipe({
                        ...recipe,
                        diets: [...updatedDiets, event.target.value]
                    })
                } else if (!isChecked) {
                    setRecipe({
                        ...recipe,
                        diets: updatedDiets.filter((diet) => diet !== event.target.value)
                    })
                }

            } else {
                setRecipe({
                    ...recipe,
                    [event.target.name]: event.target.value,
                });
            }
        };

        const addStep = () => {
            setRecipe({
                ...recipe,
                stepByStep: [...recipe.stepByStep, '']
            });
            setSteps([...steps, '']);
        }

        const handleSubmit = async (event) => {
            try {
                event.preventDefault();
                const diets = await axiosGetDiet(); // fetches the diets and store them in the DB.

                if (diets) {

                    setDietRequestError(false)
                    // event.preventDefault();
                    post(recipe);
                        setRecipe({
                        title: '',
                        image: '',
                        summary: '',
                        healthScore: '',
                        stepByStep: [],
                        diets: []
                        })
                        setSteps([''])
                        setMode({
                            glutenFree: false,
                            dairyFree: false,
                            lactoOvoVegetarian: false,
                            vegan: false,
                            paleolithic: false,
                            primal: false,
                            whole30: false,
                            pescatarian: false,
                            ketogenic: false,
                            fodmapFriendly: false
                        })
                        setSuccessfullPost(true)
                    setTimeout(() => {
                        setSuccessfullPost(false)
                    }, 13000)
                }

            } catch (error) {
                setDietRequestError(true)
                setTimeout(() => {
                    setDietRequestError(false)
                }, 13000)
            }
        }

        const post = async (recipe) => {

            try {
                const newRecipe = await axiosPostRecipe(recipe);
                console.log(newRecipe);

            } catch (error) {
                throw new Error (error.message);
            }
        }


    useEffect(() => {
        setErrors(validation(recipe));
    }, [recipe])


    return (
        <div className = 'fullForm'>
            <div className = 'formImageContainer'>
                <img src = {formImage} alt = 'decorative fruits and vegetables'/>
            </div>
            {
                successfullPost && (
                    <div className = 'successfullPostMessage'>
                        <svg style = {{fill: '#008000'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        You have successfully posted your recipe
                    </div>
                )
            }
            {
                dietRequestError && (
                    <div className = 'successfullPostMessage'>
                        <svg style = {{fill: '#008000'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        There was an error fetching the diets. Try again later.
                    </div>
                )
            }
            <form className = 'form' onSubmit = {handleSubmit}>
                <h1>CREATE YOUR RECIPE</h1>
                <div className = 'formSection1'>
                    <div className = 'formTitle'>
                        {/* TITLE */}
                        <label for = 'title' className = 'formLabel'>Name your recipe</label>
                            <input id = 'title' className = 'formInputTitle' name = 'title' value = {recipe.title} onChange = {syncChange} placeholder = 'Juicy grilled sirloin with...'/>
                            {
                                errors.title && <p className = 'errorMessage'>{errors.title}</p>
                            }
                    </div>
                    <div className = 'formHealthScore'>
                        <div className = 'healthScoreCircle' style = {{border: errors.healthScore ? '2px solid red' : 'none'}}>
                            <input id = 'healthScore' className = 'formInputHealthScore' name = 'healthScore' value = {recipe.healthScore} onChange = {syncChange} maxLength = "3" placeholder = "?"/>
                        </div>
                        {/* HEALTH SCORE */}
                        <div className = 'formHealthScoreLabel-Errors'>
                            <label for = 'healthScore' className = 'formLabel' style = {{textAlign: 'start'}}>Health score</label>
                                <div>
                                {
                                    errors.healthScore && <p className = 'errorMessage'>{errors?.healthScore}</p>
                                }

                                </div>
                        </div>
                    </div>
                </div>

                <div className = 'formSection2'>
                    <div className = 'formSection2-1'>
                        <div className = 'formDescription'>
                            {/* DESCRIPTION */}
                            {

                            }
                            <label for = 'description' className = 'formLabel'>Description</label>
                                <textarea id = 'description' className = 'formTextareaDescription' name = 'summary' value = {recipe.summary} onChange = {syncChange} placeholder = 'Prime sirloin steak cooked to perfection on the grill. Seasoned with a blend of aromatics herbs such as rosemary, thyme...'/>
                                {
                                    errors.summary && <p className = 'errorMessage'>{errors?.summary}</p>
                                }
                        </div>
                        <div className = 'formInstructions'>
                            {/* DIRECTIONS */}
                            <label for = 'instructions' className = 'formLabel'>Directions</label>
                                <div className = 'formInstructionsSteps'>
                                    {steps.map((step, index) => <textarea id = 'instructions' key = {index} className = 'formTextAreaInstructions' name = {`stepByStep[${index}]`} value = {recipe.stepByStep[index]} onChange = {(event) => syncSteps(event, index)} placeholder = 'Preheat the grill...'/>)}
                                    {
                                        errors.stepByStep && <p className = 'errorMessage'>{errors?.stepByStep}</p>
                                    }
                                </div>
                                <button className = 'formAddStepButton' type = 'button' onClick = {addStep}>+ ADD STEP</button>
                        </div>
                    </div>

                    <div className = 'formSection2-2'>
                        {/* IMAGE */}
                        <div className = 'formImage'>
                            <label for = 'image' className = 'formLabel'>Add a photo</label>
                                <p style = {{margin: '0 0 10px'}}>*Supported file extensions: .PNG | .JPG</p>
                                <input id = 'image' className = 'formInputImage' name = 'image' value = {recipe.image} onChange = {syncChange} placeholder = 'https://spoonacular.com/image/312x231.jpg'/>
                                {
                                    errors.image && <p className = 'errorMessage'>{errors?.image}</p>
                                }
                        </div>
                        {/* DIETS */}
                        <div className = 'formDiets'>
                            <label className = 'formLabel'>Select diets</label>
                                <div className = 'checkboxes'>
                                    <div className = 'checkboxC'>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'gluten free' name = 'glutenFree' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.glutenFree}/>
                                            <label >gluten free</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'dairy free' name = 'dairyFree' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.dairyFree}/>
                                            <label >dairy free</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'lacto ovo vegetarian' name = 'lactoOvoVegetarian' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.lactoOvoVegetarian}/>
                                            <label >lacto ovo vegetarian</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'vegan' name = 'vegan' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.vegan}/>
                                            <label >vegan</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'paleolithic' name = 'paleolithic' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.paleolithic}/>
                                            <label >paleolithic</label>
                                        </div>
                                    </div>
                                    <div className = 'checkboxC'>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'primal' name = 'primal' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.primal}/>
                                            <label >primal</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'whole 30' name = 'whole30' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.whole30}/>
                                            <label >whole 30</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'pescatarian' name = 'pescatarian' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.pescatarian}/>
                                            <label >pescatarian</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' svalue = 'ketogenic' name = 'ketogenic' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.ketogenic}/>
                                            <label >ketogenic</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' className = 'checkbox' value = 'fodmap friendly' name = 'fodmapFriendly' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.fodmapFriendly}/>
                                            <label >fodmap friendly</label>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {/* ALL THE ERRORS */}
                        <div className = 'formRequirements'>
                            {
                                errors?.title && <p style = {{margin: '10px 0'}}>*Name required</p>
                            }
                            {
                                errors?.healthScore && <p style = {{margin: '10px 0'}}>*Health score required</p>
                            }
                            {
                                errors?.summary && <p style = {{margin: '10px 0'}}>*Description required</p>
                            }
                            {
                                errors?.stepByStep && <p style = {{margin: '10px 0'}}>*Directions required</p>
                            }
                        </div>
                        <button className = {Object.keys(errors).length === 0 ? 'formSubmitButtonAllowed' : 'formSubmitButtonDisallowed'} type = {Object.keys(errors).length === 0 ? 'submit' : 'button'}>S U B M I T</button>
                    </div>
                </div>
            </form>
        </div>
    )
}