import { useState,useEffect } from "react";


const lista=[
"React",
"Vue",
"Angular",
"Svelte"
]
export default function BuscadorLocal(){

    const[busqueda,setBusqueda]=useState("");
    const [resultados, setResultados] = useState(lista);


    useEffect(() => {
    const filtrados = lista.filter((tecnologia) => {
        return tecnologia.toLowerCase().includes(busqueda.toLowerCase());
    });

    setResultados(filtrados);
    }, [busqueda]);

    return (
        <>
        <form>
            <input type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}/>
        </form>
            <ul>
                {resultados.map((producto,index)=>{
                    return <li key={index}>{producto}</li>
                })}
            </ul>
        </>
    );
}