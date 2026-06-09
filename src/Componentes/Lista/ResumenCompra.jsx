import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useEnviarEmail } from "../Email/useEnviarEmail";
import { useNavigate } from "react-router-dom";

export default function ResumenCompra() {
  // Ya no recibe props, todo viene del contexto
  const { carrito, totalUnidades, totalPrecio, vaciarCarrito } = useCart();
  const { user } = useAuth();
  const { enviarConfirmacion } = useEnviarEmail();
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmar = async () => {
    setCargando(true);
    setError("");
    try {
      const numeroPedido = Math.floor(Math.random() * 900000) + 100000;
      await enviarConfirmacion({
        emailUsuario: user.email,
        productos:    carrito,
        total:        totalUnidades,
        numeroPedido,
      });
      vaciarCarrito();
      setEnviado(true);
    } catch (err) {
      setError("Error al enviar el correo, inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  // Carrito vacío
  if (carrito.length === 0 && !enviado) {
    return (
      <div className="resumen-compra">
        <h2>🛒 Tu carrito está vacío</h2>
        <button className="btn-volver" onClick={() => navigate('/tienda')}>
          Ir a la tienda
        </button>
      </div>
    );
  }

  // Pedido confirmado
  if (enviado) {
    return (
      <div className="resumen-compra">
        <h2>✅ ¡Pedido confirmado!</h2>
        <p>Te hemos enviado un correo a <strong>{user.email}</strong></p>
        <button className="btn-volver" onClick={() => navigate('/tienda')}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  // Resumen normal
  return (
    <div className="resumen-compra">
      <h2>Resumen de la compra</h2>
      <ul>
        {carrito.map((fruta) => (
          <li key={fruta.id} className="resumen-item">
            <span className="span-row">{fruta.nombre}: </span>
            <span className="span-column">
              <span>Cantidad: {fruta.cantidad}</span>
              <span>Precio: {fruta.precio}€</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="total-productos">
        <h3>Total:</h3>
        <span>Productos: {totalUnidades}</span>
        <span>Precio: {totalPrecio}€</span>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="btn-volver" onClick={handleConfirmar} disabled={cargando}>
        {cargando ? "Enviando..." : "✅ Confirmar pedido"}
      </button>
      <button className="btn-volver" onClick={() => navigate('/tienda')}>
        Volver a la tienda
      </button>
    </div>
  );
}