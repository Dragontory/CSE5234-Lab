import React from 'react';
import { Link } from 'react-router-dom';

export default function CartOverlay({ cart, isOpen, toggleCart, closeCart, updateCartQuantity, removeFromCart }) {
  const itemCount = cart.reduce((s, it) => s + it.qty, 0);
  const total = cart.reduce((s, it) => s + it.qty * it.price, 0).toFixed(2);

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
      <button className="cart-button" onClick={toggleCart}>
        Cart ({itemCount})
      </button>
      {isOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className="cart-panel" onClick={handlePanelClick}>
        <h4>Your Cart</h4>
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <ul>
            {cart.map(it => (
              <li key={it.id}>
                {it.name} x {it.qty} — ${ (it.price * it.qty).toLocaleString() }
                <div>
                  <button onClick={() => updateCartQuantity(it.id, it.qty - 1)}>-</button>
                  <button onClick={() => updateCartQuantity(it.id, it.qty + 1)}>+</button>
                  <button onClick={() => removeFromCart(it.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-foot">
          <div>Total: ${Number(total).toLocaleString()}</div>
          <Link to="/purchase/viewOrder" className="btn primary" onClick={closeCart}>View Cart</Link>
        </div>
      </div>
    </div>
  );
}
