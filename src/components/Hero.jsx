import './Hero.css';
import Counter from './Counter';
import { useViewMode } from '../context/ViewModeContext';

function Hero() {
    const viewMode = useViewMode();
    const isWorker = viewMode === 'worker';

    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    {/* Left: Main Content */}
                    <div className="hero-left-section">
                        <div className="hero-badge animate-fade-in">
                            {isWorker ? '⚡ Join 12,000+ Earning Professionals' : '⚡ Trusted by 10,000+ Users'}
                        </div>

                        <h1 className="hero-title animate-fade-in-up delay-100">
                            {isWorker ? 'Grow Your Business. Get Booked Daily.' : 'Find Trusted Professionals \u00a0Matched in Minutes.'}
                        </h1>

                        <p className="hero-subtitle animate-fade-in-up delay-200">
                            {isWorker
                                ? 'Set your schedule, build your profile, and receive bookings from verified clients near you.'
                                : 'Cleaning, Plumbing, Electrical, and more. Verified and reviewed for your peace of mind.'}
                        </p>

                        {/* Primary CTA Button */}
                        <div className="hero-cta animate-fade-in-up delay-300">
                            {isWorker ? (
                                <>
                                    <button className="btn btn-primary btn-xl" disabled>
                                        Start Earning
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-xl"
                                        onClick={() => window.location.hash = '#how-it-works'}
                                    >
                                        How it Works
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-primary btn-xl"
                                        onClick={() => window.location.hash = '#search'}
                                    >
                                        Find a Worker
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-xl"
                                        onClick={() => window.location.hash = '#how-it-works'}
                                    >
                                        How it Works
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Stats Row */}
                        <div className="hero-stats animate-fade-in-up delay-400">
                            {isWorker ? (
                                <>
                                    <div className="stat-item">
                                        <h4>₹40k+</h4>
                                        <p>Avg Monthly</p>
                                    </div>
                                    <div className="stat-item">
                                        <h4>12k+</h4>
                                        <p>Active Workers</p>
                                    </div>
                                    <div className="stat-item">
                                        <h4>4.9/5</h4>
                                        <p>Worker Rating</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="stat-item">
                                        <h4><Counter end={4.9} decimals={1} />/5</h4>
                                        <p>Average Rating</p>
                                    </div>
                                    <div className="stat-item">
                                        <h4><Counter end={12} suffix="k+" /></h4>
                                        <p>Verified Workers</p>
                                    </div>
                                    <div className="stat-item">
                                        <h4><Counter end={98} suffix="%" /></h4>
                                        <p>Satisfaction</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right: Visual Element (CSS 3D Mobile Preview) */}
                    <div className="hero-visual animate-fade-in delay-500">
                        <div className="hero-app-mockup">
                            <div className="mockup-content">
                                {isWorker ? (
                                    <>
                                        {/* Header */}
                                        <div className="mockup-header">
                                            <div className="mockup-avatar">👷</div>
                                            <div className="mockup-info">
                                                <div className="mockup-name">Priya Sharma</div>
                                                <div className="mockup-role">Electrician • 4.8⭐</div>
                                            </div>
                                            <div className="mockup-badge">Verified</div>
                                        </div>

                                        {/* Body */}
                                        <div className="mockup-body">
                                            <div className="mockup-stat-row">
                                                <div className="m-stat">
                                                    <span>Bookings</span>
                                                    <strong>18</strong>
                                                </div>
                                                <div className="m-stat">
                                                    <span>Earnings</span>
                                                    <strong>₹8,200</strong>
                                                </div>
                                                <div className="m-stat">
                                                    <span>Rating</span>
                                                    <strong>4.8</strong>
                                                </div>
                                            </div>

                                            <div className="mockup-tags">
                                                <span>Wiring</span>
                                                <span>Repairs</span>
                                                <span>Fittings</span>
                                            </div>

                                            <div className="mockup-upcoming">
                                                <div className="upcoming-label">📅 Today's Job</div>
                                                <div className="upcoming-detail">Wiring repair · Sector 12</div>
                                                <div className="upcoming-time">⏰ 2:00 PM &nbsp;·&nbsp; 1.4 km away</div>
                                            </div>

                                            <div className="mockup-btn">View Dashboard</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Header */}
                                        <div className="mockup-header">
                                            <div className="mockup-avatar">👨‍🔧</div>
                                            <div className="mockup-info">
                                                <div className="mockup-name">Rajesh Kumar</div>
                                                <div className="mockup-role">Expert Plumber • 4.9⭐</div>
                                            </div>
                                            <div className="mockup-badge">Verified</div>
                                        </div>

                                        {/* Body */}
                                        <div className="mockup-body">
                                            <div className="mockup-stat-row">
                                                <div className="m-stat">
                                                    <span>Jobs</span>
                                                    <strong>134</strong>
                                                </div>
                                                <div className="m-stat">
                                                    <span>Rate</span>
                                                    <strong>$25/hr</strong>
                                                </div>
                                                <div className="m-stat">
                                                    <span>Exp</span>
                                                    <strong>5 Yrs</strong>
                                                </div>
                                            </div>

                                            <div className="mockup-tags">
                                                <span>Pipe Repair</span>
                                                <span>Installation</span>
                                                <span>Leaks</span>
                                            </div>

                                            <div className="mockup-nearby">
                                                <div className="nearby-label">📍 Workers near you</div>
                                                <div className="nearby-item">
                                                    <span>👨‍🔧 Rajesh K.</span>
                                                    <span className="nearby-dist">0.8 km · ⭐4.9</span>
                                                </div>
                                                <div className="nearby-item">
                                                    <span>👩‍🔧 Sunita S.</span>
                                                    <span className="nearby-dist">1.2 km · ⭐4.8</span>
                                                </div>
                                            </div>

                                            <div className="mockup-btn">Book Now</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
