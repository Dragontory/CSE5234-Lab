// src/components/About.js
import React from 'react';

export default function About() {
  return (
    <div className="about-page">
      <h2>About Jetstore</h2>
      <p>
        Jetstore is a jet acquisition concierge. Instead of selling aircraft directly, we act as
        your trusted middleman — coordinating everything from sourcing and negotiations to
        inspections, legal work, and delivery.
      </p>
      
      <h3>Mission & Vision</h3>
      <p>
        Our mission is to make private aviation purchases less intimidating and more transparent.
        We envision a world where buying a jet feels as structured and guided as booking a flight:
        clear steps, expert help, and no mystery fees.
      </p>

      <h3>How Our Service Works</h3>
      <p>
        When you pick a jet on Jetstore, you’re not “checking out” the aircraft itself. You’re
        booking our <strong>acquisition service</strong> — typically a small percentage of the 
        aircraft’s estimated price. In a real-world setting, that fee would cover:
      </p>
      <ul>
        <li>Sourcing the best airframes from vetted brokers and owners</li>
        <li>Coordinating pre-buy inspections and maintenance records review</li>
        <li>Working with aviation attorneys, lenders, and insurers</li>
        <li>Overseeing registration, import/export, and delivery logistics</li>
      </ul>

      <h3>Why This Works for Our Class Project</h3>
      <p>
        In this lab, Jetstore demonstrates an e-commerce flow for a high-ticket, service-based
        business. We still use carts, checkout, and order confirmation — but what’s being
        “purchased” is expertise and coordination, not the jet itself.
      </p>

      <section className="execs">
        <h3>Meet Our Team</h3>
        <div className="exec-list">
          <div className="exec">
            <img src="/assets/falcon.jpg" alt=""/>
            <h4>Xiaoyu Lai</h4>
            <p><strong>Developer</strong></p>
          </div>
          <div className="exec">
            <img src="/assets/aurora.jpg" alt=""/>
            <h4>Yuxi Lin</h4>
            <p><strong>Developer</strong></p>
          </div>
          <div className="exec">
            <img src="/assets/hawk.jpg" alt=""/>
            <h4>Saif Mohammed</h4>
            <p><strong>Developer</strong></p>
          </div>
          <div className="exec">
            <img src="/assets/zephyr.jpg" alt=""/>
            <h4>Tory Yang</h4>
            <p><strong>Developer</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
}
