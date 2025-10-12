import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShippingEntry() {
	const [name, setName] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		const shipping = { name, address1, address2, city, state, zip };
		sessionStorage.setItem('shipping', JSON.stringify(shipping));
		navigate('/purchase/viewOrder');
	}

	return (
		<div style={{ padding: 12 }}>
			<h2>Shipping Entry</h2>
			<form onSubmit={handleSubmit}>
				<div><label>Name: <input value={name} onChange={(e) => setName(e.target.value)} required /></label></div>
				<div><label>Address Line 1: <input value={address1} onChange={(e) => setAddress1(e.target.value)} required /></label></div>
				<div><label>Address Line 2: <input value={address2} onChange={(e) => setAddress2(e.target.value)} /></label></div>
				<div><label>City: <input value={city} onChange={(e) => setCity(e.target.value)} required /></label></div>
				<div><label>State: <input value={state} onChange={(e) => setState(e.target.value)} required /></label></div>
				<div><label>Zip: <input value={zip} onChange={(e) => setZip(e.target.value)} required /></label></div>
				<div style={{ marginTop: 8 }}><button type="submit">View Order</button></div>
			</form>
		</div>
	);
}
