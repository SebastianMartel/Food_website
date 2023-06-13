import { Route, Routes, useLocation } from 'react-router-dom';


import './App.css';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';


function App () {
    
    const { pathname } = useLocation()

    return (
        <div className="App">
            <Routes>
                <Route path = '/' element = { <Landing/> }/>
                <Route path = '/home' element = { <Home/> }/>
            </Routes>
        </div>
    );
}

export default App;