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
      <h2 className="page-title">Thank you — your request is confirmed</h2>

      <div className="form-box">
        <div className="order-section">
          <p>
            We’ve received your jet acquisition service request. Your reference number is{' '}
            <strong>{confirmationNumber}</strong>.
          </p>
          {paymentLast4 && (
            <p>
              Payment has been authorized on the card ending in <strong>{paymentLast4}</strong>.
            </p>
          )}
          {shipTo && (
            <p>
              Primary contact / correspondence address:{' '}
              <strong>{shipTo}</strong>
            </p>
          )}
          <p style={{ marginTop: 8 }}>
            A member of our acquisition team will reach out within <strong>1–2 business days</strong>{' '}
            to review your requirements, discuss aircraft options, and outline next steps.
          </p>
          <p style={{ marginTop: 8, fontSize: '0.9rem', color: '#6b7280' }}>
            If you need immediate assistance, email{' '}
            <a href="mailto:support@jetstore.example">support@jetstore.example</a> or call
            (555) 123-4567 with your reference number.
          </p>
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
            <strong>Total service fees: ${total}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}


