import { ALL_RECIPES ,FILTER, NAME_SORT, HEALTH_SCORE_SORT } from "./actions";
//__________________________________________________


    const initialState = {
        allRecipes : [],
        allRecipesCopy: []
    }


const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ALL_RECIPES:
            return {
                ...state,
                allRecipes: payload,
                allRecipesCopy: payload
            }

        case NAME_SORT:
            const allRecipesCopyCopy = [...state.allRecipesCopy]

            return {
                ...state,
                allRecipesCopy: 
                    payload === 'A'
                    ? allRecipesCopyCopy.sort((a,b)=> a.id - b.id)
                    : allRecipesCopyCopy.sort((a,b)=> b.id - a.id)
            }

        default:
            return {
                ...state
            }
    }
}


//__________________________________________________
export default reducer;