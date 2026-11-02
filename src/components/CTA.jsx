import './CTA.css';
import { useViewMode } from '../context/ViewModeContext';
import { CLIENT_PLAY_STORE_URL, WORKER_PLAY_STORE_URL } from '../data/appLinks';

function CTA() {
    const isWorker = useViewMode() === 'worker';

    const clientStats = [
        { number: 'Free', label: 'For Customers' },
        { number: '0', label: 'Booking Fees' },
        { number: '0%', label: 'Commission' }
    ];

    const workerStats = [
        { number: 'Free', label: 'Storefront & Profile' },
        { number: '0%', label: 'Commission' },
        { number: 'Direct', label: 'Customer Orders' }
    ];

    const stats = isWorker ? workerStats : clientStats;

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-wrapper">
                    <div className="cta-content">
                        <h2>{isWorker ? 'Ready to Sell from Home or Grow Your Trade?' : 'Ready to Find Nearby Services & Homemade Goods?'}</h2>
                        <p>{isWorker
                            ? 'Whether you cook homemade food, stitch custom clothing, make crafts, or offer home services—create your free storefront, showcase your work, and get direct customer orders with 0% commission.'
                            : 'Search local skilled workers and home-based sellers. Compare profiles, ratings, menus, clothing, and crafts—then contact them directly. 100% free.'
                        }</p>
                        <a
                            className="cta-btn"
                            href={isWorker ? WORKER_PLAY_STORE_URL : CLIENT_PLAY_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {isWorker ? 'Download Worker & Seller app' : 'Get it on Google Play'}
                        </a>
                    </div>

                    <div className="cta-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;
