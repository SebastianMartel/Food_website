import styled from "styled-components";
import { NavLink } from "react-router-dom";


const StyledCard = styled.div `
    border: 1px solid black;
    width: 20rem;
    height: 22rem;
`


export default function Card ( {id, title, image, summary, healthScore, steps, diets} ) {

    return (
        <div>
            <NavLink to = {`detail/${id}`}>
                <StyledCard>
                    <img src = {image}></img>
                    <p>{title}</p>
                    <p>{diets}</p>
                </StyledCard>
            </NavLink>
        </div>
    )
}