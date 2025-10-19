import React from 'react';

export default function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>For support, returns, or inquiries, email <a href="mailto:support@jetstore.example">support@jetstore.example</a> or call (555) 123-4567.</p>
      
      <div className="form-box" style={{ marginTop: 24 }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5"></textarea>
          </div>
          <button type="submit" className="primary-action">Submit</button>
        </form>
      </div>

      <h3 style={{ marginTop: 24 }}>Support Hours</h3>
      <ul>
        <li>Mon-Fri: 9am - 6pm</li>
        <li>Sat: 10am - 2pm</li>
      </ul>

      <h3>Returns & Warranty</h3>
      <p>All jets come with a 2-year limited warranty. Returns are handled case-by-case by our customer care team.</p>
    </div>
  );
}
