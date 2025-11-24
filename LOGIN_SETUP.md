# Implementación de Login - Guía de Configuración

## ✅ Archivos Creados

He creado los siguientes archivos para implementar el sistema de login:

### 1. **AuthContext.jsx** (`src/context/AuthContext.jsx`)
- Contexto global para manejar el estado de autenticación
- Funciones: `login()`, `logout()`, `setToken()`, `getToken()`
- Hook personalizado: `useAuth()` para acceder al contexto desde cualquier componente

### 2. **AuthService.js** (`src/services/AuthService.js`)
- Servicio para conectar con la API de login
- Realiza solicitudes POST al endpoint `/api/auth/login`
- Maneja errores y valida respuestas

### 3. **Login.jsx** (`src/components/Login/Login.jsx`)
- Componente de formulario de login
- Campos: usuario y contraseña
- Validación de campos antes de enviar
- Redirige a `/admin` después del login exitoso
- Manejo de errores con alertas visuales

### 4. **Login.css** (`src/components/Login/Login.css`)
- Estilos profesionales para el formulario
- Gradiente de fondo atractivo
- Diseño responsive

### 5. **PrivateRoute.jsx** (`src/components/PrivateRoute/PrivateRoute.jsx`)
- Componente para proteger rutas que requieren autenticación
- Redirige a `/login` si el usuario no está autenticado

### 6. **NavBar.jsx** (Actualizado)
- Muestra el nombre de usuario cuando está autenticado
- Botón "Cerrar Sesión" para logout
- Link a login cuando no está autenticado

## 🔧 Configuración Necesaria

### 1. Crea un archivo `.env` en la raíz del proyecto

```
REACT_APP_API_URL=http://localhost:5000
```

Reemplaza la URL con la dirección de tu backend.

### 2. Actualiza las rutas en `App.js` (✅ Ya hecho)

Las rutas `/users` y `/admin` ya están protegidas con `PrivateRoute`.

## 📋 Flujo de Autenticación

```
1. Usuario accede a /login
2. Ingresa usuario y contraseña
3. Se valida que los campos no estén vacíos
4. Se envía solicitud POST a /api/auth/login
5. Si rol es ADMIN:
   ✅ Se guarda el usuario en contexto
   ✅ Se guarda el token en localStorage
   ✅ Se redirige a /admin
6. Si no es ADMIN o hay error:
   ❌ Se muestra mensaje de error
```

## 📌 Notas Importantes

### Validación de Rol Admin
- La API ya valida que `isLoginDashboard = true` y `user.Role.Id = Admin`
- El componente de login automáticamente envía `isLoginDashboard: true`

### Persistencia de Sesión
- El token y usuario se guardan en `localStorage`
- La sesión se mantiene activa incluso si recargas la página
- Se limpia al hacer logout

### Manejo de Errores
- Si el usuario está baneado: muestra el mensaje de razón
- Si las credenciales son inválidas: muestra error
- Si no es admin: muestra "Acceso denegado"

## 🚀 Cómo Usar

1. **Accede a la ruta de login:**
   ```
   http://localhost:3000/login
   ```

2. **Ingresa credenciales de admin:**
   - Usuario: (tu usuario admin)
   - Contraseña: (tu contraseña)

3. **Acceso a rutas protegidas:**
   - `/admin` - Protegida, solo para autenticados
   - `/users` - Protegida, solo para autenticados
   - `/` - Pública

## 🔐 Seguridad

- ✅ Validación de campos en el cliente
- ✅ Validación de rol en el servidor
- ✅ Token guardado de forma segura
- ✅ Rutas protegidas con PrivateRoute
- ✅ Logout limpia localStorage

## ⚠️ Si Necesitas Ajustar

- **URL de API:** Modifica `REACT_APP_API_URL` en `.env`
- **Campos del formulario:** Edita `src/components/Login/Login.jsx`
- **Estilos:** Personaliza `src/components/Login/Login.css`
- **Lógica de redirección:** Cambia `navigate('/admin')` por la ruta deseada

¡Listo! El sistema de login está completamente implementado. 🎉
