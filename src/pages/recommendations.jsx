import React from 'react';
import '../styles/recommendations.css'; 
import placeholderImg from '../assets/placeholder.png'; 

const recommendationsData = [
  {
    title: "Optimización de Consumo",
    text: [
      "Si tu proveedor de electricidad ofrece tarifas diferenciadas por horario: Programa el uso de electrodomésticos en horas valle (cuando la energía es más barata). Evita operar equipos de alto consumo en horas pico."
    ]
  },
  {
    title: "Gestión Eficiente de Equipos",
    text: [
      "Si tu proveedor de electricidad ofrece tarifas diferenciadas por horario: Programa el uso de electrodomésticos en horas valle (cuando la energía es más barata). Evita operar equipos de alto consumo en horas pico."
    ]
  },
  {
    title: "Monitoreo y Automatización",
    text: [
      "Implementa sistemas de gestión energética (EMS) para: Medir y analizar el consumo en tiempo real. Detectar ineficiencias y sobrecargos. Automatizar el encendido y apagado de dispositivos clave."
    ]
  }
];

export default function Recommendations() {
  return (
    <div className="recommendations-container">
      <h1>Recomendaciones</h1>
      {recommendationsData.map((item, index) => (
        <div className="recommendation" key={index}>
          <img src={placeholderImg} alt="Ícono recomendación" />
          <div className="recommendation-text">
            <h2>{item.title}</h2>
            {item.text.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
