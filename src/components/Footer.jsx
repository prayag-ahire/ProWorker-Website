import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="brand-logo">
                            <span className="logo-text">ProWorker</span>
                            {/* <span className="logo-badge">BETA</span> */}
                        </div>
                        <p className="brand-description">
                            Connecting clients with verified professional workers for all home service needs.
                        </p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">📘</a>
                            <a href="#" className="social-icon">🐦</a>
                            <a href="#" className="social-icon">📷</a>
                            <a href="#" className="social-icon">💼</a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="link-group">
                            <h4>For Clients</h4>
                            <ul>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#testimonials">Reviews</a></li>
                                <li><a href="#download">Download App</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>For Workers</h4>
                            <ul>
                                <li><a href="#worker">Join as Worker</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#training">Training</a></li>
                                <li><a href="#support">Support</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#blog">Blog</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#terms">Terms of Service</a></li>
                                <li><a href="#cookies">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-stats">
                        <div className="stat">
                            <span className="stat-number">50K+</span>
                            <span className="stat-label">Active Users</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">5K+</span>
                            <span className="stat-label">Verified Workers</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">4.8★</span>
                            <span className="stat-label">Average Rating</span>
                        </div>
                    </div>
                    
                    <div className="footer-copyright">
                        <p>&copy; {currentYear} ProWorker. All rights reserved.</p>
                        <p>Made with 💚 for professional service workers everywhere</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;