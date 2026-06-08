import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'  
export default function Login() {
  const { user, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

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

  return (
    <form onSubmit={handleSubmit} class="form-inicio-sesion">
      <h2>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h2>
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