import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav>
      <div>
        <Link to="/">Productos</Link>
        <Link to="/cart">🛒 Carrito ({cartCount})</Link>
      </div>
    </nav>
  );
}
