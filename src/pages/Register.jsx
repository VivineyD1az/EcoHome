import React, { useState } from "react";
import styles from "../styles/register.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        confirmButtonColor: '#03920fff'
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      console.log(userCredential.user);

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        showConfirmButton: false,
        timer: 2000
      });
      
      setTimeout(()=>onSwitchToLogin(),2000);   // Llama a la función para cambiar a la página de inicio de sesión
      
    
    } catch (error) {
      let message = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "El correo electrónico ya está en uso.";
          break;
        case "auth/invalid-email":
          message = "Correo electrónico inválido.";
          break;
        case "auth/weak-password":
          message = "La contraseña es demasiado débil (Debe tener al menos 6 caracteres)";
          break;
        default:
          message = "Error al registrar: " + error.message + "Intenta de nuevo.";
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