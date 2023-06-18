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
 
        const syncChange = (event, index) => {
            if (event.target.name.includes('stepByStep')) {
                const updatedSteps = [...recipe.stepByStep];
                updatedSteps[index] = event.target.value;

                setRecipe({
                    ...recipe,
                    stepByStep: updatedSteps,
                });}

            if (event.target.name.includes('diet')) {
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
                    <input type = 'checkbox' value = 'gluten free' name = 'diet01' onChange = {syncChange}/>

                    <label >dairy free</label>
                    <input type = 'checkbox' value = 'dairy free' name = 'diet02' onChange = {syncChange}/>

                    <label >lacto ovo vegetarian</label>
                    <input type = 'checkbox' value = 'lacto ovo vegetarian' name = 'diet03' onChange = {syncChange}/>

                    <label >vegan</label>
                    <input type = 'checkbox' value = 'vegan' name = 'diet04' onChange = {syncChange}/>

                    <label >paleolithic</label>
                    <input type = 'checkbox' value = 'paleolithic' name = 'diet05' onChange = {syncChange}/>

                    <label >primal</label>
                    <input type = 'checkbox' value = 'primal' name = 'diet06' onChange = {syncChange}/>

                    <label >whole 30</label>
                    <input type = 'checkbox' value = 'whole 30' name = 'diet07' onChange = {syncChange}/>

                    <label >pescatarian</label>
                    <input type = 'checkbox' value = 'pescatarian' name = 'diet08' onChange = {syncChange}/>

                    <label >ketogenic</label>
                    <input type = 'checkbox' value = 'ketogenic' name = 'diet09' onChange = {syncChange}/>

                    <label >fodmap friendly</label>
                    <input type = 'checkbox' value = 'fodmap friendly' name = 'diet10' onChange = {syncChange}/>

                <button type = 'submit'>POST!</button>

            </StyledForm>
        </div>
    )
}