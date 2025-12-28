import './CTA.css';

function CTA() {
    return (
        <section id="download" className="section section-cta">
            <div className="cta-background">
                <div className="cta-glow cta-glow-1"></div>
                <div className="cta-glow cta-glow-2"></div>
            </div>

            <div className="container">
                <div className="cta-content scroll-animate">
                    <h2 className="text-gradient">
                        Join Thousands of Clients & Workers<br />Using ProWorker
                    </h2>
                    <p className="cta-subtitle">
                        Download the app now and experience the future of professional home services.
                        Whether you're looking for trusted workers or want to grow your business, ProWorker is here for you.
                    </p>

                    <div className="cta-buttons">
                        <a href="#" className="btn btn-primary btn-large">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.6 10.4L13 15V3H11V15L6.4 10.4L5 12L12 19L19 12L17.6 10.4Z" fill="currentColor" />
                                <path d="M5 21H19V19H5V21Z" fill="currentColor" />
                            </svg>
                            Download for Clients
                        </a>
                        <a href="#worker" className="btn btn-secondary btn-large">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z" fill="currentColor" />
                                <path d="M12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12Z" fill="currentColor" />
                                <path d="M16.5 16.25C16.5 14.75 13.5 14 12 14C10.5 14 7.5 14.75 7.5 16.25V17H16.5V16.25Z" fill="currentColor" />
                            </svg>
                            Join as Worker
                        </a>
                    </div>

                    <div className="download-badges">
                        <div className="badge-item">
                            <div className="badge-icon">📱</div>
                            <div className="badge-text">
                                <div className="badge-label">Download on the</div>
                                <div className="badge-name">App Store</div>
                            </div>
                        </div>
                        <div className="badge-item">
                            <div className="badge-icon">🤖</div>
                            <div className="badge-text">
                                <div className="badge-label">Get it on</div>
                                <div className="badge-name">Google Play</div>
                            </div>
                        </div>
                    </div>

                    <div className="trust-indicators">
                        <div className="trust-item">
                            <div className="trust-icon">🔒</div>
                            <div className="trust-text">Secure & Encrypted</div>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">✓</div>
                            <div className="trust-text">Verified Workers</div>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">⭐</div>
                            <div className="trust-text">4.8 Average Rating</div>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">👥</div>
                            <div className="trust-text">50K+ Active Users</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;
