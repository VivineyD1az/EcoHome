// src/pages/Advance.jsx
import React, { useEffect, useState } from 'react';
import './Advance.css';

const Advance = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/advance') // Ajusta la URL según tu backend
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <div className="advance-container">
      <h2>Listado de Avances</h2>
      <table className="advance-table">
        <thead>
          <tr>
            <th>Personas</th>
            <th>Mes</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={index}>
              <td>{item.personas}</td>
              <td>{item.mes}</td>
              <td>{item.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Advance;
