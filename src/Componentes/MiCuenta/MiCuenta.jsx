import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { db } from "../DB_firebase/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useState,useEffect } from "react";
import Spiner from '../Spiner/Spiner'
import './MiCuenta.css'




export default function MiCuenta(){
    const { user, logout } = useAuth();
    const navigate = useNavigate();
     const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
      const cargarPedidos = async () => {
      try {
        // Busca pedidos donde uid == usuario actual
        const q = query(
          collection(db, "pedidos"),
          where("uid", "==", user.uid),
          orderBy("fecha", "desc")  // más recientes primero
        );
        const snapshot = await getDocs(q);
        const datos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPedidos(datos);
      } catch (err) {
        console.error("Error cargando pedidos:", err);
      } finally {
        setCargando(false);
      }
    };

    if (user) cargarPedidos();
  }, [user]);
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if(!user) return null;

    return (
        <div className='mi-cuenta-container'>
            
            {/* 1. CABECERA DE LA CUENTA */}
            <div className='mi-cuenta-header container-box'>
                <h1>Mi Perfil 👤</h1>
                <p className='bienvenida'>¡Hola de nuevo, {user.displayName}!</p>
            </div>

            {/* 2. CONTENIDO PRINCIPAL */}
            <main className='mi-cuenta-content'>
                
                {/* Bloque de Información del Usuario */}
                <section className='perfil-info-card container-box'>
                    <h2 className=''>Datos de la cuenta</h2>
                    <div className='info-group'>
                        <label>Nombre del usuario: </label>
                        <p>{user.displayName}</p>
                        <label>Email registrado:</label>
                        <p>{user.email}</p>
                        <label>Estado de la sesión:</label>
                        <p className='tag-activo'>Conectado</p>
                    </div>
                </section>

                {/* Bloque del Historial de Pedidos (Preparado para Firestore) */}
                <section className='perfil-pedidos-card container-box'>
                    <h2>Historial de Pedidos 📦</h2>
                    {cargando && <Spiner/>}

                     {!cargando && pedidos.length === 0 && (
                    <div className='pedidos-vacio'>
                        <p>Aún no has realizado ninguna compra.</p>
                        <button onClick={() => navigate('/tienda')} className='btn-comprar'>
                            Ir a la tienda
                        </button>
                    </div>
                      )}

                    {!cargando && pedidos.map(pedido => (
                    <div key={pedido.id} className='pedido-item'>
                        <p><strong>Pedido #{pedido.numeroPedido}</strong></p>
                        <p>Productos: {pedido.productos.map(p => `${p.nombre} x${p.cantidad}`).join(", ")}</p>
                        <p>Total: {pedido.totalPrecio}€</p>
                        <p>Fecha: {pedido.fecha?.toDate().toLocaleDateString()}</p>
                    </div>
                    ))}
                </section>

            </main>

            <div className='mi-cuenta-actions'>
                <button 
                    className="btn-menu-principal btn-actions" 
                    onClick={() => navigate('/tienda')}
                >
                    Volver a la Tienda 🍎
                </button>
                <button 
                    className="btn-cerrar-sesion btn-actions" 
                    onClick={handleLogout}
                >
                    Cerrar sesión 🚪
                </button>
            </div>

        </div>
    );
}