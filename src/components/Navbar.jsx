import { useState, useEffect } from 'react';
import { CLIENT_PLAY_STORE_URL, WORKER_PLAY_STORE_URL } from '../data/appLinks';
import './Navbar.css';

function Navbar({ viewMode, onViewModeChange }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const syncSearchPage = () => {
            setIsSearchPage(window.location.pathname.startsWith('/search'));
        };

        window.addEventListener('scroll', handleScroll);
        syncSearchPage();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const closeMenu = () => setMobileMenuOpen(false);

    const toggleMarkup = (
        <div className="view-toggle">
            <button
                type="button"
                className={`toggle-option ${viewMode === 'client' ? 'active' : ''}`}
                onClick={() => onViewModeChange('client')}
            >Client</button>
            <button
                type="button"
                className={`toggle-option ${viewMode === 'worker' ? 'active' : ''}`}
                onClick={() => onViewModeChange('worker')}
            >Worker</button>
        </div>
    );

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <a
                        href="/"
                        className="navbar-logo"
                        onClick={closeMenu}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}
                    >
                        <div className="logo-text-inner">
                            <span className="logo-pro">Pro</span>
                            <span className="logo-worker">Worker</span>
                        </div>
                    </a>

                    <div className="navbar-mobile-toggle">
                        {toggleMarkup}
                    </div>

                    <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <li><a href="/#categories" onClick={closeMenu}>Services</a></li>
                        <li><a href="/#how-it-works" onClick={closeMenu}>How it works</a></li>
                        <li><a href="/#testimonials" onClick={closeMenu}>Reviews</a></li>
                        <li><a href="/#about" onClick={closeMenu}>About</a></li>
                        <li>
                            <a
                                href="/partner"
                                onClick={closeMenu}
                                className="nav-partner-link"
                            >
                                <span>Growth Partner</span>
                                <span className="nav-earn-badge">Earn ₹50</span>
                            </a>
                        </li>
                        {viewMode === 'client' && (
                            <li className="mobile-only-link">
                                <a
                                    href={CLIENT_PLAY_STORE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMenu}
                                >
                                    Get the app
                                </a>
                            </li>
                        )}
                    </ul>

                    <div className="navbar-actions">
                        {toggleMarkup}
                        {isSearchPage ? (
                            <a href="/" className="btn btn-secondary">Back to home</a>
                        ) : viewMode === 'client' ? (
                            <>
                                <a href="/search" className="btn btn-secondary">Find workers</a>
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
                            <a
                                className="btn btn-primary"
                                href={WORKER_PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get Worker app
                            </a>
                        )}
                    </div>

                    <button
                        type="button"
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
