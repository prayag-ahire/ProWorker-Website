import './Pricing.css';
import { useViewMode } from '../context/ViewModeContext';

function Pricing() {
    const isWorker = useViewMode() === 'worker';

    return (
        <section id="pricing" className="section section-gray">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="mb-md">Simple, transparent pricing</h2>
                    <p className="section-subtitle">
                        {isWorker
                            ? 'Free to join. Set your own prices. No commission. Direct inquiries from nearby customers.'
                            : 'Free for customers. No booking fee. No commission. Direct connection with workers.'}
                    </p>
                </div>

                <div className="pricing-grid">
                    {!isWorker && (
                        <div className="pricing-card featured scroll-animate delay-100">
                            <h3>For customers</h3>
                            <div className="pricing-feature-list">
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Completely free to search and browse</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>No booking fee</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>No commission</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>See visit charges and service pricing on profiles</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Contact workers directly—pay them yourself</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {isWorker && (
                        <div className="pricing-card featured scroll-animate delay-100">
                            <div className="pricing-badge">Most Popular</div>
                            <h3>For workers</h3>
                            <div className="pricing-feature-list">
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Completely free professional profile</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Set visit charges and service pricing</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Manage working hours and leave days</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>Photo and video portfolio</span>
                                </div>
                                <div className="pricing-feature">
                                    <span className="check">✓</span>
                                    <span>No commission—customers contact you directly</span>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-large" disabled>
                                Create Your Profile
                            </button>
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
