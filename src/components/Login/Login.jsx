import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/AuthService';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validación de campos
      if (!userName.trim() || !password.trim()) {
        setError('Usuario y contraseña son obligatorios');
        setLoading(false);
        return;
      }

      // Llamar al servicio de autenticación
      const response = await AuthService.login(userName, password);

      if (response.user) {
        // Guardar usuario en el contexto junto con su ID
        login(response.user, response.user.id);

        // Redirigir al dashboard/admin
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login-container">
      <div className="login-wrapper">
        <Card className="login-card">
          <Card.Body>
            <h2 className="login-title">Dashboard Admin</h2>
            <p className="login-subtitle">Inicia sesión para continuar</p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
