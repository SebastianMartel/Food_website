import { NavLink } from 'react-router-dom'


export default function Landing () {

    return (
        <>
            <h1>LANDING</h1>
            <NavLink to = '/home'>
                <button >Start</button>
            </NavLink>
        </>
    )
}