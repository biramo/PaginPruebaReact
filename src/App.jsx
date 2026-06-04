import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TarjetaUsuario from './Ejercicios/TarjetaUsuario'
import Producto from './Ejercicios/Producto'
import Contador from './Ejercicios/Contador'
import Perfil from  './Ejercicios/Perfil'
import Contador2 from './Ejercicios/Contador2'
import MostrarHora from './Ejercicios/MostrarHora'
import BuscadorLocal from './Ejercicios/BuscadorLocal'

function App() {
  const user ={
    name: "alberto",
    age: 15,
    city: "madrid",
  }

  const productos1 = [
  {
    title: "Auriculares Inalámbricos",
    price: 49.99
  },
  {
    title: "Teclado Mecánico RGB",
    price: 85.50
  },
  {
    title: "Ratón Ergonómico",
    price: 29.95
  }
  
];
  const [carritoCount, setCarritoCount] = useState(0);

  const productos2 = [
    { title: "Auriculares Inalámbricos", price: 49.99 },
    { title: "Teclado Mecánico RGB", price: 85.50 }
  ];

  return (
    <>
      <BuscadorLocal/>
    </>
  )
}

export default App
