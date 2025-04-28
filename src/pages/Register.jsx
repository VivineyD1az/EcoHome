import React from "react";
import styles from "../styles/register.module.css"; // Asegúrate de que la ruta sea correcta

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Crear cuenta</h2>
        <p>¿Ya tienes una cuenta? <a className={styles.loginLink} href="/login">Iniciar sesión</a></p>
        <form method="POST" action="#">
          <input className={styles.input} type="text" placeholder="Nombre de usuario" required />
          <input className={styles.input} type="email" placeholder="Correo electrónico" required />
          <input className={styles.input} type="password" placeholder="Contraseña" required />
          <input className={styles.input} type="password" placeholder="Confirmar contraseña" required />
          <button className={styles.button} type="submit">Registrarme</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
