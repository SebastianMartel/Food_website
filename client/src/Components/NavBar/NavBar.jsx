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


export default function NavBar ( { getRecipeByName, setOnlyRecipes } ) {

    return (
        <StyledNavBar>
            <SearchBar getRecipeByName = {getRecipeByName}/>
            <NavLink to = '/home'>
                <h1 onClick = {() => setOnlyRecipes(false)}>NOVA</h1>
            </NavLink>
            <NavLink to = '/form'>
                <button>CREATE RECIPE</button>
            </NavLink>
        </StyledNavBar>
    )
}