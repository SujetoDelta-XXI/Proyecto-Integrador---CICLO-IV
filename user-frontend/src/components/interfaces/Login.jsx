import { Link } from "react-router-dom";
import "../css/Login.css"; 

function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">BIENVENIDO/A</h1>
      <p className="login-subtitle">
        Inicia sesión con tu correo electrónico o regístrate
      </p>
      <div className="login-buttons">
        <Link to="../loginForm" className="login-btn white">
          INICIAR SESIÓN
        </Link>
        <Link to="../register" className="login-btn black">
          REGÍSTRATE
        </Link>
      </div>
      <div className="login-secure">
        <span className="lock-icon">🔒</span>
        <span>Todos los datos de mantienen de forma segura</span>
      </div>
    </div>
  );
}

export default Login;