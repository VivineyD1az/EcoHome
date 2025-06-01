import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dataInput.css';
import '../pages/recommendations.jsx' 

const DataInput = () => {
  const [personas, setPersonas] = useState('');
  const [mes, setMes] = useState('');
  const [costo, setCosto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirige a la ventana de recomendaciones y pasa los datos
    navigate('/recommendations', {
      state: {
        personas: parseInt(personas),
        mes: parseInt(mes),
        costo: parseFloat(costo)
      }
    });
  };

  return (
    <div className="container">
      <h2 className='h2-input'>Ingreso de datos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Número de Personas"
          value={personas}
          onChange={(e) => setPersonas(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="N° de mes"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Costo total"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          required
        />
        <button type="submit" className='button_dataInput'>Generar recomendación</button>
      </form>
    </div>
  );
};

export default DataInput;
