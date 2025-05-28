import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Este archivo ahora contendrá las directivas de Tailwind
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "111391433368-v47kf1iivrmamvmi1fhmdltg3klobpn8.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);