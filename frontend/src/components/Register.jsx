import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
      nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handle}>
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Crear cuenta</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
}
