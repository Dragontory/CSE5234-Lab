import React from 'react';

export default function About() {
  return (
    <div className="about-page">
      <h2>About Jetstore</h2>
      <p>At Jetstore we connect discerning pilots with premium private jets engineered for performance and comfort.</p>
      
      <h3>Company Mission and Vision</h3>
      <p>Our mission is to make private aviation accessible and enjoyable. We envision a future where personal flight is a seamless extension of your lifestyle, offering unparalleled freedom and efficiency.</p>

      <h3>Company Strategy</h3>
      <p>We focus on three core pillars: curating a catalog of the world’s finest jets, providing a transparent and frictionless purchasing experience, and delivering world-class after-sales support. By integrating cutting-edge technology and personalized service, we aim to be the most trusted name in private aviation.</p>

      <section className="execs">
        <h3>Meet our Executives</h3>
        <div className="exec-list">
          <div className="exec">
            <img src="/assets/falcon.svg" alt="CEO"/>
            <h4>Alex Skyler</h4>
            <p><strong>CEO & Founder</strong> • With 20 years in aerospace engineering and a background from MIT, Alex is passionate about sustainable aviation and pushing the boundaries of flight.</p>
          </div>
          <div className="exec">
            <img src="/assets/aurora.svg" alt="CTO"/>
            <h4>Jordan Reed</h4>
            <p><strong>Chief Technology Officer</strong> • A former test pilot and avionics expert from Stanford, Jordan leads our technology division, focusing on next-generation navigation and safety systems.</p>
          </div>
          <div className="exec">
            <img src="/assets/hawk.svg" alt="COO"/>
            <h4>Maria Valdez</h4>
            <p><strong>Chief Operating Officer</strong> • Maria brings a decade of experience from leading logistics firms. She ensures every transaction is smooth and every client is satisfied.</p>
          </div>
          <div className="exec">
            <img src="/assets/zephyr.svg" alt="Head of Sales"/>
            <h4>Tom Chen</h4>
            <p><strong>Head of Sales</strong> • A veteran sales leader with a passion for connecting clients with their dream aircraft. Tom believes in building long-term relationships based on trust.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
