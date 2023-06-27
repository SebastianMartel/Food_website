import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const SEARCH = 'SEARCH';
export const FILTER = 'FILTER';
export const SORT = 'SORT';
export const POST = 'POST';
export const ERROR = 'ERROR';
export const RESET_ERROR ='RESET_ERROR';
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
            // you need to use another api key.
        }
    };
};
//__________________________________________________
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
            dispatch({
                type: ERROR,
            })
        }
    }
}
//__________________________________________________
export const resetError = () => {
    return {
        type: RESET_ERROR,
    }
}
//__________________________________________________
export const sortAllRecipes = (name) => {
    return {
        type: SORT,
        payload: name
    }
}
//__________________________________________________
export const filterAllRecipes = (filter) => {
    return {
        type: FILTER,
        payload: filter
    }
}