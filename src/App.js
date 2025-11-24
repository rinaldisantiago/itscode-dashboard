import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/Error/Error';
import Users from './components/Users/Users';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import Bienvinida from './components/Bienvenida/bienvenida';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='App'>
          <NavBar></NavBar>
        </div>
        <Routes>
          <Route exact path="/" element= {<Bienvinida/>} />
          <Route exact path="/login" element= {<Login/>} />
          <Route exact path="/home" element= {<PrivateRoute><Home/></PrivateRoute>} />
          <Route exact path="/users" element= {<PrivateRoute><Users/></PrivateRoute>}/>
          <Route exact path="/admin" element= {<PrivateRoute><Admin/></PrivateRoute>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
