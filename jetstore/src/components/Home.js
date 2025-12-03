// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="home-hero">
        <div className="hero-left">
          <span className="hero-pill">Aircraft Acquisition Experts</span>

          <h1>Welcome to Stratos Consulting</h1>

          <p>
            Stratos Consulting is a premium aircraft acquisition and advisory firm.
            We help clients navigate the full lifecycle of buying a private jet —
            from market research and regulatory compliance to valuation, inspection,
            negotiation, and delivery. Our goal is to turn a complex, high-risk
            decision into a transparent, manageable process.
          </p>

          <div className="hero-actions">
            <Link to="/purchase" className="btn primary">
              Explore Aircraft Options
            </Link>
            <Link to="/contact" className="btn">
              Contact Our Advisors
            </Link>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-number">250+</div>
              <div className="stat-label">Client Transactions</div>
            </div>
            <div className="stat">
              <div className="stat-number">35–65</div>
              <div className="stat-label">Typical Client Age</div>
            </div>
            <div className="stat">
              <div className="stat-number">15 yrs</div>
              <div className="stat-label">Aviation Experience</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="/assets/orion.jpg"
            alt="Private jet flying above the clouds"
          />
        </div>
      </div>

      {/* Our Clients */}
      <section className="home-section">
        <h2>Who We Serve</h2>
        <p className="home-section-subtitle">
          Our clients are high-net-worth individuals and corporate aviation teams
          who expect expert representation for complex acquisitions.
        </p>

        <div className="home-grid">
          <div>
            <h3>Private Clients</h3>
            <ul className="home-feature-list">
              <li>High-net-worth individuals, typically ages 35–65</li>
              <li>Value time, privacy, and convenience</li>
              <li>Prefer expert guidance on high-value decisions</li>
            </ul>
          </div>
          <div>
            <h3>Corporate Buyers</h3>
            <ul className="home-feature-list">
              <li>Mid-to-large companies and corporate flight departments</li>
              <li>Executives acquiring jets for business travel and logistics</li>
              <li>Teams focused on fleet expansion and operational reliability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="home-section home-section-muted">
        <h2>How Stratos Consulting Helps</h2>
        <p className="home-section-subtitle">
          We manage the entire acquisition lifecycle, from first conversation to final delivery.
        </p>

        <div className="home-steps">
          <div className="home-step">
            <div className="home-step-number">1</div>
            <h3>Market Research</h3>
            <p>
              We evaluate the global market to identify aircraft that match your range,
              budget, and mission profile.
            </p>
          </div>
          <div className="home-step">
            <div className="home-step-number">2</div>
            <h3>Valuation & Risk Review</h3>
            <p>
              Our team guides you through technical inspections, valuation, and
              regulatory and financial considerations.
            </p>
          </div>
          <div className="home-step">
            <div className="home-step-number">3</div>
            <h3>Negotiation & Delivery</h3>
            <p>
              We negotiate pricing and terms on your behalf, coordinate closing,
              and oversee the delivery process.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}



