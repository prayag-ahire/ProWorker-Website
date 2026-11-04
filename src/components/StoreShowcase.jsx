import { useState } from 'react';
import './StoreShowcase.css';
import { WORKER_PLAY_STORE_URL, CLIENT_PLAY_STORE_URL } from '../data/appLinks';
import { useViewMode } from '../context/ViewModeContext';
import storeFeedFullImg from '../assets/store/store-feed-full.jpg?url';
import productDetailImg from '../assets/store/product-detail.jpg?url';

const storeHighlights = [
    {
        icon: '🍲',
        title: 'Homemade Food & Tiffins',
        description: 'Home-cooked meals, daily tiffin boxes, baked cakes, traditional snacks, pickles, and sweets prepared fresh at home.'
    },
    {
        icon: '👗',
        title: 'Clothes & Custom Tailoring',
        description: 'Bespoke kurtas, stitched blouses, boutique dresses, festive wear, and alterations crafted by local home tailors.'
    },
    {
        icon: '🎨',
        title: 'Handmade Crafts & Art',
        description: 'Handcrafted pottery, organic soaps, scented candles, macrame, festival decor, and custom handmade gifts.'
    },
    {
        icon: '🪴',
        title: 'Plants & Home Decor',
        description: 'Balcony plants, planters, wall hangings, and handmade decor—list what you grow or craft from home with 0% commission.'
    }
];

function StoreShowcase() {
    const isWorker = useViewMode() === 'worker';
    const [activeScreenshot, setActiveScreenshot] = useState('feed');

    return (
        <section id="store" className="section store-showcase-section">
            <div className="container">
                <div className="store-badge-wrapper scroll-animate">
                    <span className="store-badge">
                        <span className="store-badge-icon">🏪</span> ProWorker Store
                    </span>
                    <span className="store-pill-distinct">Dedicated In-App Marketplace</span>
                </div>

                <div className="store-header-grid scroll-animate">
                    <div className="store-header-copy">
                        <h2>
                            Services for hire. Store for homemade goods.
                        </h2>
                        <p className="store-subtitle">
                            ProWorker has a dedicated <strong>Store</strong> tab alongside skilled services.
                            Sell or buy homemade food, custom tailoring, crafts, and decor near you—with direct seller contact, <strong>0% commission</strong>, weekly bank settlement, and doorstep delivery coming soon.
                        </p>
                    </div>

                    <div className="store-quick-stats">
                        <div className="store-stat-box">
                            <span className="stat-value">0%</span>
                            <span className="stat-label">Platform Commission</span>
                        </div>
                        <div className="store-stat-box">
                            <span className="stat-value">Direct</span>
                            <span className="stat-label">Seller Contact</span>
                        </div>
                        <div className="store-stat-box">
                            <span className="stat-value">Monday</span>
                            <span className="stat-label">Weekly Bank Payout</span>
                        </div>
                    </div>
                </div>

                <div className="store-showcase-main scroll-animate">
                    <div className="store-features-column">
                        <div className="store-features-list">
                            {storeHighlights.map((item, index) => (
                                <div key={index} className="store-feature-card">
                                    <div className="store-feature-icon">{item.icon}</div>
                                    <div className="store-feature-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="store-cta-bar">
                            <div>
                                <h4>{isWorker ? 'Start selling homemade products today' : 'Explore homemade products near you'}</h4>
                                <p>{isWorker ? 'List your homemade products in minutes and start receiving direct orders with 0% commission.' : 'Download the ProWorker app, tap Store, or explore our dedicated web marketplace preview.'}</p>
                            </div>
                            <div className="store-cta-btn-group">
                                <a
                                    href="/store"
                                    className="btn btn-secondary btn-store-explore"
                                >
                                    🏪 Visit Store Page
                                </a>
                                <a
                                    href={isWorker ? WORKER_PLAY_STORE_URL : CLIENT_PLAY_STORE_URL}
                                    className="btn btn-primary btn-store-download"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {isWorker ? 'Open My Home Store' : 'Open in App'}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="store-visual-column">
                        <div className="store-phone-mockup">
                            <div className="store-phone-notch"></div>
                            <div className="store-mockup-screen">
                                <img
                                    src={activeScreenshot === 'feed' ? storeFeedFullImg : productDetailImg}
                                    alt="ProWorker Store Mobile Screen"
                                    className="store-screen-img"
                                />
                            </div>
                            <div className="store-screenshot-toggle">
                                <button
                                    type="button"
                                    className={`screenshot-toggle-btn ${activeScreenshot === 'feed' ? 'active' : ''}`}
                                    onClick={() => setActiveScreenshot('feed')}
                                >
                                    🏪 Store Feed
                                </button>
                                <button
                                    type="button"
                                    className={`screenshot-toggle-btn ${activeScreenshot === 'detail' ? 'active' : ''}`}
                                    onClick={() => setActiveScreenshot('detail')}
                                >
                                    📦 Product Card
                                </button>
                            </div>
                        </div>
                        <div className="store-mockup-caption">
                            <strong>Real ProWorker App Experience</strong>
                            <span>Search nearby products, see prices (e.g. ₹499), distance, and contact sellers directly.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StoreShowcase;

