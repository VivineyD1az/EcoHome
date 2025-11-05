import { useEffect, useState } from "react";
import "../styles/home.css";
import imageHome from "../assets/imageHome.svg";
import Login from "./Login";
import Register from "./Register";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { setUser(currentUser); 
      if (currentUser) {
        navigate("/enter", { replace: true }); // 🔁 evita volver con "atrás"
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="container_home">
      <h1>EcoHome</h1>
      <div className="container_white"></div>

      {!user ? (
      <div className="enter-page">
        <button onClick={() => setShowLogin(true)}>INICIAR SESION</button>
        <button onClick={() => setShowRegister(true)}>CREAR CUENTA</button>
      </div>
      ) : (
        <div className="enter-page">
          <button onClick={() => navigate("/enter")}>VOLVER AL PANEL</button>
          <button className="logout" onClick={handleLogout}>CERRAR SESIÓN</button>
        </div>
      )}

      <div className="container_textButton">
        <p>¡Mejora tu consumo de energía ahora!</p>
        <button className="button_ya" onClick={() => setShowLogin(true)}>EMPIEZA YA</button>
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
            <Login onSwitchToRegister={switchToRegister} />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModals}>X</button>
            <Register onSwitchToLogin={switchToLogin} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
