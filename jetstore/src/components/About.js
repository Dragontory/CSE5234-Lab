import React from 'react';

export default function About() {
  return (
    <div className="about-page">
      <h2>About Jetstore</h2>
      <p>At Jetstore we connect discerning pilots with premium private jets engineered for performance and comfort.</p>
      <section className="execs">
        <h3>Meet our Executives</h3>
        <div className="exec-list">
          <div className="exec">
            <img src="/assets/falcon.svg" alt="CEO"/>
            <h4>Alex Skyler</h4>
            <p>CEO • 20 years in aerospace. Passionate about flight.</p>
          </div>
          <div className="exec">
            <img src="/assets/aurora.svg" alt="CTO"/>
            <h4>Jordan Reed</h4>
            <p>CTO • Avionics expert and former test pilot.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
