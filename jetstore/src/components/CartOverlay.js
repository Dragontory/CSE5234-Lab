// src/components/CartOverlay.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function CartOverlay({
  cart,
  isOpen,
  toggleCart,
  closeCart,
  updateCartQuantity,
  removeFromCart,
}) {
  const itemCount = cart.reduce((s, it) => s + it.qty, 0);
  const total = cart
    .reduce((s, it) => s + it.qty * (Number(it.price) || 0), 0)
    .toFixed(2);

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
      <button className="cart-button" onClick={toggleCart}>
        <span className="cart-dot" />
        <span>Cart</span>
        <span className="cart-count">{itemCount}</span>
      </button>
      {isOpen && <div className="overlay" onClick={closeCart}></div>}
      <div className="cart-panel" onClick={handlePanelClick}>
        <div className="cart-panel-header">
          <h4>Your Services</h4>
          <button type="button" className="cart-close" onClick={closeCart}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <ul className="cart-items">
            {cart.map((it) => {
              const lineTotal = (Number(it.price) || 0) * it.qty;
              return (
                <li key={it.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">
                      {it.name} acquisition
                    </div>
                    <div className="cart-item-sub">
                      {it.qty} × ${Number(it.price).toLocaleString()} service fee
                    </div>
                    {it.basePrice && (
                      <div className="cart-item-sub">
                        Jet est.: ${Number(it.basePrice).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-qty-controls">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(it.id, it.qty - 1)}
                      >
                        −
                      </button>
                      <span>{it.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(it.id, it.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeFromCart(it.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="cart-foot">
          <div className="cart-total">
            <span>Total service fees</span>
            <strong>${Number(total).toLocaleString()}</strong>
          </div>
          <Link
            to="/purchase/viewOrder"
            className="btn primary cart-checkout"
            onClick={closeCart}
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}


