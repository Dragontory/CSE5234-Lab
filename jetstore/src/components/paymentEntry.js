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
		<div className="container">
			<h2 style={{ marginBottom: '16px', color: '#0b3d91' }}>Payment Entry</h2>
			<form className="form-box" onSubmit={handleSubmit}>
				<div className="form-field">
					<label>Card Holder Name:</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						placeholder="John Doe"
					/>
				</div>
				<div className="form-field">
					<label>Card Number:</label>
					<input
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
						required
						placeholder="1234 5678 9012 3456"
					/>
				</div>
				<div className="form-field">
					<label>Expiry (MM/YY):</label>
					<input
						value={expiry}
						onChange={(e) => setExpiry(e.target.value)}
						required
						placeholder="12/27"
					/>
				</div>
				<div className="form-field">
					<label>CVV:</label>
					<input
						value={cvv}
						onChange={(e) => setCvv(e.target.value)}
						required
						placeholder="123"
						type="password"
					/>
				</div>
				<button className="primary-action" type="submit">
					Continue to Shipping
				</button>
			</form>
		</div>
	);
}
