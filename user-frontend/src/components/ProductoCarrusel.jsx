import { useState } from "react";
import ProductoCard from "./Producto/ProductoCard";

function ProductoCarrusel({ productos, titulo, itemsPorVista = 4 }) {
  const [indice, setIndice] = useState(0);

  if (!productos || productos.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{titulo}</h2>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-500 py-8">
            <p>No hay productos disponibles en esta sección</p>
          </div>
        </div>
      </div>
    );
  }

  const productosAMostrar = productos.slice(indice, indice + itemsPorVista);
  const puedeRetroceder = indice > 0;
  const puedeAvanzar = indice + itemsPorVista < productos.length;

  const handlePrev = () => {
    if (puedeRetroceder) setIndice(indice - 1);
  };

  const handleNext = () => {
    if (puedeAvanzar) setIndice(indice + 1);
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{titulo}</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={handlePrev}
            disabled={!puedeRetroceder}
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-4 flex-1 justify-center overflow-hidden">
            {productosAMostrar.map((producto) => (
              <div 
                key={producto.id} 
                className="flex-shrink-0 transition-all duration-300"
                style={{ 
                  width: `calc(${100 / itemsPorVista}% - ${(itemsPorVista - 1) * 16 / itemsPorVista}px)`,
                  minWidth: '250px'
                }}
              >
                <ProductoCard producto={producto} />
              </div>
            ))}
          </div>
          
          <button
            className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={handleNext}
            disabled={!puedeAvanzar}
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicadores de navegación */}
        {productos.length > itemsPorVista && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: Math.ceil(productos.length / itemsPorVista) }, (_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === Math.floor(indice / itemsPorVista) 
                    ? 'bg-gray-800' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setIndice(i * itemsPorVista)}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductoCarrusel; 