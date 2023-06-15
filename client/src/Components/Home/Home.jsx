import styled from 'styled-components'
import CardBox from "../Cardbox/Cardbox"
//__________________________________________________


const Headline = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20rem;

    padding: 1rem;
`
//__________________________________________________


export default function Home ( { recipes } ) {

    return (
        <div>
            <Headline>
                <h1>HOME</h1>
                <button>FILTER</button>
            </Headline>

            <CardBox recipes = {recipes}/>
        </div>
    )
}