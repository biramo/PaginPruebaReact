import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>404 🍎</h1>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe.</p>
      <button onClick={() => navigate('/tienda')}>
        Volver a la tienda
      </button>
    </div>
  );
}