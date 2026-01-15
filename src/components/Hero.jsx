import './Hero.css';
import Counter from './Counter';

function Hero() {
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
                            ⚡ Trusted by 10,000+ Users
                        </div>

                        <h1 className="hero-title animate-fade-in-up delay-100">
                            Find Trusted Professionals <br /> Matched in Minutes.
                        </h1>

                        <p className="hero-subtitle animate-fade-in-up delay-200">
                            Cleaning, Plumbing, Electrical, and more. Verified and reviewed for your peace of mind.
                        </p>

                        {/* Primary CTA Button */}
                        <div className="hero-cta animate-fade-in-up delay-300">
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
                        </div>

                        {/* Stats Row */}
                        <div className="hero-stats animate-fade-in-up delay-400">
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
                        </div>
                    </div>

                    {/* Right: Visual Element (CSS 3D Mobile Preview) */}
                    <div className="hero-visual animate-fade-in delay-500">
                        <div className="hero-app-mockup">
                            <div className="mockup-content">
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

                                    <div className="mockup-map-preview">
                                        <div className="map-pin">📍</div>
                                        <div className="map-route"></div>
                                    </div>

                                    <div className="mockup-btn">Book Now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
