import "../css/Footer.css";
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
      { text: "Cambios,  Devoluciones y Reembolsos", url:"#"},
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
    <footer className="footer">
      <div className="footer-nav">
        {footerLinks.map((col, idx) => (
          <div className="footer-col" key={idx}>
            <div className="footer-title">{col.title}</div>
            <ul>
              {col.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>Copyright © 2024 Marca. Derechos reservados.</span>
        <span className="footer-icons">
          <FaYoutube />
          <FaInstagram />
          <BsDiscord />
          <FaTiktok />
          <span>○</span> 
          <span>●</span> 
          <span>◎</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;