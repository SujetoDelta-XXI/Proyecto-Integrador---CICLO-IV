import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <section
      className="h-[80vh] bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
    >
      <h1
        className="text-5xl font-bold mb-4 drop-shadow"
        data-aos="fade-down"
      >
        Eleva tu estilo con <span className="text-indigo-400">EstiloYa</span>
      </h1>
      <p className="text-xl mb-6 max-w-2xl" data-aos="fade-up">
        Explora la moda más audaz, personaliza tus looks y vive tu experiencia
        única con nosotros.
      </p>
      <Link
        to="/tienda"
        data-aos="zoom-in"
        className="bg-indigo-600 hover:bg-indigo-800 py-3 px-8 rounded-full text-lg font-semibold transition"
      >
        Ver Colección
      </Link>
    </section>
  );
}

export default HeroSection;
