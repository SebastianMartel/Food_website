import { ALL_RECIPES, SEARCH, FILTER, SORT, ERROR, RESET_ERROR } from "./actions";
//__________________________________________________


    const initialState = {
        allRecipes: [],
        allRecipesCopy: [],
        searchResults: [],
        searchResultsCopy: [],
        error: null
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
        case ERROR:
            return {
                ...state,
                error: 'No match'
            }
    //__________________________________________________
        case RESET_ERROR:
            return {
                ...state,
                error: null
            }
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
