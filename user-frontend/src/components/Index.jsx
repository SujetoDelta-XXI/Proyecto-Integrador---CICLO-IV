import { useState, useEffect } from "react";
import CarruselComponent from "./CarruselComponent";
import ProductoCarrusel from "./ProductoCarrusel";
import { productoService } from "../services/productoService";

function Index() {
  const [ofertasDia, setOfertasDia] = useState([]);
  const [ofertasSemana, setOfertasSemana] = useState([]);
  const [masVendidos, setMasVendidos] = useState([]);
  const [productosNuevos, setProductosNuevos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const [ofertasDiaData, ofertasSemanaData, masVendidosData, productosNuevosData] = await Promise.all([
          productoService.getOfertasDia(),
          productoService.getOfertasSemana(),
          productoService.getMasVendidos(),
          productoService.getProductosNuevos()
        ]);

        setOfertasDia(ofertasDiaData);
        setOfertasSemana(ofertasSemanaData);
        setMasVendidos(masVendidosData);
        setProductosNuevos(productosNuevosData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <CarruselComponent />
      
      {/* Sección de bienvenida */}
      <div className="max-w-3xl mx-auto mt-20 text-center px-4 mb-16">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a EstiloYa</h1>
        <p className="text-xl text-gray-700 mb-8">
          Descubre la mejor moda, accesorios y más. ¡Explora nuestra tienda o inicia sesión para una experiencia personalizada!
        </p>
        <div className="flex justify-center gap-4">
          <a href="/productos" className="py-3 px-8 text-lg rounded-md border-2 border-indigo-500 bg-indigo-500 text-white no-underline font-medium transition-colors duration-200 hover:bg-gray-800 hover:text-white hover:border-gray-800">Ir a la Tienda</a>
          <a href="/loginForm" className="py-3 px-8 text-lg rounded-md border-2 border-indigo-500 bg-white text-indigo-500 no-underline font-medium transition-colors duration-200 hover:bg-gray-800 hover:text-white hover:border-gray-800">Iniciar Sesión</a>
        </div>
      </div>

      {/* Sección de Ofertas del Día */}
      <ProductoCarrusel 
        productos={ofertasDia} 
        titulo="🔥 Ofertas del Día" 
        itemsPorVista={4} 
      />

      {/* Sección de Ofertas de la Semana */}
      <ProductoCarrusel 
        productos={ofertasSemana} 
        titulo="⭐ Ofertas de la Semana" 
        itemsPorVista={5} 
      />

      {/* Sección de Más Vendidos */}
      <ProductoCarrusel 
        productos={masVendidos} 
        titulo="🏆 Más Vendidos" 
        itemsPorVista={4} 
      />

      {/* Sección de Productos Nuevos */}
      <ProductoCarrusel 
        productos={productosNuevos} 
        titulo="🆕 Productos Nuevos" 
        itemsPorVista={4} 
      />
    </>
  );
}

export default Index;