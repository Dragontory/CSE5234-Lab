// src/components/About.js
import React from 'react';

export default function About() {
  return (
    <div className="about-page">
      <h2>About Stratos Consulting</h2>

      <p>
        Stratos Consulting is a premium aircraft acquisition and advisory firm.
        We help clients navigate the full lifecycle of buying a private jet —
        from market research and regulatory compliance to valuation, inspection,
        negotiation, and delivery.
      </p>

      <h3>Our Role</h3>
      <p>
        Buying an aircraft is a complex, high-stakes decision. Our job is to make
        that process transparent and manageable. We act as an independent advisor
        focused solely on our clients’ best interests — providing unbiased
        recommendations, risk analysis, and end-to-end coordination.
      </p>

      <h3>Who We Serve</h3>
      <p>Our primary clients fall into two groups:</p>
      <ul>
        <li>
          <strong>High-net-worth individuals</strong> (typically ages 35–65) who value
          time, privacy, and expert guidance when making high-value purchases.
        </li>
        <li>
          <strong>Corporate aviation departments and executives</strong> at
          mid-to-large companies who acquire jets for business travel, logistics,
          or fleet expansion.
        </li>
      </ul>

      <p>
        These buyers want expert representation, unbiased advice, and a partner
        who can manage legal, financial, and operational risks on their behalf.
        That&apos;s the gap Stratos Consulting fills — we help clients make
        confident, informed, and optimized aircraft acquisition decisions.
      </p>

      <section className="execs">
        <h3>Our Team</h3>
        <div className="exec-list">
          <div className="exec">
            <img src="/assets/falcon.jpg" alt="" />
            <h4>Xiaoyu Lai</h4>
            <p><strong>Lead Systems Architect</strong></p>
          </div>
          <div className="exec">
            <img src="/assets/aurora.jpg" alt="" />
            <h4>Yuxi Lin</h4>
            <p><strong>Engineering Operations Lead</strong></p>
          </div>
          <div className="exec">
            <img src="/assets/hawk.jpg" alt="" />
            <h4>Saif Mohammed</h4>
            <p><strong>Lead Engineering Strategist</strong></p>
          </div>
          <div className="exec">
            <img src="/assets/zephyr.jpg" alt="" />
            <h4>Tory Yang</h4>
            <p><strong>Lead Software Engineer</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
}

