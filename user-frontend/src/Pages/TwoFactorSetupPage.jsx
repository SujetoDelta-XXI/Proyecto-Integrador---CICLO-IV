// src/pages/TwoFactorSetupPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TwoFactorSetup from "../components/TwoFactorSetup";

function TwoFactorSetupPage() {
  const [metodos, setMetodos] = useState({ sms: false, correo: false });
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("tokenTemporal");
    if (!token) {
      alert("No estás autenticado.");
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        console.log("Usuario autenticado:", data);

        setMetodos({
          sms: false,
          correo: !!data.correoAlternativo,
        });
      } catch {
        alert("Error al cargar métodos 2FA.");
        navigate("/login");
      } finally {
        setCargando(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (cargando) {
    return <div className="text-center mt-10">Cargando datos...</div>;
  }

  const registrarCorreoForzado = !metodos.correo; // forzar registro si no tiene correo alternativo

  return (
    <TwoFactorSetup
      metodos={metodos}
      registrarCorreoForzado={registrarCorreoForzado}
      onSuccess={() => navigate("/")} // éxito total = vuelve al home
      onCancel={() => navigate("/")}
    />
  );
}

export default TwoFactorSetupPage;

