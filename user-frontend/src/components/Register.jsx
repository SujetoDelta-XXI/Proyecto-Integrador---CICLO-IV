import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import TermsAndConditions from "./TermsAndConditions";

// Importante: esto debe ir al principio, fuera del componente, solo una vez en tu app.
Modal.setAppElement("#root");

function Register() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);

  // Estado para Términos y Modal
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleAbrirModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleAceptarTerminos = () => {
    setAceptaTerminos(true);
    setShowModal(false);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!correo.trim().endsWith("@tecsup.edu.pe")) {
      alert("El correo debe ser institucional de Tecsup (@tecsup.edu.pe)");
      return;
    }

    if (!aceptaTerminos) {
      alert("Debes aceptar los Términos y Condiciones.");
      return;
    }

    if (!aceptaPrivacidad) {
      alert("Debes aceptar la Política de Privacidad.");
      return;
    }

    const usuario = {
      nombre,
      apellidos,
      correo: correo.trim(),
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
        setCorreo('');
        setContraseña('');
        setNombre('');
        setApellidos('');
        setTelefono('');
        setAceptaPrivacidad(false);
        setAceptaTerminos(false);
        navigate('/')
      } else {
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
    <div className="max-w-md mx-auto mt-10 text-left">
      <h1 className="text-4xl font-bold mb-6">EstiloYa</h1>
      <div className="text-lg font-medium mb-4 mt-2">DATOS PERSONALES</div>
      <form className="flex flex-col" onSubmit={handleRegister}>
        <label className="block text-base mb-1 mt-4 font-normal">
          EMAIL
          <input
            type="email"
            className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
            id="email"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />
        </label>
        <label className="block text-base mb-1 mt-4 font-normal">
          CONTRASEÑA
          <input
            type="password"
            className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
            id="password"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
          />
        </label>
        <label className="block text-base mb-1 mt-4 font-normal">
          NOMBRE
          <input
            type="text"
            className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
            id="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </label>
        <label className="block text-base mb-1 mt-4 font-normal">
          APELLIDOS
          <input
            type="text"
            className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
            id="apellidos"
            value={apellidos}
            onChange={e => setApellidos(e.target.value)}
          />
        </label>
        <label className="block text-base mb-1 mt-4 font-normal">
          TELÉFONO
          <input
            type="tel"
            className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
            id="telefono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
        </label>
        
        {/* Términos y Condiciones con Modal */}
        <div className="flex items-center mt-2 mb-2">
          <input
            type="checkbox"
            id="terminos"
            checked={aceptaTerminos}
            onChange={() => {}}
            disabled
          />
          <label
            htmlFor="terminos"
            className="text-sm ml-2 text-gray-800 cursor-pointer underline"
            style={{ cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}
            onClick={handleAbrirModal}
          >
            He leído y acepto los <span style={{color:"#1976d2"}}>Términos y Condiciones</span>
          </label>
        </div>

        {/* Modal usando react-modal */}
        <Modal
  isOpen={showModal}
  onRequestClose={handleCerrarModal}
  contentLabel="Términos y Condiciones"
  className="bg-white rounded-lg shadow-xl p-0 max-w-xl w-full mx-auto mt-24 border border-gray-300 outline-none"
  overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
>
  <div className="p-6">
    <TermsAndConditions />
    <div className="flex justify-end gap-4 mt-6">
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 font-semibold"
        onClick={handleAceptarTerminos}
        type="button"
      >
        Aceptar
      </button>
      <button
        className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 font-semibold"
        onClick={handleCerrarModal}
        type="button"
      >
        Cancelar
      </button>
    </div>
  </div>
</Modal>

        {/* Política de privacidad */}
        <div className="flex items-center mt-2 mb-6">
          <input
            type="checkbox"
            id="privacy"
            checked={aceptaPrivacidad}
            onChange={e => setAceptaPrivacidad(e.target.checked)}
          />
          <label htmlFor="privacy" className="text-sm ml-2 text-gray-800">
            He podido leer y entiendo la Política de Privacidad
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-white text-gray-800 border border-gray-800 text-base cursor-pointer rounded-none transition-colors duration-200 hover:bg-gray-800 hover:text-white"
          disabled={!aceptaTerminos || !aceptaPrivacidad}
        >
          CREAR CUENTA
        </button>
      </form>
    </div>
  );
}

export default Register;
