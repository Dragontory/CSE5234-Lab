import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-hero">
      <div className="hero-left">
        <h1>Welcome to Jetstore</h1>
        <p>Premium private jets and aviation solutions. Browse our catalog, customize your order, and fly in style.</p>
        <div className="hero-actions">
          <Link to="/purchase" className="btn primary">Shop Jets</Link>
          <Link to="/contact" className="btn">Contact Us</Link>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-number">5</div>
            <div className="stat-label">Models</div>
          </div>
          <div className="stat">
            <div className="stat-number">120+</div>
            <div className="stat-label">Happy Pilots</div>
          </div>
          <div className="stat">
            <div className="stat-number">4,000 km</div>
            <div className="stat-label">Max Range</div>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img src="/assets/orion.svg" alt="Orion Cruiser" style={{ width: 320 }} />
      </div>
    </div>
  );
}
