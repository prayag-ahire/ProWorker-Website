import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <div className="navbar-logo">
                        <span className="logo-text">ProWorker</span>
                        <span className="logo-badge">BETA</span>
                    </div>

                    <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <li><a href="#why">Why ProWorker</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#testimonials">Reviews</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>

                    <div className="navbar-actions">
                        <a href="#download" className="btn btn-primary">Download App</a>
                        <a href="#worker" className="btn btn-secondary">For Workers</a>
                    </div>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
