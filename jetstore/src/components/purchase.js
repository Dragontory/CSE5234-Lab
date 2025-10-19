import React, { useState } from 'react';

const CATALOG = [
	{ id: 1, name: 'Falcon X', price: 299999.0, img: '/assets/falcon.svg' },
	{ id: 2, name: 'Hawk 2000', price: 189999.0, img: '/assets/hawk.svg' },
	{ id: 3, name: 'Orion Cruiser', price: 499999.0, img: '/assets/orion.svg' },
	{ id: 4, name: 'Zephyr Mk II', price: 129999.0, img: '/assets/zephyr.svg' },
	{ id: 5, name: 'Aurora Jet', price: 759999.0, img: '/assets/aurora.svg' },
];

export default function Purchase({ addToCart }) {
	const [quantities, setQuantities] = useState(() => CATALOG.reduce((acc, it) => ({ ...acc, [it.id]: 0 }), {}));

	function handleQtyChange(id, value) {
		const qty = Math.max(0, parseInt(value || '0', 10));
		setQuantities((q) => ({ ...q, [id]: qty }));
	}

	function handleAddToCart(item) {
		const qty = quantities[item.id] || 0;
		if (qty <= 0) return;
		addToCart(item, qty);
		setQuantities((q) => ({ ...q, [item.id]: 0 }));
	}

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
							<button className="primary-action" onClick={() => handleAddToCart(item)} style={{ marginLeft: 8 }}>
								Add
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
