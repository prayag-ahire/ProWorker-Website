import './WorkerShowcase.css';

function WorkerShowcase() {
    return (
        <section className="section section-dark">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">Worker Portfolio Showcase</h2>
                    <p className="section-subtitle">
                        Browse verified professionals with complete portfolios, certificates, and real reviews
                    </p>
                </div>

                <div className="showcase-grid scroll-animate delay-200">
                    <div className="showcase-item large">
                        <div className="showcase-badge">⭐ 4.9 Rating</div>
                        <div className="showcase-content">
                            <h3>Certified Professionals</h3>
                            <p>All workers undergo verification and background checks</p>
                        </div>
                    </div>

                    <div className="showcase-item">
                        <div className="showcase-icon">📸</div>
                        <h4>Photos & Videos</h4>
                        <p>View work samples from real projects</p>
                    </div>

                    <div className="showcase-item">
                        <div className="showcase-icon">🎓</div>
                        <h4>Certificates</h4>
                        <p>Verified qualifications and licenses</p>
                    </div>

                    <div className="showcase-item">
                        <div className="showcase-icon">💬</div>
                        <h4>Client Reviews</h4>
                        <p>Authentic feedback with media proof</p>
                    </div>

                    <div className="showcase-item large-horizontal">
                        <div className="showcase-stats">
                            <div className="stat-item">
                                <div className="stat-value text-neon">5K+</div>
                                <div className="stat-label">Verified Workers</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value text-blue">50K+</div>
                                <div className="stat-label">Completed Jobs</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value text-gradient">4.8★</div>
                                <div className="stat-label">Avg Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WorkerShowcase;
