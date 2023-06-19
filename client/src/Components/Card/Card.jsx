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

                    {/* <div style = {{border : '1px solid black', height : '231px', width: '312px'}}></div> */}
                    <img src={image} alt={title} />
                    <p className = 'cardTitle'>{title}</p>

                    <div className = 'cardInner'>
                        <div className = 'diets'>
                            {
                                diets.map((diet) => {
                                    return (
                                        <p class = 'diet'>{diet}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </StyledNavLink>
        </div>
    );
  }