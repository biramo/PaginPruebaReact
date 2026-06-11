import datosFrutas from './frutas.json'
import {useState, useEffect} from 'react'
import ResumenCompra from './ResumenCompra'
import FrutaItem from './FrutaItem' 
import {useCart} from '../context/CartContext'
import Spinner from '../Spiner/Spiner'
import './css/FrutaItem.css'
import './css/Lista.css'
import './css/ResumenCompra.css'

export default function Lista(){

   //Funciones de useCart
    const { sumarProducto, restarProducto } = useCart();
    //Lista de las frutas
    const [frutas, setFrutas] = useState(datosFrutas);
    //Busqueda por nombre
    const [busqueda, setBusqueda]=useState("")
    //Resultados de busquedas
    const [resultados, setResultados] = useState([]);
    const [compraTerminada,setCompraTerminada]=useState(false);
    //Orden por precio
    const [orden, setOrden] = useState("ninguno");

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
   
    const resultadosOrdenados = [...resultados].sort((a, b) => {
        if (orden === "menor") return a.precio - b.precio;  // menor a mayor
        if (orden === "mayor") return b.precio - a.precio;  // mayor a menor
        return 0;  // sin orden
    })

    return (
        <div className="lista-frutas">
            <h2>Frutas disponibles</h2>
             <div className="filtros">  {/* ← nuevo */}
                <form className='form-busqueda'>
                    <input
                    className="input-busqueda"
                    type="text"
                    placeholder='Buscar producto...'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    />
                </form>

                <select  
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                    className="select-orden"
                >
                    <option value="ninguno">Ordenar por precio</option>
                    <option value="menor">Precio: menor a mayor</option>
                    <option value="mayor">Precio: mayor a menor</option>
                </select>
            </div>
            <ul>
                {resultadosOrdenados.map((fruta) => (
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