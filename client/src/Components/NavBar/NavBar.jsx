import { NavLink } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import styled from "styled-components";
//__________________________________________________


const StyledNavBar = styled.div `
    display: flex;
    justify-content: space-between;

    padding: 2rem;
    border: 1px solid black;
`
//__________________________________________________


export default function NavBar ( { getRecipeByName } ) {

    return (
        <StyledNavBar>
            <SearchBar getRecipeByName = {getRecipeByName}/>
            <h1>NOVA</h1>
            <NavLink to = '/form'>
                <button>CREATE RECIPE</button>
            </NavLink>
        </StyledNavBar>
    )
}