import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { isLogged, logout, user } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link to="/">Productos</Link>
        {isLogged && <Link to="/cart">Carrito ({totalItems})</Link>}
      </div>
      <div>
        {isLogged ? (
          <>
            <span style={{ marginRight: 12 }}>{user?.email ?? "Usuario"}</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
