import './Pricing.css';
import { useViewMode } from '../context/ViewModeContext';
import { WORKER_PLAY_STORE_URL } from '../data/appLinks';

function Pricing() {
    const isWorker = useViewMode() === 'worker';

    return (
        <section id="pricing" className="section section-gray">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="mb-md">Simple, transparent pricing</h2>
                    <p className="section-subtitle">
                        {isWorker
                            ? 'Free to join. Sell homemade goods or offer skilled services. 0% commission. Direct inquiries.'
                            : 'Free for customers. No booking fees. No middleman markup. Direct connection with local sellers & workers.'}
                    </p>
                </div>

                <div className="pricing-grid" key={isWorker ? 'worker-pricing' : 'client-pricing'}>
                    {!isWorker && (
                        <div className="pricing-card featured scroll-animate delay-100">
                            <h3>For customers & buyers</h3>
                            <div className="pricing-feature-list">
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Completely free to search and browse</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>No booking fee or middleman markup</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>0% commission on orders or jobs</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>See menu prices, custom clothing rates & visit charges</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Contact sellers and workers directly—no middleman markup</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {isWorker && (
                        <div className="pricing-card featured scroll-animate delay-100">
                            <div className="pricing-badge">100% Free</div>
                            <h3>For workers & home sellers</h3>
                            <div className="pricing-feature-list">
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Free profile & home business storefront</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Sell homemade food, clothes, crafts or offer trade services</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Set your own product prices or visit charges</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Manage operating hours and leave days</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Photo & video portfolio for dishes, apparel & work</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>0% commission—keep 100% of what you earn</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>1-week payment cycle—money in your bank every Monday</span>
                                </div>
                            </div>
                            <a
                                className="btn btn-primary btn-large"
                                href={WORKER_PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Worker & Seller app
                            </a>
                        </div>
                    )}

                    <div className="pricing-card scroll-animate delay-200">
                        <h3>Coming soon</h3>
                        <div className="pricing-feature-list">
                            {isWorker ? (
                                <>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>Online bookings</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>Doorstep delivery & pickup features for Store</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>In-app chat and internet calling</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>Digital payments</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>Business analytics and customer management</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>AI-powered growth insights</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>Online booking</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>In-app product delivery to your doorstep</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>In-app chat</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>Internet calling without sharing numbers</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>Secure digital payments</span>
                                    </div>
                                    <div className="pricing-feature">
                                        <span className="check">✓</span>
                                        <span>AI-powered recommendations</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pricing;
