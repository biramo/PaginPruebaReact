import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null; // no muestra nada si no hay sesión

  return (
    <nav className="navbar">
      <span>🍎 Frutería React</span>
      <div>
        <span>{user.email}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}