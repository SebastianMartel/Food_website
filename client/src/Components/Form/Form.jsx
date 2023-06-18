// uncheck diets

import axios from 'axios';
import { useState, useEffect } from 'react';

import validation from '../Validation/validation';

import styled from "styled-components";
//__________________________________________________

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 35%;
`


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
        const [steps, setSteps] = useState([]);


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
            // post(recipe);
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
        <div>
            <StyledForm onSubmit = {handleSubmit}>

                <img/>
                <label>Name</label>
                    <input name = 'title' value = {recipe.title} onChange = {syncChange}/>
                    <p>{recipe?.title}</p>
                    {
                        errors !== {} && <p>{errors?.title}</p>
                    }

                <label>Description</label>
                <textarea name = 'summary' value = {recipe.summary} onChange = {syncChange}/>
                    <p>{recipe?.summary}</p>
                    {
                        errors !== {} && <p>{errors?.summary}</p>
                    }

                <label>HealthScore</label>
                    <input name = 'healthScore' value = {recipe.healthScore} onChange = {syncChange}/>
                    <p>{recipe?.healthScore}</p>
                    {
                        errors !== {} && <p>{errors?.healthScore}</p>
                    }

                <label>Add a photo</label>
                    <input name = 'image' value = {recipe.image} onChange = {syncChange}/>
                    <p>{recipe?.image}</p>
                    {
                        errors !== {} && <p>{errors?.image}</p>
                    }

                <label>Instructions</label>
                    {steps.map((step, index) => <textarea key = {index} name = {`stepByStep[${index}]`} value = {recipe.stepByStep[index]} onChange = {(event) => syncSteps(event, index)}/>)}
                    {
                        errors !== {} && <p>{errors?.steps}</p>
                    }
                    <button type = 'button' onClick = {addStep}>+ ADD STEP</button>
                    <p>{recipe?.stepByStep[0]}</p>


                <label>Select dietss</label>

                    <label >gluten free</label>
                    <input type = 'checkbox' value = 'gluten free' name = 'glutenFree' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.glutenFree}/>

                    <label >dairy free</label>
                    <input type = 'checkbox' value = 'dairy free' name = 'dairyFree' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.dairyFree}/>

                    <label >lacto ovo vegetarian</label>
                    <input type = 'checkbox' value = 'lacto ovo vegetarian' name = 'lactoOvoVegetarian' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.lactoOvoVegetarian}/>

                    <label >vegan</label>
                    <input type = 'checkbox' value = 'vegan' name = 'vegan' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.vegan}/>

                    <label >paleolithic</label>
                    <input type = 'checkbox' value = 'paleolithic' name = 'paleolithic' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.paleolithic}/>

                    <label >primal</label>
                    <input type = 'checkbox' value = 'primal' name = 'primal' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.primal}/>

                    <label >whole 30</label>
                    <input type = 'checkbox' value = 'whole 30' name = 'whole30' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.whole30}/>

                    <label >pescatarian</label>
                    <input type = 'checkbox' value = 'pescatarian' name = 'pescatarian' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.pescatarian}/>

                    <label >ketogenic</label>
                    <input type = 'checkbox' value = 'ketogenic' name = 'ketogenic' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.ketogenic}/>

                    <label >fodmap friendly</label>
                    <input type = 'checkbox' value = 'fodmap friendly' name = 'fodmap friendly' onChange = {(event) => {syncChange (event); toggleCheckbox (event)}} checked = {mode.fodmapFriendly}/>

                <button type = 'submit'>POST!</button>

            </StyledForm>
        </div>
    )
}