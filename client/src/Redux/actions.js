import axios from 'axios';

export const ALL_RECIPES = 'ALL_RECIPES';
export const FILTER = 'FILTER';
export const NAME_SORT = 'NAME_SORT';
export const HEALTH_SCORE_SORT = 'HEALTH_SCORE_SORT';
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
            console.error(error);
        }
    };
  };

export const filter = (filter) => {
    return {
        type: FILTER,
        payload: filter
    }
}

export const sortByName = (name) => {
    return {
        type: NAME_SORT,
        payload: name
    }
}

export const sortByHealthScore = (healthScore) => {
    return {
        type: HEALTH_SCORE_SORT,
        payload: healthScore
    }
}


//__________________________________________________