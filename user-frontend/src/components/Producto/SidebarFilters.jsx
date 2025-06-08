import { useEffect, useState } from "react";

function SidebarFilters({
  search,
  setSearch,
  price,
  setPrice,
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/categorias")
      .then((res) => res.json())
      .then((data) => {
        const nombres = data.map((c) => c.nombre);
        setCategories(nombres);
      })
      .catch((err) => console.error("Error al cargar categorías", err));
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Rango de precio */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Rango de Precio</h3>
        <input
          type="range"
          min="0"
          max="200"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full mb-2"
        />
        <div className="flex justify-between text-sm">
          <span>S/0</span>
          <span>S/{price}</span>
          <span>S/200</span>
        </div>
      </div>

      {/* Categorías */}
      <div>
        <h3 className="font-semibold mb-2">Categorías</h3>
        <ul>
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className={`mb-1 cursor-pointer text-sm px-2 py-1 rounded ${
                selectedCategory === cat ? "bg-indigo-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidebarFilters;
