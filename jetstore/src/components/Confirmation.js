// src/components/Confirmation.js
import React from 'react';

export default function Confirmation() {
  const result = JSON.parse(sessionStorage.getItem('orderResult') || 'null');
  const items = JSON.parse(sessionStorage.getItem('cartSnapshot') || '[]');

  const confirmationNumber = result?.confirmationNumber || 'PENDING';
  const paymentLast4 = result?.paymentLast4;
  const shipTo = result?.shipTo;

  const totalNumber =
    result?.total ??
    items.reduce((s, it) => s + Number(it.price) * Number(it.qty), 0);
  const total = Number(totalNumber || 0).toFixed(2);

  return (
    <div className="container">
      <h2 className="page-title">Thank you for booking with Jetstore!</h2>

      <div className="form-box">
        <div className="order-section">
          <p>
            Your acquisition request has been received. Your reference number is{' '}
            <strong>{confirmationNumber}</strong>.
          </p>
          {paymentLast4 && (
            <p>
              Paid with card ending in <strong>{paymentLast4}</strong>.
            </p>
          )}
          {shipTo && (
            <p>
              Primary contact / delivery address: <strong>{shipTo}</strong>
            </p>
          )}
        </div>

        <div className="order-section">
          <h3 className="section-title">Services Summary</h3>
          {items.length > 0 ? (
            <ul className="order-list">
              {items.map((it) => (
                <li key={it.id}>
                  {it.name} acquisition × {it.qty} = $
                  {(Number(it.price) * Number(it.qty)).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Order items are not available.</p>
          )}
          <p>
            <strong>Total service fees paid: ${total}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

