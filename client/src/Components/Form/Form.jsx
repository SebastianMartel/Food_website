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
            diet: ''
        })

        const [errors, setErrors] = useState({});
        const [steps, setSteps] = useState([]);


        const syncChange = (event, index) => {
            if (event.target.name.includes('stepByStep')) {
                const updatedSteps = [...recipe.stepByStep];
                updatedSteps[index] = event.target.value;

                setRecipe({
                    ...recipe,
                    stepByStep: updatedSteps,
                });

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

    return (
        <div>
            <StyledForm onSubmit = {handleSubmit}>
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
                    {steps.map((step, index) => <textarea key = {index} name = {`stepByStep[${index}]`} value = {recipe.stepByStep[index]} onChange = {(event) => syncChange(event, index)}/>)}
                    {
                        errors !== {} && <p>{errors?.steps}</p>
                    }
                    <button type = 'button' onClick = {addStep}>+ ADD STEP</button>
                    <p>{recipe?.stepByStep[0]}</p>


                <label>Select diets</label>
                    <input name = 'diet' value = {recipe.diet} onChange = {syncChange}/>
                    <p>{recipe?.diet}</p>
                    {
                        errors !== {} && <p>{errors?.diet}</p>
                    }

                <button type = 'submit'>POST!</button>
            </StyledForm>
        </div>
    )
}