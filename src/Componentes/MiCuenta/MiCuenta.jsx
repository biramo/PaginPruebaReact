import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import './MiCuenta.css'



export default function MiCuenta(){
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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
                <p className='bienvenida'>¡Hola de nuevo, {user.email}!</p>
            </div>

            {/* 2. CONTENIDO PRINCIPAL */}
            <main className='mi-cuenta-content'>
                
                {/* Bloque de Información del Usuario */}
                <section className='perfil-info-card container-box'>
                    <h2 className=''>Datos de la cuenta</h2>
                    <div className='info-group'>
                        <label>Email registrado:</label>
                        <p>{user.email}</p>
                    </div>
                    <div className='info-group'>
                        <label>Estado de la sesión:</label>
                        <p className='tag-activo'>Conectado</p>
                    </div>
                </section>

                {/* Bloque del Historial de Pedidos (Preparado para Firestore) */}
                <section className='perfil-pedidos-card container-box'>
                    <h2>Historial de Pedidos 📦</h2>
                    
                    {/* Mensaje provisional hasta que traigas los datos reales de Firebase */}
                    <div className='pedidos-vacio'>
                        <p>Aún no has realizado ninguna compra.</p>
                        <button onClick={() => navigate('/tienda')} className='btn-comprar'>
                            Ir a la tienda
                        </button>
                    </div>

                    {/* Nota: Aquí es donde mapearemos los pedidos más adelante algo como:
                        pedidos.map(pedido => <PedidoItem key={pedido.id} ... />) 
                    */}
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