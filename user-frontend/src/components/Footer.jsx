import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";

const footerLinks = [
  {
    title: "Navegación",
    links: [
      { text: "Artículos y Tallas", url: "#" },
      { text: "Opciones de Personalización", url: "#" },
      { text: "Enviós", url: "#"},
      { text: "Pagos y Facturas", url:"#"},
      { text: "Cambios, Devoluciones y Reembolsos", url:"#"},
      { text: "Novedades", url: "#" },
      { text: "Contacto", url: "#" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { text: "Preguntas Frecuentes", url: "#" },
      { text: "Envíos", url: "#" },
      { text: "Devoluciones", url: "#" },
      { text: "Atención al Cliente", url: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { text: "Sobre Nosotros", url: "#" },
      { text: "Trabaja con Nosotros", url: "#" },
      { text: "Prensa", url: "#" },
      { text: "Blog", url: "#" },
    ],
  },
  {
    title: "Políticas",
    links: [
      { text: "Términos y Condiciones", url: "#" },
      { text: "Política de Privacidad", url: "#" },
      { text: "Cookies", url: "#" },
      { text: "Aviso Legal", url: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-0 mt-12">
      <div className="flex justify-around flex-wrap pb-4">
        {footerLinks.map((col, idx) => (
          <div className="min-w-[160px] mb-4" key={idx}>
            <div className="font-bold mb-2">{col.title}</div>
            <ul className="list-none p-0 m-0">
              {col.links.map((link, i) => (
                <li className="mb-1" key={i}>
                  <a href={link.url} className="text-white no-underline text-base">{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 py-3 px-6 flex justify-between items-center text-base">
        <span>Copyright © 2024 Marca. Derechos reservados.</span>
        <span className="flex items-center gap-2">
          <FaYoutube className="text-2xl align-middle" />
          <FaInstagram className="text-2xl align-middle" />
          <BsDiscord className="text-2xl align-middle" />
          <FaTiktok className="text-2xl align-middle" />
          <span className="ml-2 text-lg">○</span>
          <span className="text-lg">●</span>
          <span className="text-lg">◎</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;