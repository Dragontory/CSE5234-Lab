import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewOrder() {
	const navigate = useNavigate();
	const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
	const payment = JSON.parse(sessionStorage.getItem('payment') || '{}');
	const shipping = JSON.parse(sessionStorage.getItem('shipping') || '{}');

	const total = cart.reduce((s, it) => s + it.price * it.qty, 0).toFixed(2);

	function confirm() {
		// In a real app, we'd call backend; here we just go to confirmation
		navigate('/purchase/viewConfirmation');
	}

	return (
		<div style={{ padding: 12 }}>
			<h2>Review Your Order</h2>
			<h3>Items</h3>
			{cart.length === 0 ? <p>No items</p> : (
				<ul>
					{cart.map((it) => <li key={it.id}>{it.name} x {it.qty} = ${(it.price * it.qty).toFixed(2)}</li>)}
				</ul>
			)}
			<p><strong>Total: ${total}</strong></p>

			<h3>Payment</h3>
			<p>{payment.name || 'Not provided'}</p>

			<h3>Shipping</h3>
			<p>
				{shipping && shipping.name && shipping.addressLine1 && shipping.city && shipping.state && shipping.zip
				? `${shipping.name}, ${shipping.addressLine1}${
					shipping.addressLine2 ? ', ' + shipping.addressLine2 : ''
					}, ${shipping.city}, ${shipping.state} ${shipping.zip}`
				: 'Not provided'}
			 </p>

			<div style={{ marginTop: 12 }}>
				<button onClick={confirm}>Confirm Order</button>
			</div>
		</div>
	);
}
