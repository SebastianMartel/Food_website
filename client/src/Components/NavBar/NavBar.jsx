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


export default function NavBar ( { setSearching } ) {

    return (
        <StyledNavBar>
            <SearchBar setSearching = {setSearching}/>
            <NavLink to = '/home'>
                <h1 onClick = {() => {setSearching(false)}}>recipes</h1>
            </NavLink>
            <NavLink to = '/form'>
                <button>CREATE RECIPE</button>
            </NavLink>
        </StyledNavBar>
    )
}