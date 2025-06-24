import React, { useEffect, useState } from "react";

function SidebarFilters({ search, setSearch, price, setPrice, selectedCategory, setSelectedCategory }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/usuario/categorias", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error("Error al cargar categorías", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl border space-y-6 sticky top-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Buscar por nombre</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ej: Pikachu"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black/20"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-black/20"
        >
          <option value="">Todas</option>
          {!loading && categorias.length > 0 ? (
            categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))
          ) : (
            <option disabled>Cargando...</option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Precio (S/)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={price.min}
            onChange={(e) => setPrice({ ...price, min: e.target.value })}
            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black/20"
          />
          <input
            type="number"
            placeholder="Max"
            value={price.max}
            onChange={(e) => setPrice({ ...price, max: e.target.value })}
            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black/20"
          />
        </div>
      </div>
    </div>
  );
}

// al final de SidebarFilters.jsx
export default React.memo(SidebarFilters);


