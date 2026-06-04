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