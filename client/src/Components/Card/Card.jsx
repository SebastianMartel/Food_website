import styled from "styled-components";


const StyledCard = styled.div `
    border: 1px solid black;
    padding: 10rem;
`


export default function Card () {
    return (
        <div>
            <StyledCard>Card</StyledCard>
        </div>
    )
}