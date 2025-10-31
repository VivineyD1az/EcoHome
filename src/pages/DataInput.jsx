import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dataInput.css';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // 🔹 Importa la autenticación

const DataInput = () => {
  const [personas, setPersonas] = useState('');
  const [mes, setMes] = useState('');
  const [costo, setCosto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(); // 🔹 Obtener usuario autenticado
    const user = auth.currentUser;

    if (!user) {
      alert('Debes iniciar sesión antes de guardar los datos');
      navigate('/login');
      return;
    }

    const data = {
      uid: user.uid, // 🔹 Guardamos el ID del usuario
      personas: parseInt(personas),
      mes: parseInt(mes),
      costo: parseFloat(costo),
      timestamp: new Date()
    };

    try {
      await addDoc(collection(db, 'datosFormulario'), data);
      console.log('Datos guardados en Firestore');
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
          min="1"
          required
        />
        <input
          type="number"
          placeholder="N° de mes"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          min="1"
          max="12"
          required
        />
        <input
          type="number"
          placeholder="Costo total"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          min="1"
          required
        />
        <button type="submit" className='button_dataInput'>
          Generar recomendación
        </button>
      </form>
    </div>
  );
};

export default DataInput;
