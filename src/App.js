import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Enter from "./pages/Enter";
import Advance from "./pages/advance";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Estas rutas requieren sesión */}
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
      </Routes>
    </Router>
  );
}

export default App;
