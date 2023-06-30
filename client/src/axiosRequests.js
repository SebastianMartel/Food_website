import axios from "axios";


export const axiosGetAllRecipes = async () => {
    const URL = 'http://localhost:3001/recipes/all';
    const { data } = await axios(URL);
    
    return data;
}

export const axiosGetRecipesByName = async (name) => {
    const URL = 'http://localhost:3001/recipes';
    const { data } = await axios(`${URL}?name=${name}`);

    return data;
}

export const axiosGetRecipeById = async (id) => {
    const URL = 'http://localhost:3001/recipes';
    const { data } = await axios(`${URL}/${id}`);

    return data;
}

export const axiosDeleteRecipe = async (id) => {
    const URL = 'http://localhost:3001/recipes';
    await axios.delete(`${URL}/${id}`);

    return;
}

export const axiosGetDiet = async () => {
    const URL = 'http://localhost:3001/diets'
    const diets = await axios(URL)

    return diets;
}

export const axiosPostRecipe = async (recipe) => {
    const URL = `http://localhost:3001/recipes`;
    const newRecipe = await axios.post(URL, recipe);

    return newRecipe;
}