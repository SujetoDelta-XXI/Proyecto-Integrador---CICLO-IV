import React, { useEffect, useState } from "react";
import ProductoCard from "../components/Producto/ProductoCard";
import SidebarFilters from "../components/Producto/SidebarFilters";

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState({ min: "", max: "" });
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchProductos = async () => {
        setCargando(true);
        try {
          const queryParams = new URLSearchParams();
          if (search) queryParams.append("nombre", search);
          if (selectedCategory) queryParams.append("categoriaId", selectedCategory);
          if (price.min) queryParams.append("minPrecio", price.min);
          if (price.max) queryParams.append("maxPrecio", price.max);

          const url = `http://localhost:8080/api/usuario/productos?${queryParams.toString()}`;
          const token = localStorage.getItem("token");

          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) throw new Error("Error al obtener los productos");

          const data = await response.json();
          setProductos(data.content || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setCargando(false);
        }
      };

      fetchProductos();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, price, selectedCategory]);

  if (cargando) return <p className="text-center mt-10 text-lg text-gray-600 animate-pulse">Cargando productos...</p>;
  if (error) return <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      
      {/* Filtros */}
      <aside className="w-full md:w-1/4 md:h-[calc(100vh-120px)] md:sticky md:top-[100px] overflow-y-auto bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrar</h2>
        <SidebarFilters
          search={search}
          setSearch={setSearch}
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
      </main>
    </div>
  );
}

export default ProductosPage;


