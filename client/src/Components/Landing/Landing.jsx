import { NavLink } from 'react-router-dom';

import './Landing.css';
import styled from 'styled-components';
//__________________________________________________


const StyledNavLink = styled(NavLink)`
    margin: 0;
    padding: 0
`


//__________________________________________________


export default function Landing () {

    return (
        <div className = 'Landing'>
            <h1 className = 'welcome'>Welcome</h1>
            <h1 className = 'welcome'>to</h1>
            <h1 className = 'websiteTitle'>N O V A . S P I C E</h1>
            <StyledNavLink to = '/home'>
                <button className = 'mainButton' >S T A R T</button>
            </StyledNavLink>
        </div>
    )
}