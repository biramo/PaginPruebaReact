import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

//Comprueba si existe el usuario si no lo manda al login si le deja le da visibilidad al elemento hijo
export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}