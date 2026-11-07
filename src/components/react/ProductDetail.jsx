import { useMemo, useState } from 'react';
import { CLIENT_PLAY_STORE_URL } from '../../data/appLinks';

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`;

const discountPct = (price, mrp) => {
    if (!mrp || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
};

const REVIEW_POOL = [
    { name: 'Rohit S.', city: 'Mumbai', text: 'Exactly as shown. Quality is solid and the seller replied quickly.' },
    { name: 'Ananya K.', city: 'Thane', text: 'Smooth experience. Pickup was nearby and the item matched the photos.' },
    { name: 'Vikram P.', city: 'Borivali', text: 'Fair price compared to big apps. Would order from this seller again.' },
    { name: 'Meera D.', city: 'Kandivali', text: 'Fresh listing, well packed, and no hidden charges. Recommended.' },
    { name: 'Sahil N.', city: 'Andheri', text: 'Came on time. Seller was polite and explained everything on WhatsApp.' },
    { name: 'Priya M.', city: 'Goregaon', text: 'Looks premium in person. Sharing this with neighbours too.' },
];

const categoryCopy = {
    food: 'Prepared fresh by a nearby home seller. Confirm spice level, serving size, and pickup or drop-off on the app.',
    clothing: 'Stitched or sourced locally. Check size, colour, and trial options with the seller before you pay.',
    crafts: 'Handmade in small batches. Each piece can vary slightly — that is part of the craft.',
    plants: 'Live plant or planter from a neighbourhood grower. Ask about sunlight needs and pot size.',
    electronics: 'Inspect the item on pickup. For rentals, confirm duration, deposit, and return condition.',
    furniture: 'Local pickup or short-distance drop. Measure your space and confirm assembly before booking.',
    tools: 'Check working condition, accessories included, and rental window with the seller.',
};

function buildReviews(product) {
    const seed = product.id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    return [0, 1, 2].map((offset) => {
        const item = REVIEW_POOL[(seed + offset) % REVIEW_POOL.length];
        const stars = offset === 2 && Number(product.rating) < 4.8 ? 4 : 5;
        return {
            ...item,
            stars,
            date: ['2 days ago', '1 week ago', '3 weeks ago'][offset],
        };
    });
}

function buildDetails(product) {
    const isRent = product.status === 'For rent';
    const unitLabel = product.unit || (isRent ? '/ day' : '');
    return {
        about: `${product.title} from ${product.seller}, ${product.distance} away. ${categoryCopy[product.categoryId] || ''} ProWorker takes 0% commission — you deal with the seller directly.`,
        bullets: [
            `${product.qty} · ${product.category} · ${product.status}`,
            isRent
                ? `Rent at ${formatPrice(product.price)}${unitLabel}. Security deposit is confirmed with the seller.`
                : `Buy at ${formatPrice(product.price)}. MRP ${formatPrice(product.mrp)}.`,
            `Sold by ${product.seller} · ${product.distance} from you`,
            isRent ? 'Pickup and return on the agreed dates' : 'Local pickup or neighbourhood delivery',
            'Pay the seller directly. 0% ProWorker commission',
        ],
        specs: [
            ['Brand / seller', product.seller],
            ['Category', product.category],
            ['Listing type', product.status],
            ['Pack size', product.qty],
            ['Distance', product.distance],
            ['Availability', 'In stock · nearby'],
            ['Delivery', isRent ? 'Pickup / drop by seller' : 'Pickup or local delivery'],
            ['Returns', isRent ? 'Return after rental period' : 'Confirm with seller before purchase'],
        ],
    };
}

export default function ProductDetail({ product, related, onBack, onOpenProduct }) {
    const [qty, setQty] = useState(1);
    const off = discountPct(product.price, product.mrp);
    const isRent = product.status === 'For rent';
    const details = useMemo(() => buildDetails(product), [product]);
    const reviews = useMemo(() => buildReviews(product), [product]);
    const save = product.mrp > product.price ? product.mrp - product.price : 0;

    return (
        <div className="pdp">
            <nav className="pdp-crumb" aria-label="Breadcrumb">
                <button type="button" className="pdp-back" onClick={onBack}>
                    ← Back to results
                </button>
                <span>Store</span>
                <span>/</span>
                <span>{product.category}</span>
                <span>/</span>
                <span className="pdp-crumb-current">{product.title}</span>
            </nav>

            <div className="pdp-hero">
                <div className="pdp-gallery">
                    <div className="pdp-photo">
                        {off > 0 && <span className="qc-off">{off}% OFF</span>}
                        <span className={`qc-tag ${isRent ? 'is-rent' : 'is-sale'}`}>
                            {isRent ? 'RENT' : 'SALE'}
                        </span>
                        <img src={product.image} alt={product.title} />
                    </div>
                </div>

                <div className="pdp-info">
                    <p className="pdp-brand">Visit the {product.seller} store</p>
                    <h1 className="pdp-title">{product.title}</h1>

                    <div className="pdp-rating-row">
                        <span className="pdp-stars">{'★'.repeat(Math.round(Number(product.rating)))}</span>
                        <strong>{product.rating}</strong>
                        <span className="pdp-rating-count">{product.reviews} ratings</span>
                    </div>

                    <div className="pdp-price-block">
                        {off > 0 && <span className="pdp-off-label">-{off}%</span>}
                        <span className="pdp-price">
                            {formatPrice(product.price)}
                            {product.unit && <span className="pdp-unit">{product.unit}</span>}
                        </span>
                        {product.mrp > product.price && (
                            <span className="pdp-mrp">
                                M.R.P.: <s>{formatPrice(product.mrp)}</s>
                            </span>
                        )}
                        {save > 0 && (
                            <span className="pdp-save">You save {formatPrice(save)}</span>
                        )}
                    </div>

                    <p className="pdp-tax">Inclusive of all taxes · 0% platform fee</p>

                    <ul className="pdp-points">
                        <li><strong>Size / qty:</strong> {product.qty}</li>
                        <li><strong>Listed as:</strong> {product.status}</li>
                        <li><strong>Location:</strong> {product.distance} away</li>
                        <li><strong>Fulfilment:</strong> {isRent ? 'Pickup & return' : 'Pickup or local delivery'}</li>
                    </ul>
                </div>

                <aside className="pdp-buy-box">
                    <div className="pdp-buy-price">
                        {formatPrice(product.price)}
                        {product.unit && <span className="pdp-unit">{product.unit}</span>}
                    </div>
                    {product.mrp > product.price && (
                        <p className="pdp-buy-mrp">M.R.P. <s>{formatPrice(product.mrp)}</s> · {off}% off</p>
                    )}
                    <p className="pdp-stock">In stock</p>
                    <p className="pdp-soldby">
                        Sold by <strong>{product.seller}</strong>
                        <span>{product.distance} · local pickup</span>
                    </p>

                    <div className="pdp-qty-row">
                        <label htmlFor="pdp-qty">Quantity</label>
                        <div className="pdp-qty">
                            <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease quantity">−</button>
                            <input id="pdp-qty" readOnly value={qty} />
                            <button type="button" onClick={() => setQty((n) => Math.min(9, n + 1))} aria-label="Increase quantity">+</button>
                        </div>
                    </div>

                    <a
                        href={CLIENT_PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdp-btn pdp-btn-primary"
                    >
                        {isRent ? 'Rent in app' : 'Buy in app'}
                    </a>
                    <a
                        href={CLIENT_PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdp-btn pdp-btn-secondary"
                    >
                        Contact seller
                    </a>
                </aside>
            </div>

            <div className="pdp-sticky-bar">
                <div className="pdp-sticky-meta">
                    <strong>{formatPrice(product.price)}</strong>
                    {product.unit && <span>{product.unit}</span>}
                </div>
                <a
                    href={CLIENT_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdp-btn pdp-btn-secondary"
                >
                    Contact
                </a>
                <a
                    href={CLIENT_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdp-btn pdp-btn-primary"
                >
                    {isRent ? 'Rent in app' : 'Buy in app'}
                </a>
            </div>

            <section className="pdp-section">
                <h2>About this item</h2>
                <p>{details.about}</p>
                <ul>
                    {details.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
            </section>

            <section className="pdp-section">
                <h2>Product details</h2>
                <table className="pdp-specs">
                    <tbody>
                        {details.specs.map(([label, value]) => (
                            <tr key={label}>
                                <th>{label}</th>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="pdp-section">
                <h2>Customer reviews</h2>
                <div className="pdp-reviews">
                    {reviews.map((review) => (
                        <article key={`${review.name}-${review.date}`} className="pdp-review">
                            <div className="pdp-review-head">
                                <span className="pdp-avatar">{review.name.charAt(0)}</span>
                                <div>
                                    <strong>{review.name}</strong>
                                    <span>{review.city} · {review.date}</span>
                                </div>
                            </div>
                            <p className="pdp-review-stars">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</p>
                            <p>{review.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {related.length > 0 && (
                <section className="pdp-section">
                    <h2>Related products</h2>
                    <div className="pdp-related">
                        {related.map((item) => {
                            const itemOff = discountPct(item.price, item.mrp);
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="pdp-related-card"
                                    onClick={() => onOpenProduct(item.id)}
                                >
                                    <img src={item.image} alt={item.title} />
                                    <span className="pdp-related-title">{item.title}</span>
                                    <span className="pdp-related-price">
                                        {formatPrice(item.price)}
                                        {itemOff > 0 && <s>{formatPrice(item.mrp)}</s>}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
