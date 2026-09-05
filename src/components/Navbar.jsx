import { useState, useEffect } from 'react';
import { CLIENT_PLAY_STORE_URL } from '../data/appLinks';
import './Navbar.css';

function Navbar({ onNavigate, viewMode, onViewModeChange }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleHashChange = () => {
            setIsSearchPage(window.location.hash.startsWith('#search'));
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

    const toggleMarkup = (
        <div className="view-toggle">
            <button
                className={`toggle-option ${viewMode === 'client' ? 'active' : ''}`}
                onClick={() => onViewModeChange('client')}
            >Client</button>
            <button
                className={`toggle-option ${viewMode === 'worker' ? 'active' : ''}`}
                onClick={() => onViewModeChange('worker')}
            >Worker</button>
        </div>
    );

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <button
                        className="navbar-logo"
                        onClick={handleHome}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <div className="logo-text-inner">
                            <span className="logo-pro">Pro</span>
                            <span className="logo-worker">Worker</span>
                        </div>
                    </button>

                    {/* Mobile-only toggle sitting outside the menu for quick access */}
                    <div className="navbar-mobile-toggle">
                        {toggleMarkup}
                    </div>

                    <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <li><a href="#categories" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
                        <li><a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a></li>
                        <li><a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a></li>
                        <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
                        {viewMode === 'client' && (
                            <li>
                                <a
                                    href={CLIENT_PLAY_STORE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get the app
                                </a>
                            </li>
                        )}
                    </ul>

                    <div className="navbar-actions">
                        {toggleMarkup}
                        {isSearchPage ? (
                            <button onClick={handleHome} className="btn btn-secondary">Back to home</button>
                        ) : viewMode === 'client' ? (
                            <>
                                <button onClick={handleSearch} className="btn btn-secondary">Find workers</button>
                                <a
                                    className="btn btn-primary"
                                    href={CLIENT_PLAY_STORE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Get the app
                                </a>
                            </>
                        ) : (
                            <button className="btn btn-primary" disabled>Create Profile</button>
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
