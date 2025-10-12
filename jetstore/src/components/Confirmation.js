import React from 'react';

export default function Confirmation() {
	const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
	const total = cart.reduce((s, it) => s + it.price * it.qty, 0).toFixed(2);
	const confirmationNumber = 'CONF-12345';

	return (
		<div className="container">
			<h2 className="page-title">Thank you for your order!</h2>

			<div className="form-box">
				<div className="order-section">
					<p>
						Your confirmation number is <strong>{confirmationNumber}</strong>.
					</p>
				</div>

				<div className="order-section">
					<h3 className="section-title">Order Summary</h3>
					<ul className="order-list">
						{cart.map((it) => (
							<li key={it.id}>
								{it.name} x {it.qty} = ${(it.price * it.qty).toFixed(2)}
							</li>
						))}
					</ul>
					<p>
						<strong>Total paid: ${total}</strong>
					</p>
				</div>
			</div>
		</div>
	);
}
