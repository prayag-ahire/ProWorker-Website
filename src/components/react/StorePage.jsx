import { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { CLIENT_PLAY_STORE_URL, WORKER_PLAY_STORE_URL } from '../../data/appLinks';
import { WHATSAPP_URL } from '../../data/contact';
import storeFeedFullImg from '../../assets/store/store-feed-full.jpg?url';
import productDetailImg from '../../assets/store/product-detail.jpg?url';
import robotCleanImg from '../../assets/store/robot-clean.jpg?url';
import foodImg from '../../assets/marketplace/cat-food.jpg?url';
import clothingImg from '../../assets/marketplace/cat-clothing.jpg?url';
import craftsImg from '../../assets/marketplace/cat-crafts.jpg?url';
import plantsImg from '../../assets/marketplace/cat-plants.jpg?url';
import bakeryImg from '../../assets/marketplace/cat-bakery.jpg?url';
import '../StorePage.css';

const sampleStoreProducts = [
    {
        id: 'robot',
        title: 'Handcrafted Robot Figurine',
        price: '₹499',
        rating: '4.9',
        reviews: 14,
        distance: '1.2 km away',
        seller: 'Prayag A. (Creator)',
        status: 'For sale',
        image: robotCleanImg,
        category: 'Craft & Art'
    },
    {
        id: 'tiffin',
        title: 'Daily Homestyle Veg Tiffin',
        price: '₹120',
        unit: '/ meal',
        rating: '5.0',
        reviews: 32,
        distance: '0.8 km away',
        seller: "Sunita's Home Kitchen",
        status: 'For sale',
        image: foodImg,
        category: 'Homemade Food'
    },
    {
        id: 'kurta',
        title: 'Custom Stitched Ethnic Kurta',
        price: '₹799',
        rating: '4.8',
        reviews: 21,
        distance: '1.6 km away',
        seller: 'Poonam Tailoring Studio',
        status: 'For sale',
        image: clothingImg,
        category: 'Custom Clothes'
    },
    {
        id: 'candles',
        title: 'Aromatic Soy Candle Set',
        price: '₹349',
        rating: '5.0',
        reviews: 18,
        distance: '2.4 km away',
        seller: 'Aarti Handmade Studio',
        status: 'For sale',
        image: craftsImg,
        category: 'Handmade Crafts'
    }
];

const storeCategoriesList = [
    {
        title: 'Homemade Food & Tiffins',
        icon: '🍲',
        image: foodImg,
        badge: 'Fresh Daily',
        examples: 'Daily lunch & dinner dabbas, homestyle thalis, fresh breads, snacks, and wholesome meals.'
    },
    {
        title: 'Clothing & Custom Tailoring',
        icon: '👗',
        image: clothingImg,
        badge: 'Custom Stitched',
        examples: 'Handcrafted kurtas, bespoke blouses, boutique designer dresses, festive wear, and alterations.'
    },
    {
        title: 'Handmade Crafts & Art',
        icon: '🎨',
        image: craftsImg,
        badge: 'Artisan Made',
        examples: 'Artisan pottery, aromatic soy candles, organic soaps, resin art, festival decor, and custom gifts.'
    },
    {
        title: 'Handcrafted Toys & Creations',
        icon: '🤖',
        image: robotCleanImg,
        badge: 'Home Creations',
        examples: 'Handmade wooden toys, DIY electronics, custom robots, collectibles, and artistic crafts.'
    },
    {
        title: 'Home Decor & Balcony Plants',
        icon: '🪴',
        image: plantsImg,
        badge: 'Green & Living',
        examples: 'Indoor nursery plants, macrame wall hangings, handcrafted planters, and artisan tableware.'
    },
    {
        title: 'Traditional Sweets & Pickles',
        icon: '🍯',
        image: bakeryImg,
        badge: 'Homemade Special',
        examples: 'Homestyle festive laddoos, regional jarred pickles, crispy namkeens, and seasonal hampers.'
    }
];

const sellerStories = [
    {
        name: 'Sunita Rao',
        role: 'Home Chef & Tiffin Maker',
        location: 'Kandivali, Mumbai',
        stars: '★★★★★',
        story: 'I started listing daily tiffins on ProWorker Store. Neighbors within 1.5 km discover my menu, message me on WhatsApp, and pay directly. 0% commission means I keep every single rupee I earn!',
        highlight: '30+ daily neighborhood tiffins'
    },
    {
        name: 'Poonam Deshmukh',
        role: 'Tailor & Boutique Designer',
        location: 'Borivali West, Mumbai',
        stars: '★★★★★',
        story: 'I stitch custom dresses and festive wear from my home. Having a dedicated store profile lets women in my society browse photos of my work and contact me for tailoring.',
        highlight: 'Regular neighborhood orders'
    },
    {
        name: 'Aarti Mehta',
        role: 'Handmade Candles & Crafts',
        location: 'Thane West',
        stars: '★★★★★',
        story: 'Big e-commerce sites take a 30% cut. On ProWorker Store, local customers call me directly and pick up gift hampers the same day. It is direct and hassle-free.',
        highlight: 'Zero platform cuts'
    }
];

const storeFaqs = [
    {
        q: 'What is ProWorker Store?',
        a: 'ProWorker Store is a dedicated in-app marketplace separate from trade services. It allows anyone—homemakers, home chefs, tailors, artisans, and creators—to list and sell homemade products directly to nearby neighbors with 0% commission.'
    },
    {
        q: 'Is the Store restricted to service-related products?',
        a: 'No! The Store is dedicated to homemade products. You can sell homemade food, tiffins, cakes, custom stitched clothes, pottery, candles, organic soaps, and handmade crafts. It is not limited to service tools or parts.'
    },
    {
        q: 'Does ProWorker charge commission on my store sales?',
        a: 'Never. ProWorker takes 0% commission. You set your own prices (e.g. ₹499), keep 100% of your earnings, and customers pay you directly.'
    },
    {
        q: 'How does a customer buy? Who contacts whom?',
        a: 'The customer contacts the seller! When a customer finds a product they like, they tap the seller card or call/WhatsApp button to contact the seller directly to confirm and place their order.'
    },
    {
        q: 'How does delivery work? Is in-app delivery coming?',
        a: 'Currently, customers contact sellers directly via call or WhatsApp to arrange convenient local pickup or local delivery. Integrated in-app delivery features are also coming very soon to the ProWorker app!'
    },
    {
        q: 'Do I need a commercial shop or GST to sell from home?',
        a: 'No. ProWorker Store is built to empower home-based sellers and local creators. You can start right from your home kitchen, living room, or workshop.'
    }
];

export default function StorePage() {
    const [viewMode, setViewMode] = useState('client');
    const [sellerTab, setSellerTab] = useState('seller');
    const [activeScreenshot, setActiveScreenshot] = useState('feed');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="store-page-root">
            <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />

            {/* Store Hero */}
            <header className="store-hero">
                <div className="container">
                    <div className="store-hero-inner">
                        <div className="store-hero-copy">
                            <div className="store-kicker-badge">
                                <span className="kicker-icon">🏪</span>
                                <span>The Open Local Marketplace</span>
                                <span className="kicker-pill">0% Commission</span>
                            </div>
                            <h1>
                                Sell & Buy <span className="text-store-highlight">Homemade Products</span> Directly From Home.
                            </h1>
                            <p className="store-hero-desc">
                                Inside the ProWorker app, discover the dedicated <strong>Store</strong> tab.
                                An authentic local marketplace to sell or buy homemade food, tailored clothing, handcrafted decor, and artisan products directly from neighbors with zero middleman cuts.
                            </p>

                            <div className="store-hero-buttons">
                                <a
                                    href={WORKER_PLAY_STORE_URL}
                                    className="btn btn-store-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Start Selling from Home
                                </a>
                                <a
                                    href={CLIENT_PLAY_STORE_URL}
                                    className="btn btn-store-secondary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download App to Shop Nearby
                                </a>
                            </div>

                            <div className="store-guarantees">
                                <div className="guarantee-item">
                                    <span className="check-icon">✓</span>
                                    <span><strong>0% Commission</strong> on all sales</span>
                                </div>
                                <div className="guarantee-item">
                                    <span className="check-icon">✓</span>
                                    <span><strong>Customer Contacts Seller</strong> directly via WhatsApp / Call</span>
                                </div>
                                <div className="guarantee-item">
                                    <span className="check-icon">✓</span>
                                    <span><strong>🚚 Delivery Features</strong> rolling out soon on app!</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Phone Mockup from Real App */}
                        <div className="store-hero-mockup-wrapper">
                            <div className="store-phone-frame">
                                <div className="phone-camera-island"></div>
                                <div className="phone-screen-container">
                                    <img
                                        src={activeScreenshot === 'feed' ? storeFeedFullImg : productDetailImg}
                                        alt="ProWorker Store in-app preview"
                                        className="phone-screenshot"
                                    />
                                </div>
                                <div className="mockup-tab-selector">
                                    <button
                                        type="button"
                                        className={`mockup-tab-btn ${activeScreenshot === 'feed' ? 'active' : ''}`}
                                        onClick={() => setActiveScreenshot('feed')}
                                    >
                                        🏪 In-App Store Feed
                                    </button>
                                    <button
                                        type="button"
                                        className={`mockup-tab-btn ${activeScreenshot === 'detail' ? 'active' : ''}`}
                                        onClick={() => setActiveScreenshot('detail')}
                                    >
                                        📦 Product Details
                                    </button>
                                </div>
                            </div>
                            <div className="phone-mockup-tag">
                                <strong>Actual App Screens</strong>
                                <span>Browse the dedicated Store tab inside ProWorker</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Live Store Feed Preview (Simulating In-App Experience) */}
            <section className="store-feed-preview-section">
                <div className="container">
                    <div className="section-title-center">
                        <span className="store-subhead-pill">Live In-App Experience</span>
                        <h2>Explore What Neighbors Sell on ProWorker Store</h2>
                        <p>
                            Here is a preview of how homemade items appear to local shoppers in the app.
                            Sorted by distance with real prices, direct seller contact, and zero middleman fee.
                        </p>
                    </div>

                    {/* Simulated In-App Search Bar */}
                    <div className="simulated-app-search-bar">
                        <div className="sim-search-input">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <span>Search nearby homemade products (food, clothes, crafts...)</span>
                        </div>
                        <div className="sim-search-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>Near your location • Sorted by distance</span>
                        </div>
                    </div>

                    {/* Simulated Product Cards Grid */}
                    <div className="preview-products-grid">
                        {sampleStoreProducts.map((prod) => (
                            <div key={prod.id} className="feed-product-card">
                                <div className="product-card-img-wrap">
                                    <img src={prod.image} alt={prod.title} />
                                    <span className="product-for-sale-pill">{prod.status}</span>
                                    <span className="product-category-tag">{prod.category}</span>
                                </div>
                                <div className="product-card-details">
                                    <div className="product-card-header">
                                        <h3 className="product-card-title">{prod.title}</h3>
                                        <div className="product-card-price">
                                            {prod.price}
                                            {prod.unit && <span className="price-unit">{prod.unit}</span>}
                                        </div>
                                    </div>

                                    <div className="product-card-meta">
                                        <div className="product-rating">
                                            <span className="star-icon">★</span>
                                            <strong>{prod.rating}</strong>
                                            <span className="reviews-count">({prod.reviews})</span>
                                        </div>
                                        <div className="product-distance">
                                            <span className="dist-icon">📍</span>
                                            <span>{prod.distance}</span>
                                        </div>
                                    </div>

                                    <div className="product-card-seller">
                                        <div className="seller-avatar">
                                            {prod.seller.charAt(0)}
                                        </div>
                                        <div className="seller-info-text">
                                            <span className="seller-label">Sold by</span>
                                            <span className="seller-name">{prod.seller}</span>
                                        </div>
                                        <a
                                            href={CLIENT_PLAY_STORE_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-product-contact"
                                            title="Download app to contact seller"
                                        >
                                            Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Homemade Products Can You Sell */}
            <section className="store-categories-section">
                <div className="container">
                    <div className="section-title-center">
                        <span className="store-subhead-pill">Authentic & Local</span>
                        <h2>What Homemade Products Can You Sell?</h2>
                        <p>
                            ProWorker Store is not tied to trade repairs. It is an authentic local marketplace where home entrepreneurs, artisans, and home chefs can sell the homemade products they create!
                        </p>
                    </div>

                    <div className="store-cards-grid">
                        {storeCategoriesList.map((cat, i) => (
                            <div key={i} className="store-category-box">
                                {cat.image ? (
                                    <div className="store-card-image-wrap">
                                        <img src={cat.image} alt={cat.title} />
                                        <span className="store-card-badge">{cat.badge}</span>
                                    </div>
                                ) : (
                                    <div className="store-card-icon-wrap">
                                        <span className="store-big-icon">{cat.icon}</span>
                                        <span className="store-card-badge">{cat.badge}</span>
                                    </div>
                                )}
                                <div className="store-card-body">
                                    <h3>{cat.title}</h3>
                                    <p>{cat.examples}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How Store Works */}
            <section className="store-how-it-works">
                <div className="container">
                    <div className="store-how-header">
                        <h2>How ProWorker Store Works</h2>
                        <div className="seller-buyer-toggle">
                            <button
                                type="button"
                                className={`sb-btn ${sellerTab === 'seller' ? 'active' : ''}`}
                                onClick={() => setSellerTab('seller')}
                            >
                                🏡 For Home Sellers
                            </button>
                            <button
                                type="button"
                                className={`sb-btn ${sellerTab === 'buyer' ? 'active' : ''}`}
                                onClick={() => setSellerTab('buyer')}
                            >
                                🛍️ For Local Shoppers
                            </button>
                        </div>
                    </div>

                    <div className="store-steps-grid">
                        {sellerTab === 'seller' ? (
                            <>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">01</div>
                                        <span className="step-icon-emoji">📲</span>
                                    </div>
                                    <h3>Open the Store Tab</h3>
                                    <p>Download the free ProWorker Worker app and tap on the Store section to set up your home shop profile.</p>
                                </div>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">02</div>
                                        <span className="step-icon-emoji">📸</span>
                                    </div>
                                    <h3>Snap Photos & Add Price</h3>
                                    <p>Upload real pictures of your homemade food, tailored clothing, crafts, or plants. Set your own fair price (₹).</p>
                                </div>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">03</div>
                                        <span className="step-icon-emoji">📍</span>
                                    </div>
                                    <h3>Nearby Neighbors Discover You</h3>
                                    <p>Your products appear to nearby local customers, sorted by distance with clear "For sale" tags.</p>
                                </div>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">04</div>
                                        <span className="step-icon-emoji">💬</span>
                                    </div>
                                    <h3>Customers Contact You Directly</h3>
                                    <p>Customers tap your product and contact you directly on WhatsApp or call. You keep 100% of your earnings. In-app delivery coming soon!</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">01</div>
                                        <span className="step-icon-emoji">🔍</span>
                                    </div>
                                    <h3>Tap Store in the App</h3>
                                    <p>Open the ProWorker app and switch to the dedicated Store tab right from the navigation bar.</p>
                                </div>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">02</div>
                                        <span className="step-icon-emoji">🍲</span>
                                    </div>
                                    <h3>Search & Browse Nearby</h3>
                                    <p>Filter by distance to find homemade meals, custom tailored dresses, or unique crafts in your neighborhood.</p>
                                </div>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">03</div>
                                        <span className="step-icon-emoji">🏷️</span>
                                    </div>
                                    <h3>Check Real Photos & Prices</h3>
                                    <p>Inspect real photos, clear per-item prices (e.g. ₹499), ratings, and distance before purchasing.</p>
                                </div>
                                <div className="store-step-item">
                                    <div className="step-header-row">
                                        <div className="step-num-badge">04</div>
                                        <span className="step-icon-emoji">📞</span>
                                    </div>
                                    <h3>You Contact the Seller Directly</h3>
                                    <p>Chat on WhatsApp or call the seller directly to confirm details and place your order. In-app delivery features are launching soon!</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Seller Stories / Testimonials */}
            <section className="store-stories-section">
                <div className="container">
                    <div className="section-title-center">
                        <span className="store-subhead-pill">Real Success Stories</span>
                        <h2>Home Sellers Thriving on ProWorker Store</h2>
                        <p>Discover how everyday home chefs, tailors, and creators earn directly from their homes.</p>
                    </div>

                    <div className="store-stories-grid">
                        {sellerStories.map((story, i) => (
                            <div key={i} className="seller-story-card">
                                <div className="story-card-top">
                                    <div className="story-badge">{story.highlight}</div>
                                    <div className="story-stars">{story.stars}</div>
                                </div>
                                <p className="story-quote">“{story.story}”</p>
                                <div className="story-author">
                                    <div className="author-avatar">{story.name.charAt(0)}</div>
                                    <div className="author-meta">
                                        <strong>{story.name}</strong>
                                        <span className="author-role">{story.role}</span>
                                        <span className="author-loc">📍 {story.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why ProWorker Store Banner */}
            <section className="store-comparison-section">
                <div className="container">
                    <div className="store-banner-card">
                        <div className="store-banner-layout">
                            <div className="store-banner-content">
                                <span className="banner-pill">Why Sellers Love ProWorker Store</span>
                                <h2>Keep 100% of What You Earn. No 30% Delivery App Cuts.</h2>
                                <p>
                                    Traditional e-commerce and food delivery platforms charge hefty 25% to 40% commissions and high onboarding fees.
                                    ProWorker Store is 100% free with <strong>0% commission</strong>, so home makers can earn with dignity and neighbors get authentic homemade quality at fair prices.
                                </p>
                                <div className="banner-action-row">
                                    <a
                                        href={WORKER_PLAY_STORE_URL}
                                        className="btn btn-store-light"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open Your Home Store Now
                                    </a>
                                    <a
                                        href={WHATSAPP_URL}
                                        className="btn btn-store-outline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Have Questions? Chat on WhatsApp
                                    </a>
                                </div>
                            </div>

                            {/* Side-by-side comparison box */}
                            <div className="store-comparison-table-box">
                                <div className="comp-col traditional-apps">
                                    <div className="comp-col-header">
                                        <span className="comp-title">Traditional Apps</span>
                                        <span className="comp-badge bad">High Cuts</span>
                                    </div>
                                    <ul className="comp-features">
                                        <li><span className="comp-cross">✕</span> 25% – 35% commission per order</li>
                                        <li><span className="comp-cross">✕</span> Mandatory GST & onboarding fees</li>
                                        <li><span className="comp-cross">✕</span> Payouts delayed by 7–14 days</li>
                                        <li><span className="comp-cross">✕</span> Strict corporate listing rules</li>
                                    </ul>
                                </div>
                                <div className="comp-col proworker-app">
                                    <div className="comp-col-header">
                                        <span className="comp-title">ProWorker Store</span>
                                        <span className="comp-badge good">0% Cut</span>
                                    </div>
                                    <ul className="comp-features">
                                        <li><span className="comp-check">✓</span> <strong>0% Commission</strong> forever</li>
                                        <li><span className="comp-check">✓</span> 100% free to start from home</li>
                                        <li><span className="comp-check">✓</span> Direct instant payments to you</li>
                                        <li><span className="comp-check">✓</span> In-app delivery rolling out soon</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store FAQs */}
            <section className="store-faq-section">
                <div className="container">
                    <div className="section-title-center">
                        <h2>Frequently Asked Questions About Store</h2>
                        <p>Got questions about selling or shopping on ProWorker Store? We’ve got answers.</p>
                    </div>

                    <div className="store-faq-list">
                        {storeFaqs.map((faq, i) => (
                            <div key={i} className={`store-faq-item ${openFaq === i ? 'open' : ''}`}>
                                <button
                                    type="button"
                                    className="store-faq-question"
                                    onClick={() => toggleFaq(i)}
                                >
                                    <span>{faq.q}</span>
                                    <span className="faq-toggle-icon">{openFaq === i ? '−' : '+'}</span>
                                </button>
                                {openFaq === i && (
                                    <div className="store-faq-answer">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
