
import { createContext, useContext, useReducer, useEffect } from "react";

const estadoInicial = {
  usuario: null,
  autenticado: false,
};

function authReducer(estado, accion) {
  switch (accion.type) {
    case "LOGIN":
      return {
        usuario: accion.payload,
        autenticado: true,
      };

    case "LOGOUT":
      return estadoInicial;

    default:
      return estado;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [estado, dispatch] = useReducer(authReducer, estadoInicial);

  // Recuperar la sesión guardada al iniciar la aplicación
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      dispatch({
        type: "LOGIN",
        payload: usuarioGuardado,
      });
    }
  }, []);

  function login(usuario) {
    localStorage.setItem("usuario", usuario);

    dispatch({
      type: "LOGIN",
      payload: usuario,
    });
  }

  function logout() {
    localStorage.removeItem("usuario");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        ...estado,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
