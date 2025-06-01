import { useState } from "react";
import "../styles/enter.css";
import imageHome from "../assets/imageHome.svg";
import DataInput from "./DataInput";
import Recommendations from "./recommendations";

const Enter = () => {
  const [showDataInput, setShowDataInput] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const closeModals = () => {
    setShowDataInput(false);
    setShowRecommendations(false);
  };

  return (
    <div className="container_enter">
        <h1>EcoHome</h1>
        <div className="container_white"></div>

        <div className="input-button">
            <button onClick={() => setShowDataInput(true)}>INGRESO DE DATOS</button>
        </div>

        <div className="recommendation-button">
            <button onClick={() => setShowRecommendations(true)}>CONSULTAR AVANCE</button>
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
        <img src={imageHome} alt="Ilustración sobre la energía" />
        <p>
          Imagen de{" "}
          <a
            href="https://storyset.com/idea"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storyset
          </a>
        </p>
      </div>

      {showDataInput && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModals}>
              X
            </button>
            <DataInput />
          </div>
        </div>
      )}

      {showRecommendations && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModals}>
              X
            </button>
            <Recommendations />
          </div>
        </div>
      )}
    </div>
  );
};

export default Enter;
