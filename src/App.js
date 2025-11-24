import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/Error/Error';
import Users from './components/Users/Users';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar></NavBar>
      </div>
      <Routes>
        <Route exact path="/" element= {<Login/>} />
        <Route exact path="/login" element= {<Login/>} />
        <Route exact path="/users" element= {<PrivateRoute><Users/></PrivateRoute>}/>
        <Route exact path="/admin" element= {<PrivateRoute><Admin/></PrivateRoute>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
