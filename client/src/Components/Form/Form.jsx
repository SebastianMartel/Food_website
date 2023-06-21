// uncheck diets.
// words of title can't have more than 12 characters.
import axios from 'axios';
import { useState, useEffect } from 'react';

import validation from '../Validation/validation';

import styled from "styled-components";
import './Form.css'
import formImage from '../../Media/formImage.png'
//__________________________________________________


export default function Form () {


        const [recipe, setRecipe] = useState({
            title: '',
            image: '',
            summary: '',
            healthScore: 0,
            stepByStep: [],
            diets: []
        })

        const [boxes, setBoxes] = useState([
            'gluten free',
            'dairy free',
            'lacto ovo vegetarian',
            'vegan',
            'paleolithic',
            'primal',
            'whole 30',
            'pescatarian',
            'ketogenic',
            'fodmap friendly'
        ])

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

        const [errors, setErrors] = useState({});
        const [steps, setSteps] = useState([1]);


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

        const handleSubmit = (event) => {
            event.preventDefault();
            post(recipe);
            setRecipe({
                title: '',
                image: '',
                summary: '',
                healthScore: 0,
                stepByStep: [],
                diets: []
            })
            setSteps([])
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
        }

        const post = async (recipe) => {

            try {
                const URL = `http://localhost:3001/recipes`;

                const newRecipe = await axios.post(URL, recipe);
                console.log(newRecipe);

            } catch (error) {
                throw new Error (error.message);
            }
        }


    useEffect(() => {
        setErrors(validation(recipe));
    }, [recipe])

    useEffect(() => {
        console.log(recipe.stepByStep);
    }, [recipe.stepByStep])

    useEffect(() => {
        console.log(recipe.diets);
    }, [recipe.diets])


    return (
        <div className = 'fullForm'>
            <div className = 'formImageContainer'>
                <img src = {formImage}/>
            </div>
            <form className = 'form' onSubmit = {handleSubmit}>
                <h1>Create your recipe</h1>
                <div className = 'formSection1'>
                    <div className = 'formTitle'>
                        <label className = 'formLabel'>Name your recipe</label>
                            <input className = 'formInputTitle' name = 'title' value = {recipe.title} onChange = {syncChange}/>
                            {/* <p>{recipe?.title}</p> */}
                            {
                                errors !== {} && <p className = 'errorMessage'>{errors?.title}</p>
                            }
                    </div>
                    <div className = 'formHealthScore'>
                        <div className = 'healthScoreCircle'>
                            <input className = 'formInputHealthScore' name = 'healthScore' value = {recipe.healthScore} onChange = {syncChange} maxLength = "3"/>
                        </div>
                        <div className = 'formHealthScoreLabel-Errors'>
                            <label className = 'formLabel' style = {{textAlign: 'start'}}>Health score</label>
                                {/* <p>{recipe?.healthScore}</p> */}
                                <div>
                                {
                                    errors !== {} && <p className = 'errorMessage'>{errors?.healthScore}</p>
                                }

                                </div>
                        </div>
                    </div>
                </div>

                <div className = 'formSection2'>
                    <div className = 'formSection2-1'>
                        <div className = 'formDescription'>
                            <label className = 'formLabel'>Description</label>
                                <textarea name = 'summary' value = {recipe.summary} onChange = {syncChange}/>
                                {/* <p>{recipe?.summary}</p> */}
                                {
                                    errors !== {} && <p className = 'errorMessage'>{errors?.summary}</p>
                                }
                        </div>
                        <div className = 'formInstructions'>
                            <label className = 'formLabel'>Instructions</label>
                                {steps.map((step, index) => <textarea key = {index} name = {`stepByStep[${index}]`} value = {recipe.stepByStep[index]} onChange = {(event) => syncSteps(event, index)}/>)}
                                {
                                    errors !== {} && <p className = 'errorMessage'>{errors?.steps}</p>
                                }
                                <button type = 'button' onClick = {addStep}>+ ADD STEP</button>
                                {/* <p>{recipe?.stepByStep[0]}</p> */}
                        </div>
                    </div>

                    <div className = 'formSection2-2'>
                        <div className = 'formPhoto'>
                            <label className = 'formLabel'>Add a photo</label>
                                <input name = 'image' value = {recipe.image} onChange = {syncChange}/>
                                {/* <p>{recipe?.image}</p> */}
                                {
                                    errors !== {} && <p className = 'errorMessage'>{errors?.image}</p>
                                }
                        </div>
                        <div className = 'formDiets'>
                            <label className = 'formLabel'>Select diets</label>
                                <div className = 'checkboxes'>
                                    <div className = 'checkboxC'>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'gluten free' name = 'glutenFree' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.glutenFree}/>
                                            <label >gluten free</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'dairy free' name = 'dairyFree' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.dairyFree}/>
                                            <label >dairy free</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'lacto ovo vegetarian' name = 'lactoOvoVegetarian' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.lactoOvoVegetarian}/>
                                            <label >lacto ovo vegetarian</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'vegan' name = 'vegan' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.vegan}/>
                                            <label >vegan</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'paleolithic' name = 'paleolithic' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.paleolithic}/>
                                            <label >paleolithic</label>
                                        </div>
                                    </div>
                                    <div className = 'checkboxC'>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'primal' name = 'primal' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.primal}/>
                                            <label >primal</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'whole 30' name = 'whole30' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.whole30}/>
                                            <label >whole 30</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'pescatarian' name = 'pescatarian' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.pescatarian}/>
                                            <label >pescatarian</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'ketogenic' name = 'ketogenic' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.ketogenic}/>
                                            <label >ketogenic</label>
                                        </div>
                                        <div className = 'checkboxR'>
                                            <input type = 'checkbox' value = 'fodmap friendly' name = 'fodmapFriendly' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.fodmapFriendly}/>
                                            <label >fodmap friendly</label>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <button type = 'submit'>POST!</button>
                    </div>
                </div>

            </form>
        </div>
    )
}