import { useState } from 'react';
import './WorkerList.css';
import { CLIENT_PLAY_STORE_URL } from '../data/appLinks';
import { clientCatalog } from '../services/clientCatalog';
import { formatInr, isProductOffering, isRentListing } from '../utils/productPrice';
import ProductPrice from './ProductPrice';

function WorkerList({ workers }) {
  const [openId, setOpenId] = useState(null);
  const [catalog, setCatalog] = useState({});

  const loadProducts = async (worker) => {
    const key = String(worker.id);
    if (openId === key) {
      setOpenId(null);
      return;
    }
    setOpenId(key);
    if (catalog[key]?.status === 'ready') return;

    setCatalog((current) => ({ ...current, [key]: { status: 'loading', products: [] } }));
    try {
      const products = await clientCatalog.getProductsForSearchWorker(worker);
      setCatalog((current) => ({ ...current, [key]: { status: 'ready', products } }));
    } catch {
      setCatalog((current) => ({ ...current, [key]: { status: 'error', products: [] } }));
    }
  };

  return (
    <div className="worker-list">
      {workers.map((worker) => {
        const isProduct = isProductOffering(worker.offeringType);
        const key = String(worker.id);
        const listing = catalog[key];
        const productsOpen = openId === key;

        return (
          <div key={worker.id} className={`worker-card ${isProduct ? 'is-product' : 'is-service'}`}>
            <div className="worker-header">
              <div className="worker-avatar">
                {worker.profileImage ? (
                  <img
                    src={worker.profileImage}
                    alt={worker.name}
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {(worker.name || '?')
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word.charAt(0).toUpperCase())
                      .join('')}
                  </div>
                )}
                <span
                  className={`status-dot ${worker.isOnline ? 'online' : 'offline'}`}
                  title={worker.isOnline ? 'Online' : 'Offline'}
                />
              </div>

              <div className="worker-info">
                <div className="worker-name-row">
                  <h4 className="worker-name">{worker.name}</h4>
                  <span className={`status-badge ${worker.isOnline ? 'online' : 'offline'}`}>
                    {worker.isOnline ? 'Online' : 'Offline'}
                  </span>
                  {isProduct && <span className="offering-badge">Product</span>}
                </div>
                <p className="worker-profession">
                  {isProduct ? worker.profession || 'Home seller' : worker.profession}
                </p>
                <div className="worker-meta">
                  {typeof worker.distance === 'number' && (
                    <span className="distance">
                      📍 {worker.distance} km away
                    </span>
                  )}
                  {worker.rating !== undefined && worker.rating > 0 && (
                    <span className="rating">
                      ⭐ {worker.rating} ({worker.reviewCount || 0} reviews)
                    </span>
                  )}
                </div>
              </div>

              <div className="worker-price">
                {!isProduct && worker.hourlyRate !== undefined && worker.hourlyRate !== null && (
                  <p className="price">
                    {formatInr(worker.hourlyRate)}
                    <span className="price-unit"> / visit</span>
                  </p>
                )}
                {!isProduct && (
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= (worker.rating || 0) ? 'filled' : 'empty'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {worker.bio && (
              <p className="worker-bio">{worker.bio}</p>
            )}

            {isProduct && productsOpen && (
              <div className="worker-product-panel">
                {listing?.status === 'loading' && <p className="worker-product-status">Loading products…</p>}
                {listing?.status === 'error' && <p className="worker-product-status">Could not load products. Try the app.</p>}
                {listing?.status === 'ready' && listing.products.length === 0 && (
                  <p className="worker-product-status">No products listed yet.</p>
                )}
                {listing?.status === 'ready' && listing.products.length > 0 && (
                  <div className="worker-product-grid">
                    {listing.products.map((product) => (
                      <article key={product.id} className="worker-product-card">
                        {product.image && (
                          <img src={product.image} alt={product.name} />
                        )}
                        <div className="worker-product-body">
                          <span className={`listing-chip ${isRentListing(product.listingType) ? 'is-rent' : 'is-sale'}`}>
                            {isRentListing(product.listingType) ? 'Rent' : 'Sale'}
                          </span>
                          <h5>{product.name}</h5>
                          <ProductPrice product={product} />
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="worker-actions">
              {isProduct ? (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => loadProducts(worker)}
                  >
                    {productsOpen ? 'Hide products' : 'View products'}
                  </button>
                  <a
                    className="btn btn-primary worker-download-btn"
                    href={CLIENT_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy in app
                  </a>
                </>
              ) : (
                <a
                  className="btn btn-primary worker-download-btn"
                  href={CLIENT_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download app to contact
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WorkerList;
