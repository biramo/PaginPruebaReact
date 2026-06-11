import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'  
import { sendPasswordResetEmail, updateProfile } from "firebase/auth"; 
import { auth } from "../DB_firebase/firebase";
import './Login.css'

export default function Login() {

  const { user, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [compPassword, setCompPassword]=useState("");
  const [nombre, setNombre]=useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [mensajeReset, setMensajeReset] = useState(""); 
  const [verPassword, setVerPassword]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        if(compPassword!==password){
          setError("Contraseña no coincide")
          return;
        }
        const userCredential = await register(email, password);
        await updateProfile(userCredential.user,{
          displayName:nombre
        })

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

  if(!isRegistering){
    return(
    <form onSubmit={handleSubmit} className="form-inicio-sesion">
      <h2> Iniciar sesión</h2>
      <p>{mensajeReset}</p>
      <p>{error}</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type={verPassword ? "text":"password"}
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label className="checkbox-container">
        <input 
          className="checkbox-input"
          type="checkbox"
          checked={verPassword}
          // 💡 Tip: Usa onChange en vez de onClick para inputs tipo checkbox/radio en React
          onChange={() => setVerPassword(!verPassword)}   
        />
        <span>Mostrar contraseña</span>
      </label>
      <button type="submit" className="init-sesion-btn">
        {isRegistering ? "Registrarse" : "Entrar"}
      </button>
        <span className="auth-link" onClick={handleResetPassword}>
          ¿Olvidaste tu contraseña?
        </span>
          <p onClick={() => {
        setIsRegistering(!isRegistering);
        setEmail("");
        setPassword("");
        setError("");
          }}>
          <span>¿No tienes cuenta?</span>{" "}
          <span className="auth-link">Regístrate</span> 
        </p>
    </form>
      );
  }


  return (   
   <form onSubmit={handleSubmit} className="form-inicio-sesion">
      <h2> Registrate</h2>
      <p>{error}</p>
      <input type="text"
      placeholder="Usuario"
      value={nombre}
      onChange={(e)=>setNombre(e.target.value)}
      required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type={verPassword ? "text":"password"}
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type={verPassword ? "text":"password"}
        placeholder="Repite la contraseña"
        value={compPassword}
        onChange={(e)=>setCompPassword(e.target.value)}
        />
      <label className="checkbox-container">
        <input 
          className="checkbox-input"
          type="checkbox"
          checked={verPassword}
          // 💡 Tip: Usa onChange en vez de onClick para inputs tipo checkbox/radio en React
          onChange={() => setVerPassword(!verPassword)}   
        />
        <span>Mostrar contraseña</span>
      </label>  
      <button type="submit" className="init-sesion-btn">
        Registrarse
      </button>
      <p onClick={() => {
        setIsRegistering(!isRegistering);
        setEmail("");
        setPassword("");
        setError("");
          }}>
     <span>¿Ya tienes cuenta?</span>
     <span className="auth-link">Inicia sesión</span>
       </p>
    </form>

  );
}