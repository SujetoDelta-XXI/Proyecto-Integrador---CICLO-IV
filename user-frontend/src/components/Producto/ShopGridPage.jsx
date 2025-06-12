import { useState, useEffect } from "react";
import SidebarFilters from "./SidebarFilters";
import ProductCard from "./ProductCard";

function ShopGridPage() {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(200);
  const [selectedCategory, setSelectedCategory] = useState(""); // ← ID o ""
  const [productos, setProductos] = useState([]);

  // ─────────────────────────────────────────────────────────────
  // Carga y filtrado
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // Si hay categoría, pásala como query param (?categoria=5)
    const categoriaParam =
      selectedCategory !== "" ? `&categoria=${selectedCategory}` : "";

    fetch(
      `http://localhost:8086/api/productos/buscar?nombre=${encodeURIComponent(
        search
      )}&precioMax=${price}${categoriaParam}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Filtra nuevamente en el front por si cambia el slider
        const filtrados = data.filter((p) => {
          const precioOriginal = p.precio;
          const porcentaje = p.descuento?.porcentaje || 0;
          const precioFinal =
            precioOriginal - (precioOriginal * porcentaje) / 100;
          return precioFinal <= price;
        });
        setProductos(filtrados);
      })
      .catch((err) => console.error("Error al cargar productos", err));
  }, [search, price, selectedCategory]);

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6 py-8 px-4">
      {/* ---------- Lateral de filtros ---------- */}
      <aside className="w-full md:w-1/4 mb-6 md:mb-0">
        <SidebarFilters
          search={search}
          setSearch={setSearch}
          price={price}
          setPrice={setPrice}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </aside>

      {/* ---------- Grilla de productos ---------- */}
      <main className="w-full md:w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shop Grid</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.length ? (
            productos.map((p) => {
              const precioOriginal = p.precio;
              const porcentaje = p.descuento?.porcentaje || 0;
              const tieneDescuento = porcentaje > 0;
              const precioFinal = tieneDescuento
                ? (
                    precioOriginal -
                    (precioOriginal * porcentaje) / 100
                  ).toFixed(2)
                : precioOriginal;

              return (
                <ProductCard
                  key={p.id}
                  name={p.nombre}
                  price={precioFinal}
                  oldPrice={tieneDescuento ? precioOriginal : null}
                  rating={5}
                  reviews={5}
                  image={p.imagen}
                  discount={porcentaje}
                  category={p.categoria?.nombre || ""}
                  isNew={false}
                />

              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No se encontraron productos.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ShopGridPage;
