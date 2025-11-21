import './App.css';
import NavBar from './components/NavBar/NavBar';
import Paginado from './components/Paginador/Paginador';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import Users from './components/Users/Users';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar></NavBar>
        <Paginado></Paginado>
      </div>
      <Routes>
        <Route exact path="/" element= {<Home/>} />
        <Route exact path="/users" element= {<Users/>}/>
        <Route exact path="/admin" element= {<Admin/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
