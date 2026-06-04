export default function FrutaItem({ fruta, onSumar, onRestar }) {
    return (
        // 2. Usamos una función flecha en el onClick
        <div className="fruta-div">
            <li onClick={() => onSumar(fruta.id)}>
                <span className="fruta-nombre">{fruta.nombre}</span>
                <span className="fruta-cantidad"> cantidad: {fruta.cantidad}</span>
                <img src={fruta.imagen} alt={fruta.nombre}></img>
            </li>
            <button onClick={()=>onRestar(fruta.id)} className="eliminar-fruta">Eliminar fruta</button>
        </div>

    );
}