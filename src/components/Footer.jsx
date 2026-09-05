import './Footer.css';
import { CLIENT_PLAY_STORE_URL } from '../data/appLinks';

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
                            A hyperlocal marketplace that helps customers discover nearby skilled workers—and helps professionals build their digital identity. Direct connection, no commissions.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="link-group">
                            <h4>For customers</h4>
                            <ul>
                                <li><a href="#categories">Services</a></li>
                                <li><a href="#how-it-works">How it works</a></li>
                                <li><a href="#testimonials">Reviews</a></li>
                                <li><a href="#search">Find workers</a></li>
                                <li>
                                    <a
                                        href={CLIENT_PLAY_STORE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download the app
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>For workers</h4>
                            <ul>
                                <li><a href="#how-it-works">How it works</a></li>
                                <li><a href="#features">Build your profile</a></li>
                                <li><a href="#pricing">Free to join</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#about">About us</a></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="link-group">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#privacy">Privacy policy</a></li>
                                <li><a href="#deleteaccount">Delete account</a></li>
                                <li><a href="#childsafety">Child safety standards</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>&copy; {currentYear} ProWorker. All rights reserved.</p>
                        <p>Built for skilled workers and the customers who need them nearby.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
