import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const SEARCH = 'SEARCH';
export const FILTER = 'FILTER';
export const SORT = 'SORT';
export const POST = 'POST';
export const SEARCH_ERROR = 'ERROR';
export const RESET_SEARCH_ERROR ='RESET_SEARCH_ERROR';
export const API_ERROR = 'API_ERROR';
export const RESET_API_ERROR = 'RESET_API_ERROR';
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

        dispatch({
            type: RESET_API_ERROR,
        })

        } catch (error) {
            dispatch({
                type: API_ERROR
            })
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
                type: SEARCH_ERROR,
            })
        }
    }
}
//__________________________________________________
export const resetSearchError = () => {
    return {
        type: RESET_SEARCH_ERROR,
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