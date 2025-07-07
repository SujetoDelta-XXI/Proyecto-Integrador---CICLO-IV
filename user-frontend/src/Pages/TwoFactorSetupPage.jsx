import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TwoFactorSetup from "../components/TwoFactorSetup";

function TwoFactorSetupPage() {
  const [metodos, setMetodos] = useState({ sms: false, correo: false });
  const [cargando, setCargando] = useState(true);
  const [registrarCorreoForzado, setRegistrarCorreoForzado] = useState(false);
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

        // corregimos la lectura
        const tiene2FA = data.tiene2FAConfigurado;
        const correoAlternativo = data.correoAlternativo;

        setMetodos({
          sms: false,
          correo: true, // asumimos que siempre correo habilitado
        });

        // corregida la decisión:
        setRegistrarCorreoForzado(tiene2FA === false || !correoAlternativo);

        console.log("registrarCorreoForzado:", tiene2FA === false || !correoAlternativo);

      } catch (error) {
        console.error(error);
        alert("Error al cargar datos del usuario.");
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

  return (
    <TwoFactorSetup
      metodos={metodos}
      registrarCorreoForzado={registrarCorreoForzado}
      onSuccess={() => navigate("/")}
      onCancel={() => navigate("/")}
    />
  );
}

export default TwoFactorSetupPage;


