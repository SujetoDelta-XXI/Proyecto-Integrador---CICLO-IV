import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../hooks/useUsuario";

import yapeImg from "../assets/yape.png";
import plinImg from "../assets/plin.png";
import cardImg from "../assets/tarjeta.png";
import bcpImg from "../assets/bcp.png";
import bbvaImg from "../assets/bbva.png";
import interbankImg from "../assets/interbank.png";

function PasarelaPago() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { usuario } = useUsuario();

  const [clientSecret, setClientSecret] = useState(null);
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [procesando, setProcesando] = useState(false);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [bancoLogo, setBancoLogo] = useState(cardImg);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  const token = localStorage.getItem("token");
  

  useEffect(() => {
    // recuperar dirección y teléfono guardados
    const direccion = localStorage.getItem("direccion");
    const telefono = localStorage.getItem("telefono");

    fetch("http://localhost:8080/api/stripe/crear-intento", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direccion,
        telefono,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Error generando el intento de pago");
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) =>
        console.error("💥 Error al generar el clientSecret", err.message)
      );
  }, []);

  const handleBancoLogo = (num) => {
    const prefix = num.slice(0, 4);
    if (["4509", "4210"].includes(prefix)) setBancoLogo(bcpImg);
    else if (["5159", "4001"].includes(prefix)) setBancoLogo(bbvaImg);
    else if (["5022", "6393"].includes(prefix)) setBancoLogo(interbankImg);
    else setBancoLogo(cardImg);
  };

  const handlePagoTarjeta = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcesando(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert("Error en el pago: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
  const resp = await fetch(
    `http://localhost:8080/api/stripe/confirmar?paymentIntentId=${result.paymentIntent.id}`,
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    }
  );

  if (!resp.ok) {
    alert("Error al confirmar pago en backend");
    return;
  }

  setPagoExitoso(true);
}

    } catch (e) {
      console.error("Error confirmando pago", e);
      alert("Ocurrió un error al confirmar el pago. Intenta nuevamente.");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <>
      {/* layout */}
      <div className="grid grid-cols-3 gap-6 px-8 py-6">
        {/* IZQUIERDA - Usuario */}
        <div className="col-span-1 bg-blue-50 rounded-xl p-5 shadow-md">
          <h3 className="text-lg font-bold text-blue-700 mb-4">
            Información del Usuario
          </h3>
          {usuario ? (
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Nombre:</strong> {usuario.nombre} {usuario.apellidos}
              </p>
              <p>
                <strong>Correo:</strong> {usuario.correo}
              </p>
              <p>
                <strong>Teléfono:</strong> {usuario.telefono}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Cargando datos del usuario...</p>
          )}
        </div>

        {/* DERECHA - Formulario */}
        <div className="col-span-2 bg-white rounded-xl p-5 shadow-md">
          <h3 className="text-xl font-semibold text-blue-800 mb-5">
            Método de pago
          </h3>

          {/* Selector de método */}
          <div className="flex gap-4 mb-6">
            {["tarjeta", "yape", "plin"].map((metodo) => (
              <div
                key={metodo}
                className={`border p-3 rounded cursor-pointer flex items-center gap-2 ${
                  metodoPago === metodo ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setMetodoPago(metodo)}
              >
                <img
                  src={
                    metodo === "tarjeta"
                      ? cardImg
                      : metodo === "yape"
                      ? yapeImg
                      : plinImg
                  }
                  alt={metodo}
                  className="w-10"
                />
                <span className="capitalize">{metodo}</span>
              </div>
            ))}
          </div>

          {/* TARJETA */}
          {metodoPago === "tarjeta" && (
            <form onSubmit={handlePagoTarjeta} className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={bancoLogo} alt="Banco" className="w-20" />
                <input
                  type="text"
                  maxLength="16"
                  placeholder="Número de tarjeta"
                  value={numeroTarjeta}
                  onChange={(e) => {
                    setNumeroTarjeta(e.target.value);
                    handleBancoLogo(e.target.value);
                  }}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <CardElement className="border p-3 rounded" />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded w-full"
                disabled={procesando}
              >
                {procesando ? "Procesando..." : "Pagar con tarjeta"}
              </button>
            </form>
          )}

          {/* YAPE */}
          {metodoPago === "yape" && (
            <div className="border p-5 rounded shadow-sm bg-purple-50">
              <h4 className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <img src={yapeImg} alt="Yape" className="w-8" /> Pagar con Yape
              </h4>
              <ol className="list-decimal pl-5 text-gray-700 mb-3 text-sm">
                <li>Haz clic en "Pagar" y elige "Pago con Yape".</li>
                <li>Ingresa tu número de celular.</li>
                <li>Obtén tu código de aprobación desde la app de Yape.</li>
              </ol>
              <input
                type="tel"
                placeholder="987654321"
                className="border rounded p-2 w-full mb-3"
                maxLength={9}
              />
              <input
                type="text"
                placeholder="Código de aprobación"
                className="border rounded p-2 w-full"
                maxLength={6}
              />
              <button className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 w-full">
                Confirmar pago con Yape
              </button>
            </div>
          )}

          {/* PLIN */}
          {metodoPago === "plin" && (
            <div className="text-center p-4 bg-gray-50 rounded">
              <img
                src="/assets/plinqr.png"
                alt="QR Plin"
                className="mx-auto w-60"
              />
              <p className="mt-4 text-sm text-gray-600">
                Escanea el código QR con Plin para confirmar el pago.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {pagoExitoso && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 shadow text-center max-w-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="check"
              className="w-16 mx-auto mb-4"
            />
            <h2 className="text-green-600 text-xl font-bold mb-2">
              ¡Pago confirmado!
            </h2>
            <p className="text-gray-700 mb-4">
              Gracias por tu compra. Hemos enviado la confirmación a tu correo.
            </p>
            <button
              onClick={() => navigate("/productos")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Ir a productos
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PasarelaPago;
