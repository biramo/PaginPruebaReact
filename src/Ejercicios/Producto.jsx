/*
Ejercicio 2: Producto

Crea un componente Product que reciba:

title
price

Muestra: */

import { useEffect } from "react";

// Ejercicios/Producto.jsx
export default function Producto({ title, price, onComprar }) {
    
    useEffect(()=>{
        console.log("Producto creado")
    },[])
    
    return (
        <article style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{title}</h3>
            <p>Precio: {price}€</p>
            {/* Al hacer clic, ejecutamos la función que nos dio el padre */}
            <button onClick={onComprar}>Añadir al carrito 🛒</button>
        </article>
    );
}