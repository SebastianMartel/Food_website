import { NavLink } from "react-router-dom";

import './NavBar.css';
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import log2 from '../../Media/log2.png'
//__________________________________________________


const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
`
//__________________________________________________


export default function NavBar ( { setSearching } ) {

    return (
        <div className = "menu">
            <StyledNavLink to = '/home'>
                {/* <h1 className = 'title' onClick = {() => {setSearching(false)}}>N O V A</h1> */}
                <img src = {log2}/>
            </StyledNavLink>
            <SearchBar setSearching = {setSearching}/>
            <NavLink to = '/form'>
                <button className = 'createRecipe'>ADD YOUR RECIPE</button>
            </NavLink>
        </div>
    )
}