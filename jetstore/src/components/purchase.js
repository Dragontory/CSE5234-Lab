// src/components/purchase.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchInventory } from '../api';

// Derive a consistent ID for an item
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

// Choose images for an item (middleman service still shows jets!)
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

  if (name.includes('orion')) imgs.push('/assets/orion.jpg');
  if (name.includes('falcon')) imgs.push('/assets/falcon.jpg');
  if (name.includes('hawk')) imgs.push('/assets/hawk.jpg');
  if (name.includes('aurora')) imgs.push('/assets/aurora.jpg');
  if (name.includes('zephyr')) imgs.push('/assets/zephyr.jpg');

  if (imgs.length === 0) imgs.push('/assets/orion.jpg');
  return imgs;
}

function ImageCarousel({ images = [], alt }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="card-image">
        <div className="image-placeholder">No image</div>
      </div>
    );
  }

  const current = images[index];

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="card-image carousel">
      <img src={current} alt={alt} />
      {images.length > 1 && (
        <div className="carousel-controls">
          <button type="button" onClick={prev} aria-label="Previous image">
            ‹
          </button>
          <span className="carousel-indicator">
            {index + 1} / {images.length}
          </span>
          <button type="button" onClick={next} aria-label="Next image">
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default function Purchase({ addToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchInventory();
        if (cancelled) return;

        console.log('Inventory API raw response:', data);
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

        setItems(arr);
      } catch (err) {
        console.error('Inventory load failed:', err);
        if (!cancelled) {
          setError('Failed to load inventory from server.');
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const FEE_PERCENT = 0.07; // e.g. 7% middleman fee

  return (
    <div>
      <h2 className="page-title">Jet Acquisition Services</h2>
      <p style={{ marginBottom: 8 }}>
        We don’t sell jets directly — we manage the entire acquisition process for you.
        Choose a jet you’re interested in and add our <strong>acquisition service</strong> to
        your cart. Our fee is a small percentage of the jet’s estimated price.
      </p>

      {loading && <div>Loading catalog…</div>}

      {!loading && error && (
        <div style={{ margin: '8px 0', color: 'crimson', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div style={{ marginTop: 12 }}>
          <p>No jets are currently available (or the API returned an unexpected format).</p>
          {rawData && (
            <details style={{ marginTop: 8, fontSize: '0.8rem' }}>
              <summary>Debug: raw inventory response</summary>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(rawData, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="catalog">
          {items.map((item) => {
            const id = getItemId(item);
            const images = getImagesForItem(item);

            const basePrice = Number(item.price ?? item.cost ?? 0);
            const serviceFee = Math.round(basePrice * FEE_PERCENT);

            const cartItem = {
              ...item,
              id,
              basePrice,
              feePercent: FEE_PERCENT,
              price: serviceFee, // what the cart / checkout uses
            };

            return (
              <article key={id} className="card">
                <ImageCarousel images={images} alt={item.name} />
                <h3 className="card-title">{item.name}</h3>
                <p className="card-price">
                  Acquisition service from ${serviceFee.toLocaleString()}
                </p>
                <p className="card-meta">
                  Estimated jet price: ${basePrice.toLocaleString()}
                </p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="primary-action"
                    onClick={() => addToCart(cartItem, 1)}
                  >
                    Add Service
                  </button>
                  <Link to={`/purchase/${id}`} className="btn">
                    View Details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}


