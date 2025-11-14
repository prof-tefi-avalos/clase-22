import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      nav("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al loguear");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handle}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      <p>¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
    </div>
  );
}
