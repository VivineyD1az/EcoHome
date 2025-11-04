import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/enter.css";
import enterImage from "../assets/enter.png";
import DataInput from "./DataInput";

const Enter = () => {
  const [showDataInput, setShowDataInput] = useState(false);
  const navigate = useNavigate(); 

  const closeModals = () => {
    setShowDataInput(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/"); // o "/" si tu inicio está ahí
  };

  return (
    <div className="container_enter">
      <h1>EcoHome</h1>
      <div className="container_white"></div>

      {/* Contenedor con todos los botones superiores */}
      <div className="top-buttons">
        <button onClick={() => setShowDataInput(true)}>INGRESO DE DATOS</button>
        <button onClick={() => navigate("/advance")}>CONSULTAR AVANCE</button>
        <button className="logout" onClick={handleLogout}>CERRAR SESIÓN</button>
      </div>

      <div className="container_textButton">
        <p className="titulo_ahorro">AHORRO ENERGÉTICO PARA TU HOGAR</p>
        <p className="descripcion_ahorro">
          Transforma tu consumo: <br />
          Comprende tu gasto, <br />
          Mejora tus hábitos, <br />
          Vive más sostenible.
        </p>
        <button className="button_enter" onClick={() => setShowDataInput(true)}>
          INGRESO DE DATOS
        </button>
      </div>

      <div className="image">
        <img src={enterImage} alt="Ilustración sobre la energía" />
      </div>

      {showDataInput && (
        <div className="data-modal">
          <div className="data-modal-content">
            <button className="data-close-button" onClick={closeModals}>
              X
            </button>
            <DataInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default Enter;
