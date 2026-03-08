import './CTA.css';
import { useViewMode } from '../context/ViewModeContext';

function CTA() {
    const isWorker = useViewMode() === 'worker';

    const handleSearchClick = () => {
        window.location.hash = '#search';
    };

    const clientStats = [
        { number: '50K+', label: 'Customers Served' },
        { number: '5K+', label: 'Verified Professionals' },
        { number: '4.8★', label: 'Average Rating' }
    ];

    const workerStats = [
        { number: '12k+', label: 'Active Workers' },
        { number: '₹40k+', label: 'Avg Monthly Earnings' },
        { number: '4.9★', label: 'Worker Rating' }
    ];

    const stats = isWorker ? workerStats : clientStats;

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-wrapper">
                    <div className="cta-content">
                        <h2>{isWorker ? 'Ready to Start Earning with ProWorker?' : 'Ready to Find Your Perfect Professional?'}</h2>
                        <p>{isWorker
                            ? 'Join thousands of professionals building their business on ProWorker. Set up your profile in under 3 minutes.'
                            : "Join thousands of satisfied customers who've found trusted professionals on ProWorker. Get started in just 60 seconds."
                        }</p>
                        {isWorker ? (
                            <button
                                className="cta-btn"
                                style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                                disabled
                            >
                                Join as a Worker Now
                            </button>
                        ) : (
                            <button
                                onClick={handleSearchClick}
                                className="cta-btn"
                                style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                            >
                                Find a Worker Now
                            </button>
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
