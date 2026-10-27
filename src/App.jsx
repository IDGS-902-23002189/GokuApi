
import { Navigate, NavLink, Route, Routes } from "react-router-dom";

import { useAuth } from "./auth/AuthContext";
import RutaPrivada from "./auth/RutaPrivada";

import Login from "./pages/Login";
import Personajes from "./pages/Personajes";
import PersonajeDetalle from "./pages/PersonajeDetalle";
import Favoritos from "./pages/Favoritos";
import NotFound from "./pages/NotFound";
import "./styles/NavBar.css";
import "./styles/BarraBusqueda.css";
import "./styles/FilterBar.css";
import "./styles/LanguageCard.css";
import "./styles/global.css";

function App() {
  const { autenticado, usuario, logout } = useAuth();

  return (
    <div className="app-container">
      
{autenticado && (
  <nav className="navbar">
    <NavLink to="/personajes" className="navbar-link">
      Inicio
    </NavLink>

    <NavLink to="/favoritos" className="navbar-link">
      Favoritos
    </NavLink>

    <span className="navbar-user">
      Hola, {usuario}
    </span>

    <button
      type="button"
      className="navbar-logout"
      onClick={logout}
    >
      Cerrar sesión
    </button>
  </nav>
)}

      <Routes>
        {/* Redirigir según el estado de la sesión */}
        <Route
          path="/"
          element={
            <Navigate
              to={autenticado ? "/personajes" : "/login"}
              replace
            />
          }
        />

        {/* Inicio de sesión */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Catálogo de personajes */}
        <Route
          path="/personajes"
          element={
            <RutaPrivada>
              <Personajes />
            </RutaPrivada>
          }
        />

        {/* Detalles de un personaje */}
        <Route
          path="/personaje/:id"
          element={
            <RutaPrivada>
              <PersonajeDetalle />
            </RutaPrivada>
          }
        />

        {/* Favoritos */}
        <Route
          path="/favoritos"
          element={
            <RutaPrivada>
              <Favoritos />
            </RutaPrivada>
          }
        />

        {/* Ruta inexistente */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
