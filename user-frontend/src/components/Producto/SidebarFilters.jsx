import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function SidebarFilters({
  price,
  setPrice,
  selectedCategory,
  setSelectedCategory,
}) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/usuario/categorias", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error("Error al obtener categorías", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="space-y-6">
      {/* Categoría */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Categoría
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-white focus:ring focus:ring-indigo-200"
        >
          <option value="">Todas</option>
          {!loading &&
            categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
        </select>
      </div>

      {/* Precio */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Precio (S/)
        </label>
        <Slider
          range
          min={1}
          max={200}
          defaultValue={[1, 200]}
          value={[price.min, price.max]}
          onChange={(values) =>
            setPrice({ min: values[0], max: values[1] })
          }
          trackStyle={[{ backgroundColor: "#6366F1" }]}
          handleStyle={[
            { borderColor: "#6366F1", backgroundColor: "#6366F1" },
            { borderColor: "#6366F1", backgroundColor: "#6366F1" },
          ]}
        />
        <div className="flex justify-between text-xs mt-1">
          <span>S/ {price.min}</span>
          <span>S/ {price.max}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SidebarFilters);



