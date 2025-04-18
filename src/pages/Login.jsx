import React from "react";
import "../styles/login.css";

const Login = () => {
    return (
        <div class="container">
            <div class="form-box">
                <h2>Iniciar Sesion</h2>
                <p>¿No tienes una cuenta? <a class="crear-cuenta-link" href="../">Crear cuenta</a></p>
                <form method="POST" action="/login">
                    <input type="text" placeholder="Usuario" required/>
                    <input type="password" placeholder="Contraseña" required />
                    <div class="extra options">
                        <label><input type="checkbox" style={{marginRight: "5px"}}/>Recuerdame</label>
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </div>
    )
};

export default Login;