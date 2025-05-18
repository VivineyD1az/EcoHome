import { useState } from "react";
import "../styles/home.css";
import imageHome from "../assets/imageHome.svg";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="container_home">
      <h1>EcoHome</h1>
      <div className="container_white"></div>
      <div className="enter-page">
        <button onClick={() => setShowLogin(true)}>Iniciar sesión</button>
        <button onClick={() => setShowRegister(true)}>Crear una cuenta</button>
      </div>

      <div className="container_textButton">
        <p>¡Mejora tu consumo de energía ahora!</p>
        <button className ='button_ya' onClick={() => setShowLogin(true)}>EMPIEZA YA</button>
      </div>

      <div className="image">
        <img src={imageHome} alt="Ilustración sobre la energía" />
        <p>
          Imagen de{" "}
          <a href="https://storyset.com/idea" target="_blank" rel="noopener noreferrer">
            Storyset
          </a>
        </p>
      </div>

      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModals}>X</button>
            <Login />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModals}>X</button>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
