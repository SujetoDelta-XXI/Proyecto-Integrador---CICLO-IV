import { useEffect, useState } from "react";
import CarruselCategorias from "../components/CarruselCategorias";

function Tienda() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/usuario/productos");
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        const data = await res.json();

        // asumiendo paginado:
        const content = data.content || [];
        setProductos(content);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setProductos([]);
      }
    };
    fetchProductos();
  }, []);

  // filtramos SOLO preventa
  const preventaProductos = productos.filter(
  (p) => p.estado?.toUpperCase() === "PREVENTA"
);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Carrusel de categorías */}
      <CarruselCategorias />

      {/* SOLO preventa */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">Próximos en Preventa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {preventaProductos.length > 0 ? (
            preventaProductos.map((p) => (
              <div
                key={p.id}
                className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
              >
                {/* etiqueta preventa */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
                  Preventa
                </div>
                <img
                  src={p.imagen || "https://placehold.co/300x300?text=Próximamente"}
                  alt={p.nombre}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{p.nombre}</h3>
                  <p className="text-gray-500 text-sm">Próximamente</p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No hay productos en preventa.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Tienda;
