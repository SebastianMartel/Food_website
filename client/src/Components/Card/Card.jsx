import { NavLink } from "react-router-dom";

import styled from "styled-components";
//__________________________________________________


const StyledCard = styled.div `
    border: 1px solid black;
    width: 312px;
    height: 22rem;
`
//__________________________________________________


export default function Card ( {id, title, image, summary, healthScore, steps, diets} ) {

    return (
        <div>
            <NavLink to = {`/detail/${id}`}>
                <StyledCard>
                    <img src = {image}></img>
                    <p>{title}</p>
                    <p>{diets}</p>
                </StyledCard>
            </NavLink>
        </div>
    )
}