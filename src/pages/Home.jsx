import { Link } from "react-router-dom";
import "../App.css"; // Usa tu propio archivo de estilos si tienes uno
import imageHome from "../logo.svg"; // Cambia a tu imagen cuando la tengas

const Home = () => {
  return (
    <div className="container">
      <h2>EcoHome</h2>

      <div className="enter-page">
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/register">Crear una cuenta</Link>
      </div>

      <div className="container_textButton">
        <p>¡Mejora tu consumo de energía ahora!</p>
        <Link to="/login">EMPIEZA YA</Link>
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
    </div>
  );
};

export default Home;
