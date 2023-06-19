import { NavLink } from "react-router-dom";

import './NavBar.css';
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
//__________________________________________________


const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
`
//__________________________________________________


export default function NavBar ( { setSearching } ) {

    return (
        <div className = "menu">
            <SearchBar setSearching = {setSearching}/>
            <StyledNavLink to = '/home'>
                <h1 className = 'title' onClick = {() => {setSearching(false)}}>N O V A</h1>
            </StyledNavLink>
            <NavLink to = '/form'>
                <button>CREATE RECIPE</button>
            </NavLink>
        </div>
    )
}