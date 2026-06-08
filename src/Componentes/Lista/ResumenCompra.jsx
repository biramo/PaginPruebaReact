import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEnviarEmail } from "../Email/useEnviarEmail";

export default function ResumenCompra({ frutasCompradas, totalFrutas, setCompraTerminada }) {
  
    //Estadps
  const { user } = useAuth();
  const { enviarConfirmacion } = useEnviarEmail();
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  //Funcion para manejar envio recoge los datos de la compra y envia el email
  const handleConfirmar = async () => {
    setCargando(true);
    setError("");
    try {
      const numeroPedido = Math.floor(Math.random() * 900000) + 100000; // 6 dígitos
      await enviarConfirmacion({
        emailUsuario: user.email,
        productos:    frutasCompradas,
        total:        totalFrutas,
        numeroPedido,
      });
      setEnviado(true);
    } catch (err) {
      setError("Error al enviar el correo, inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  const listaFrutas = frutasCompradas.map((fruta) => (
    <li key={fruta.id} className="resumen-item">
    <span className="span-row">{fruta.nombre}: </span>
    <span className="span-column">
    <span>Cantidad: {fruta.cantidad}</span>
    <span>Precio: {fruta.precio}€</span>
  </span>
</li>
  ));

  const totalPrecio= frutasCompradas.reduce((acumulator,fruta)=>{
    return acumulator+ (fruta.precio*fruta.cantidad);
  },0)

  //Si el correo fue enviado
  if (enviado) {
    return (
      <div className="resumen-compra">
        <h2>✅ ¡Pedido confirmado!</h2>
        <p>Te hemos enviado un correo a <strong>{user.email}</strong></p>
        <button className="btn-volver" onClick={() => setCompraTerminada(false)}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  //Si no se ha enviado el correo aun
  return (
    <div className="resumen-compra">
      <h2>Resumen de la compra</h2>
      <ul>{listaFrutas}</ul>
      <div className="total-productos">
        <h3>Total:</h3>
        <span>Productos: {totalFrutas}</span>
        <span>Precio: {totalPrecio.toFixed(2)}€</span>
      </div>
      
        

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        className="btn-volver"
        onClick={handleConfirmar}
        disabled={cargando}
      >
        {cargando ? "Enviando..." : "✅ Confirmar pedido"}
      </button>

      <button className="btn-volver" onClick={() => setCompraTerminada(false)}>
        Volver a la tienda
      </button>
    </div>
  );
}