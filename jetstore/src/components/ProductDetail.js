// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchInventory } from '../api';

// Same helpers as in purchase.js — keep in sync!
function getItemId(item) {
  const raw =
    item.id ??
    item.itemId ??
    item.ItemId ??
    item.sku ??
    item.SKU ??
    item.name;

  if (!raw) return '';
  return String(raw);
}

function getImagesForItem(item) {
  const apiImages =
    item.images ||
    item.imageUrls ||
    (item.image ? [item.image] : []);

  if (Array.isArray(apiImages) && apiImages.length > 0) {
    return apiImages;
  }

  const name = (item.name || '').toLowerCase();
  const imgs = [];

  if (name.includes('orion')) {
    imgs.push('/assets/orion.jpg');
  }
  if (name.includes('falcon')) {
    imgs.push('/assets/falcon.jpg');
  }
  if (name.includes('hawk')) {
    imgs.push('/assets/hawk.jpg');
  }
  if (name.includes('aurora')) {
    imgs.push('/assets/aurora.jpg');
  }
  if (name.includes('zephyr')) {
    imgs.push('/assets/zephyr.jpg');
  }

  if (imgs.length === 0) {
    imgs.push('/assets/orion.jpg');
  }

  return imgs;
}

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchInventory();
        if (cancelled) return;

        setRawData(data);

        let arr = [];

        if (Array.isArray(data)) {
          arr = data;
        } else if (Array.isArray(data?.items)) {
          arr = data.items;
        } else if (Array.isArray(data?.Items)) {
          arr = data.Items;
        } else if (typeof data?.body === 'string') {
          try {
            const parsed = JSON.parse(data.body);
            if (Array.isArray(parsed)) arr = parsed;
            else if (Array.isArray(parsed.items)) arr = parsed.items;
            else if (Array.isArray(parsed.Items)) arr = parsed.Items;
          } catch (e) {
            console.warn('Failed to parse data.body as JSON', e);
          }
        }

        const found = arr.find((it) => getItemId(it) === String(id));
        setItem(found || null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div>Loading jet details…</div>;
  }

  if (!item) {
    return (
      <div className="product-detail">
        <p>Jet not found.</p>
        {rawData && (
          <details style={{ marginTop: 8, fontSize: '0.8rem' }}>
            <summary>Debug: raw inventory response</summary>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </details>
        )}
        <button className="btn" onClick={() => navigate('/purchase')}>
          Back to catalog
        </button>
      </div>
    );
  }

  const images = getImagesForItem(item);
  const currentImage = images[index];

  const nextImg = () => {
    if (!images.length) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = () => {
    if (!images.length) return;
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAdd = () => {
    const qtyNum = Math.max(1, Number(qty) || 1);
    const cartItem = { ...item, id: getItemId(item) }; // ensure `id` exists
    addToCart(cartItem, qtyNum);
  };

  return (
    <div className="product-detail">
      <div className="detail-main">
        <div className="detail-gallery">
          {currentImage ? (
            <div className="detail-image-wrapper">
              <img src={currentImage} alt={item.name} />
              {images.length > 1 && (
                <div className="detail-gallery-controls">
                  <button type="button" onClick={prevImg}>
                    ‹
                  </button>
                  <span>
                    {index + 1} / {images.length}
                  </span>
                  <button type="button" onClick={nextImg}>
                    ›
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="image-placeholder large">No image</div>
          )}

          {images.length > 1 && (
            <div className="detail-thumbs">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={`thumb ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                >
                  <img src={src} alt={`${item.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h2>{item.name}</h2>
          <p className="detail-price">
            ${Number(item.price ?? item.cost ?? 0).toLocaleString()}
          </p>
          <p className="detail-description">
            {item.description ||
              'This jet delivers exceptional range, comfort, and performance for discerning pilots and passengers.'}
          </p>

          <div className="detail-specs">
            {item.range && (
              <div>
                <strong>Range:</strong> {item.range} km
              </div>
            )}
            {item.capacity && (
              <div>
                <strong>Passengers:</strong> {item.capacity}
              </div>
            )}
          </div>

          <div className="detail-actions">
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </label>
            <button type="button" className="primary-action" onClick={handleAdd}>
              Add to Cart
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <Link to="/purchase" className="btn">
              ← Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

