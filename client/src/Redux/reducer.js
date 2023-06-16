import { ALL_RECIPES ,FILTER, NAME_SORT, HEALTH_SCORE_SORT } from "./actions";
//__________________________________________________


    const initialState = {
        reduxAllRecipes : [],
        reduxAllRecipesCopy: [],
        reduxAllRecipesCopyHealthScore: []
    }


const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ALL_RECIPES:
            return {
                ...state,
                reduxAllRecipes: payload,
                reduxAllRecipesCopy: payload,
                reduxAllRecipesCopyHealthScore: payload
            }

        case NAME_SORT:
            const reduxAllRecipesCopyName = [...state.reduxAllRecipesCopy]

            return {
                ...state,
                reduxAllRecipesCopy:
                    payload === 'A'
                    ? reduxAllRecipesCopyName.sort((a, b) => a.title.localeCompare(b.title))
                    : reduxAllRecipesCopyName.sort((a, b) => b.title.localeCompare(a.title))
            }

        case HEALTH_SCORE_SORT:
            const reduxAllRecipesCopyHealthScoreCopy = [...state.reduxAllRecipesCopyHealthScore]

            return {
                ...state,
                reduxAllRecipesCopyHealthScore:
                    payload === 'A'
                    ? reduxAllRecipesCopyHealthScoreCopy.sort((a, b) => b.healthScore - a.healthScore)
                    : reduxAllRecipesCopyHealthScoreCopy.sort((a, b) => a.healthScore - b.healthScore)
            }

        default:
            return {
                ...state
            }
    }
}


//__________________________________________________
export default reducer;