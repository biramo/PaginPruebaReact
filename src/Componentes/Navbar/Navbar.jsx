import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import './Navbar.css'


export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
   const { totalUnidades } = useCart();

 

  if (!user) return null; // no muestra nada si no hay sesión

  return (
    <header>
      <nav className="navbar">
        <span className="title" onClick={()=>navigate('/tienda')}>🍎 Frutería React</span>
        <div className="usuario-container">
          <span className="user-email">{user.displayName}</span>
          <button className="btn-carrito btn-acciones" onClick={() => navigate('/carrito')}>
            🛒 {totalUnidades > 0 && <strong>{totalUnidades}</strong>}
          </button>
          <button className="btn-mi-cuenta btn-acciones" onClick={()=>navigate("/mi-cuenta")}>Cuenta</button>
        </div>
      </nav>
    </header>
  );
}