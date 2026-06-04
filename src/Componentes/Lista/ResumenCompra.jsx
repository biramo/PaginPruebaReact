export default function ResumenCompra({frutasCompradas,totalFrutas,setCompraTerminada}){

    const listaFrutas= frutasCompradas.map((fruta)=>{

       return (<li key={fruta.id}>
            <span>{fruta.nombre}: </span>
            <span>{fruta.cantidad}</span>
        </li>);
    })

    return(
        <div className="resumen-compra">
            <h2>Resumen de la compra</h2>
            <ul>
                {listaFrutas}
            </ul>
            <p>Total: {totalFrutas}</p>
            <button className="btn-volver" onClick={()=>setCompraTerminada(false)}>Volver a la tienda</button>

        </div>
    );
}