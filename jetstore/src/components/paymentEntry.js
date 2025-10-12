import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentEntry() {
	const [cardNumber, setCardNumber] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvv, setCvv] = useState('');
	const [name, setName] = useState('');
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		const payment = { cardNumber, expiry, cvv, name };
		sessionStorage.setItem('payment', JSON.stringify(payment));
		navigate('/purchase/shippingEntry');
	}

	return (
		<div style={{ padding: 12 }}>
			<h2>Payment Entry</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Card Holder Name: <input value={name} onChange={(e) => setName(e.target.value)} required /></label>
				</div>
				<div>
					<label>Card Number: <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required /></label>
				</div>
				<div>
					<label>Expiry (MM/YY): <input value={expiry} onChange={(e) => setExpiry(e.target.value)} required /></label>
				</div>
				<div>
					<label>CVV: <input value={cvv} onChange={(e) => setCvv(e.target.value)} required /></label>
				</div>
				<div style={{ marginTop: 8 }}>
					<button type="submit">Continue to Shipping</button>
				</div>
			</form>
		</div>
	);
}
