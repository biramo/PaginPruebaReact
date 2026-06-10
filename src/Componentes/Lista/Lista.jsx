import datosFrutas from './frutas.json'
import {useState, useEffect} from 'react'
import ResumenCompra from './ResumenCompra'
import FrutaItem from './FrutaItem' 
import {useCart} from '../context/CartContext'
import './css/FrutaItem.css'
import './css/Lista.css'
import './css/ResumenCompra.css'

export default function Lista(){

   // DESPUÉS — datos de la API
    const { sumarProducto, restarProducto } = useCart();
    const [frutas, setFrutas] = useState(datosFrutas);
    const [busqueda, setBusqueda]=useState("")
    const [resultados, setResultados] = useState([]);
    const [compraTerminada,setCompraTerminada]=useState(false);

    /*
    Api encargada de recoger los productos
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
    */
   
    useEffect(()=>{
        const filtrados=frutas.filter((producto)=>{
            return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        })

        setResultados(filtrados)
    },[busqueda])
   
    return (
        <div className="lista-frutas">
            <h2>Frutas disponibles</h2>
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
                        onSumar={sumarProducto} 
                        onRestar={restarProducto}
                    />
                ))}
            </ul>
        </div>
    );
}