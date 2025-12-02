import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api';

export default function ViewOrder({ cart, clearCart }) {
  const navigate = useNavigate();

  const [shipping, setShipping] = useState(() => {
    return JSON.parse(sessionStorage.getItem('shipping') || 'null') || {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
    };
  });

  const [payment, setPayment] = useState(() => {
    return JSON.parse(sessionStorage.getItem('payment') || 'null') || {
      name: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      email: '',
    };
  });

  const [submitting, setSubmitting] = useState(false);

  const total = cart
    .reduce((s, it) => s + (Number(it.price) || 0) * Number(it.qty || 0), 0)
    .toFixed(2);

  useEffect(() => {
    // If user hits checkout with empty cart, send them back.
    if (cart.length === 0) {
    }
  }, [cart]);

  function validate() {
    const requiredShipping = [
      'name',
      'addressLine1',
      'city',
      'state',
      'zip',
    ];
    for (const key of requiredShipping) {
      if (!shipping[key]) {
        alert('Please fill all required shipping fields.');
        return false;
      }
    }
    if (!/^[A-Za-z]{2}$/.test(shipping.state.trim())) {
      alert('State must be 2 letters (e.g., OH, NY).');
      return false;
    }
    if (!/^[0-9]{5}(-[0-9]{4})?$/.test(shipping.zip.trim())) {
      alert('ZIP must be 5 digits or ZIP+4 (e.g., 43210 or 43210-1234).');
      return false;
    }

    const requiredPayment = ['name', 'cardNumber', 'expiry', 'cvv'];
    for (const key of requiredPayment) {
      if (!payment[key]) {
        alert('Please fill all required payment fields.');
        return false;
      }
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cart.length) {
      alert('Your cart is empty.');
      return;
    }
    if (!validate()) return;

    try {
      setSubmitting(true);
      sessionStorage.setItem('shipping', JSON.stringify(shipping));
      sessionStorage.setItem('payment', JSON.stringify(payment));

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

  return (
    <div className="container">
      <h2 className="page-title">Checkout</h2>

      <div className="checkout-layout">
        {/* Left: Order summary */}
        <section className="form-box checkout-summary">
          <h3 className="section-title">1. Review Your Order</h3>
          {cart.length === 0 ? (
            <p>No items in your cart.</p>
          ) : (
            <ul className="order-list">
              {cart.map((it) => (
                <li key={it.id}>
                  {it.name} × {it.qty} = $
                  {(Number(it.price) * Number(it.qty)).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
          <p className="order-total">
            <strong>Total: ${total}</strong>
          </p>
        </section>

        {/* Right: Shipping + payment form */}
        <form className="form-box checkout-form" onSubmit={handleSubmit}>
          <h3 className="section-title">2. Shipping Details</h3>

          <div className="form-field">
            <label>Name</label>
            <input
              value={shipping.name}
              onChange={(e) =>
                setShipping((s) => ({ ...s, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-field">
            <label>Address Line 1</label>
            <input
              value={shipping.addressLine1}
              onChange={(e) =>
                setShipping((s) => ({ ...s, addressLine1: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-field">
            <label>Address Line 2</label>
            <input
              value={shipping.addressLine2}
              onChange={(e) =>
                setShipping((s) => ({ ...s, addressLine2: e.target.value }))
              }
              placeholder="Apt / Unit"
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>City</label>
              <input
                value={shipping.city}
                onChange={(e) =>
                  setShipping((s) => ({ ...s, city: e.target.value }))
                }
                required
              />
            </div>
            <div className="form-field">
              <label>State</label>
              <input
                value={shipping.state}
                onChange={(e) =>
                  setShipping((s) => ({
                    ...s,
                    state: e.target.value.toUpperCase(),
                  }))
                }
                maxLength={2}
                required
              />
            </div>
            <div className="form-field">
              <label>ZIP</label>
              <input
                value={shipping.zip}
                onChange={(e) =>
                  setShipping((s) => ({ ...s, zip: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <h3 className="section-title" style={{ marginTop: 16 }}>
            3. Payment Details
          </h3>

          <div className="form-field">
            <label>Cardholder Name</label>
            <input
              value={payment.name}
              onChange={(e) =>
                setPayment((p) => ({ ...p, name: e.target.value }))
              }
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-field">
            <label>Card Number</label>
            <input
              value={payment.cardNumber}
              onChange={(e) =>
                setPayment((p) => ({ ...p, cardNumber: e.target.value }))
              }
              required
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Expiry (MM/YY)</label>
              <input
                value={payment.expiry}
                onChange={(e) =>
                  setPayment((p) => ({ ...p, expiry: e.target.value }))
                }
                required
                placeholder="12/27"
              />
            </div>
            <div className="form-field">
              <label>CVV</label>
              <input
                type="password"
                value={payment.cvv}
                onChange={(e) =>
                  setPayment((p) => ({ ...p, cvv: e.target.value }))
                }
                required
                placeholder="123"
              />
            </div>
          </div>

          <div className="form-field">
            <label>Receipt Email (optional)</label>
            <input
              type="email"
              value={payment.email || ''}
              onChange={(e) =>
                setPayment((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="you@example.com"
            />
          </div>

          <div className="actions">
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

