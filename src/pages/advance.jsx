import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ChartPage = () => {
  const [meses, setMeses] = useState([]);
  const [costos, setCostos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'datosFormulario'));

      const mesesTemp = [];
      const costosTemp = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        mesesTemp.push("Mes " + data.mes);
        costosTemp.push(data.costo);
      });

      setMeses(mesesTemp);
      setCostos(costosTemp);
    };

    cargarDatos();
  }, []);

  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Costo mensual',
        data: costos,
        backgroundColor: '#879d84',
        borderColor: '#6b8b6d',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4e4e4e',
        },
      },
      x: {
        ticks: {
          color: '#4e4e4e',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#4e4e4e',
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#bcd4a2',
        padding: '0',
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '70vw',
          height: '480px', 
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#6b8b6d', fontSize: '1.8rem', marginBottom: '16px' }}>
          Gráfica de Consumo
        </h2>
        <div style={{ height: '100%', width: '100%' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;