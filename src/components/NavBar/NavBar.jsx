import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  // Leemos directamente de localStorage para saber si el usuario está autenticado.
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isAuthenticated = !!user;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link><Link to={"/users"}>User</Link></Nav.Link>
                <Nav.Link><Link to={"/admin"}>Admin</Link></Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <span className="nav-text me-3">Bienvenido, {user?.userName}</span>
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Nav.Link><Link to={"/login"}>Iniciar Sesión</Link></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;