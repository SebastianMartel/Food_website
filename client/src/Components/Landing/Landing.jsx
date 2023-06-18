import { NavLink } from 'react-router-dom';

import './Landing.css';
import styled from 'styled-components';
//__________________________________________________

const StyledNavLink = styled(NavLink)`
    margin: 0;
    padding: 0
`


export default function Landing () {

    return (
        <div className = 'Landing'>
            <h1 className = 'welcome'>Welcome to recipes.com</h1>
            <StyledNavLink to = '/home'>
                <button className = 'mainButton' >S T A R T</button>
            </StyledNavLink>
        </div>
    )
}