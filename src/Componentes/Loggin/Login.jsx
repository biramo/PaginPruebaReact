import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'  
import { sendPasswordResetEmail } from "firebase/auth"; 
import { auth } from "../DB_firebase/firebase";

export default function Login() {
  const { user, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [mensajeReset, setMensajeReset] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate('/tienda');
    } catch (err) {
        setError(err.message);
    }
  };

  //Maneja el cambio de contraseña del usuario
  const handleResetPassword = async () => {
    if (!email) {
      setError("Escribe tu email primero para recuperar la contraseña");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
          console.log("Email enviado a:", email);  // ← añade esto
      setMensajeReset("Te hemos enviado un email para restablecer tu contraseña");
      setError("");
    } catch (err) {
      setError("No se encontró ninguna cuenta con ese email");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inicio-sesion">
      <h2>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h2>
      {mensajeReset && <p>{mensajeReset}</p>}
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="init-sesion-btn">
        {isRegistering ? "Registrarse" : "Entrar"}
      </button>

      {!isRegistering && (
        <span className="auth-link" onClick={handleResetPassword}>
          ¿Olvidaste tu contraseña?
        </span>
      )}

      <p onClick={() => {
        setIsRegistering(!isRegistering);
        setEmail("");
        setPassword("");
        setError("");
          }}>
        {isRegistering ? (
          <>
            <span>¿Ya tienes cuenta?</span>{" "}
            <span className="auth-link">Inicia sesión</span>
          </>
        ) : (
          <>
            <span>¿No tienes cuenta?</span>{" "}
            <span className="auth-link">Regístrate</span>
          </>
        )}
      </p>
    </form>
  );
}