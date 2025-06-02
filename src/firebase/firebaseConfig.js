// Importa solo los módulos necesarios de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2pBOcwYFVTlve8l03fX91o4xPv-zvCws",
  authDomain: "ecohome-3f5e2.firebaseapp.com",
  projectId: "ecohome-3f5e2",
  storageBucket: "ecohome-3f5e2.firebasestorage.app",
  messagingSenderId: "875733203492",
  appId: "1:875733203492:web:edbf6deb1b70842cb2f6b1",
  measurementId: "G-1YP31D4KTS"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa módulos individuales
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);