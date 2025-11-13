import { useState, useEffect } from "react";
import API from "../api";

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/productoos").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Lista de Productos</h2>
      <div className="products">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>${p.price}</p>
            <button onClick={() => addToCart(p)}>Agregar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
