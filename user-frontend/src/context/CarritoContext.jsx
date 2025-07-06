import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const actualizarCarrito = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/usuario/carrito", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn("No autorizado o error al actualizar carrito:", res.status);
      setCantidadCarrito(0);
      return;
    }

    const data = await res.json();
    const totalCantidad = data.reduce((sum, item) => sum + item.cantidad, 0);
    setCantidadCarrito(totalCantidad);

  } catch (e) {
    console.error("Error al actualizar carrito", e);
  }
};


  useEffect(() => {
    actualizarCarrito();
  }, []);

  return (
    <CarritoContext.Provider
      value={{
        cantidadCarrito,
        actualizarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
