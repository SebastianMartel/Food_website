import { ALL_RECIPES ,FILTER, SORT } from "./actions";
//__________________________________________________


    const initialState = {
        reduxAllRecipes : [],
        reduxAllRecipesCopy: [],
        // reduxAllRecipesCopyHealthScore: []
    }


const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ALL_RECIPES:
            return {
                ...state,
                reduxAllRecipes: payload,
                reduxAllRecipesCopy: payload,
                // reduxAllRecipesCopyHealthScore: payload
            }

        case SORT:
            const reduxAllRecipesCopyName = [...state.reduxAllRecipesCopy]

            switch (payload) {
                case 'A':
                    return {
                        ...state,
                        reduxAllRecipesCopy: reduxAllRecipesCopyName.sort((a, b) => a.title.localeCompare(b.title))
                    }
                case 'B':
                    return {
                        ...state,
                        reduxAllRecipesCopy: reduxAllRecipesCopyName.sort((a, b) => b.title.localeCompare(a.title))
                    }
                case 'C':
                    return {
                        ...state,
                        reduxAllRecipesCopy: reduxAllRecipesCopyName.sort((a, b) => b.healthScore - a.healthScore)
                    }
                case 'D':
                    return {
                        ...state,
                        reduxAllRecipesCopy: reduxAllRecipesCopyName.sort((a, b) => a.healthScore - b.healthScore)
                    }
                default:
                    return {
                        ...state,
                        reduxAllRecipesCopyName
                    }
                }

        // case HEALTH_SCORE_SORT:
        //     const reduxAllRecipesCopyHealthScoreCopy = [...state.reduxAllRecipesCopyHealthScore]

        //     return {
        //         ...state,
        //         reduxAllRecipesCopyHealthScore:
        //             payload === 'A'
        //             ? reduxAllRecipesCopyHealthScoreCopy.sort((a, b) => b.healthScore - a.healthScore)
        //             : reduxAllRecipesCopyHealthScoreCopy.sort((a, b) => a.healthScore - b.healthScore)
        //     }

        default:
            return {
                ...state
            }
    }
}


//__________________________________________________
export default reducer;