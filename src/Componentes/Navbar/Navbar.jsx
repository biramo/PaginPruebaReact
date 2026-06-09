import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
   const { totalUnidades } = useCart();

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
         <button onClick={() => navigate('/carrito')}>
          🛒 {totalUnidades > 0 && <strong>{totalUnidades}</strong>}
        </button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}