import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendations from "./pages/recommendations";
import DataInput from "./pages/DataInput";
import Enter from "./pages/Enter";
import Advance from "./pages/advance";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/datainput" element={<DataInput/>}/>
        <Route path="/recommendations" element={<Recommendations />} /> 
        <Route path="/enter" element={<Enter />} />
        <Route path="/advance" element={<Advance />} />
      </Routes>
    </Router>
  );
}

export default App;
