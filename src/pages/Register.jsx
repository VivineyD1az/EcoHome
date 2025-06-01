import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css";

const Register = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.text();
    alert(result);

    if (response.ok) {
      navigate("/enter");
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
          <input name="username" onChange={handleChange} className={styles.input} type="text" placeholder="Nombre de usuario" required />
          <input name="email" onChange={handleChange} className={styles.input} type="email" placeholder="Correo electrónico" required />
          <input name="password" onChange={handleChange} className={styles.input} type="password" placeholder="Contraseña" required />
          <input name="confirmPassword" onChange={handleChange} className={styles.input} type="password" placeholder="Confirmar contraseña" required />
          <button className={styles.button_register} type="submit">Registrarme</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
