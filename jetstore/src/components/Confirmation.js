import React from 'react';

export default function Confirmation() {
	const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
	const total = cart.reduce((s, it) => s + it.price * it.qty, 0).toFixed(2);
	const confirmationNumber = 'CONF-12345';

	return (
		<div style={{ padding: 12 }}>
			<h2>Thank you for your order!</h2>
			<p>Your confirmation number is <strong>{confirmationNumber}</strong></p>
			<h3>Order Summary</h3>
			<ul>
				{cart.map((it) => <li key={it.id}>{it.name} x {it.qty} = ${(it.price * it.qty).toFixed(2)}</li>)}
			</ul>
			<p><strong>Total paid: ${total}</strong></p>
		</div>
	);
}
