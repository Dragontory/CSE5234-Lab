import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATALOG = [
	{ id: 1, name: 'Falcon X', price: 299999.0, img: '/assets/falcon.svg' },
	{ id: 2, name: 'Hawk 2000', price: 189999.0, img: '/assets/hawk.svg' },
	{ id: 3, name: 'Orion Cruiser', price: 499999.0, img: '/assets/orion.svg' },
	{ id: 4, name: 'Zephyr Mk II', price: 129999.0, img: '/assets/zephyr.svg' },
	{ id: 5, name: 'Aurora Jet', price: 759999.0, img: '/assets/aurora.svg' },
];

export default function Purchase() {
	const [quantities, setQuantities] = useState(() => CATALOG.reduce((acc, it) => ({ ...acc, [it.id]: 0 }), {}));
	const [cart, setCart] = useState([]);
	const navigate = useNavigate();

	function handleQtyChange(id, value) {
		const qty = Math.max(0, parseInt(value || '0', 10));
		setQuantities((q) => ({ ...q, [id]: qty }));
	}

	function addToCart(item) {
		const qty = quantities[item.id] || 0;
		if (qty <= 0) return;
		setCart((c) => {
			const existing = c.find((ci) => ci.id === item.id);
			if (existing) {
				return c.map((ci) => (ci.id === item.id ? { ...ci, qty: ci.qty + qty } : ci));
			}
			return [...c, { ...item, qty }];
		});
		setQuantities((q) => ({ ...q, [item.id]: 0 }));
	}

	function removeLine(id) {
		setCart((c) => c.filter((ci) => ci.id !== id));
	}

	function updateLine(id, newQty) {
		const qty = Math.max(0, parseInt(newQty || '0', 10));
		if (qty === 0) return removeLine(id);
		setCart((c) => c.map((ci) => (ci.id === id ? { ...ci, qty } : ci)));
	}

	function proceedToPayment() {
		// Save cart to sessionStorage so other pages can read it
		sessionStorage.setItem('cart', JSON.stringify(cart));
		navigate('/purchase/paymentEntry');
	}

	const total = cart.reduce((s, it) => s + it.price * it.qty, 0).toFixed(2);

		return (
			<div className="purchase-page">
				<h2>Purchase</h2>
				<div className="catalog">
					{CATALOG.map((item) => (
						<div key={item.id} className="card">
							<img src={item.img} alt={item.name} style={{ width: 160, height: 80 }} />
							<h4>{item.name}</h4>
							<p>${item.price.toLocaleString()}</p>
							<div>
								<label>
									Qty:{' '}
									<input
										type="number"
										min="0"
										value={quantities[item.id]}
										onChange={(e) => handleQtyChange(item.id, e.target.value)}
									/>
								</label>
								<button className="primary-action" onClick={() => addToCart(item)} style={{ marginLeft: 8 }}>
									Add
								</button>
							</div>
						</div>
					))}
				</div>

				<h3 style={{ marginTop: 24 }}>Shopping Cart</h3>
				{cart.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<table className="cart-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
						<thead>
							<tr>
								<th style={{ textAlign: 'left' }}>Item</th>
								<th>Price</th>
								<th>Qty</th>
								<th>Line</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{cart.map((ci) => (
								<tr key={ci.id}>
									<td>{ci.name}</td>
									<td style={{ textAlign: 'center' }}>${ci.price.toLocaleString()}</td>
									<td style={{ textAlign: 'center' }}>
										<input
											type="number"
											min="0"
											value={ci.qty}
											onChange={(e) => updateLine(ci.id, e.target.value)}
										/>
									</td>
									<td style={{ textAlign: 'center' }}>${(ci.price * ci.qty).toLocaleString()}</td>
									<td style={{ textAlign: 'center' }}>
										<button onClick={() => removeLine(ci.id)}>Remove</button>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan={3} style={{ textAlign: 'right', paddingTop: 8 }}>
									Total:
								</td>
								<td style={{ textAlign: 'center', paddingTop: 8 }}>${total}</td>
								<td></td>
							</tr>
						</tfoot>
					</table>
				)}

				<div style={{ marginTop: 16 }}>
					<button className="primary-action" onClick={proceedToPayment} disabled={cart.length === 0}>
						Proceed to Payment
					</button>
				</div>
			</div>
		);
}
