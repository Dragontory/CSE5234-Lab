// src/components/viewOrder.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewOrder({ cart }) {
  const navigate = useNavigate();

  const total = cart
    .reduce((s, it) => s + (Number(it.price) || 0) * it.qty, 0)
    .toFixed(2);

  function proceedToShipping() {
    if (!cart.length) {
      alert('Your cart is empty.');
      return;
    }
    navigate('/purchase/shippingEntry');
  }

  return (
    <div className="container">
      <h2 className="page-title">Review Your Cart</h2>

      <div className="form-box">
        <section className="order-section">
          <h3 className="section-title">Acquisition Services</h3>
          {cart.length === 0 ? (
            <p>No services in your cart.</p>
          ) : (
            <ul className="order-list">
              {cart.map((it) => (
                <li key={it.id}>
                  {it.name} acquisition × {it.qty}{' '}
                  = ${(Number(it.price) * it.qty).toFixed(2)} service fee
                  {it.basePrice && (
                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280' }}>
                      Jet est.: ${Number(it.basePrice).toLocaleString()}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <p className="order-total">
            <strong>Total service fees: ${total}</strong>
          </p>
        </section>

        <div className="actions">
          <button className="primary-action" onClick={proceedToShipping}>
            Continue to Shipping
          </button>
        </div>
      </div>
    </div>
  );
}


