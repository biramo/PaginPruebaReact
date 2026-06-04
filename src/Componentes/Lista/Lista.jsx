import datosFrutas from './frutas.json'
import {useState, useEffect} from 'react'
import ResumenCompra from './ResumenCompra'
import FrutaItem from './FrutaItem' // 1. Importación relativa
import './css/FrutaItem.css'
import './css/Lista.css'
import './css/ResumenCompra.css'

export default function Lista(){

   // DESPUÉS — datos de la API
    const [frutas, setFrutas] = useState([]);
    const [busqueda, setBusqueda]=useState("")
    const [resultados, setResultados] = useState([]);
    const [compraTerminada,setCompraTerminada]=useState(false);


    useEffect(() => {
    fetch("https://world.openfoodfacts.org/cgi/search.pl?search_terms=fruit&json=1&page_size=10")
        .then(res => res.json())
        .then(data => {
        const productosFormateados = data.products.map((p, i) => ({
            id: i,
            nombre: p.product_name || "Sin nombre",
            cantidad: 0,
            imagen: p.image_small_url
        }));
        setFrutas(productosFormateados);
        });
    }, []);
   
    useEffect(()=>{
        const filtrados=frutas.filter((producto)=>{
            return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        })

        setResultados(filtrados)
    },[busqueda,frutas])
   
    
   const restarFruta=(idEliminar)=>{
    const nuevasFrutas = frutas.map((fruta) => {
        if (fruta.id === idEliminar) {
            if(fruta.cantidad>0){
                return { ...fruta, cantidad: fruta.cantidad - 1 };
            }
        }

        return fruta;
        });
    
        setFrutas(nuevasFrutas);
   };

   const sumarFruta = (idAnadir) => {
    // Recorremos el array con .map() para clonarlo y modificar solo la fruta elegida
    const nuevasFrutas = frutas.map((fruta) => {
      if (fruta.id === idAnadir) {
        // Si coincide el ID, devolvemos la fruta con la cantidad sumada
        return { ...fruta, cantidad: fruta.cantidad + 1 };
      }
      // Si no coincide, la dejamos exactamente como estaba
      return fruta;
    });

    // Guardamos el nuevo array en el estado
    setFrutas(nuevasFrutas);
  };

  const totalFrutas = frutas.reduce((acumulator,fruta)=>{

    return acumulator +fruta.cantidad;

  },0)

  if (compraTerminada) {
        const frutasCompradas = frutas.filter(fruta => fruta.cantidad > 0);

        return (
            <ResumenCompra 
                frutasCompradas={frutasCompradas} 
                totalFrutas={totalFrutas} 
                setCompraTerminada={() => setCompraTerminada(false)} // Apaga el interruptor para regresar
            />
        );
    }

    return (
        <div className="lista-frutas">
            <h2>Frutas disponibles</h2>
            <h3>Total frutas: {totalFrutas}</h3>
            <p>Pulsa la fruta para añadirla al carrito</p>
            <form className='form-busqueda'>
                <input type="text" 
                placeholder='Buscar producto...'
                value={busqueda}
                onChange={(e)=>setBusqueda(e.target.value)}    
                />
            </form>
            <ul>
                {resultados.map((fruta) => (
                    <FrutaItem 
                        key={fruta.id} 
                        fruta={fruta} 
                        onSumar={sumarFruta} 
                        onRestar={restarFruta}
                    />
                ))}
            </ul>
                
            <button onClick={()=>setCompraTerminada(true)} className='comprar-carrito'>Ver Carrito</button>
        </div>
    );
}