import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const SEARCH = 'SEARCH';
export const FILTER = 'FILTER';
export const SORT = 'SORT';
export const POST = 'POST';
export const ERROR = 'ERROR'
//__________________________________________________


export const getAllRecipes = () => {

    return async (dispatch) => {

        try {
            const URL = 'http://localhost:3001/recipes/all';
            const { data } = await axios(URL);

        dispatch({
            type: ALL_RECIPES,
            payload: data
        });

        } catch (error) {
            throw new Error(error.message);
        }
    };
};

export const getRecipesByName = (name) => {

    return async (dispatch) => {

        try {

            const URL = 'http://localhost:3001/recipes';
            const { data } = await axios(`${URL}?name=${name}`);

        dispatch({
            type: SEARCH,
            payload: data
        })

        } catch (error) {
            console.log('Not found');
            dispatch({
                type: ERROR,
            })
        }
    }
}

export const sortAllRecipes = (name) => {
    return {
        type: SORT,
        payload: name
    }
}

export const filterAllRecipes = (filter) => {
    return {
        type: FILTER,
        payload: filter
    }
}