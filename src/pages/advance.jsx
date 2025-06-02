// import React, { useEffect, useState } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import '../styles/advance.css'; // usa el estilo que gustes

// ChartJS.register(BarElement, CategoryScale, LinearScale);

// const ChartPage = () => {
//   const [meses, setMeses] = useState([]);
//   const [costos, setCostos] = useState([]);

//   useEffect(() => {
//     const cargarDatos = async () => {
//       const db = getFirestore();
//       const querySnapshot = await getDocs(collection(db, 'datosFormulario'));

//       const mesesTemp = [];
//       const costosTemp = [];

//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         mesesTemp.push("Mes " + data.mes);
//         costosTemp.push(data.costo);
//       });

//       setMeses(mesesTemp);
//       setCostos(costosTemp);
//     };

//     cargarDatos();
//   }, []);

//   const data = {
//     labels: meses,
//     datasets: [
//       {
//         label: 'Costo mensual',
//         data: costos,
//         backgroundColor: '#879d84',
//         borderColor: '#6b8b6d',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: { beginAtZero: true },
//     },
//   };

//   return (
//     <div className="chart-container">
//       <h2>Gráfica de Consumo</h2>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default ChartPage;