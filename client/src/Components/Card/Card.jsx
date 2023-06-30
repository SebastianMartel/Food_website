import { NavLink } from "react-router-dom";

import './Card.css'
//__________________________________________________


export default function Card ( {id, title, image, summary, healthScore, steps, diets} ) {

    return (
        <div>
            <NavLink to = {`/detail/${id}`} style = {{textDecoration: 'none', color: 'black'}}>
                <div className = 'card'>
                    <div className = 'cardImage'>
                        <img src = {image} alt = {title} style = {{borderRadius : '0 0 10px 10px'}}/>
                    </div>
                    <div className = 'cardInner'> {/*This will be displayed on hover*/}
                        <div className = 'diets'>
                            {
                                diets?.map((diet, index) => <p key = {index} class = 'diet'>{diet}</p>)
                            }
                        </div>
                    </div>
                    <p className = 'cardTitle'>{title}</p>
                </div>
            </NavLink>
        </div>
    );
  }