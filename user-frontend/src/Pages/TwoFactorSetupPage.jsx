import React, { useEffect, useState } from "react";
import TwoFactorSetup from "../components/TwoFactorSetup";

function TwoFactorSetupPage() {
  const [correo, setCorreo] = useState("");
  const [metodos, setMetodos] = useState({ sms: false, correo: false });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token actual:", token); // 👀 Log de ayuda

    if (!token) {
      alert("No estás autenticado.");
      window.location.assign("/login");
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
          const errText = await res.text();
          throw new Error(`Error ${res.status}: ${errText}`);
        }

        const data = await res.json();
        console.log("Respuesta /api/me:", data); // 👀 Log de ayuda

        if (!data.correo) {
          throw new Error("La respuesta no contiene correo.");
        }

        setCorreo(data.correo);
        setMetodos({
          sms: !!data.telefono,
          correo: !!data.correoAlternativo,
        });
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        alert("Error al cargar los métodos de autenticación.");
      } finally {
        setCargando(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (cargando) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <TwoFactorSetup
      correo={correo}
      metodos={metodos}
      onSuccess={() => window.location.assign("/")}
      onCancel={() => window.location.assign("/")}
    />
  );
}

export default TwoFactorSetupPage;
