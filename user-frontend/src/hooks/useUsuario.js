// src/hooks/useUsuario.js
import { useState, useEffect } from "react";

export function useUsuario() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject("Token inválido"))
      .then((data) => setUsuario(data))
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
        setUsuario(null);
      });
  }, []);

  return { usuario };
}
