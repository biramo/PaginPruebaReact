/*Ejercicio 1: Tarjeta de usuario

Crea un componente UserCard que reciba estas props:

name
age
city

Y muestre algo como: */

export default function TarjetaUsuario({usuario}){

    return(
        <article>
            <p>{usuario.name}</p>
            <p>{usuario.age}</p>
            <p>{usuario.city}</p>
        </article>
    );

}