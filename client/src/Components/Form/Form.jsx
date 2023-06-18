import axios from 'axios';
import { useState } from 'react';
//__________________________________________________


export default function Form () {

    const [recipe, setRecipe] = useState({
        title: '',
        image: '',
        summary: '',
        healthScore: 0,
        stepByStep: [],
        diet: ''
    })

//        const { title, image, summary, healthScore, stepByStep, diet } = req.body        

    const post = async (recipe) => {

        try {

            const URL = `http://localhost:3001/recipes`

            const newRecipe = await axios.post(URL, recipe)
            console.log(newRecipe)

        } catch (error) {
            throw new Error (error.message)
        }

    }

    const syncChange = (event) => {
        setRecipe({
            ...recipe,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        post(recipe)
    }


    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Name</label>
                    <input name = 'title' value = {recipe.title} onChange = {syncChange}></input>
                    <p>{recipe.title}</p>
                    <p>{recipe.image}</p>
                    <p>{recipe.summary}</p>
                <label>Summary</label>
                    <input name = 'summary' value = {recipe.summary} onChange = {syncChange}></input>
                <label>HealthScore</label>
                    <input name = 'healthScore' value = {recipe.healthScore} onChange = {syncChange}></input>
                <label>Add a photo</label>
                    <input name = 'image' value = {recipe.image} onChange = {syncChange}></input>
                <label>Steps</label>
                    <input name = 'stepByStep' value = {recipe.stepByStep} onChange = {syncChange}></input>
                <label>Select diets</label>
                    <input name = 'diet' value = {recipe.diet} onChange = {syncChange}></input>

                <button>POST!</button>
            </form>
        </div>
    )
}