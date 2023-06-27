import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { filterAllRecipes } from '../../Redux/actions';


import './NavBar.css';
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";
import mainLogo from '../../Media/mainLogo.png';
//__________________________________________________


const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
`


//__________________________________________________


export default function NavBar ( { setSearching } ) {


    const dispatch = useDispatch()


    const handleFilter = (value) => {
        dispatch(filterAllRecipes(value)) // uses the imported action to dispatch it with the respective value, making it possible to filter the recipes.
    }


    return (
        <div className = "menu">
            <StyledNavLink to = '/home'>
                <img src = {mainLogo} alt = 'NOVA logo' onClick = {() => {setSearching(false)}}/>
            </StyledNavLink>
            <SearchBar setSearching = {setSearching}/>

            {/* BY DIETS */}
            <div className = 'selectWrapperFilter'>
                <div className = 'selectLabelFilter'>
                    EXPLORE BY DIETS
                </div>
                <ul className = 'selectListFilter'>
                    <li onClick = {() => {handleFilter('All')}}>All</li>
                    <li onClick = {() => {handleFilter('gluten free')}}>Gluten free</li>
                    <li onClick = {() => {handleFilter('dairy free')}}>Dairy free</li>
                    <li onClick = {() => {handleFilter('lacto ovo vegetarian')}}>Lacto ovo vegetarian</li>
                    <li onClick = {() => {handleFilter('vegan')}}>Vegan</li>
                    <li onClick = {() => {handleFilter('paleolithic')}}>Paleolithic</li>
                    <li onClick = {() => {handleFilter('primal')}}>Primal</li>
                    <li onClick = {() => {handleFilter('whole 30')}}>Whole 30</li>
                    <li onClick = {() => {handleFilter('pescatarian')}}>Pescatarian</li>
                    <li onClick = {() => {handleFilter('ketogenic')}}>Ketogenic</li>
                    <li onClick = {() => {handleFilter('fodmap friendly')}}>Fodmap friendly</li>
                </ul>
            </div>

            {/* BY ORIGIN */}
            <div className = 'selectWrapperFilter'>
                <div className = 'selectLabelFilter'>
                    EXPLORE BY CREATOR
                </div>
                <ul className = 'selectListFilter'>
                    <li onClick = {() => {handleFilter('All')}}>Both</li>
                    <li onClick = {() => {handleFilter('DB')}}>Your own recipes</li>
                    <li onClick = {() => {handleFilter('API')}}>By others</li>
                </ul>
            </div>

            {/*FORM LINK*/}
            <NavLink to = '/form'>
                <button className = 'createRecipe'>POST YOUR RECIPE</button>
            </NavLink>
        </div>
    )
}