import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../hooks/useUsuario";
import { useCarrito } from "../context/CarritoContext";
import confetti from "canvas-confetti";




function PasarelaPago() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { usuario } = useUsuario();
  const { actualizarCarrito } = useCarrito();   // inyectar para refrescar el contador

  const [clientSecret, setClientSecret] = useState(null);
  const [procesando, setProcesando] = useState(false);

  const [pagoExitoso, setPagoExitoso] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const direccion = localStorage.getItem("direccion");
    const telefono = localStorage.getItem("telefono");

    fetch("http://localhost:8080/api/stripe/crear-intento", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ direccion, telefono }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Error generando el intento de pago");
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("💥 Error al generar el clientSecret", err.message));
  }, []);

  const handlePagoTarjeta = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcesando(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        alert("Error en el pago: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const resp = await fetch(
          `http://localhost:8080/api/stripe/confirmar?paymentIntentId=${result.paymentIntent.id}`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!resp.ok) {
          alert("Error al confirmar pago en backend");
          return;
        }
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
        setPagoExitoso(true);
        actualizarCarrito(); // 🟢 limpia numerito del carrito
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
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {/* Usuario */}
        <div className="md:w-1/3 bg-white rounded-xl shadow p-6 hover:shadow-lg transition border border-indigo-200">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
            Información del Usuario
          </h3>
          {usuario ? (
            <div className="space-y-3 text-gray-700 text-sm text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="avatar"
                className="w-20 h-20 mx-auto rounded-full shadow"
              />
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
            <p className="text-gray-500 text-center">Cargando usuario...</p>
          )}
        </div>

        {/* Pasarela Stripe */}
        <div className="md:w-2/3 bg-white rounded-xl shadow p-6 hover:shadow-lg transition border border-indigo-200">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-6 text-center">
            Finaliza tu Pago
          </h3>
          <form onSubmit={handlePagoTarjeta} className="space-y-5 max-w-md mx-auto">
            <CardElement className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-500 transition" />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded transition"
              disabled={procesando}
            >
              {procesando ? "Procesando..." : "Confirmar Pago"}
            </button>
          </form>
          <div className="flex justify-center mt-6">
            
          </div>
        </div>
      </div>

      {/* MODAL */}
      {pagoExitoso && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 shadow text-center max-w-sm animate-fadeIn">
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
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
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
