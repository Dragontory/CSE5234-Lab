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
      
      <h3>Mission &amp; Vision</h3>
      <p>
        Our mission is to make private aviation purchases less intimidating and more transparent.
        We envision a world where buying a jet feels structured and guided: clear steps, expert
        support, and no mystery fees.
      </p>

      <h3>How Our Service Works</h3>
      <p>
        When you pick a jet on Jetstore, you’re not checking out the aircraft itself. You’re
        booking our <strong>acquisition service</strong> — typically a small percentage of the 
        aircraft’s estimated price. That fee covers:
      </p>
      <ul>
        <li>Sourcing the best airframes from vetted brokers and owners</li>
        <li>Coordinating pre-buy inspections and maintenance records review</li>
        <li>Working with aviation attorneys, lenders, and insurers</li>
        <li>Overseeing registration, import/export, and delivery logistics</li>
      </ul>

      <h3>Why Clients Choose Us</h3>
      <p>
        High-value purchases are complex. Our team brings structure, checklists, and a dedicated
        point of contact to keep your acquisition moving. You stay in control of the big decisions
        while we handle the day-to-day details behind the scenes.
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
