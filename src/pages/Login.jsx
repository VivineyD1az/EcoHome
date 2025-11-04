import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom"; 

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);

      // ✅ Guardar el usuario autenticado en localStorage
      localStorage.setItem("user", JSON.stringify(userCredential.user));

      // Redirigir a la página de entrada después de iniciar sesión
      navigate("/enter");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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
