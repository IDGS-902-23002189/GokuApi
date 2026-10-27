
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, autenticado } = useAuth();
  const navigate = useNavigate();

  // Si ya inició sesión, ir al catálogo
  if (autenticado) {
    return <Navigate to="/personajes" replace />;
  }

  function iniciarSesion(evento) {
    evento.preventDefault();
    setError("");

    // Validar usuario y contraseña
    if (usuario === "Admin" && password === "Admin") {
      login(usuario);
      navigate("/personajes", { replace: true });
    } else {
      setError("Esta mal, no ves que es Admin?! TONTUELO");
    }
  }

  return (
    <main className="login-container">
      <h1>Iniciar sesión</h1>
      <p>Ingresa tus datos para explorar Rick y Morty.</p>

      <form onSubmit={iniciarSesion}>
        <div>
          <label htmlFor="usuario">Usuario: Admin</label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(evento) => {
              setUsuario(evento.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:Admin </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(evento) => {
              setPassword(evento.target.value);
              setError("");
            }}
            required
          />
        </div>

        {error && (
          <p className="no-results" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
