import styled from "styled-components";
import Card from "../Card/Card";
//__________________________________________________


const StyledCardBox = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 5rem;

    margin: 50px;
`
//__________________________________________________


export default function CardBox ( { searching, currentAllRecipes, currentSearchResults } ) {


    // handles lowercase and uppercase diets, if comes fron the API, or Diets, if comes from the DB) property.
    // const getDiets = (recipe) => {
    //     const diets = recipe.diets || recipe.Diets || [];
    //     return Array.isArray(diets) ? diets : [diets];
    //   };
    // *NOT NECESSARY FOR NOW.


    if (searching) { // when the user search a recipe, the searching mode activates and the recipes from the 'searchResults' redux state renders...
        return (
            <StyledCardBox>
                {
                    currentSearchResults?.map((recipe, index) => {
                        // const diets = getDiets(recipe); // to handle the lowcase/uppercase matter.
                        return (
                            <Card
                                key = {index}
                                id = {recipe?.id}
                                title = {recipe?.title}
                                summary = {recipe?.summary}
                                image = {recipe?.image}
                                healthScore = {recipe?.healthScore}
                                steps = {recipe?.stepByStep}
                                diets = {recipe?.diets}
                            />
                        )
                    })
                }
            </StyledCardBox>
        )
    }

    if (!searching) { // otherwise, the recipes from allRecipes redux state will render.
        return (
            <StyledCardBox>
                {
                    currentAllRecipes?.map((recipe, index) => {
                        return (
                            <Card
                                key = {index}
                                id = {recipe?.id}
                                title = {recipe?.title}
                                summary = {recipe?.summary}
                                image = {recipe?.image}
                                healthScore = {recipe?.healthScore}
                                steps = {recipe?.stepByStep}
                                diets = {recipe?.diets}
                            />
                        )
                    })
                }
            </StyledCardBox>
        )
    }

};