import { Link, useNavigate } from "react-router-dom";
import "../css/LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="loginform-container">
      <div className="loginform-title">EstiloYa</div>
      <h1 className="loginform-welcome">BIENVENIDO/A</h1>
      <p className="loginform-subtitle">
        Inicia sesión con tu correo electrónico o regístrate
      </p>
      <form className="loginform-form">
        <label>
          Email
          <input type="email" className="loginform-input" />
        </label>
        <label>
          Contraseña
          <input type="password" className="loginform-input" />
        </label>  
        <div className="loginform-forgot">
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </div>
        <button type="submit" className="loginform-btn black">
          CONTINUAR
        </button>
        <button
          type="button"
          className="loginform-btn white"
          onClick={() => navigate(-1)}
        >
          ATRÁS
        </button>
      </form>
    </div>
  );
}

export default LoginForm;