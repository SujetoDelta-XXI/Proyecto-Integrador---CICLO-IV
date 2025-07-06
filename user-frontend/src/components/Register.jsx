import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import TermsAndConditions from "./TermsAndConditions";

Modal.setAppElement("#root");

function Register() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
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
      toast.error("El correo debe ser institucional @tecsup.edu.pe");
      return;
    }

    if (!aceptaTerminos) {
      toast.warn("Debes aceptar los Términos y Condiciones.");
      return;
    }

    const usuario = {
      nombre,
      apellidos,
      correo: correo.trim(),
      contraseña,
      telefono,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message || "Usuario registrado con éxito");
        setCorreo('');
        setContraseña('');
        setNombre('');
        setApellidos('');
        setTelefono('');
        setAceptaTerminos(false);
        navigate('/login');
      } else {
        const errorText = await response.json().catch(() => null);
        toast.error(`Error: ${errorText || "Intenta nuevamente"}`);
      }
    } catch (err) {
      toast.error("Error de conexión con el backend");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-600">Crea tu cuenta</h1>
        <p className="text-gray-600 text-center mb-6">Forma parte de <span className="font-semibold">EstiloYa</span></p>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block mb-1 font-medium">Email institucional</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
              placeholder="usuario@tecsup.edu.pe"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Apellidos</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
                value={apellidos}
                onChange={e => setApellidos(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Teléfono</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
            />
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="terminos"
              checked={aceptaTerminos}
              onChange={() => {}}
              disabled
            />
            <label
              htmlFor="terminos"
              className="ml-2 text-sm text-indigo-600 cursor-pointer"
              onClick={handleAbrirModal}
            >
              Acepto los <span className="underline">Términos y Condiciones</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded transition disabled:opacity-50"
            disabled={!aceptaTerminos}
          >
            Crear cuenta
          </button>
        </form>

        {/* MODAL SIN motion */}
        <Modal
          isOpen={showModal}
          onRequestClose={handleCerrarModal}
          contentLabel="Términos y Condiciones"
          className="outline-none border-none bg-transparent flex justify-center items-center"
          overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300"
        >
          <div className="rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full border border-gray-300 bg-white animate-fadeIn">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 px-6 py-4 text-white text-xl font-bold">
              Términos y Condiciones
            </div>
            <div className="p-6 max-h-[400px] overflow-y-auto text-gray-700 space-y-4">
              <TermsAndConditions />
            </div>
            <div className="flex justify-end gap-4 bg-gray-50 p-4 border-t">
              <button
                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 font-semibold transition"
                onClick={handleAceptarTerminos}
                type="button"
              >
                Aceptar
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-400 transition"
                onClick={handleCerrarModal}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Register;
