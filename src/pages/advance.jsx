import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import '../styles/advance.css';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ChartPage = () => {
  const [meses, setMeses] = useState([]);
  const [costos, setCostos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'datosFormulario'));

      const datosPorMes = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const mes = data.mes;
        const costo = parseFloat(data.costo) || 0;

        if (datosPorMes[mes]) {
          datosPorMes[mes] += costo;
        } else {
          datosPorMes[mes] = costo;
        }
      });

      const datosTemp = Object.keys(datosPorMes)
        .map(mes => ({
          mes: parseInt(mes),
          costo: datosPorMes[mes]
        }))
        .sort((a, b) => a.mes - b.mes);

      const mesesTemp = datosTemp.map(item => "Mes " + item.mes);
      const costosTemp = datosTemp.map(item => item.costo);

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
  };

  return (
    <div className="chart-page-container">
      <div className="chart-card">
        <h2 className="chart-title">
          Gráfica de Consumo
        </h2>
        <div className="chart-wrapper">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;