import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendations from "./pages/recommendations";
import DataInput from "./pages/DataInput";
import Enter from "./pages/Enter";
import Advance from "./pages/advance";
import ProtectedRoute from "./ProtectedRoute"; // ✅ Importamos el protector de rutas

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommendations" element={<Recommendations />} />

        {/* 🔒 Rutas protegidas (solo con sesión activa) */}
        <Route
          path="/enter"
          element={
            <ProtectedRoute>
              <Enter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/advance"
          element={
            <ProtectedRoute>
              <Advance />
            </ProtectedRoute>
          }
        />

        {/* (opcional) ruta para DataInput, solo si debe estar protegida */}
        <Route
          path="/datainput"
          element={
            <ProtectedRoute>
              <DataInput />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
