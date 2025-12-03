// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchInventory } from '../api';

// Derive a consistent ID for an item (same as purchase.js)
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

// Same profile logic as purchase.js
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

// Build a 5-image slideshow per aircraft using its slug (same as purchase.js)
function getImagesForItem(item) {
  const { slug } = getItemProfile(item);

  if (slug === 'generic-jet') {
    return Array(5).fill('/assets/generic-jet.jpg');
  }

  const frames = [1, 2, 3, 4, 5];
  return frames.map((i) => `/assets/${slug}${i}.jpg`);
}

function DetailCarousel({ images = [], alt }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="detail-image-wrapper">
        <div className="image-placeholder large">No image</div>
      </div>
    );
  }

  const current = images[index];

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="detail-image-wrapper">
        <img src={current} alt={alt} />
        {images.length > 1 && (
          <div className="detail-gallery-controls">
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

      <div className="detail-thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            className={`thumb ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          >
            <img src={src} alt={`${alt} thumbnail ${i + 1}`} />
          </button>
        ))}
      </div>
    </>
  );
}

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchInventory();

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
            console.warn('Failed to parse data.body as JSON in ProductDetail', e);
          }
        }

        if (cancelled) return;

        const match = arr.find((it) => getItemId(it) === id);
        if (!match) {
          setError('Aircraft not found.');
          setItem(null);
        } else {
          setItem(match);
        }
      } catch (err) {
        console.error('Product detail load failed:', err);
        if (!cancelled) {
          setError('Failed to load aircraft details from server.');
          setItem(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const FEE_PERCENT = 0.07;

  if (loading) {
    return (
      <div className="container">
        <h2 className="page-title">Aircraft Details</h2>
        <p>Loading aircraft…</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container">
        <h2 className="page-title">Aircraft Details</h2>
        <p style={{ color: 'crimson', marginBottom: 8 }}>
          {error || 'Aircraft not found.'}
        </p>
        <button type="button" className="btn" onClick={() => navigate('/purchase')}>
          ← Back to Aircraft
        </button>
      </div>
    );
  }

  const basePrice = Number(item.price ?? item.cost ?? 0);
  const serviceFee = Math.round(basePrice * FEE_PERCENT);

  const { aircraftDescription, serviceDescription } = getItemProfile(item);
  const images = getImagesForItem(item);

  const cartItem = {
    ...item,
    id: getItemId(item),
    basePrice,
    feePercent: FEE_PERCENT,
    price: serviceFee,
  };

  const onAdd = () => {
    const qty = Math.max(1, Number(quantity) || 1);
    addToCart(cartItem, qty);
  };

  return (
    <div className="product-detail">
      <button type="button" className="btn" onClick={() => navigate('/purchase')}>
        ← Back to Aircraft
      </button>

      <div className="detail-main">
        <div className="detail-gallery">
          <DetailCarousel images={images} alt={item.name} />
        </div>

        <div className="detail-info">
          <h2>{item.name}</h2>
          <div className="detail-price">
            From ${serviceFee.toLocaleString()}
            <span className="card-price-sub"> advisory service fee</span>
          </div>

          <p className="detail-description">
            <strong>Aircraft: </strong>
            {aircraftDescription}
          </p>
          <p className="detail-description">
            <strong>Service: </strong>
            {serviceDescription}
          </p>

          <div className="detail-specs">
            <span>
              <strong>Estimated aircraft price:</strong>{' '}
              ${basePrice.toLocaleString()}
            </span>
            <span>
              <strong>Advisory fee:</strong>{' '}
              ~{Math.round(FEE_PERCENT * 100)}% of aircraft value
            </span>
          </div>

          <div className="detail-actions">
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
            <button type="button" className="primary-action" onClick={onAdd}>
              Add Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



