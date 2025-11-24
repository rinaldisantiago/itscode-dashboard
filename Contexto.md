# 🚀 Contexto del Proyecto Frontend (React)

Este proyecto es una aplicación web frontend construida con **React** y *bootstrapped* con **Create React App**. Utiliza **React Router DOM** para la navegación entre páginas y **React-Bootstrap** junto con **Bootstrap** para el diseño y componentes de interfaz de usuario.

---

## 📦 Tecnologías y Dependencias Clave

El archivo `package.json` revela las siguientes dependencias principales:

| Categoría | Dependencia | Versión | Descripción |
| :--- | :--- | :--- | :--- |
| **Núcleo React** | `react`, `react-dom` | ^19.1.1 | Bibliotecas fundamentales de React. |
| **Enrutamiento** | `react-router-dom` | ^7.9.5 | Maneja la navegación y las rutas de la aplicación. |
| **Estilos/UI** | `bootstrap`, `react-bootstrap` | ^5.3.8, ^2.10.10 | Framework de CSS popular y sus componentes adaptados para React. |
| **Testing** | `@testing-library/react`, etc. | (varias) | Herramientas para pruebas de la aplicación. |
| **Scripts** | `react-scripts` | 5.0.1 | Maneja los scripts estándar (start, build, test, eject). |

---

## 🗺️ Estructura y Navegación de la Aplicación

La aplicación define un **enrutamiento** a través del componente principal `src/App.js` utilizando `<BrowserRouter>` y `<Routes>`.

* **Ruta Principal (`/`)**: Muestra el componente `<Home/>`.
* **Ruta Usuarios (`/users`)**: Muestra el componente `<Users/>`. Esta es la página más funcional, donde se gestiona la obtención de datos de usuarios.
* **Ruta Admin (`/admin`)**: Muestra el componente `<Admin/>`.
* **Ruta de Error (`*`)**: Captura cualquier otra ruta no definida y muestra el componente `<Error/>` ("Oh... pagina no encontrada").

Todos los componentes de ruta están envueltos por el componente **`<NavBar>`**, que utiliza componentes de React-Bootstrap para proporcionar enlaces de navegación a las páginas `/users` y `/admin`.

---

## ⚛️ Componentes Reutilizables

Se han definido varios componentes de presentación y utilidad en la carpeta `src/components`:

* **`<Button/>`**: Componente simple de botón estilizado con una clase `.button` y que acepta una función de *callback* (`onClick`).
* **`<Label/>`**: Componente simple para mostrar texto.
* **`<Paginador/>`**: Componente que implementa un contador de página con botones "Anterior" y "Siguiente", limitado entre 1 y 10. (No utilizado en las rutas principales, pero definido).
* **`<Table/>`**: Componente de clase que renderiza un ejemplo de tabla HTML con clases de Bootstrap. (No utilizado en las rutas principales, pero definido).

---

## 🌐 Funcionalidad de Usuarios (`src/components/Users/Users.jsx`)

La página de **Usuarios** es donde ocurre la lógica de manejo de datos de forma dinámica:

1.  **Estados Locales**: Gestiona el `query` de búsqueda, el `pageNumber` (página actual) y el *array* de `users`.
2.  **Lógica de Paginación**: Las funciones `anterior()` y `siguiente()` modifican el `pageNumber` (limitado entre 1 y 10).
3.  **Búsqueda**: La función `find` captura la entrada del usuario en el `<input>` y actualiza el estado `query`.
4.  **Obtención de Datos (`fetchData`)**: Realiza la solicitud HTTP.
    * **Endpoint de API**: `http://localhost:5052/User/${pageNumber}/5/1?query=${query}`.
5.  **Efecto Secundario (`useEffect`)**: La función `fetchData` se ejecuta cada vez que cambia el `pageNumber` o el `query`, asegurando que la tabla de usuarios se actualice dinámicamente.
6.  **Estructura de la Tabla**: Se renderiza una tabla que muestra los campos `ID`, `Nombre de Usuario` y una columna de `Acciones`.

---

## 📝 Licencia y Scripts

* **Licencia**: El proyecto está bajo la **Licencia MIT**. El copyright pertenece a **Santiago Tomas Rinaldi** (2025).
* **Scripts de NPM**: El proyecto soporta los comandos estándar:
    * `npm start`: Ejecuta la aplicación en modo desarrollo.
    * `npm test`: Lanza el corredor de pruebas.
    * `npm run build`: Compila la aplicación para producción.
    * `npm run eject`: Expulsa la configuración de Create React App (operación de un solo sentido).