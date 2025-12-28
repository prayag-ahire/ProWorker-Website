import './CTA.css';

function CTA() {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <div className="cta-header">
                        <h2>Join Thousands of Clients & Workers Using ProWorker</h2>
                        <p>Download the app now and experience the future of professional home services. Whether you're looking for trusted workers or want to grow your business, ProWorker is here for you.</p>
                    </div>

                    <div className="cta-actions">
                        <div className="action-buttons">
                            <a href="#" className="cta-btn primary">
                                <span className="btn-icon">📱</span>
                                <span className="btn-text">Download for Clients</span>
                            </a>
                            <a href="#worker" className="cta-btn secondary">
                                <span className="btn-icon">👨‍💼</span>
                                <span className="btn-text">Join as Worker</span>
                            </a>
                        </div>

                        <div className="download-options">
                            <div className="download-item">
                                <span className="download-icon">📱</span>
                                <div className="download-text">
                                    <span className="download-label">Download on the</span>
                                    <span className="download-name">App Store</span>
                                </div>
                            </div>
                            <div className="download-item">
                                <span className="download-icon">🤖</span>
                                <div className="download-text">
                                    <span className="download-label">Get it on</span>
                                    <span className="download-name">Google Play</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="trust-features">
                        <div className="feature-item">
                            <span className="feature-icon">🔒</span>
                            <span className="feature-text">Secure & Encrypted</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">✓</span>
                            <span className="feature-text">Verified Workers</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">⭐</span>
                            <span className="feature-text">4.8 Average Rating</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">👥</span>
                            <span className="feature-text">50K+ Active Users</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;