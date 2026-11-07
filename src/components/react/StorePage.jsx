import { useEffect, useMemo, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { CLIENT_PLAY_STORE_URL } from '../../data/appLinks';
import ProductDetail from './ProductDetail';
import '../StorePage.css';

// Product photos
import imgTiffin from '../../assets/store/products/product-tiffin.jpg?url';
import imgThali from '../../assets/store/products/product-thali.jpg?url';
import imgParatha from '../../assets/store/products/product-paratha.jpg?url';
import imgSabzi from '../../assets/store/products/product-sabzi.jpg?url';
import imgLadoo from '../../assets/store/products/product-ladoo.jpg?url';
import imgPickle from '../../assets/store/products/product-pickle.jpg?url';
import imgCake from '../../assets/store/products/product-cake.jpg?url';
import imgCookies from '../../assets/store/products/product-cookies.jpg?url';
import imgKurta from '../../assets/store/products/product-kurta.jpg?url';
import imgBlouse from '../../assets/store/products/product-blouse.jpg?url';
import imgDress from '../../assets/store/products/product-dress.jpg?url';
import imgKidswear from '../../assets/store/products/product-kidswear.jpg?url';
import imgDupatta from '../../assets/store/products/product-dupatta.jpg?url';
import imgSherwani from '../../assets/store/products/product-sherwani.jpg?url';
import imgLehenga from '../../assets/store/products/product-lehenga.jpg?url';
import imgSuit from '../../assets/store/products/product-suit.jpg?url';
import imgCandles from '../../assets/store/products/product-candles.jpg?url';
import imgSoap from '../../assets/store/products/product-soap.jpg?url';
import imgPottery from '../../assets/store/products/product-pottery.jpg?url';
import imgResin from '../../assets/store/products/product-resin.jpg?url';
import imgMacrame from '../../assets/store/products/product-macrame.jpg?url';
import imgFrame from '../../assets/store/products/product-frame.jpg?url';
import imgPlantMoney from '../../assets/store/products/product-plant-money.jpg?url';
import imgPlantSnake from '../../assets/store/products/product-plant-snake.jpg?url';
import imgPlantSucculent from '../../assets/store/products/product-plant-succulent.jpg?url';
import imgPlanter from '../../assets/store/products/product-planter.jpg?url';
import imgVase from '../../assets/store/products/product-vase.jpg?url';
import imgProjector from '../../assets/store/products/product-projector.jpg?url';
import imgSpeaker from '../../assets/store/products/product-speaker.jpg?url';
import imgCamera from '../../assets/store/products/product-camera.jpg?url';
import imgLaptop from '../../assets/store/products/product-laptop.jpg?url';
import imgConsole from '../../assets/store/products/product-console.jpg?url';
import imgEarbuds from '../../assets/store/products/product-earbuds.jpg?url';
import imgChairs from '../../assets/store/products/product-chairs.jpg?url';
import imgTable from '../../assets/store/products/product-table.jpg?url';
import imgSofa from '../../assets/store/products/product-sofa.jpg?url';
import imgShelf from '../../assets/store/products/product-shelf.jpg?url';
import imgStool from '../../assets/store/products/product-stool.jpg?url';
import imgDrill from '../../assets/store/products/product-drill.jpg?url';
import imgLadder from '../../assets/store/products/product-ladder.jpg?url';
import imgMixer from '../../assets/store/products/product-mixer.jpg?url';
import imgRobot from '../../assets/store/products/product-robot.jpg?url';
import imgWoodtoy from '../../assets/store/products/product-woodtoy.jpg?url';
import imgTent from '../../assets/store/products/product-tent.jpg?url';

/** Product categories only — sell / rent marketplace (no services) */
const browseCategories = [
    { id: 'all', label: 'All Products', icon: '🛍️' },
    { id: 'food', label: 'Food', icon: '🍲' },
    { id: 'clothing', label: 'Clothing', icon: '👗' },
    { id: 'crafts', label: 'Crafts', icon: '🎨' },
    { id: 'plants', label: 'Plants', icon: '🪴' },
    { id: 'electronics', label: 'Electronics', icon: '🎧' },
    { id: 'furniture', label: 'Furniture', icon: '🛋️' },
    { id: 'tools', label: 'Tools & Gear', icon: '🛠️' },
];

/**
 * Mock catalog — sell + rent products only.
 * status: 'For sale' | 'For rent'
 */
const sampleStoreProducts = [
    // —— Food ——
    { id: 'tiffin', title: 'Daily Homestyle Veg Tiffin', qty: '1 full meal', image: imgTiffin, price: 120, mrp: 150, unit: '/ meal', rating: '5.0', reviews: 32, distance: '0.8 km', seller: "Sunita's Home Kitchen", status: 'For sale', categoryId: 'food', category: 'Food' },
    { id: 'thali', title: 'Gujarati Thali Lunch Box', qty: '1 box', image: imgThali, price: 150, mrp: 180, unit: '/ meal', rating: '4.9', reviews: 48, distance: '1.1 km', seller: 'Meena Home Kitchen', status: 'For sale', categoryId: 'food', category: 'Food' },
    { id: 'paratha', title: 'Stuffed Paratha Combo', qty: '4 pieces', image: imgParatha, price: 180, mrp: 220, rating: '4.8', reviews: 27, distance: '1.4 km', seller: "Kavita's Kitchen", status: 'For sale', categoryId: 'food', category: 'Food' },
    { id: 'sabzi', title: 'Fresh Sabzi & Roti Pack', qty: '1 pack', image: imgSabzi, price: 99, mrp: 130, unit: '/ pack', rating: '4.7', reviews: 19, distance: '0.6 km', seller: 'Anita Dabba', status: 'For sale', categoryId: 'food', category: 'Food' },
    { id: 'ladoo', title: 'Besan Ladoo Box', qty: '500 g', image: imgLadoo, price: 320, mrp: 400, rating: '5.0', reviews: 39, distance: '1.1 km', seller: "Aaji's Sweets", status: 'For sale', categoryId: 'food', category: 'Food' },
    { id: 'pickle', title: 'Homestyle Mango Pickle', qty: '400 g jar', image: imgPickle, price: 180, mrp: 240, rating: '4.9', reviews: 52, distance: '0.9 km', seller: 'Desi Jar Kitchen', status: 'For sale', categoryId: 'food', category: 'Food' },
    { id: 'cake', title: 'Eggless Chocolate Cake', qty: '1 kg', image: imgCake, price: 650, mrp: 800, rating: '4.8', reviews: 28, distance: '1.5 km', seller: 'HomeBake Studio', status: 'For sale', categoryId: 'food', category: 'Food' },
    { id: 'cookies', title: 'Butter Cookies Gift Tin', qty: '300 g', image: imgCookies, price: 280, mrp: 350, rating: '4.9', reviews: 20, distance: '2.0 km', seller: 'Oven & Whisk', status: 'For sale', categoryId: 'food', category: 'Food' },

    // —— Clothing ——
    { id: 'kurta', title: 'Custom Stitched Ethnic Kurta', qty: 'Made to size', image: imgKurta, price: 799, mrp: 1099, rating: '4.8', reviews: 21, distance: '1.6 km', seller: 'Poonam Boutique', status: 'For sale', categoryId: 'clothing', category: 'Clothing' },
    { id: 'blouse', title: 'Designer Embroidered Blouse', qty: 'Made to size', image: imgBlouse, price: 650, mrp: 999, rating: '4.9', reviews: 36, distance: '1.2 km', seller: 'Sneha Boutique Home', status: 'For sale', categoryId: 'clothing', category: 'Clothing' },
    { id: 'dress', title: 'Handcrafted Party Dress', qty: 'Free size', image: imgDress, price: 1299, mrp: 1799, rating: '4.7', reviews: 12, distance: '2.3 km', seller: 'Riya Custom Wear', status: 'For sale', categoryId: 'clothing', category: 'Clothing' },
    { id: 'kidswear', title: 'Kids Ethnic Wear Set', qty: '2-8 yrs', image: imgKidswear, price: 549, mrp: 799, rating: '4.8', reviews: 24, distance: '0.9 km', seller: 'Little Threads', status: 'For sale', categoryId: 'clothing', category: 'Clothing' },
    { id: 'dupatta', title: 'Hand-Embroidered Dupatta', qty: '2.5 m', image: imgDupatta, price: 449, mrp: 699, rating: '4.9', reviews: 17, distance: '1.9 km', seller: 'Zara Embroidery', status: 'For sale', categoryId: 'clothing', category: 'Clothing' },
    { id: 'sherwani-rent', title: 'Wedding Sherwani', qty: 'Size 40', image: imgSherwani, price: 499, mrp: 700, unit: '/ day', rating: '4.8', reviews: 31, distance: '1.3 km', seller: 'Occasion Wear Rentals', status: 'For rent', categoryId: 'clothing', category: 'Clothing' },
    { id: 'lehenga-rent', title: 'Bridal Lehenga Set', qty: 'Free size', image: imgLehenga, price: 899, mrp: 1400, unit: '/ day', rating: '4.9', reviews: 22, distance: '2.1 km', seller: 'Festive Closet', status: 'For rent', categoryId: 'clothing', category: 'Clothing' },
    { id: 'suit-rent', title: 'Formal Blazer Suit', qty: 'Size 38-42', image: imgSuit, price: 350, mrp: 500, unit: '/ day', rating: '4.7', reviews: 18, distance: '1.0 km', seller: 'City Suit Rentals', status: 'For rent', categoryId: 'clothing', category: 'Clothing' },

    // —— Crafts ——
    { id: 'candles', title: 'Aromatic Soy Candle Set', qty: 'Set of 3', image: imgCandles, price: 349, mrp: 499, rating: '5.0', reviews: 18, distance: '2.4 km', seller: 'Aarti Handmade', status: 'For sale', categoryId: 'crafts', category: 'Crafts' },
    { id: 'soap', title: 'Organic Herbal Soap Pack', qty: 'Pack of 4', image: imgSoap, price: 299, mrp: 420, rating: '4.8', reviews: 29, distance: '1.5 km', seller: 'NatureCraft Home', status: 'For sale', categoryId: 'crafts', category: 'Crafts' },
    { id: 'pottery', title: 'Handmade Clay Diya Set', qty: 'Set of 12', image: imgPottery, price: 249, mrp: 350, rating: '4.9', reviews: 33, distance: '2.1 km', seller: 'Clay & Co Studio', status: 'For sale', categoryId: 'crafts', category: 'Crafts' },
    { id: 'resin', title: 'Resin Keychain Gift Box', qty: 'Set of 6', image: imgResin, price: 399, mrp: 550, rating: '4.7', reviews: 22, distance: '1.7 km', seller: 'GlossArt Creations', status: 'For sale', categoryId: 'crafts', category: 'Crafts' },
    { id: 'macrame', title: 'Macrame Wall Hanging', qty: '60 cm', image: imgMacrame, price: 599, mrp: 850, rating: '5.0', reviews: 11, distance: '2.8 km', seller: 'Knot & Loom', status: 'For sale', categoryId: 'crafts', category: 'Crafts' },
    { id: 'frame', title: 'Pressed Flower Photo Frame', qty: 'A4 size', image: imgFrame, price: 379, mrp: 520, rating: '4.9', reviews: 21, distance: '1.9 km', seller: 'Bloom Frames', status: 'For sale', categoryId: 'crafts', category: 'Crafts' },

    // —— Plants ——
    { id: 'plant1', title: 'Money Plant in Ceramic Pot', qty: '1 plant', image: imgPlantMoney, price: 199, mrp: 280, rating: '4.8', reviews: 44, distance: '0.7 km', seller: 'Green Balcony Co.', status: 'For sale', categoryId: 'plants', category: 'Plants' },
    { id: 'plant2', title: 'Snake Plant (Low Maintenance)', qty: 'Medium', image: imgPlantSnake, price: 279, mrp: 380, rating: '4.9', reviews: 31, distance: '1.3 km', seller: 'Urban Leaves', status: 'For sale', categoryId: 'plants', category: 'Plants' },
    { id: 'plant3', title: 'Succulent Trio Gift Set', qty: 'Set of 3', image: imgPlantSucculent, price: 349, mrp: 450, rating: '5.0', reviews: 26, distance: '1.0 km', seller: 'Tiny Garden Home', status: 'For sale', categoryId: 'plants', category: 'Plants' },
    { id: 'planter', title: 'Hand-Painted Planter Pot', qty: '6 inch', image: imgPlanter, price: 229, mrp: 320, rating: '4.6', reviews: 14, distance: '2.2 km', seller: 'Painted Earth', status: 'For sale', categoryId: 'plants', category: 'Plants' },
    { id: 'vase', title: 'Terracotta Mini Vase Duo', qty: 'Set of 2', image: imgVase, price: 329, mrp: 460, rating: '4.8', reviews: 19, distance: '2.1 km', seller: 'Earthen Decor', status: 'For sale', categoryId: 'plants', category: 'Plants' },

    // —— Electronics ——
    { id: 'projector-rent', title: 'HD Projector + Screen', qty: '1080p', image: imgProjector, price: 499, mrp: 700, unit: '/ day', rating: '4.8', reviews: 41, distance: '1.2 km', seller: 'ScreenShare Rentals', status: 'For rent', categoryId: 'electronics', category: 'Electronics' },
    { id: 'speaker-rent', title: 'Bluetooth Party Speaker', qty: '80 W', image: imgSpeaker, price: 299, mrp: 450, unit: '/ day', rating: '4.7', reviews: 35, distance: '0.9 km', seller: 'BeatBox Rentals', status: 'For rent', categoryId: 'electronics', category: 'Electronics' },
    { id: 'camera-rent', title: 'DSLR Camera Kit', qty: 'With lens', image: imgCamera, price: 650, mrp: 900, unit: '/ day', rating: '4.9', reviews: 27, distance: '1.8 km', seller: 'LensLane Store', status: 'For rent', categoryId: 'electronics', category: 'Electronics' },
    { id: 'laptop-rent', title: 'Laptop (i5 / 16GB)', qty: '15.6 inch', image: imgLaptop, price: 400, mrp: 600, unit: '/ day', rating: '4.6', reviews: 16, distance: '2.0 km', seller: 'TechTemp Rentals', status: 'For rent', categoryId: 'electronics', category: 'Electronics' },
    { id: 'console-rent', title: 'Gaming Console + 2 Pads', qty: '1 TB', image: imgConsole, price: 550, mrp: 800, unit: '/ day', rating: '4.8', reviews: 23, distance: '1.5 km', seller: 'GameNight Rentals', status: 'For rent', categoryId: 'electronics', category: 'Electronics' },
    { id: 'earbuds-sale', title: 'Wireless Earbuds (Open Box)', qty: 'ANC', image: imgEarbuds, price: 1199, mrp: 1999, rating: '4.5', reviews: 14, distance: '1.1 km', seller: 'Local Gadget Hub', status: 'For sale', categoryId: 'electronics', category: 'Electronics' },

    // —— Furniture ——
    { id: 'chair-rent', title: 'Banquet Chairs', qty: 'Set of 10', image: imgChairs, price: 800, mrp: 1200, unit: '/ day', rating: '4.8', reviews: 19, distance: '2.4 km', seller: 'Event Seat Rentals', status: 'For rent', categoryId: 'furniture', category: 'Furniture' },
    { id: 'table-rent', title: 'Folding Round Table', qty: '4 ft', image: imgTable, price: 600, mrp: 900, unit: '/ day', rating: '4.7', reviews: 15, distance: '1.7 km', seller: 'Party Setup Co.', status: 'For rent', categoryId: 'furniture', category: 'Furniture' },
    { id: 'sofa-rent', title: '3-Seater Sofa', qty: 'Fabric', image: imgSofa, price: 450, mrp: 700, unit: '/ day', rating: '4.6', reviews: 11, distance: '2.2 km', seller: 'HomeFlex Rentals', status: 'For rent', categoryId: 'furniture', category: 'Furniture' },
    { id: 'shelf-sale', title: 'Wooden Wall Shelf Unit', qty: '3 tier', image: imgShelf, price: 1499, mrp: 2200, rating: '4.9', reviews: 18, distance: '1.4 km', seller: 'WoodCraft Home', status: 'For sale', categoryId: 'furniture', category: 'Furniture' },
    { id: 'stool-sale', title: 'Handcrafted Stool Pair', qty: 'Set of 2', image: imgStool, price: 899, mrp: 1300, rating: '4.8', reviews: 13, distance: '1.9 km', seller: 'Timber & Tone', status: 'For sale', categoryId: 'furniture', category: 'Furniture' },

    // —— Tools & Gear ——
    { id: 'drill-rent', title: 'Cordless Drill Kit', qty: '18 V', image: imgDrill, price: 199, mrp: 300, unit: '/ day', rating: '4.8', reviews: 42, distance: '0.8 km', seller: 'ToolShare Local', status: 'For rent', categoryId: 'tools', category: 'Tools & Gear' },
    { id: 'ladder-rent', title: 'Aluminium Step Ladder', qty: '6 ft', image: imgLadder, price: 150, mrp: 250, unit: '/ day', rating: '4.7', reviews: 28, distance: '1.2 km', seller: 'HandyRent Hub', status: 'For rent', categoryId: 'tools', category: 'Tools & Gear' },
    { id: 'mixer-rent', title: 'Concrete Mixer', qty: 'Half day', image: imgMixer, price: 700, mrp: 1000, unit: '/ ½ day', rating: '4.6', reviews: 9, distance: '3.0 km', seller: 'BuildGear Rentals', status: 'For rent', categoryId: 'tools', category: 'Tools & Gear' },
    { id: 'robot', title: 'Handcrafted Robot Figurine', qty: '1 piece', image: imgRobot, price: 499, mrp: 750, rating: '4.9', reviews: 14, distance: '1.2 km', seller: 'Prayag A. (Creator)', status: 'For sale', categoryId: 'tools', category: 'Tools & Gear' },
    { id: 'woodtoy', title: 'Wooden Puzzle Toy Set', qty: '1 set', image: imgWoodtoy, price: 399, mrp: 550, rating: '4.8', reviews: 23, distance: '1.6 km', seller: 'WoodPlay Workshop', status: 'For sale', categoryId: 'tools', category: 'Tools & Gear' },
    { id: 'camping-rent', title: 'Camping Tent', qty: '4 person', image: imgTent, price: 350, mrp: 500, unit: '/ day', rating: '4.9', reviews: 20, distance: '2.5 km', seller: 'TrailGear Rentals', status: 'For rent', categoryId: 'tools', category: 'Tools & Gear' },
];

const listingFilters = [
    { id: 'all', label: 'All' },
    { id: 'For sale', label: 'For sale' },
    { id: 'For rent', label: 'For rent' },
];

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`;

const discountPct = (price, mrp) => {
    if (!mrp || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
};

const productHash = (id) => `#p=${encodeURIComponent(id)}`;

const readProductHash = () => {
    if (typeof window === 'undefined') return null;
    const match = window.location.hash.match(/[#&]p=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
};

export default function StorePage() {
    const [viewMode, setViewMode] = useState('client');
    const [activeCategory, setActiveCategory] = useState('all');
    const [listingFilter, setListingFilter] = useState('all');
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const syncFromHash = () => setSelectedId(readProductHash());
        syncFromHash();
        window.addEventListener('hashchange', syncFromHash);
        return () => window.removeEventListener('hashchange', syncFromHash);
    }, []);

    useEffect(() => {
        if (selectedId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [selectedId]);

    const openProduct = (id) => {
        setSelectedId(id);
        if (window.location.hash !== productHash(id)) {
            window.location.hash = productHash(id).slice(1);
        }
    };

    const closeProduct = () => {
        setSelectedId(null);
        if (window.location.hash) {
            history.pushState('', document.title, `${window.location.pathname}${window.location.search}`);
        }
    };

    const filteredProducts = useMemo(() => {
        return sampleStoreProducts.filter((product) => {
            const matchCategory = activeCategory === 'all' || product.categoryId === activeCategory;
            const matchListing = listingFilter === 'all' || product.status === listingFilter;
            return matchCategory && matchListing;
        });
    }, [activeCategory, listingFilter]);

    const selectedProduct = sampleStoreProducts.find((product) => product.id === selectedId) || null;
    const relatedProducts = selectedProduct
        ? sampleStoreProducts
            .filter((product) => product.categoryId === selectedProduct.categoryId && product.id !== selectedProduct.id)
            .slice(0, 4)
        : [];

    const activeCategoryLabel =
        browseCategories.find((c) => c.id === activeCategory)?.label || 'All Products';

    return (
        <div className="store-page-root">
            <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />

            <section className={`qc-page${selectedProduct ? ' has-pdp' : ''}`}>
                <div className="container">
                    {selectedProduct ? (
                        <ProductDetail
                            product={selectedProduct}
                            related={relatedProducts}
                            onBack={closeProduct}
                            onOpenProduct={openProduct}
                        />
                    ) : (
                    <div className="qc-layout">
                        {/* Left category rail */}
                        <aside className="qc-sidebar" aria-label="Product categories">
                            {browseCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    className={`qc-side-item ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    <span className="qc-side-emoji" aria-hidden="true">{cat.icon}</span>
                                    <span className="qc-side-label">{cat.label}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Main content */}
                        <div className="qc-main">
                            <div className="qc-main-head">
                                <div>
                                    <h1 className="qc-main-title">{activeCategoryLabel}</h1>
                                    <p className="qc-main-count">{filteredProducts.length} items near you</p>
                                </div>
                                <div className="qc-listing-filters">
                                    {listingFilters.map((filter) => (
                                        <button
                                            key={filter.id}
                                            type="button"
                                            className={`qc-chip ${listingFilter === filter.id ? 'active' : ''}`}
                                            onClick={() => setListingFilter(filter.id)}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {filteredProducts.length === 0 ? (
                                <div className="qc-empty">
                                    <p>No products in this filter yet. Try another category or listing type.</p>
                                    <button
                                        type="button"
                                        className="qc-chip active"
                                        onClick={() => {
                                            setActiveCategory('all');
                                            setListingFilter('all');
                                        }}
                                    >
                                        View all products
                                    </button>
                                </div>
                            ) : (
                                <div className="qc-grid">
                                    {filteredProducts.map((prod) => {
                                        const off = discountPct(prod.price, prod.mrp);
                                        return (
                                            <article
                                                key={prod.id}
                                                className="qc-card"
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => openProduct(prod.id)}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        openProduct(prod.id);
                                                    }
                                                }}
                                            >
                                                <div className="qc-card-media">
                                                    {off > 0 && <span className="qc-off">{off}% OFF</span>}
                                                    <span
                                                        className={`qc-tag ${prod.status === 'For rent' ? 'is-rent' : 'is-sale'}`}
                                                    >
                                                        {prod.status === 'For rent' ? 'RENT' : 'SALE'}
                                                    </span>
                                                    <img src={prod.image} alt={prod.title} loading="lazy" decoding="async" />
                                                </div>

                                                <div className="qc-card-body">
                                                    <span className="qc-eta">📍 {prod.distance}</span>
                                                    <h3 className="qc-title">{prod.title}</h3>
                                                    <p className="qc-qty">{prod.qty}</p>

                                                    <div className="qc-rating">
                                                        <span className="qc-star">★</span> {prod.rating}
                                                        <span className="qc-reviews">({prod.reviews})</span>
                                                    </div>

                                                    <div className="qc-foot">
                                                        <div className="qc-price-wrap">
                                                            <span className="qc-price">
                                                                {formatPrice(prod.price)}
                                                                {prod.unit && <span className="qc-unit">{prod.unit}</span>}
                                                            </span>
                                                            {prod.mrp > prod.price && (
                                                                <span className="qc-mrp">{formatPrice(prod.mrp)}</span>
                                                            )}
                                                        </div>
                                                        <a
                                                            href={CLIENT_PLAY_STORE_URL}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="qc-add"
                                                            title="Open app to contact seller"
                                                            onClick={(event) => event.stopPropagation()}
                                                        >
                                                            ADD
                                                        </a>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
