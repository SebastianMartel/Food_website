import SearchBar from "../SearchBar/SearchBar"
import styled from "styled-components"


const StyledNavBar = styled.div `
    display: flex;
    justify-content: space-between;

    padding: 2rem;
    border: 1px solid black;
`

export default function NavBar () {
    return (
        <StyledNavBar>
            <SearchBar/>
            <h1>NOVA</h1>
            <button>CREATE RECIPE</button>
        </StyledNavBar>
    )
}