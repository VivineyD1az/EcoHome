import React, { useState } from 'react';
import '../styles/dataInput.css';

const DataInput = () => {
  const [personas, setPersonas] = useState('');
  const [mes, setMes] = useState('');
  const [costo, setCosto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Personas:", personas);
    console.log("Mes:", mes);
    console.log("Costo:", costo);
    // Aquí podrías hacer lógica adicional, como enviar a una API
    alert("Datos enviados correctamente 🎉");
  };

  return (
    <div className="container">
      <h2>Ingreso de datos</h2>
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
          placeholder="Costo total del consumo"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          required
        />
        <button type="submit">Generar recomendación</button>
      </form>
    </div>
  );
};

export default DataInput;