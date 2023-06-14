import { Route, Routes, useLocation } from 'react-router-dom';


import './App.css';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Form from './Components/Form/Form';

function App () {
    
    const { pathname } = useLocation()

    return (
        <div className="App">
            {
                pathname !== '/' && <NavBar/>
            }
            <Routes>
                <Route path = '/' element = { <Landing/> }/>
                <Route path = '/home' element = { <Home/> }/>
                <Route path = '/form' element = { <Form/> }/>
            </Routes>
        </div>
    );
}

export default App;