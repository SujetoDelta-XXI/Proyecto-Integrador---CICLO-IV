import MainHeader from "./Header";
import CarruselComponent from "./CarruselComponent"; // Asegúrate de que este componente no tenga CSS propio o lo conviertas a Tailwind

function Index() {
  return (
    <>
      <CarruselComponent />
      <div className="max-w-3xl mx-auto mt-20 text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a EstiloYa</h1>
        <p className="text-xl text-gray-700 mb-8">
          Descubre la mejor moda, accesorios y más. ¡Explora nuestra tienda o inicia sesión para una experiencia personalizada!
        </p>
        <div className="flex justify-center gap-4">
          <a href="/tienda" className="py-3 px-8 text-lg rounded-md border-2 border-indigo-500 bg-indigo-500 text-white no-underline font-medium transition-colors duration-200 hover:bg-gray-800 hover:text-white hover:border-gray-800">Ir a la Tienda</a>
          <a href="/loginForm" className="py-3 px-8 text-lg rounded-md border-2 border-indigo-500 bg-white text-indigo-500 no-underline font-medium transition-colors duration-200 hover:bg-gray-800 hover:text-white hover:border-gray-800">Iniciar Sesión</a>
        </div>
      </div>
    </>
  );
}

export default Index;