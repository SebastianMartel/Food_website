import axios from 'axios';
import { axiosGetAllRecipes, axiosGetRecipesByName } from '../axiosRequests';

//__________________________________________________

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
            const data = await axiosGetAllRecipes()

            dispatch({
                type: ALL_RECIPES,
                payload: data
            });

            dispatch({
                type: RESET_API_ERROR,
            })

        } catch (error) {
            dispatch({
                type: API_ERROR,
                payload: "There was a problem with the server, try using another api-key or search 'https://spoonacular.com/food-api/' for more information."
            })
        }
    };
};
//__________________________________________________
export const getRecipesByName = (name) => {

    return async (dispatch) => {

        try {

            const data = await axiosGetRecipesByName(name)

            dispatch({
                type: SEARCH,
                payload: data
            })

        } catch (error) {

            error.response && error.response.status === 404
            ? (
                dispatch({
                    type: SEARCH_ERROR,
                    payload: error.response.data,
                })
            ) : (
                dispatch({
                    type: SEARCH_ERROR,
                    payload: "There was a problem with the server, try using another api-key or search 'https://spoonacular.com/food-api/' for more information.",
                })
            )
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