export default function FrutaItem({ fruta, onSumar, onRestar }) {
    return (
        // Ahora el li es el contenedor principal y lleva la clase de la tarjeta
        <li className="fruta-card">
            <div className="fruta-contenido" onClick={() => onSumar(fruta.id)}>
                <span className="fruta-nombre">{fruta.nombre}</span>
                <span className="fruta-cantidad"> Cantidad: {fruta.cantidad}</span>
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