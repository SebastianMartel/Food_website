import Card from "../Card/Card";
import styled from "styled-components";

const StyledCardBox = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center
`


export default function CardBox () {
    return (
        <StyledCardBox>
            <Card/>
            <Card/>
            <Card/>
        </StyledCardBox>
    )
}