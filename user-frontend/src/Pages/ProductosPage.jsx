import React, { useEffect, useState } from "react";
import ProductoCard from "../components/Producto/ProductoCard";
import SidebarFilters from "../components/Producto/SidebarFilters";

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const [price, setPrice] = useState({ min: 1, max: 200 });
  const [selectedCategory, setSelectedCategory] = useState("");

  // paginación
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      const fetchProductos = async () => {
        try {
          setCargando(true);

          const queryParams = new URLSearchParams();
          if (selectedCategory) queryParams.append("categoriaId", selectedCategory);
          if (price.min) queryParams.append("minPrecio", price.min);
          if (price.max) queryParams.append("maxPrecio", price.max);
          queryParams.append("page", page);
          queryParams.append("size", 6);

          const url = `http://localhost:8080/api/usuario/productos?${queryParams.toString()}`;
          const token = localStorage.getItem("token");

          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          });

          if (!response.ok) throw new Error("Error al obtener los productos");

          const data = await response.json();
          setProductos(data.content || []);
          setTotalPages(data.totalPages || 0);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error.message);
          }
        } finally {
          setCargando(false);
        }
      };

      fetchProductos();
    }, 500); // debounce 500ms

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [price, selectedCategory, page]);

  if (cargando)
    return (
      <p className="text-center mt-10 text-lg text-gray-600 animate-pulse">
        Cargando productos...
      </p>
    );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      {/* Filtros */}
      <aside className="w-full md:w-1/4 h-fit md:sticky md:top-[100px] bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrar</h2>
        <SidebarFilters
          price={price}
          setPrice={setPrice}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </aside>

      {/* Productos */}
      <main className="w-full md:w-3/4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Todos los productos</h1>
          <p className="text-sm text-gray-500">{productos.length} resultados</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto.id} className="animate-fadeIn">
                <ProductoCard producto={producto} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 text-lg">
              No se encontraron productos con esos filtros.
            </p>
          )}
        </div>

        {/* paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded border ${
                  i === page
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-200"
                } transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductosPage;

