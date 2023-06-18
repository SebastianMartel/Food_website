import { ALL_RECIPES, SEARCH, FILTER, SORT } from "./actions";
//__________________________________________________


    const initialState = {
        allRecipes: [],
        allRecipesCopy: [],
        searchResults: [],
        searchResultsCopy: [],
    };


const reducer = (state = initialState, { type, payload }) => {

    let sortedRecipes;
    let sortedSearchResults;

    switch (type) {
        case ALL_RECIPES:
            return {
                ...state,
                allRecipes: payload,
                allRecipesCopy: payload,
            };
    //__________________________________________________
        case SEARCH:
            return {
                ...state,
                searchResults: [...payload],
                searchResultsCopy: [...payload],
            };
    //__________________________________________________
        case SORT:
            sortedRecipes = [...state.allRecipes];
            sortedSearchResults = [...state.searchResults];

            if (payload === "A") {
                sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
                sortedSearchResults.sort((a, b) => a.title.localeCompare(b.title));
            } else if (payload === "B") {
                sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
                sortedSearchResults.sort((a, b) => b.title.localeCompare(a.title));
            } else if (payload === "C") {
                sortedRecipes.sort((a, b) => b.healthScore - a.healthScore);
                sortedSearchResults.sort((a, b) => b.healthScore - a.healthScore);
            } else if (payload === "D") {
                sortedRecipes.sort((a, b) => a.healthScore - b.healthScore);
                sortedSearchResults.sort((a, b) => a.healthScore - b.healthScore);
            }

            return {
                ...state,
                allRecipes: sortedRecipes,
                searchResults: sortedSearchResults,
            };
    //__________________________________________________
        case FILTER:
            const filterCriteria = payload;
            let filteredRecipes = [...state.allRecipesCopy];
            let filteredSearchResults = [...state.searchResultsCopy];

            if (filterCriteria !== "All") {
                filteredRecipes = state.allRecipesCopy.filter((recipe) => {
                    if (filterCriteria === "API") {
                        return typeof recipe.id === "number";
                    } else if (filterCriteria === "DB") {
                        return typeof recipe.id === "string";
                    } else {
                        return recipe.diets?.includes(filterCriteria);
                    }
                });

                filteredSearchResults = state.searchResultsCopy.filter((recipe) => {
                    if (filterCriteria === "API") {
                        return typeof recipe.id === "number";
                    } else if (filterCriteria === "DB") {
                        return typeof recipe.id === "string";
                    } else {
                        return recipe.diets?.includes(filterCriteria);
                    }
                });
            }

            sortedRecipes = [...filteredRecipes];
            sortedSearchResults = [...filteredSearchResults];

            if (payload === "A") {
                sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
                sortedSearchResults.sort((a, b) => a.title.localeCompare(b.title));
            } else if (payload === "B") {
                sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
                sortedSearchResults.sort((a, b) => b.title.localeCompare(a.title));
            } else if (payload === "C") {
                sortedRecipes.sort((a, b) => b.healthScore - a.healthScore);
                sortedSearchResults.sort((a, b) => b.healthScore - a.healthScore);
            } else if (payload === "D") {
                sortedRecipes.sort((a, b) => a.healthScore - b.healthScore);
                sortedSearchResults.sort((a, b) => a.healthScore - b.healthScore);
            }

            return {
                ...state,
                allRecipes: sortedRecipes,
                searchResults: sortedSearchResults,
            };
    //__________________________________________________
        default:
            return state;
    }
};


//__________________________________________________
export default reducer;



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
// export default reducer;