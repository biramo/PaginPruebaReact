import { useAuth } from './Componentes/context/AuthContext';



export default function MiCuenta(){

    const {user} = useAuth();

    if(!user) return null;

    return(
        <h1></h1>
    );
}