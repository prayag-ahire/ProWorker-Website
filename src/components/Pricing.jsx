import './Pricing.css';

function Pricing() {
    return (
        <section className="section section-glow">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">Simple, Transparent Pricing</h2>
                    <p className="section-subtitle">
                        No hidden fees. Just honest pricing that works for everyone.
                    </p>
                </div>

                <div className="pricing-grid">
                    <div className="pricing-card scroll-animate delay-100">
                        <div className="pricing-icon">👥</div>
                        <h3>For Clients</h3>
                        <div className="pricing-feature-list">
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>100% Free to browse & search</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>No subscription fees</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Pay only for booked services</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Transparent worker pricing</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Secure payment protection</span>
                            </div>
                        </div>
                    </div>

                    <div className="pricing-card featured scroll-animate delay-200">
                        <div className="pricing-badge">Most Popular</div>
                        <div className="pricing-icon">🔧</div>
                        <h3>For Workers</h3>
                        <div className="pricing-feature-list">
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Free to join & create profile</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Unlimited booking requests</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Set your own pricing</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Free training resources</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Premium tools coming soon</span>
                            </div>
                        </div>
                        <a href="#worker" className="btn btn-primary btn-large">
                            Join as Worker
                        </a>
                    </div>

                    <div className="pricing-card scroll-animate delay-300">
                        <div className="pricing-icon">💎</div>
                        <h3>Coming Soon</h3>
                        <div className="pricing-feature-list">
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Worker analytics dashboard</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Priority listing visibility</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Advanced scheduling tools</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Client insights & trends</span>
                            </div>
                            <div className="pricing-feature">
                                <span className="check">✓</span>
                                <span>Promotional features</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pricing;
