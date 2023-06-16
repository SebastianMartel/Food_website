import { ALL_RECIPES ,FILTER, SORT } from "./actions";
//__________________________________________________


    const initialState = {
        reduxAllRecipes : [],
        reduxAllRecipesCopy: []
    }


const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case ALL_RECIPES:
            return {
                ...state,
                reduxAllRecipes: payload,
                reduxAllRecipesCopy: payload,
            }

        case SORT:
            const reduxAllRecipesCopyOrder = [...state.reduxAllRecipesCopy];

            switch (payload) {
                case 'A':
                return {
                    ...state,
                    reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => a.title.localeCompare(b.title))
                }
                case 'B':
                    return {
                        ...state,
                        reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => b.title.localeCompare(a.title))
                    }
                case 'C':
                    return {
                        ...state,
                        reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => b.healthScore - a.healthScore)
                    }
                case 'D':
                    return {
                        ...state,
                        reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => a.healthScore - b.healthScore)
                    }
                default:
                    return {
                        ...state,
                    }
            }

        case FILTER:
            const reduxAllRecipesCopyFilter = state.reduxAllRecipesCopy.filter((recipe) => recipe.diets.includes(payload)); // recipes.diets is an array.

            return {
                ...state,
                reduxAllRecipes:
                payload === 'All'
                ? [...state.reduxAllRecipesCopy]
                : reduxAllRecipesCopyFilter
            }

            // const reduxAllRecipesCopyFilter = [...state.reduxAllRecipesCopy].filter((recipe) => recipe.diets.includes(payload))
            // switch (payload) {
            //     case 'All':
            //         return {
            //             ...state,
            //         }
            //     default:
            //         return {
            //             ...state,
            //             reduxAllRecipesCopy: reduxAllRecipesCopyFilter
            //         }
            // }

        default:
            return {
                ...state
            }
    }
}


//__________________________________________________
export default reducer;