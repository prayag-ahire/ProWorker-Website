import './CTA.css';

function CTA() {
    const handleSearchClick = () => {
        window.location.hash = '#search';
    };

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-wrapper">
                    <div className="cta-content">
                        <h2>Ready to Find Your Perfect Professional?</h2>
                        <p>Join thousands of satisfied customers who've found trusted professionals on ProWorker. Get started in just 60 seconds.</p>
                        <button
                            onClick={handleSearchClick}
                            className="cta-btn"
                            style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                        >
                            Find a Worker Now
                        </button>
                    </div>

                    <div className="cta-stats">
                        <div className="stat-item">
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Customers Served</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">5K+</div>
                            <div className="stat-label">Verified Professionals</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">4.8★</div>
                            <div className="stat-label">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;