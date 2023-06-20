import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'; // removed connect, think it's unnecessary
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


        const [showDietsFilter, setShowDietsFilter] = useState(false)

        const [showOriginFilter, setShowOriginFilter] = useState(false)


    const dispatch = useDispatch()


    const handleFilter = (value) => {
        dispatch(filterAllRecipes(value))
    }

    const handleDietsClick = () => {
        setShowDietsFilter(!showDietsFilter);
        setShowOriginFilter(false);
    };

    const handleOriginClick = () => {
        setShowOriginFilter(!showOriginFilter);
        setShowDietsFilter(false);
    };


    return (
        <div className = "menu">
            <StyledNavLink to = '/home'>
                {/* <h1 className = 'title' onClick = {() => {setSearching(false)}}>N O V A</h1> */}
                <img src = {mainLogo} onClick = {() => {setSearching(false)}}/>
            </StyledNavLink>
            <SearchBar setSearching = {setSearching}/>

            <div className = 'selectWrapper'>
                <div className = {`selectLabel ${showDietsFilter ? 'active' : ''}`} onClick = {handleDietsClick}>
                    Explore by diets
                </div>
                {
                    showDietsFilter && (
                        <ul className = 'selectList'>
                            <li value = 'All' onClick = {() => {handleFilter('All')}}>All</li>{/*maybe remove this and only use the one in Show all. Makes no sense having two*/}
                            <li value = 'gluten free' onClick = {() => {handleFilter('gluten free')}}>gluten free</li>
                            <li value = 'dairy free' onClick = {() => {handleFilter('dairy free')}}>dairy free</li>
                            <li value = 'lacto ovo vegetarian' onClick = {() => {handleFilter('lacto ovo vegetarian')}}>lacto ovo vegetarian</li>
                            <li value = 'vegan' onClick = {() => {handleFilter('vegan')}}>vegan</li>
                            <li value = 'paleolithic' onClick = {() => {handleFilter('paleolithic')}}>paleolithic</li>
                            <li value = 'primal' onClick = {() => {handleFilter('primal')}}>primal</li>
                            <li value = 'whole 30' onClick = {() => {handleFilter('whole 30')}}>whole 30</li>
                            <li value = 'pescatarian' onClick = {() => {handleFilter('pescatarian')}}>pescatarian</li>
                            <li value = 'ketogenic' onClick = {() => {handleFilter('ketogenic')}}>ketogenic</li>
                            <li value = 'fodmap friendly' onClick = {() => {handleFilter('fodmap friendly')}}>fodmap friendly</li>
                        </ul>
                    )
                }
            </div>
            <div className = 'selectWrapper'>
                <div className = {`selectLabel ${showOriginFilter ? 'active' : ''}`} onClick = {handleOriginClick}>
                    Explore by creator
                </div>
                {
                    showOriginFilter && (
                        <ul className = 'selectList'>
                            <li value = 'DB' onClick = {() => {handleFilter('DB')}}>Your own recipes</li>
                            <li value = 'API' onClick = {() => {handleFilter('API')}}>By others</li>
                        </ul>
                    )
                }
            </div>
            <NavLink to = '/form'>
                <button className = 'createRecipe'>ADD YOUR RECIPE</button>
            </NavLink>
        </div>
    )
}