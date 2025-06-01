import { useLocation, useNavigate } from "react-router-dom";
import '../styles/recommendations.css';
const Reccomendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { personas, mes, costo } = location.state || {};

  if (!personas || !mes || !costo) {
    return (
      <div className="no-data-content">
        <p>No se han recibido datos. Regresa e intenta de nuevo.</p>
        <button className="back-button" onClick={() => navigate("/enter", { replace: true })}>Volver</button>
      </div>
    );

  }

  const generarRecomendacion = () => {
    if (costo > 100000) {
      return "Tu gasto es muy alto. Considera revisar electrodomésticos de alto consumo y usar bombillos LED.";
    } else if (costo > 50000) {
      return "Estás dentro de un consumo medio. Puedes ahorrar más con hábitos conscientes de consumo.";
    } else {
      return "¡Buen trabajo! Tu consumo es bajo. Sigue así y motiva a otros a hacerlo también.";
    }
  };

  return (
    <div className="container">
      <h2>Recomendaciones</h2>
      <p><strong>Personas:</strong> {personas}</p>
      <p><strong>Mes:</strong> {mes}</p>
      <p><strong>Costo:</strong> ${costo.toLocaleString()}</p>
      <div className="recomendacion">
        <p>{generarRecomendacion()}</p>
      </div>
      <button className="back-button" onClick={() => navigate("/enter")}>Volver al inicio</button>
    </div>
  );
};

export default Reccomendations;