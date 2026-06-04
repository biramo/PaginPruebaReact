<<<<<<< HEAD
import Profile from './Componentes/ex1'
import User from './Componentes/ex2'
import Login from './Componentes/Loggin/Login'
import Lista from './Componentes/Lista/Lista'
import {useState} from 'react'
import { AuthProvider } from './Componentes/context/AuthContext';
import { useAuth } from './Componentes/context/AuthContext';
import './App.css'
import './Componentes/Loggin/Login.css'


function MainContent() {
  const { user } = useAuth();
  return (
    <>
      <header>
        <Login />
      </header>
      <main>
        {user
          ? <Lista />
          : <p className='aviso'>⚠️ Debes iniciar sesión para ver el contenido</p>
        }
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
=======
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
>>>>>>> 8e33741c129df4619f34b4684e7c541b5ba2f04f
