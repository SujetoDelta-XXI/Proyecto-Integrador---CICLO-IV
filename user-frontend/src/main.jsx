import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Este archivo ahora contendrá las directivas de Tailwind
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CarritoProvider } from "./context/CarritoContext";
const clientId = "111391433368-v47kf1iivrmamvmi1fhmdltg3klobpn8.apps.googleusercontent.com";
const stripePromise = loadStripe("pk_test_51RdbLM01d3BKrTP8Jif5rcz1nVryFj0tk2Xxu0KPuRaCvADr78VkwWCVaaFStrOHg9zq20U2FRA8cwpQgJPyAWa1003ClrHs7R"); 
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <CarritoProvider>
    <GoogleOAuthProvider clientId={clientId}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </GoogleOAuthProvider>
    </CarritoProvider>
  </React.StrictMode>
);