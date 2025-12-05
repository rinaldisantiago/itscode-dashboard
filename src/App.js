import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/Error/Error';
import Users from './components/Users/Users';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import Baneo from './components/Ban/Ban';
import Bienvinida from './components/Bienvenida/Bienvenida';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Editar from './components/Editar/Editar';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element= {<Bienvinida/>} />
          <Route exact path="/login" element= {<Login/>} />
          <Route exact path="/users" element= {<PrivateRoute><Users/></PrivateRoute>}/>
          <Route exact path="/admin" element= {<PrivateRoute><Admin/></PrivateRoute>}/>
          <Route exact path="/ban" element= {<PrivateRoute><Baneo/></PrivateRoute>}/>
          <Route exact path="/edit" element= {<PrivateRoute><Editar/></PrivateRoute>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
