import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem("carrito");

  return carritoGuardado
    ? JSON.parse(carritoGuardado)
    : [];
  });

  //Cuando hay cambios en el carrito este se guarda en el localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Añadir o sumar producto
  const sumarProducto = (producto) => {
    console.log("Producto que llega al carrito:", producto);
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        // si ya está, suma 1
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      // si no está, lo añade con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Restar o eliminar producto
  const restarProducto = (id) => {
    setCarrito(prev =>
      prev
        .map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter(p => p.cantidad > 0) // elimina si llega a 0
    );
  };

  // Vaciar carrito completo
  const vaciarCarrito = () => setCarrito([]);

  // Total de unidades
  const totalUnidades = carrito.reduce((acum, p) => acum + p.cantidad, 0);

  // Total precio
  const totalPrecio = carrito.reduce((acum, p) => acum + (p.cantidad * p.precio), 0).toFixed(2);
  
  return (
    <CartContext.Provider value={{
      carrito,
      sumarProducto,
      restarProducto,
      vaciarCarrito,
      totalUnidades,
      totalPrecio
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);