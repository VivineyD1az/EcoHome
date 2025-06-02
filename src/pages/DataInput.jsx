import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dataInput.css';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore'; // funciones para guardar datos

const DataInput = () => {
  const [personas, setPersonas] = useState('');
  const [mes, setMes] = useState('');
  const [costo, setCosto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      personas: parseInt(personas),
      mes: parseInt(mes),
      costo: parseFloat(costo),
      timestamp: new Date()
    };

    try {
      // Guardar en Firebase
      await addDoc(collection(db, 'datosFormulario'), data);
      console.log('Datos guardados en Firestore');

      // Redirigir a la página de recomendaciones
      navigate('/recommendations', { state: data });
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  };

  return (
    <div className="container_general">
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

export default DataInput;