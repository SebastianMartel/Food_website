import { useState } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import './Card.css'
//__________________________________________________


const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black
`

//__________________________________________________


export default function Card ( {id, title, image, summary, healthScore, steps, diets} ) {

    return (
        <div>
            <StyledNavLink to = {`/detail/${id}`}>
                <div className = 'card'>
                    <div className = 'cardImage'>
                        <img src = {image} alt = {title} style = {{borderRadius : '0 0 10px 10px'}}/>
                    </div>
                    <div className = 'cardInner'>
                        <div className = 'diets'>
                            {
                                diets.map((diet) => <p class = 'diet'>{diet}</p>)
                            }
                        </div>
                    </div>
                    <p className = 'cardTitle'>{title}</p>
                </div>
            </StyledNavLink>
        </div>
    );
  }