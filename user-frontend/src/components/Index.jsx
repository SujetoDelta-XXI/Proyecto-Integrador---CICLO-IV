import { Link } from "react-router-dom";
import Imagenindex from "../assets/imagenindex.jpg";
import { useState, useEffect } from "react";
import CarruselComponent from "./CarruselComponent";
import ProductoCarrusel from "./ProductoCarrusel";


function Index() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
 


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
      {/* HERO SECTION */}
<section className="relative flex items-center justify-center text-center h-[calc(100vh-64px)]"> 





  {/* imagen de fondo con fadeIn */}
  <img
    src={Imagenindex}
    alt="Estilo ya"
    className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* contenido con fadeIn */}
  <div className="relative z-10 px-4 animate-fadeIn">
    <h1 className="text-6xl md:text-8xl font-montserrat font-bold text-white hero-text">
      ESTILO<span className="text-indigo-400">YA</span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
      Donde el estilo cobra vida — personaliza, diseña y luce diferente.
    </p>
    <Link
      to="/tienda"
      className="mt-6 py-3 px-8 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 hover:scale-105 transition shadow-lg"
    >
      Comprar Ahora
    </Link>
  </div>
</section>

    </>
  );
}

export default Index;
