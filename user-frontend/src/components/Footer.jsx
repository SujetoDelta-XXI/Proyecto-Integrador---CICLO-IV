import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav">
        {[1, 2, 3, 4].map((col) => (
          <div className="footer-col" key={col}>
            <div className="footer-title">Navegación</div>
            <ul>
              <li><a href="#">Enlace 1</a></li>
              <li><a href="#">Enlace 2</a></li>
              <li><a href="#">Enlace 3</a></li>
              <li><a href="#">Enlace 4</a></li>
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>Copyright © 2024 Marca. Derechos reservados.</span>
        <span className="footer-icons">
          {/*iconos*/}
          <span>○</span> <span>●</span> <span>◎</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;