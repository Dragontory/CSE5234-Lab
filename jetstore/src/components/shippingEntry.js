import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShippingEntry() {

  const savedShipping = JSON.parse(sessionStorage.getItem('shipping') || 'null');

  const [name, setName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [usState, setUsState] = useState('');
  const [zip, setZip] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (savedShipping) {
      setName(savedShipping.name || '');
      setAddressLine1(savedShipping.addressLine1 || '');
      setAddressLine2(savedShipping.addressLine2 || '');
      setCity(savedShipping.city || '');
      setUsState(savedShipping.state || '');
      setZip(savedShipping.zip || '');
    }
  }, []);

  function validate() {
    if (!name || !addressLine1 || !addressLine2 || !city || !usState || !zip) {
      alert('Please fill Name, Address Line 1, Address Line 2, City, State, and ZIP.');
      return false;
    }
    if (!/^[A-Za-z]{2}$/.test(usState.trim())) {
      alert('State must be 2 letters (e.g., OH, NY).');
      return false;
    }
    if (!/^[0-9]{5}(-[0-9]{4})?$/.test(zip.trim())) {
      alert('ZIP must be 5 digits or ZIP+4 (e.g., 43210 or 43210-1234).');
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const shipping = { name, addressLine1, addressLine2, city, state: usState, zip };
    sessionStorage.setItem('shipping', JSON.stringify(shipping));
    navigate('/purchase/viewOrder');
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '16px', color: '#0b3d91' }}>Shipping Entry</h2>

      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Q. Student"
            required
            autoComplete="name"
          />
        </div>

        <div className="form-field">
          <label>Address Line 1:</label>
          <input
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="123 College Ave"
            required
            autoComplete="address-line1"
          />
        </div>

        <div className="form-field">
          <label>Address Line 2:</label>
          <input
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Apt / Unit"
            required
            autoComplete="address-line2"
          />
        </div>

        <div className="form-field">
          <label>City:</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Columbus"
            required
            autoComplete="address-level2"
          />
        </div>

        <div className="form-field">
          <label>State:</label>
          <input
            value={usState}
            onChange={(e) => setUsState(e.target.value.toUpperCase())}
            placeholder="OH"
            maxLength={2}
            required
            pattern="[A-Za-z]{2}"
            title="Two-letter state code (e.g., OH, NY)"
            autoComplete="address-level1"
          />
        </div>

        <div className="form-field">
          <label>ZIP:</label>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="43210"
            required
            pattern="[0-9]{5}(-[0-9]{4})?"
            title="5-digit ZIP or ZIP+4"
            inputMode="numeric"
            autoComplete="postal-code"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <button type="button" className="btn" onClick={() => navigate('/purchase')}>
            Back to Shop
          </button>
          <button type="submit" className="primary-action">
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
}
