import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Support",
    orderId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // rely on native HTML5 validation
    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setForm({ name: "", email: "", topic: "Support", orderId: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>
        For support, returns, or inquiries, email
        {" "}
        <a href="mailto:support@jetstore.example">support@jetstore.example</a>
        {" "}or call (555) 123-4567.
      </p>

      <div className="form-box" style={{ marginTop: 24 }}>
        {submitted && (
          <div
            role="status"
            style={{
              background: "#ecfdf5",
              border: "1px solid #10b981",
              color: "#065f46",
              borderRadius: 8,
              padding: "8px 12px",
              marginBottom: 12,
              textAlign: "left",
            }}
          >
            Thanks — your message has been received!
          </div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="topic">Topic</label>
            <select
              id="topic"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
            >
              <option>Support</option>
              <option>Returns</option>
              <option>Billing</option>
              <option>Sales</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="orderId">Order ID (optional)</label>
            <input
              id="orderId"
              type="text"
              value={form.orderId}
              onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              placeholder="e.g., JS-2025-0001"
            />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="primary-action">Submit</button>
        </form>
      </div>

      {/* Who to contact (table) */}
      <h3 style={{ marginTop: 24 }}>Who to Contact</h3>
      <table
        className="contact-table"
        style={{ width: "100%", borderCollapse: "collapse", margin: "8px 0 16px" }}
      >
        <thead>
          <tr>
            {["Topic", "Team", "Email", "Phone"].map((h) => (
              <th
                key={h}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  padding: "10px 12px",
                  textAlign: "left",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Orders / Billing", "Accounts", "billing@jetstore.example", "(555) 111-2222"],
            ["Returns / Warranty", "Care", "returns@jetstore.example", "(555) 333-4444"],
            ["Technical Help", "Support", "support@jetstore.example", "(555) 123-4567"],
          ].map(([topic, team, email, phone]) => (
            <tr key={topic}>
              <td style={{ border: "1px solid #e5e7eb", padding: "10px 12px" }}>{topic}</td>
              <td style={{ border: "1px solid #e5e7eb", padding: "10px 12px" }}>{team}</td>
              <td style={{ border: "1px solid #e5e7eb", padding: "10px 12px" }}>
                <a href={`mailto:${email}`}>{email}</a>
              </td>
              <td style={{ border: "1px solid #e5e7eb", padding: "10px 12px" }}>{phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FAQ */}
      <h3>FAQ</h3>
      <details style={{ borderTop: "1px solid #eef2f7", padding: "10px 0" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>How long is the warranty?</summary>
        <p>Two-year limited warranty from the delivery date.</p>
      </details>
      <details style={{ borderTop: "1px solid #eef2f7", padding: "10px 0" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>How do I start a return?</summary>
        <p>
          Email <a href="mailto:returns@jetstore.example">returns@jetstore.example</a> with your
          order ID. We will send a prepaid return label.
        </p>
      </details>
      <details style={{ borderTop: "1px solid #eef2f7", padding: "10px 0" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Do you offer training?</summary>
        <p>Yes — contact Support to schedule onboarding sessions.</p>
      </details>

      {/* Existing sections you already had */}
      <h3 style={{ marginTop: 24 }}>Support Hours</h3>
      <ul>
        <li>Mon–Fri: 9am – 6pm</li>
        <li>Sat: 10am – 2pm</li>
      </ul>

      <h3>Returns & Warranty</h3>
      <p>
        All jets come with a 2-year limited warranty. Returns are handled case-by-case by our
        customer care team.
      </p>
    </div>
  );
}
