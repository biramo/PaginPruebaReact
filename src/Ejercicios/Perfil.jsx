import { useState } from "react";

export default function Perfil(){

    const [show, setShow]=useState(false);
    const togglePerfil=()=>(setShow(!show));
    return(
        <div className="Perfil">
            {show? 
            <p>Perfil visible</p>:<p>Perfil no visible</p>
            }

            <button onClick={togglePerfil}>Mostrar/Ocultar</button>
        </div>
    )


}