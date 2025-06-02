import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import '../styles/advance.css';

const Advance = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'avances'));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDatos(docs);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchDatos();
  }, []);

  return (
    <div className="parent">
      <div className="div1">
        <div className="advance-container">
          <h2>Tabla de Avances</h2>
          <table className="advance-table">
            <thead>
              <tr>
                <th>Personas</th>
                <th>Mes</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item) => (
                <tr key={item.id}>
                  <td>{item.personas}</td>
                  <td>{item.mes}</td>
                  <td>${item.costo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Advance;
