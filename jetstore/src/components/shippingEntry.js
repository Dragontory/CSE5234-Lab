import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShippingEntry() {
  const [name, setName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState(''); // required per your request
  const [city, setCity] = useState('');
  const [usState, setUsState] = useState('');
  const [zip, setZip] = useState('');
  const navigate = useNavigate();

  // Prefill from sessionStorage
  useEffect(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem('shipping') || 'null');
      if (cached) {
        setName(cached.name || '');
        setAddressLine1(cached.addressLine1 || '');
        setAddressLine2(cached.addressLine2 || '');
        setCity(cached.city || '');
        setUsState(cached.state || '');
        setZip(cached.zip || '');
      }
    } catch {}
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
    <div style={{ padding: 12 }}>
      <h2>Shipping Entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:{' '}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Q. Student"
              required
              autoComplete="name"
            />
          </label>
        </div>

        <div>
          <label>
            Address Line 1:{' '}
            <input
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="123 College Ave"
              required
              autoComplete="address-line1"
            />
          </label>
        </div>

        <div>
          <label>
            Address Line 2:{' '}
            <input
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              placeholder="Apt / Unit"
              required
              autoComplete="address-line2"
            />
          </label>
        </div>

        <div>
          <label>
            City:{' '}
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Columbus"
              required
              autoComplete="address-level2"
            />
          </label>
        </div>

        <div>
          <label>
            State:{' '}
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
          </label>
        </div>

        <div>
          <label>
            ZIP:{' '}
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="43210"
              required
              pattern="[0-9]{5}(-[0-9]{4})?"
              title="5-digit ZIP or ZIP+4 (e.g., 43210 or 43210-1234)"
              inputMode="numeric"
              autoComplete="postal-code"
            />
          </label>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => navigate('/purchase')}>Back to Shop</button>
          <button type="submit">Save & Continue</button>
        </div>
      </form>
    </div>
  );
}
