// src/components/paymentEntry.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api';

export default function PaymentEntry({ clearCart }) {
  const savedPayment = JSON.parse(sessionStorage.getItem('payment') || 'null');

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (savedPayment) {
      setCardNumber(savedPayment.cardNumber || '');
      setExpiry(savedPayment.expiry || '');
      setCvv(savedPayment.cvv || '');
      setName(savedPayment.name || '');
      setEmail(savedPayment.email || '');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const payment = { cardNumber, expiry, cvv, name, email };
    sessionStorage.setItem('payment', JSON.stringify(payment));

    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const shipping = JSON.parse(sessionStorage.getItem('shipping') || '{}');

    if (!cart.length) {
      alert('Your cart is empty.');
      navigate('/purchase');
      return;
    }

    if (!shipping || !shipping.name) {
      alert('Shipping details are missing. Please re-enter them.');
      navigate('/purchase/shippingEntry');
      return;
    }

    try {
      setSubmitting(true);
      const orderResult = await placeOrder(cart, payment, shipping);

      sessionStorage.setItem('orderResult', JSON.stringify(orderResult));
      sessionStorage.setItem('cartSnapshot', JSON.stringify(cart));

      clearCart();
      navigate('/purchase/viewConfirmation');
    } catch (err) {
      setSubmitting(false);
      const raw = err?.response?.data || err;
      const msg = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2);
      alert('Order failed:\n' + msg);
    }
  }

  // Quick summary at top
  const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  const total = cart
    .reduce((s, it) => s + (Number(it.price) || 0) * it.qty, 0)
    .toFixed(2);

  return (
    <div className="container">
      <h2 className="page-title">Payment & Confirmation</h2>

      <div className="checkout-layout">
        <section className="form-box checkout-summary">
          <h3 className="section-title">Order Summary</h3>
          {cart.length === 0 ? (
            <p>No services in your cart.</p>
          ) : (
            <ul className="order-list">
              {cart.map((it) => (
                <li key={it.id}>
                  {it.name} acquisition × {it.qty} = $
                  {(Number(it.price) * it.qty).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
          <p className="order-total">
            <strong>Total service fees: ${total}</strong>
          </p>
        </section>

        <form className="form-box checkout-form" onSubmit={handleSubmit}>
          <h3 className="section-title">Payment Details</h3>

          <div className="form-field">
            <label>Cardholder Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-field">
            <label>Card Number</label>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Expiry (MM/YY)</label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                placeholder="12/27"
              />
            </div>
            <div className="form-field">
              <label>CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                placeholder="123"
              />
            </div>
          </div>

          <div className="form-field">
            <label>Receipt Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn"
              style={{ marginRight: 8 }}
              onClick={() => navigate('/purchase/shippingEntry')}
            >
              Back to Shipping
            </button>
            <button
              className="primary-action"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

