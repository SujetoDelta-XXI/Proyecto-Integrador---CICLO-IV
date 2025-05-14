import "../css/Register.css";

function Register() {
  return (
    <div className="register-container">
      <h1 className="register-title">EstiloYa</h1>
      <div className="register-section-title">DATOS PERSONALES</div>
      <form className="register-form">
        <label>
          EMAIL
          <input type="email" className="register-input" id="email"/>
        </label>
        <label>
          CONTRASEÑA
          <input type="password" className="register-input" id="password" />
        </label>
        <label>
          NOMBRE
          <input type="text" className="register-input" id="nombre" />
        </label>
        <label>
          APELLIDOS
          <input type="text" className="register-input" id="apellidos"/>
        </label>
        <label>
          TELÉFONO
          <input type="tel" className="register-input" id="telefono" />
        </label>
        <div className="register-checkbox-row">
          <input type="checkbox" id="privacy" />
          <label htmlFor="privacy" className="register-checkbox-label">
            He podido leer y entiendo la Política de Privacidad
          </label>
        </div>
        <button type="submit" className="register-btn">
          CREAR CUENTA
        </button>
      </form>
    </div>
  );
}

export default Register;