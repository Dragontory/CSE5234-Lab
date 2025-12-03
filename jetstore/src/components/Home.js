// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="home-hero">
        <div className="hero-left">
          <div className="hero-pill">Jet acquisition concierge</div>
          <h1>Acquire your next jet with confidence, not guesswork.</h1>
          <p>
            Jetstore coordinates sourcing, negotiations, inspections, and delivery logistics
            so you can focus on flying — not paperwork. Our transparent service fee aligns
            us with your goals from day one.
          </p>

          <div className="hero-actions">
            <Link to="/purchase" className="btn primary">
              Browse Featured Jets
            </Link>
            <Link to="/contact" className="btn">
              Speak with Our Team
            </Link>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-number">7%</div>
              <div className="stat-label">Typical Service Fee</div>
            </div>
            <div className="stat">
              <div className="stat-number">5</div>
              <div className="stat-label">Featured Models</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Client Support</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src="/assets/orion.jpg" alt="Orion jet flying above the clouds" />
        </div>
      </div>

      {/* How it works section */}
      <section className="home-section">
        <h2>How Jetstore Works</h2>
        <p className="home-section-subtitle">
          A streamlined process from “I’m interested” to first flight.
        </p>

        <div className="home-steps">
          <div className="home-step">
            <div className="home-step-number">1</div>
            <h3>Select a model</h3>
            <p>
              Explore our curated catalog of private jets and choose the airframes that best fit
              your range, capacity, and budget requirements.
            </p>
          </div>
          <div className="home-step">
            <div className="home-step-number">2</div>
            <h3>Book our acquisition service</h3>
            <p>
              Add acquisition services to your cart and complete checkout. Our fee is a small,
              transparent percentage of the aircraft’s estimated price.
            </p>
          </div>
          <div className="home-step">
            <div className="home-step-number">3</div>
            <h3>We handle the heavy lifting</h3>
            <p>
              From sourcing and pre-buy inspections to legal, financing, and delivery logistics,
              our team keeps your acquisition on track.
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="home-section home-section-muted">
        <div className="home-grid">
          <div>
            <h2>Why clients choose Jetstore</h2>
            <p>
              Buying a jet is a complex transaction with many moving parts. Jetstore gives you
              a single point of contact and a proven process, so you always know what’s next.
            </p>
          </div>
          <ul className="home-feature-list">
            <li>
              <strong>Transparent pricing</strong>
              <span> — clear service fees with no surprise markups.</span>
            </li>
            <li>
              <strong>End-to-end coordination</strong>
              <span> — brokers, attorneys, lenders, and insurers under one roof.</span>
            </li>
            <li>
              <strong>Curated inventory</strong>
              <span> — hand-picked aircraft to fit a range of missions and budgets.</span>
            </li>
            <li>
              <strong>Dedicated support</strong>
              <span> — our team tracks every milestone until delivery.</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}


