import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";

const footerLinks = [
  {
    title: "Navegación",
    links: [
      { text: "Artículos y Tallas", url: "#" },
      { text: "Opciones de Personalización", url: "#" },
      { text: "Envíos", url: "#" },
      { text: "Pagos y Facturas", url: "#" },
      { text: "Cambios y Devoluciones", url: "#" },
      { text: "Novedades", url: "#" },
      { text: "Contacto", url: "#" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { text: "Preguntas Frecuentes", url: "#" },
      { text: "Atención al Cliente", url: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { text: "Sobre Nosotros", url: "#" },
      { text: "Trabaja con Nosotros", url: "#" },
      { text: "Blog", url: "#" },
    ],
  },
  {
    title: "Políticas",
    links: [
      { text: "Términos y Condiciones", url: "#" },
      { text: "Política de Privacidad", url: "#" },
      { text: "Cookies", url: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 pt-10 pb-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
        {footerLinks.map((col, idx) => (
          <div key={idx}>
            <h4 className="text-white font-semibold mb-3 text-base border-b border-gray-600 pb-1">{col.title}</h4>
            <ul>
              {col.links.map((link, i) => (
                <li key={i} className="mb-2">
                  <a href={link.url} className="hover:text-gray-300 transition">{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p className="mb-2 md:mb-0">© 2024 EstiloYa. Todos los derechos reservados.</p>
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-red-500 transition"><FaYoutube /></a>
          <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-500 transition"><BsDiscord /></a>
          <a href="#" className="hover:text-white transition"><FaTiktok /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
