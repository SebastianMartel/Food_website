import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'; // removed connect, think it's unnecessary
import { filterAllRecipes } from '../../Redux/actions';


import './NavBar.css';
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import mainLogo from '../../Media/mainLogo.png'
//__________________________________________________


const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
`
//__________________________________________________


export default function NavBar ( { setSearching } ) {


    const dispatch = useDispatch()


    const handleFilter = (event) => {
        dispatch(filterAllRecipes(event.target.value))
    }


    return (
        <div className = "menu">
            <StyledNavLink to = '/home'>
                {/* <h1 className = 'title' onClick = {() => {setSearching(false)}}>N O V A</h1> */}
                <img src = {mainLogo}/>
            </StyledNavLink>
            <SearchBar setSearching = {setSearching}/>
            <select onChange = {(event) => {handleFilter(event)}}>
                    <option disabled hidden>Explore through diets</option>
                    <option value = 'All'>All</option>
                    <option value = 'gluten free'>gluten free</option>
                    <option value = 'dairy free'>dairy free</option>
                    <option value = 'lacto ovo vegetarian'>lacto ovo vegetarian</option>
                    <option value = 'vegan'>vegan</option>
                    <option value = 'paleolithic'>paleolithic</option>
                    <option value = 'primal'>primal</option>
                    <option value = 'whole 30'>whole 30</option>
                    <option value = 'pescatarian'>pescatarian</option>
                    <option value = 'ketogenic'>ketogenic</option>
                    <option value = 'fodmap friendly'>fodmap friendly</option>
                </select>
                <select onChange = {(event) => {handleFilter(event)}}>
                    <option value = '' disabled hidden>Filter by origin</option>
                    <option value = 'DB'>Your own recipes</option>
                    <option value = 'API'>By others</option>
                </select>
            <NavLink to = '/form'>
                <button className = 'createRecipe'>ADD YOUR RECIPE</button>
            </NavLink>
        </div>
    )
}