import styled from 'styled-components'

import CardBox from "../Cardbox/Cardbox"


const Headline = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20rem;

    padding: 1rem;
`


export default function Home () {

    return (
        <>
            <Headline>
                <h1>HOME</h1>
                <button>FILTER</button>
            </Headline>

            <CardBox/>
        </>
    )
}