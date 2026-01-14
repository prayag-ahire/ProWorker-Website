import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ onNavigate }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleHashChange = () => {
            setIsSearchPage(window.location.hash === '#search');
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const handleSearch = () => {
        window.location.hash = '#search';
        onNavigate('search');
        setMobileMenuOpen(false);
    };

    const handleHome = () => {
        window.location.hash = '';
        onNavigate('home');
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <button 
                        className="navbar-logo"
                        onClick={handleHome}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <span className="logo-text">ProWorker</span>
                        <span className="logo-badge">BETA</span>
                    </button>

                    <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <li><a href="#why">Why ProWorker</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#testimonials">Reviews</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>

                    <div className="navbar-actions">
                        {isSearchPage ? (
                            <button 
                                onClick={handleHome}
                                className="btn btn-secondary"
                            >
                                ← Back to Home
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={handleSearch}
                                    className="btn btn-primary"
                                >
                                    🔍 Find Workers
                                </button>
                                <a href="#worker" className="btn btn-secondary">For Workers</a>
                            </>
                        )}
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
