import React, { useState } from "react";
import "../css/Register.css";

function Register() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!correo.endsWith("@tecsup.edu.pe")) {
      alert("El correo debe ser institucional de Tecsup (@tecsup.edu.pe)");
      return;
    }

    if (!aceptaPrivacidad) {
      alert("Debes aceptar la Política de Privacidad.");
      return;
    }

    const usuario = {
      nombre,
      apellidos,
      correo,
      contraseña,
      telefono,
      tipoUsuario: "cliente"
    };

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        // Lee el texto de la respuesta
        const text = await response.text();
        let data = null;
        if (text) {
          try {
            data = JSON.parse(text);
          } catch(err) {
            console.error('Error al parsear la respuesta JSON:', err);
          }
        }
        alert('Usuario registrado con éxito');
        console.log('Respuesta del backend:', data);
        // Limpia los campos
        setCorreo('');
        setContraseña('');
        setNombre('');
        setApellidos('');
        setTelefono('');
        setAceptaPrivacidad(false);
      } else {
        // Intenta leer el error como texto, pero si falla, muestra un mensaje genérico
        let errorMsg = 'Error al registrar usuario';
        try {
          const errorText = await response.text();
          if (errorText) errorMsg += ': ' + errorText;
        } catch  {
          // Si no se puede leer el texto, ignora
        }
        alert(errorMsg);
      }
    } catch (err) {
      alert('Error de conexión con el backend');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">EstiloYa</h1>
      <div className="register-section-title">DATOS PERSONALES</div>
      <form className="register-form" onSubmit={handleRegister}>
        <label>
          EMAIL
<<<<<<< HEAD
          <input
            type="email"
            className="register-input"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />
        </label>
        <label>
          CONTRASEÑA
          <input
            type="password"
            className="register-input"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            required
          />
        </label>
        <label>
          NOMBRE
          <input
            type="text"
            className="register-input"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          APELLIDOS
          <input
            type="text"
            className="register-input"
            value={apellidos}
            onChange={e => setApellidos(e.target.value)}
            required
          />
        </label>
        <label>
          TELÉFONO
          <input
            type="tel"
            className="register-input"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
=======
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
>>>>>>> aa574ccdc6676ff2e29763421e95f4aab3846f21
        </label>
        <div className="register-checkbox-row">
          <input
            type="checkbox"
            id="privacy"
            checked={aceptaPrivacidad}
            onChange={e => setAceptaPrivacidad(e.target.checked)}
          />
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