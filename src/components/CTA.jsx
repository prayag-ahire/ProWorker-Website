import './CTA.css';
import { useViewMode } from '../context/ViewModeContext';
import { CLIENT_PLAY_STORE_URL } from '../data/appLinks';

function CTA() {
    const isWorker = useViewMode() === 'worker';

    const clientStats = [
        { number: 'Free', label: 'For Customers' },
        { number: '0', label: 'Booking Fees' },
        { number: '0', label: 'Commission' }
    ];

    const workerStats = [
        { number: 'Free', label: 'Professional Profile' },
        { number: '0', label: 'Commission' },
        { number: 'Direct', label: 'Customer Inquiries' }
    ];

    const stats = isWorker ? workerStats : clientStats;

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-wrapper">
                    <div className="cta-content">
                        <h2>{isWorker ? 'Ready to Build Your Professional Brand?' : 'Ready to Find Nearby Skilled Workers?'}</h2>
                        <p>{isWorker
                            ? 'Create a free profile, showcase your work, set your prices and availability, and get discovered by nearby customers. No booking system. No commission.'
                            : 'Search local professionals, compare profiles, ratings, pricing, and portfolios—then contact them directly. Completely free.'
                        }</p>
                        {isWorker ? (
                            <button className="cta-btn" disabled>
                                Join free as a worker
                            </button>
                        ) : (
                            <a
                                className="cta-btn"
                                href={CLIENT_PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get it on Google Play
                            </a>
                        )}
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
