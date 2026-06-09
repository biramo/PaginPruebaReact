import { useCart } from "../context/CartContext";

export default function FrutaItem({ fruta, onSumar, onRestar }) {
    const { carrito } = useCart();
    
    const enCarrito = carrito.find(p=>p.id===fruta.id);
    const cantidad = enCarrito ? enCarrito.cantidad :0;

    return (    

        <li className="fruta-card">
            <div className="fruta-contenido" onClick={() => onSumar(fruta)}>
                <span className="fruta-nombre">{fruta.nombre}</span>
                <span className="fruta-cantidad"> Cantidad: {cantidad}</span>
                <span className="fruta-precio">Precio: {fruta.precio}€</span>
                <img src={fruta.imagen} alt={fruta.nombre} className="fruta-img" />
            </div>
            <button onClick={(e) => {
                e.stopPropagation(); // Evita que al pulsar el botón también se sume una fruta
                onRestar(fruta.id);
            }} className="eliminar-fruta">
                Eliminar fruta
            </button>
        </li>
    );
}