
import Login from './Componentes/Loggin/Login'
import Lista from './Componentes/Lista/Lista'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './Componentes/context/AuthContext';
import { useAuth } from './Componentes/context/AuthContext';
import './App.css'
import './Componentes/Loggin/Login.css'
import './Componentes/Navbar/Navbar.css'
import Navbar from './Componentes/Navbar/Navbar'
import PrivateRoute from './Componentes/PrivateRoute'
import { CartProvider } from './Componentes/context/CartContext'; 
import ResumenCompra from './Componentes/Lista/ResumenCompra' 

function MainContent() {
  const { user } = useAuth();

  return (
    <>
      <Navbar/>
      <Routes>
        {/* Si no hay usuario, muestra login */}
        <Route path="/login" element={<Login />} />

        {/* Si hay usuario, muestra la tienda */}
        <Route path="/tienda" element={
        <PrivateRoute>
          <Lista />
        </PrivateRoute>
      } />

        <Route path="/carrito" element={
          <PrivateRoute>
            <ResumenCompra />
          </PrivateRoute>
        } />

        {/* Ruta por defecto: redirige según si hay sesión */}
        <Route
          path="*"
          element={<Navigate to={user ? "/tienda" : "/login"} />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;