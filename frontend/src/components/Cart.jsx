export default function Cart({ cart }) {
  if (cart.length === 0) return <p className="empty-cart">El carrito está vacío</p>;

  return (
    <div className="container">
      <h2>Carrito</h2>
      {cart.map((p, i) => (
        <div key={i} className="cart-item">
          <p>{p.name} - ${p.price}</p>
        </div>
      ))}
    </div>
  );
}
