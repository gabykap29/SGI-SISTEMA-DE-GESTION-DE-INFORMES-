import { createContext, useState, useEffect } from "react";
import { login } from "../services/login.js";
// Crear un contexto de autenticación
export const AuthContext = createContext({});

// Proveedor de contexto para la autenticación
export const AuthContextProvider = ({ children }) => {
  // Estado para almacenar el token de autenticación, inicializado desde el almacenamiento local
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Efecto secundario que se ejecuta cuando el token cambia
  useEffect(() => {
    // Si no hay un token, no hacer nada
    if (!token) return;

    // Almacenar el token en el almacenamiento local
    localStorage.setItem("token", token);
  }, [token]);

  // Función para iniciar sesión
  const loginUser = async ({ username, password }) => {
    try {
      // Llamar a la función de inicio de sesión (podría ser una solicitud a un servidor)
      const resp = await login({ username, password });

      // Establecer el nuevo token en el estado
      setToken(resp.token);
    } catch (error) {
      // Manejar errores durante el inicio de sesión
      console.log("error on loginUser");
      console.log(error.errors || error);
      throw error.errors || error.message || error;
    }
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    try {
      // Limpiar el token y eliminarlo del almacenamiento local
      setToken(null);
      localStorage.removeItem("token");
    } catch (error) {
      // Manejar errores durante el cierre de sesión
      console.log("error on logoutUser");
      console.log(error);
      throw error;
    }
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return token != null;
  };

  // Proporcionar el contexto con las funciones de autenticación a los componentes hijos
  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
