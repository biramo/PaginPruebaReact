/*Ejercicio 8: Reloj

Mostrar hora actual.

Actualizar cada segundo.

Necesitas:

setInterval

y

clearInterval

Aprendes:

Cleanup. */
import { useState,useEffect } from "react";

export default function MostrarHora(){

    const [hora,setHora]=useState(new Date());

    useEffect(()=>{
       const intervalo= setInterval(()=>{
        setHora(new Date())
       },1000) 

       return () => clearInterval(intervalo);
    }, []);


    const horaFormateada = hora.toLocaleTimeString();

   return (
    <article style={{ textAlign: "center", padding: "20px", fontFamily: "monospace" }}>
      <h2>Hora Real Actual ⏰</h2>
      <time style={{ fontSize: "2rem", fontWeight: "bold", color: "#61dafb" }}>
        {horaFormateada}
      </time>
    </article>
  );
}