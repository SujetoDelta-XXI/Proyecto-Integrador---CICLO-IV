import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/interfaces/Login";
import Footer from "./components/interfaces/Footer";
import Register from "./components/interfaces/Register";
import LoginForm from "./components/interfaces/LoginForm";
import Index from "./components/interfaces/Index";

function App() {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginForm" element={<LoginForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;