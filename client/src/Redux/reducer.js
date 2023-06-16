import { ALL_RECIPES ,FILTER, SORT } from "./actions";
//__________________________________________________


    const initialState = {
        reduxAllRecipes: [],
        reduxAllRecipesCopy: [],
        filterCriteria: "All",
    };


const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ALL_RECIPES:
            return {
                ...state,
                reduxAllRecipes: payload,
                reduxAllRecipesCopy: payload,
            };

        case SORT:
            const reduxAllRecipesCopyOrder = [...state.reduxAllRecipesCopy];
            let sortedRecipes;

            if (payload === "A") {
                sortedRecipes = reduxAllRecipesCopyOrder.sort((a, b) =>a.title.localeCompare(b.title));
            } else if (payload === "B") {
                sortedRecipes = reduxAllRecipesCopyOrder.sort((a, b) =>b.title.localeCompare(a.title));
            } else if (payload === "C") {
                sortedRecipes = reduxAllRecipesCopyOrder.sort((a, b) => b.healthScore - a.healthScore);
            } else if (payload === "D") {
                sortedRecipes = reduxAllRecipesCopyOrder.sort((a, b) => a.healthScore - b.healthScore);
            } else {
                sortedRecipes = reduxAllRecipesCopyOrder;
            }

            let filteredRecipes = sortedRecipes;

            if (state.filterCriteria !== "All") {
                if (state.filterCriteria === "API") {
                    filteredRecipes = sortedRecipes.filter((recipe) => typeof recipe.id === "number");

                } else if (state.filterCriteria === "DB") {
                    filteredRecipes = sortedRecipes.filter((recipe) => typeof recipe.id === "string");

                } else {
                    filteredRecipes = sortedRecipes.filter((recipe) =>recipe.diets.includes(state.filterCriteria));
                }
            }

            return {
                ...state,
                reduxAllRecipes: filteredRecipes,
            };

        case FILTER:
            let filterCriteria = payload;
            let filterRecipes = [...state.reduxAllRecipesCopy];

            if (payload === "All") {
                filterRecipes = state.reduxAllRecipesCopy;
            } else if (payload === "API") {
                filterRecipes = state.reduxAllRecipesCopy.filter((recipe) => typeof recipe.id === "number");
            } else if (payload === "DB") {
                filterRecipes = state.reduxAllRecipesCopy.filter((recipe) => typeof recipe.id === "string");
            } else {
                filterRecipes = state.reduxAllRecipesCopy.filter((recipe) =>recipe.diets?.includes(payload));
            }

            return {
                ...state,
                reduxAllRecipes: filterRecipes,
                filterCriteria,
            };

        default:
            return state;
    }
};



//       const initialState = {
//         reduxAllRecipes : [],
//         reduxAllRecipesCopy: []
//     }


// const reducer = (state = initialState, { type, payload }) => {

//     switch (type) {

//         case ALL_RECIPES:
//             return {
//                 ...state,
//                 reduxAllRecipes: payload,
//                 reduxAllRecipesCopy: payload,
//             }

//         case SORT:
//             const reduxAllRecipesCopyOrder = [...state.reduxAllRecipesCopy];

//             switch (payload) {
//                 case 'A':
//                 return {
//                     ...state,
//                     reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => a.title.localeCompare(b.title))
//                 }
//                 case 'B':
//                     return {
//                         ...state,
//                         reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => b.title.localeCompare(a.title))
//                     }
//                 case 'C':
//                     return {
//                         ...state,
//                         reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => b.healthScore - a.healthScore)
//                     }
//                 case 'D':
//                     return {
//                         ...state,
//                         reduxAllRecipes: reduxAllRecipesCopyOrder.sort((a, b) => a.healthScore - b.healthScore)
//                     }
//                 default:
//                     return {
//                         ...state,
//                     }
//             }

//         case FILTER:

//             const reduxAllRecipesCopyFilterDiet = [...state.reduxAllRecipesCopy].filter((recipe) => recipe.diets.includes(payload)) // recipes.diets is an array.

//             const reduxAllRecipesCopyFilterOriginAPI = [...state.reduxAllRecipesCopy].filter((recipe) => typeof(recipe.id) === 'number') // recipe ID from API is a NUMBER.

//             const reduxAllRecipesCopyFilterOriginDB = [...state.reduxAllRecipesCopy].filter((recipe) => typeof(recipe.id) === 'string') // recipe ID from DB is a STRING.

//             switch (payload) {
//                 case 'All':
//                     return {
//                         ...state,
//                         reduxAllRecipes: [...state.reduxAllRecipesCopy]
//                     }
//                 case 'API':
//                     return {
//                         ...state,
//                         reduxAllRecipes: reduxAllRecipesCopyFilterOriginAPI
//                     }
//                 case 'DB':
//                     return {
//                         ...state,
//                         reduxAllRecipes: reduxAllRecipesCopyFilterOriginDB
//                     }
//                 default:
//                     return {
//                         ...state,
//                         reduxAllRecipes: reduxAllRecipesCopyFilterDiet
//                     }
//             }
//         default:
//             return {
//                 ...state
//             }
//     }
// }



//__________________________________________________
export default reducer;