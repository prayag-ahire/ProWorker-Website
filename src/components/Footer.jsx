import './Footer.css';
import { CLIENT_PLAY_STORE_URL, WORKER_PLAY_STORE_URL } from '../data/appLinks';
import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/contact';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="brand-logo">
                            <div className="logo-text-inner">
                                <span className="logo-pro">Pro</span>
                                <span className="logo-worker-footer">Worker</span>
                            </div>
                        </div>
                        <p className="brand-description">
                            A hyperlocal marketplace connecting you directly with nearby skilled services and home-based businesses—from electricians and plumbers to homemade food, custom clothing, and handmade crafts. Sell and hire right from home with 0% commission.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="link-group">
                            <h4>For customers</h4>
                            <ul>
                                <li><a href="/#categories">Hire Services</a></li>
                                <li><a href="/store">ProWorker Store (Shop nearby)</a></li>
                                <li><a href="/#how-it-works">How it works</a></li>
                                <li><a href="/#testimonials">Reviews</a></li>
                                <li><a href="/search">Find workers</a></li>
                                <li>
                                    <a
                                        href={CLIENT_PLAY_STORE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download Customer app
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>For workers & sellers</h4>
                            <ul>
                                <li><a href="/store">Sell from home (Store)</a></li>
                                <li><a href="/#how-it-works">How it works</a></li>
                                <li><a href="/#features">Worker profile</a></li>
                                <li><a href="/#pricing">Free to join</a></li>
                                <li>
                                    <a
                                        href={WORKER_PLAY_STORE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download Worker & Seller app
                                    </a>
                                </li>
                                <li><a href="/partner">Growth Partners (Earn ₹50)</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="/#about">About us</a></li>
                                <li><a href="/#faq">FAQ</a></li>
                                <li><a href="/partner">Sales Partner Program</a></li>
                                <li>
                                    <a
                                        href={INSTAGRAM_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-instagram-link"
                                    >
                                        Instagram ({INSTAGRAM_HANDLE})
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        WhatsApp support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="/privacy">Privacy policy</a></li>
                                <li><a href="/delete-account">Delete account</a></li>
                                <li><a href="/child-safety">Child safety standards</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>&copy; {currentYear} ProWorker. All rights reserved.</p>
                        <p>Built for skilled workers, home creators, and the community members who support them.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
