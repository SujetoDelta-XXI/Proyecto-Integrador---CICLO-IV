import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-10 border-t border-slate-700 mt-[-1px]">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* contacto */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Contacto</h4>
          <p className="text-sm flex items-center gap-1">📍 Av. EstiloYa 123, Ciudad Creativa</p>
          <p className="text-sm flex items-center gap-1">📞 +51 987 654 321</p>
          <p className="text-sm flex items-center gap-1">✉ contacto@estiloya.com</p>
        </div>

        {/* navegación */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tienda" className="hover:text-indigo-400 transition">Tienda</Link></li>
            <li><Link to="/productos" className="hover:text-indigo-400 transition">Productos</Link></li>
            <li><Link to="/login" className="hover:text-indigo-400 transition">Iniciar Sesión</Link></li>
            <li><Link to="/register" className="hover:text-indigo-400 transition">Registro</Link></li>
          </ul>
        </div>

        {/* redes */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Síguenos</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-indigo-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2025 EstiloYa. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;


