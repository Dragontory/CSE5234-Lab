import React, { useState, useEffect } from "react";
import axios from "axios";
import { INVENTORY_API } from "../api";

export default function Purchase({ addToCart }) {
	const [catalog, setCatalog] = useState([]);
	const [quantities, setQuantities] = useState({});

	useEffect(() => {
		axios
			.get(INVENTORY_API)
			.then((res) => {
				const items = res.data.items || [];
				setCatalog(items);
				setQuantities(items.reduce((acc, it) => ({ ...acc, [it.id]: 0 }), {}));
			})
			.catch((err) => console.error("Failed to load catalog:", err));
	}, []);

	function handleQtyChange(id, value) {
		const qty = Math.max(0, parseInt(value || "0", 10));
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
				{catalog.map((item) => (
					<div key={item.id} className="card">
						<img
							src={item.imageUrl}
							alt={item.name}
							style={{ width: 160, height: 80 }}
						/>
						<h4>{item.name}</h4>
						<p>${item.price.toLocaleString()}</p>
						<p>
							Remaining: {item.quantity} in stock
						</p>

						<div>
							<label>
								Qty:{" "}
								<input
									type="number"
									min="0"
									value={quantities[item.id] || 0}
									onChange={(e) => handleQtyChange(item.id, e.target.value)}
								/>
							</label>
							<button
								className="primary-action"
								onClick={() => handleAddToCart(item)}
								style={{ marginLeft: 8 }}
							>
								Add
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
