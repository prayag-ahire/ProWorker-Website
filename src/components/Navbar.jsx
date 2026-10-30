import { useState, useEffect } from 'react';
import { CLIENT_PLAY_STORE_URL, WORKER_PLAY_STORE_URL } from '../data/appLinks';
import { WHATSAPP_URL } from '../data/contact';
import './Navbar.css';

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

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

    const appCta = viewMode === 'worker'
        ? { href: WORKER_PLAY_STORE_URL, label: 'Get Worker app' }
        : { href: CLIENT_PLAY_STORE_URL, label: 'Get the app' };

    const primaryCta = isSearchPage
        ? { href: '/', label: 'Back to home', external: false, secondary: true }
        : { ...appCta, external: true, secondary: false };

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
                    <div className="navbar-brand">
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
                        <a
                            href={WHATSAPP_URL}
                            className="nav-chat-with-us"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon />
                            <span>Chat with us</span>
                        </a>
                    </div>

                    <div className="navbar-mobile-toggle">
                        {toggleMarkup}
                    </div>

                    <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <li><a href="/#categories" onClick={closeMenu}>Services</a></li>
                        <li><a href="/#how-it-works" onClick={closeMenu}>How it works</a></li>
                        <li><a href="/search" onClick={closeMenu}>Find workers</a></li>
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
                        <li className="mobile-only-link">
                            <a
                                href={appCta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                            >
                                {appCta.label}
                            </a>
                        </li>
                    </ul>

                    <div className="navbar-actions">
                        {toggleMarkup}
                        <a
                            href={primaryCta.href}
                            className={`btn navbar-primary-cta ${primaryCta.secondary ? 'btn-secondary' : 'btn-primary'}`}
                            {...(primaryCta.external
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                        >
                            {primaryCta.label}
                        </a>
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
