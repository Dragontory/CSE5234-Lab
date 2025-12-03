// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-hero">
      <div className="hero-left">
        <h1>Jetstore Acquisition Concierge</h1>
        <p>
          We don’t sell jets — we help you acquire them. Jetstore handles sourcing, negotiation,
          inspections, and delivery logistics so you get your dream aircraft with confidence and
          without the paperwork headache.
        </p>
        <div className="hero-actions">
          <Link to="/purchase" className="btn primary">Browse Jets</Link>
          <Link to="/contact" className="btn">Talk to Us</Link>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-number">5</div>
            <div className="stat-label">Featured Models</div>
          </div>
          <div className="stat">
            <div className="stat-number">120+</div>
            <div className="stat-label">Clients Assisted*</div>
          </div>
          <div className="stat">
            <div className="stat-number">7%</div>
            <div className="stat-label">Typical Fee</div>
          </div>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 6 }}>
          *Figures illustrative for demo purposes.
        </p>
      </div>
      <div className="hero-right">
        <img src="/assets/orion.jpg" alt="Orion Cruiser" style={{ width: 320 }} />
      </div>
    </div>
  );
}

