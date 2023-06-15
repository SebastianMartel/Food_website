import Card from "../Card/Card";
import styled from "styled-components";

const StyledCardBox = styled.div `
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;;
    justify-content: space-evenly;
    gap: 3rem;

    margin: 50px;
`


export default function CardBox ( { recipes } ) {
    
    return (
        <StyledCardBox>
            {
                recipes?.map((recipe) => {
                    return (
                        <Card
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