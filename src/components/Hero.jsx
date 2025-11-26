import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge animate-fade-in">
                            ⚡ Trusted by 10,000+ Users
                        </div>

                        <h1 className="animate-fade-in-up delay-100">
                            Professional Workers.<br />
                            Anytime. Anywhere.
                        </h1>

                        <p className="hero-subtitle animate-fade-in-up delay-200">
                            Book trusted home service professionals instantly with transparent pricing and verified reviews. From plumbers to tutors, find the perfect worker in seconds.
                        </p>

                        <div className="hero-buttons animate-fade-in-up delay-300">
                            <a href="#download" className="btn btn-primary btn-large">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2V14M10 14L6 10M10 14L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M3 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Download App
                            </a>
                            <a href="#worker" className="btn btn-secondary btn-large">
                                Become a Worker →
                            </a>
                        </div>

                        <div className="hero-stats animate-fade-in-up delay-400">
                            <div className="stat">
                                <div className="stat-number text-gradient">50K+</div>
                                <div className="stat-label">Active Users</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number text-gradient">5K+</div>
                                <div className="stat-label">Verified Workers</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number text-gradient">4.8★</div>
                                <div className="stat-label">Average Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-mockups animate-fade-in delay-300">
                        <div className="mockup mockup-1 animate-float">
                            <img
                                src="C:/Users/PrayagAhire/.gemini/antigravity/brain/2570e0f3-b515-4146-92ef-cab04b342cea/proworker_app_mockup_1764183214957.png"
                                alt="ProWorker App - Worker List"
                            />
                        </div>
                        <div className="mockup mockup-2 animate-float delay-200">
                            <img
                                src="C:/Users/PrayagAhire/.gemini/antigravity/brain/2570e0f3-b515-4146-92ef-cab04b342cea/worker_profile_screen_1764183233512.png"
                                alt="ProWorker App - Worker Profile"
                            />
                        </div>
                        <div className="mockup mockup-3 animate-float delay-400">
                            <img
                                src="C:/Users/PrayagAhire/.gemini/antigravity/brain/2570e0f3-b515-4146-92ef-cab04b342cea/booking_screen_1764183248978.png"
                                alt="ProWorker App - Booking Screen"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
