// src/components/Confirmation.js
import React from 'react';

export default function Confirmation() {
  const result = JSON.parse(sessionStorage.getItem('orderResult') || 'null');
  const items = JSON.parse(sessionStorage.getItem('cartSnapshot') || '[]');

  const confirmationNumber = result?.confirmationNumber || 'PENDING';
  const paymentLast4 = result?.paymentLast4;
  const clientContact = result?.shipTo; // can be name/address or summary

  const totalNumber =
    result?.total ??
    items.reduce(
      (s, it) => s + Number(it.price) * Number(it.qty),
      0
    );
  const total = Number(totalNumber || 0).toFixed(2);

  return (
    <div className="container">
      <h2 className="page-title">Thank You — Request Received</h2>

      <div className="form-box">
        <div className="order-section">
          <p>
            Your aircraft acquisition request has been submitted to{' '}
            <strong>Stratos Consulting</strong>.
          </p>
          <p>
            Your reference ID is{' '}
            <strong>{confirmationNumber}</strong>.
          </p>

          {paymentLast4 && (
            <p>
              We have securely recorded your payment details ending in{' '}
              <strong>{paymentLast4}</strong> for our advisory service fee.
            </p>
          )}

          {clientContact && (
            <p>
              Our advisory team will reach out using the contact information you
              provided: <strong>{clientContact}</strong>.
            </p>
          )}

          <p style={{ marginTop: 12 }}>
            A Stratos Consulting advisor will contact you within{' '}
            <strong>1–2 business days</strong> to review your goals, clarify
            requirements, and outline the next steps in your aircraft acquisition
            process.
          </p>
        </div>

        <div className="order-section">
          <h3 className="section-title">Requested Services</h3>
          {items.length > 0 ? (
            <ul className="order-list">
              {items.map((it) => (
                <li key={it.id}>
                  {it.name} acquisition service × {it.qty} = $
                  {(Number(it.price) * Number(it.qty)).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Service details are not available.</p>
          )}

          <p style={{ marginTop: 8 }}>
            <strong>Total advisory fees: ${total}</strong>
          </p>
        </div>

        <div className="order-section">
          <h3 className="section-title">What Happens Next?</h3>
          <ul className="order-list">
            <li>An advisor reviews your request and preferred aircraft models.</li>
            <li>
              We schedule an introductory call to discuss mission profile, budget,
              and timeline.
            </li>
            <li>
              Our team prepares a tailored acquisition roadmap, including market
              options and recommended next steps.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}



