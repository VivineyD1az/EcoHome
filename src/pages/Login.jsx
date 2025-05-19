import React from "react";
import styles from "../styles/login.module.css";

const Login = ({ onSwitchToRegister }) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Iniciar sesión</h2>
        <p className={styles.paragraph}>
          ¿No tienes una cuenta?{" "}
          <span className={styles.crearCuentaLink} onClick={onSwitchToRegister}>
            Crear cuenta
          </span>
        </p>
        <form className={styles.form}>
          <input className={styles.input} type="text" placeholder="Usuario" required />
          <input className={styles.input} type="password" placeholder="Contraseña" required />
          <div className={styles.extraOptions}>
            <label>
              <input type="checkbox" style={{ marginRight: "5px" }} /> Recuérdame
            </label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <button className={styles.buttonlogin} type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
