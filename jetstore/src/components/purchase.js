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

// Map each item to a profile: image slug + descriptions
function getItemProfile(item) {
  const name = (item.name || '').toLowerCase().trim();

  // Default / generic profile
  let slug = 'generic-jet';
  let aircraftDescription =
    'A versatile private aircraft suitable for regional and medium-range missions.';
  let serviceDescription =
    'Stratos Consulting coordinates market research, inspections, negotiations, and closing to ensure a transparent acquisition process.';

  // Orion – HMS Orion
  if (name.includes('orion') || name.includes('hms')) {
    slug = 'orion';
    aircraftDescription =
      'HMS Orion is a long-range, large-cabin business jet designed for intercontinental missions with generous passenger comfort and strong field performance.';
    serviceDescription =
      'For Orion-class jets, Stratos Consulting oversees fleet comparisons, pre-buy inspections, and long-range operational planning while managing legal and financial risk for global operations.';
  }
  // Eagle – 2016 DA 62
  else if (name.includes('eagle') || name.includes('da 62') || name.includes('da62')) {
    slug = 'eagle';
    aircraftDescription =
      'The 2016 DA 62 is a modern twin-engine piston aircraft known for its efficiency, safety, and excellent visibility — ideal for owner-pilots and light corporate use.';
    serviceDescription =
      'Our team evaluates logbooks, engine programs, and maintenance history, and helps you balance acquisition cost with ongoing operating expenses for DA 62 acquisitions.';
  }
  // Hawk – 2007 Hawker 850XP
  else if (name.includes('hawk') || name.includes('hawker') || name.includes('850xp')) {
    slug = 'hawk';
    aircraftDescription =
      'The 2007 Hawker 850XP is a proven midsize jet offering solid range, a comfortable cabin, and great value in the pre-owned market.';
    serviceDescription =
      'For Hawker 850XP buyers, Stratos Consulting manages technical due diligence, cabin refurbishment options, and operating cost projections to optimize total cost of ownership.';
  }
  // Skyrider – 2025 Turbo Skylane T182T
  else if (
    name.includes('skyrider') ||
    name.includes('skylane') ||
    name.includes('t182t')
  ) {
    slug = 'skyrider';
    aircraftDescription =
      'The 2025 Turbo Skylane T182T is a high-performance single-engine piston aircraft suitable for modern IFR touring and personal or training missions.';
    serviceDescription =
      'For Skylane-class aircraft, our advisors help evaluate new vs. recent-year builds, avionics packages, and upgrade paths while coordinating financing and delivery.';
  }
  // Falcon – 1996 Falcon 2000
  else if (name.includes('falcon') || name.includes('falcon 2000') || name.includes('2000')) {
    slug = 'falcon';
    aircraftDescription =
      'The 1996 Falcon 2000 is a large-cabin, twin-engine business jet with transcontinental range and a reputation for reliability and comfort.';
    serviceDescription =
      'With Falcon 2000 acquisitions, Stratos Consulting guides you through pedigree review, cabin configuration decisions, and long-term maintenance planning, from LOI to final delivery.';
  }

  return { slug, aircraftDescription, serviceDescription };
}

// Build a 5-image slideshow per aircraft using its slug
function getImagesForItem(item) {
  const { slug } = getItemProfile(item);

  // If we only have a generic image, just repeat it
  if (slug === 'generic-jet') {
    return Array(5).fill('/assets/generic-jet.jpg');
  }

  // Otherwise, use slug1..slug5
  const frames = [1, 2, 3, 4, 5];
  return frames.map((i) => `/assets/${slug}${i}.jpg`);
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

  const FEE_PERCENT = 0.07; // 7% middleman fee

  return (
    <div>
      <h2 className="page-title">Aircraft Acquisition Services</h2>
      <p
        style={{
          marginBottom: 8,
          textAlign: 'center',
          maxWidth: 720,
          marginInline: 'auto',
        }}
      >
        Stratos Consulting provides full-service aircraft acquisition support. 
        Select a model to begin the evaluation process and add our advisory service 
        to your cart. Our consulting fee is a small percentage of the estimated 
        aircraft price.
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
            const { aircraftDescription, serviceDescription } = getItemProfile(item);

            const basePrice = Number(item.price ?? item.cost ?? 0);
            const serviceFee = Math.round(basePrice * FEE_PERCENT);

            const cartItem = {
              ...item,
              id,
              basePrice,
              feePercent: FEE_PERCENT,
              price: serviceFee, // what actually goes through checkout
            };

            return (
              <article key={id} className="card">
                <ImageCarousel images={images} alt={item.name} />
                <div className="card-body">
                  <div className="card-tag">Acquisition Service</div>
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-price">
                    From ${serviceFee.toLocaleString()}
                    <span className="card-price-sub">service fee</span>
                  </p>
                  <p className="card-meta">
                    Estimated jet price: ${basePrice.toLocaleString()}
                  </p>
                  <p className="card-meta">
                    <strong>Aircraft:</strong> {aircraftDescription}
                  </p>
                  <p className="card-meta">
                    <strong>Service:</strong> {serviceDescription}
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
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
