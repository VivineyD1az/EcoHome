import React, { useState } from "react";
import styles from "../styles/register.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      console.log(userCredential.user);
      
      if (onSwitchToLogin) {
        onSwitchToLogin();   // Llama a la función para cambiar a la página de inicio de sesión
      }
    
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Crear cuenta</h2>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <span className={styles.loginLink} onClick={onSwitchToLogin}>
            Iniciar sesión
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <input name="email" onChange={handleChange} className={styles.input} type="email" placeholder="Correo electrónico" required />
          <input name="password" onChange={handleChange} className={styles.input} type="password" placeholder="Contraseña" required />
          <input name="confirmPassword" onChange={handleChange} className={styles.input} type="password" placeholder="Confirmar contraseña" required />
          <button className={styles.button_register} type="submit">Registrarme</button>
        </form>
      </div>
    </div>
  );
};

export default Register;