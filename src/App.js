import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendations from "./pages/recommendations";
import DataInput from "./pages/DataInput";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/datainput" element={<DataInput/>}/>
        <Route path="/recommendations" element={<Recommendations />} /> {/* ✅ */}
      </Routes>
    </Router>
  );
}

export default App;
