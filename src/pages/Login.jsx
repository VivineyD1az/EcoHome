import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";

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

      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        showConfirmButton: false,
        timer: 1500
      });

      // Redirigir a la página de entrada después de iniciar sesión
      setTimeout(()=>navigate("/enter"), 1600);
    } catch (error) {
      let message = "";

      switch (error.code) {
        case "auth/invalid-credential":
          message = "Usuario o Contraseña incorrecta.";
          break;
        default:
          message = "Error al iniciar sesión: " + error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#03920fff'
      });
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
